# Chartagh notify bot — a Cloudflare Python Worker.
#   POST /notify   (from api/contact.php, Bearer NOTIFY_SECRET) → message to every chat in CHAT_IDS
#   POST /telegram (Telegram webhook) → /start replies with the chat id to put in CHAT_IDS
import hmac
import json
from html import escape

from telegram import Bot, Update
from workers import Response, WorkerEntrypoint


def format_entry(e: dict) -> str:
    def field(label, value):
        return f"<b>{label}:</b> {escape(str(value))}" if value else None

    services = "، ".join(str(s) for s in (e.get("services") or []))
    lines = [
        "📩 <b>پیام تازه از سایت چارطاق</b>",
        "",
        field("نام", e.get("name")),
        field("راه ارتباطی", e.get("contact")),
        field("خدمات", services),
        field("بودجه", e.get("budget")),
        field("زبان صفحه", e.get("lang")),
    ]
    text = "\n".join(l for l in lines if l is not None)
    if e.get("message"):
        text += "\n\n" + escape(str(e["message"]))
    return text[:4000]  # Telegram caps messages at 4096 chars


class Default(WorkerEntrypoint):
    async def fetch(self, request):
        path = request.url.split("?")[0].rstrip("/").rsplit("/", 1)[-1]
        if request.method != "POST":
            return Response("chartagh notify bot", status=200)

        if path == "notify":
            auth = request.headers.get("Authorization") or ""
            if not hmac.compare_digest(auth, f"Bearer {self.env.NOTIFY_SECRET}"):
                return Response("forbidden", status=403)
            entry = json.loads(await request.text())
            chats = [c.strip() for c in str(self.env.CHAT_IDS).split(",") if c.strip()]
            sent = 0
            async with Bot(self.env.BOT_TOKEN) as bot:
                for chat in chats:
                    try:  # one bad chat (bot removed from a group) must not block the rest
                        await bot.send_message(chat, format_entry(entry), parse_mode="HTML")
                        sent += 1
                    except Exception as err:
                        print(f"send to {chat} failed: {err}")
            return Response.json({"ok": sent > 0, "sent": sent}, status=200 if sent else 502)

        if path == "telegram":
            secret = request.headers.get("X-Telegram-Bot-Api-Secret-Token") or ""
            if not hmac.compare_digest(secret, str(self.env.NOTIFY_SECRET)):
                return Response("forbidden", status=403)
            async with Bot(self.env.BOT_TOKEN) as bot:
                update = Update.de_json(json.loads(await request.text()), bot)
                msg = update.effective_message
                if msg and msg.text and msg.text.startswith("/start"):
                    await msg.reply_text(
                        f"سلام! این بات فقط اعلان فرم‌های سایت چارطاق رو می‌فرسته.\n"
                        f"شناسه‌ی این چت: {msg.chat_id}"
                    )
            return Response("ok")

        return Response("not found", status=404)
