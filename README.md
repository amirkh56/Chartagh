<div dir="rtl">

# چارطاق

سایت آژانس خلاق **چارطاق**؛ ساخته‌شده با Next.js، React و Three.js.

## نصب و اجرا

### پیش‌نیازها

- **Node.js نسخه‌ی ۲۰.۹ یا بالاتر** (با `node -v` چک کن)
- npm (همراه Node نصب می‌شه)

### قدم‌به‌قدم

</div>

```bash
git clone https://github.com/amirkh56/Chartagh.git
cd Chartagh
npm install
npm run dev
```

<div dir="rtl">

بعد مرورگر رو روی [http://localhost:3000](http://localhost:3000) باز کن.

### دستورها

| دستور | کارش |
|---|---|
| `npm run dev` | اجرای حالت توسعه با بارگذاری خودکار تغییرات |
| `npm run build` | ساخت نسخه‌ی نهایی (پروداکشن) |
| `npm run start` | اجرای نسخه‌ی ساخته‌شده؛ اول باید `build` زده باشی |

### اگه `npm install` خطای شبکه داد

اگه به `registry.npmjs.org` دسترسی کند یا قطع‌ووصل داری (خطای `ECONNRESET` یا timeout)، از یه میرور استفاده کن:

</div>

```bash
npm install --registry=https://mirror-npm.runflare.com
```

<div dir="rtl">

### انتشار

سایت کاملاً استاتیکه. روی هر سرویسی که Next.js رو پشتیبانی می‌کنه (Vercel، لیارا، ران‌فلر و…) یا هر سرور Node با `npm run build` و بعد `npm run start` بالا میاد.

</div>
