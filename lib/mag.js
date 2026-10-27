// Chartagh Magazine. Articles are plain data: covers are drawn from a pattern + icon + colour,
// bodies are blocks — { h } heading, { p } paragraph, { q } pull quote, { ul } list.
// Newest first; the first one is the featured story.

export const MAG_CATS = [
  { slug: 'web', icon: 'web', fa: 'طراحی سایت', en: 'Web design' },
  { slug: 'seo', icon: 'seo', fa: 'سئو', en: 'SEO' },
  { slug: 'poster', icon: 'poster', fa: 'طراحی پوستر', en: 'Poster design' },
  { slug: 'brand', icon: 'lantern', fa: 'برند و هنر ایرانی', en: 'Brand & Persian art' },
];

export const ARTICLES = [
  {
    slug: 'slow-site-costs',
    cat: 'web',
    date: '2026-10-20',
    read: 6,
    cover: { pat: 'herati', bg: '#7E2414', fg: '#F8DDD3' },
    fa: {
      title: 'هر ثانیه کندی سایت، چند مشتری را فراری می‌دهد؟',
      excerpt: 'سرعت فقط یک عدد فنی نیست؛ اولین تجربه‌ی مشتری از برند شماست. در این مقاله می‌بینیم کندی از کجا می‌آید و چطور آن را درمان کنیم.',
      body: [
        { p: 'وقتی کسی آدرس سایت شما را باز می‌کند، پیش از دیدن هر تصویر یا متنی، «انتظار» را تجربه می‌کند. اگر این انتظار طولانی شود، بسیاری از بازدیدکننده‌ها پیش از دیدن صفحه برمی‌گردند و سراغ رقیب می‌روند.' },
        { h: 'کندی از کجا می‌آید؟' },
        { ul: ['تصاویر سنگین و بهینه‌نشده که چند مگابایت حجم دارند', 'افزونه‌ها و اسکریپت‌های اضافه که هر کدام چیزی بار می‌کنند', 'هاست ضعیف یا نبود کش', 'فونت‌های متعدد با همه‌ی وزن‌ها'] },
        { h: 'سه قدم ساده برای سریع‌تر شدن' },
        { p: 'اول، تصاویر را به فرمت‌های امروزی مثل WebP تبدیل و ابعادشان را متناسب با نمایش کنید. دوم، هر افزونه یا اسکریپتی را که واقعاً لازم نیست کنار بگذارید. سوم، کش مرورگر و فشرده‌سازی را روی هاست فعال کنید.' },
        { q: 'سایت سریع، احترام به وقت مشتری است؛ و مشتری این احترام را به خاطر می‌سپارد.' },
        { p: 'در چارطاق، سرعت را از روز اول طراحی در نظر می‌گیریم، نه بعد از انتشار. نتیجه سایتی است که روی گوشی‌های معمولی و اینترنت متوسط هم روان باز می‌شود.' },
      ],
    },
    en: {
      title: 'How many customers does every second of delay cost you?',
      excerpt: 'Speed isn’t just a technical number — it’s the first experience a customer has of your brand. Here’s where slowness comes from and how to fix it.',
      body: [
        { p: 'Before anyone sees a single image or word on your site, they experience waiting. When that wait drags on, many visitors leave before the page appears — and go to a competitor.' },
        { h: 'Where does slowness come from?' },
        { ul: ['Heavy, unoptimised images weighing several megabytes', 'Extra plugins and scripts, each loading something', 'Weak hosting or no caching', 'Too many fonts in every weight'] },
        { h: 'Three simple steps to a faster site' },
        { p: 'First, convert images to modern formats like WebP and size them for how they’re shown. Second, drop any plugin or script you don’t truly need. Third, turn on browser caching and compression on your host.' },
        { q: 'A fast site respects the customer’s time — and customers remember that respect.' },
        { p: 'At Chartagh we plan for speed from the first sketch, not after launch. The result is a site that opens smoothly even on everyday phones and average connections.' },
      ],
    },
  },
  {
    slug: 'local-seo-guide',
    cat: 'seo',
    date: '2026-10-12',
    read: 7,
    cover: { pat: 'eslimi', bg: '#24130E', fg: '#C0704C' },
    fa: {
      title: 'سئوی محلی؛ چطور در جست‌وجوهای شهر خودتان دیده شوید',
      excerpt: 'برای کافه، فروشگاه یا مطب، مشتری‌های نزدیک ارزشمندترین مشتری‌ها هستند. سئوی محلی یعنی وقتی کسی در شهر شما جست‌وجو می‌کند، اول شما را ببیند.',
      body: [
        { p: 'بیشتر جست‌وجوهای روزمره رنگ‌وبوی محلی دارند: «کافه نزدیک من»، «فروشگاه ساز در گنبد»، «تعمیر موبایل مینودشت». اگر کسب‌وکار شما در این نتایج نباشد، عملاً برای مشتری‌های همسایه وجود ندارد.' },
        { h: 'پایه‌ی کار: اطلاعات یکسان و دقیق' },
        { p: 'نام، نشانی و شماره‌ی تماس شما باید در سایت، نقشه‌ها و شبکه‌های اجتماعی دقیقاً یکسان باشد. همین یکدستی ساده به موتورهای جست‌وجو اطمینان می‌دهد که با یک کسب‌وکار واقعی و فعال طرف‌اند.' },
        { h: 'چه کارهایی بیشترین اثر را دارد؟' },
        { ul: ['ثبت کسب‌وکار در نقشه‌ی گوگل و نشان با عکس‌های واقعی', 'صفحه‌ی تماس کامل با نقشه و ساعت کاری', 'محتوایی که نام شهر و محله را طبیعی به کار ببرد', 'جمع‌کردن نظر مشتری‌های واقعی و پاسخ به آن‌ها'] },
        { q: 'سئوی محلی مسابقه‌ی بزرگ‌ترها نیست؛ مسابقه‌ی دقیق‌ترهاست.' },
        { p: 'خبر خوب این است که رقابت در جست‌وجوهای محلی معمولاً کمتر است و با چند ماه کار منظم می‌شود نتیجه‌ی ملموس دید.' },
      ],
    },
    en: {
      title: 'Local SEO: how to be found in searches in your own city',
      excerpt: 'For a café, a shop or a clinic, nearby customers are the most valuable ones. Local SEO means that when someone in your city searches, they see you first.',
      body: [
        { p: 'Most everyday searches are local: “café near me”, “music shop in Gonbad”, “phone repair in Minudasht”. If your business isn’t in those results, it barely exists for the customers next door.' },
        { h: 'The foundation: consistent, accurate details' },
        { p: 'Your name, address and phone number should be exactly the same on your site, on maps and on social media. That simple consistency tells search engines they’re dealing with a real, active business.' },
        { h: 'What has the most impact?' },
        { ul: ['A Google Maps and Neshan listing with real photos', 'A complete contact page with a map and opening hours', 'Content that naturally mentions your city and neighbourhood', 'Collecting — and answering — reviews from real customers'] },
        { q: 'Local SEO isn’t a race for the biggest; it’s a race for the most precise.' },
        { p: 'The good news: competition in local search is usually lighter, and a few months of steady work brings results you can see.' },
      ],
    },
  },
  {
    slug: 'poster-that-speaks',
    cat: 'poster',
    date: '2026-10-03',
    read: 5,
    cover: { pat: 'boteh', bg: '#E2492D', fg: '#F8DDD3' },
    fa: {
      title: 'پوستری که از دور حرف می‌زند',
      excerpt: 'پوستر خوب در یک نگاه سه ثانیه‌ای پیامش را می‌رساند. پنج اصل ساده که پوستر را از «دیده‌شدن» به «به‌یادماندن» می‌رساند.',
      body: [
        { p: 'پوستر، چه روی دیوار شهر باشد چه در صفحه‌ی اینستاگرام، فقط چند ثانیه فرصت دارد. در این چند ثانیه باید توجه را بگیرد، پیام را برساند و یک قدم بعدی پیشنهاد بدهد.' },
        { h: 'پنج اصل یک پوستر موفق' },
        { ul: ['یک پیام اصلی؛ نه پنج پیام هم‌وزن', 'تیتری که از دو متری خوانا باشد', 'تضاد رنگی کافی بین متن و زمینه', 'فضای خالی برای نفس کشیدن طرح', 'دعوت روشن به اقدام: تاریخ، نشانی یا راه ارتباط'] },
        { q: 'هر چیزی که به پیام کمک نمی‌کند، از آن می‌کاهد.' },
        { h: 'تایپوگرافی فارسی، نقطه‌ی قوت یا ضعف' },
        { p: 'حروف فارسی ظرفیت فوق‌العاده‌ای برای ترکیب‌بندی دارند. انتخاب فونت مناسب و فاصله‌گذاری درست، تفاوت پوستر معمولی و پوستر حرفه‌ای را می‌سازد.' },
      ],
    },
    en: {
      title: 'A poster that speaks from across the street',
      excerpt: 'A good poster gets its message across in a three-second glance. Five simple principles that take a poster from “seen” to “remembered”.',
      body: [
        { p: 'Whether it’s on a city wall or in an Instagram feed, a poster has only a few seconds. In that time it has to catch the eye, deliver the message and suggest a next step.' },
        { h: 'Five principles of a successful poster' },
        { ul: ['One main message — not five of equal weight', 'A headline readable from two metres away', 'Enough contrast between text and background', 'White space that lets the design breathe', 'A clear call to action: a date, an address or a way to get in touch'] },
        { q: 'Anything that doesn’t help the message takes away from it.' },
        { h: 'Persian typography: strength or weakness' },
        { p: 'Persian letterforms offer remarkable room for composition. The right typeface and careful spacing are what separate an ordinary poster from a professional one.' },
      ],
    },
  },
  {
    slug: 'shop-design-mistakes',
    cat: 'web',
    date: '2026-09-24',
    read: 8,
    cover: { pat: 'khatai', bg: '#D9C5A0', fg: '#7E2414' },
    fa: {
      title: 'هفت اشتباه رایج در طراحی فروشگاه اینترنتی',
      excerpt: 'از سبد خرید پنهان تا عکس‌های بی‌کیفیت؛ اشتباه‌هایی که بی‌صدا فروش را کم می‌کنند و راه‌حل ساده‌ی هر کدام.',
      body: [
        { p: 'فروشگاه اینترنتی شبیه یک مغازه است: اگر مشتری راه را گم کند یا به چیزی شک کند، بی‌آنکه حرفی بزند می‌رود. این هفت اشتباه را در بسیاری از فروشگاه‌ها می‌بینیم.' },
        { ul: ['جست‌وجوی ضعیف یا پنهان', 'عکس‌های کوچک و بی‌کیفیت محصول', 'قیمت یا هزینه‌ی ارسال نامعلوم تا آخرین مرحله', 'ثبت‌نام اجباری پیش از خرید', 'نسخه‌ی موبایل نصفه‌ونیمه', 'نبود راه ارتباط سریع برای سؤال', 'صفحه‌ی پرداخت شلوغ و پرمرحله'] },
        { h: 'از کجا شروع کنیم؟' },
        { p: 'بیشتر خریدها امروز با گوشی انجام می‌شود؛ پس همیشه از نسخه‌ی موبایل شروع کنید. مسیر «دیدن محصول تا پرداخت» را خودتان روی گوشی طی کنید و هر جا مکث کردید، همان‌جا نقطه‌ی ضعف است.' },
        { q: 'بهترین فروشگاه، فروشگاهی است که خریدار متوجه پیچیدگی‌اش نشود.' },
      ],
    },
    en: {
      title: 'Seven common mistakes in online store design',
      excerpt: 'From a hidden cart to low-quality photos — mistakes that quietly cut sales, and a simple fix for each.',
      body: [
        { p: 'An online store is like a shop: if customers lose their way or start to doubt, they leave without a word. We see these seven mistakes in many stores.' },
        { ul: ['Weak or hidden search', 'Small, low-quality product photos', 'Price or shipping cost unclear until the last step', 'Forced sign-up before buying', 'A half-finished mobile version', 'No quick way to ask a question', 'A cluttered, many-step checkout'] },
        { h: 'Where to start?' },
        { p: 'Most purchases now happen on phones, so always start with mobile. Walk the path from product page to payment on your own phone; wherever you hesitate is a weak spot.' },
        { q: 'The best store is the one whose complexity the buyer never notices.' },
      ],
    },
  },
  {
    slug: 'persian-art-modern-design',
    cat: 'brand',
    date: '2026-09-15',
    read: 6,
    cover: { pat: 'herati', bg: '#B5391F', fg: '#D9C5A0' },
    fa: {
      title: 'از کاشی تا رابط کاربری؛ هنر ایرانی در طراحی امروز',
      excerpt: 'نقش هراتی، بته‌جقه و اسلیمی فقط تزئین نیستند؛ زبانی بصری‌اند که می‌شود با آن برندی اصیل و امروزی ساخت.',
      body: [
        { p: 'هنر ایرانی قرن‌ها با نظم، تکرار و تقارن کار کرده است؛ همان چیزهایی که پایه‌ی طراحی رابط کاربری امروز هم هستند. شبکه‌ی کاشی‌کاری، خویشاوند نزدیک گرید در طراحی وب است.' },
        { h: 'اصالت بدون شلوغی' },
        { p: 'چالش اصلی، استفاده‌ی سنجیده است. نقش‌مایه‌ها باید در خدمت محتوا باشند: یک قاب، یک حاشیه یا یک بافت ملایم در پس‌زمینه؛ نه پوشاندن همه‌ی صفحه.' },
        { ul: ['نقش‌ها را کم‌رنگ و در پس‌زمینه به کار ببرید', 'از رنگ‌های خانواده‌ی آجر، فیروزه و خاک الهام بگیرید', 'تایپوگرافی فارسی را ستون اصلی هویت قرار دهید', 'حرکت را آرام و سنجیده نگه دارید'] },
        { q: 'میراث، وقتی زنده است که با زبان امروز حرف بزند.' },
        { p: 'سایت خود چارطاق نمونه‌ی همین نگاه است: نقش هراتی و طاق‌های ایرانی در کنار چیدمانی امروزی و سریع.' },
      ],
    },
    en: {
      title: 'From tiles to interfaces: Persian art in today’s design',
      excerpt: 'Herati, boteh and eslimi patterns aren’t just decoration — they’re a visual language for building a brand that feels both authentic and current.',
      body: [
        { p: 'Persian art has worked with order, repetition and symmetry for centuries — the very things today’s interface design is built on. The grid of tilework is a close relative of the grid in web design.' },
        { h: 'Authentic without clutter' },
        { p: 'The real challenge is restraint. Patterns should serve the content: a frame, a border or a soft background texture — not a blanket over the whole page.' },
        { ul: ['Use patterns faintly, in the background', 'Draw on the brick, turquoise and earth palette', 'Make Persian typography the backbone of the identity', 'Keep motion calm and deliberate'] },
        { q: 'Heritage stays alive when it speaks today’s language.' },
        { p: 'Chartagh’s own site is an example of this approach: herati patterns and Persian arches alongside a modern, fast layout.' },
      ],
    },
  },
];

export const magCat = (slug) => MAG_CATS.find((c) => c.slug === slug);
export const article = (slug) => ARTICLES.find((a) => a.slug === slug);
export const magPath = (a) => `/mag/${a.slug}`;
export const locA = (a, lang) => ({ ...a, ...a[lang], catLabel: magCat(a.cat)[lang], icon: magCat(a.cat).icon });

export function fmtDate(iso, lang) {
  const d = new Date(`${iso}T12:00:00Z`);
  return new Intl.DateTimeFormat(lang === 'fa' ? 'fa-IR-u-ca-persian' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(d);
}
