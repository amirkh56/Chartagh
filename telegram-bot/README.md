# بات اعلان فرم چارطاق

Cloudflare Worker (پایتون + python-telegram-bot 22.8):
`https://chartagh-notify-bot.amyrkhwrdymaqy125.workers.dev`

- `POST /notify` ← از `api/contact.php` (هدر `Authorization: Bearer NOTIFY_SECRET`)
- `POST /telegram` ← webhook تلگرام؛ `/start` شناسه‌ی چت رو می‌ده

## راه‌اندازی
پروژه رو در مسیری **بدون فاصله** کپی کن (pywrangler با فاصله در مسیر خطا می‌ده)، بعد:

```
uv run pywrangler deploy
npx wrangler secret put BOT_TOKEN      # از @BotFather
npx wrangler secret put CHAT_IDS       # با کاما: 123,-100456
```

Webhook (یک بار):
`https://api.telegram.org/bot<TOKEN>/setWebhook?url=<WORKER>/telegram&secret_token=<NOTIFY_SECRET>`

روی هاست در `api/config.local.php`:
```php
'notify_url' => '<WORKER>/notify',
'notify_secret' => '<NOTIFY_SECRET>',
```
