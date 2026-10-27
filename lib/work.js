// Portfolio content. Add a project: drop its screenshots in /public/shots/<slug>/ and add an entry below.
// Screenshots: desktop 1440px (full page + 1440×900 hero), tablet 834×1194, mobile 390px @2x.

export const CATEGORIES = [
  {
    slug: 'web',
    icon: 'web',
    pattern: 'herati',
    subs: ['shop', 'custom', 'service'],
    fa: { title: 'طراحی سایت', desc: 'فروشگاه‌های اینترنتی، سایت‌های شرکتی و خدماتی؛ از طراحی رابط کاربری تا انتشار.' },
    en: { title: 'Web Design', desc: 'Online stores, corporate and service websites — from interface design to launch.' },
  },
  {
    slug: 'poster',
    icon: 'poster',
    pattern: 'boteh',
    subs: [],
    fa: { title: 'طراحی پوستر', desc: 'پوستر تبلیغاتی، کاور شبکه‌های اجتماعی، بنر و اعلان.' },
    en: { title: 'Poster Design', desc: 'Advertising posters, social media covers, banners and announcements.' },
  },
  {
    slug: 'seo',
    icon: 'seo',
    pattern: 'khatai',
    subs: [],
    fa: { title: 'سئو', desc: 'سئوی فنی، محتوا و سرعت؛ برای دیده‌شدن در نتایج جست‌وجو.' },
    en: { title: 'SEO', desc: 'Technical SEO, content and speed — to be found in search results.' },
  },
];

export const PROJECTS = [
  {
    slug: 'amirimusic',
    cat: 'web',
    sub: 'shop',
    en_name: 'AMIRI MUSIC',
    url: 'https://amirimusic.ir/',
    domain: 'amirimusic.ir',
    palette: ['#1E3534', '#316463', '#D4733A', '#F6E2CA', '#F8F0E8'],
    accent: '#316463',
    tint: '#F6E2CA',
    shots: { desktopH: 9804, mobileH: 15600 },
    fa: {
      name: 'گالری موسیقی امیری',
      industry: 'فروشگاه ساز و تجهیزات موسیقی',
      market: 'گنبدکاووس',
      summary:
        'فروشگاه اینترنتی تخصصی ساز و تجهیزات موسیقی؛ گیتار، ویولن، سه‌تار، سنتور، دف، تنبک، کاخن و کالیمبا، همراه با مشاوره‌ی پیش از خرید و معرفی آموزشگاه موسیقی آوای پارسیان.',
      features: ['دسته‌بندی تصویری سازها با آیکون‌های اختصاصی', 'جست‌وجوی سریع در سازها و تجهیزات', 'اسلایدر معرفی با تصویرسازی ساز', 'بخش آموزشگاه موسیقی', 'نسخه‌ی موبایل کامل و واکنش‌گرا', 'سبد خرید و حساب کاربری'],
      platform: ['وردپرس', 'ووکامرس', 'المنتور'],
      font: 'یکان بخ',
    },
    en: {
      name: 'Amiri Music Gallery',
      industry: 'Musical instruments store',
      market: 'Gonbad-e Kavus, Iran',
      summary:
        'A specialist online store for musical instruments and gear — guitars, violins, setar, santur, daf, tombak, cajón and kalimba — with pre-purchase advice and an introduction to the Avaye Parsian music school.',
      features: ['Illustrated instrument categories with custom icons', 'Fast search across instruments and gear', 'Hero slider with instrument illustrations', 'Music school section', 'Fully responsive mobile experience', 'Cart and customer accounts'],
      platform: ['WordPress', 'WooCommerce', 'Elementor'],
      font: 'Yekan Bakh',
    },
  },
  {
    slug: 'mantoonline',
    cat: 'web',
    sub: 'shop',
    en_name: 'MANTO ONLINE',
    url: 'https://mantoonline.com/',
    domain: 'mantoonline.com',
    palette: ['#332821', '#5C4A3F', '#8C7562', '#D8C5AD', '#F8EFE3'],
    accent: '#5C4A3F',
    tint: '#E9DCCB',
    shots: { desktopH: 4783, mobileH: 12940 },
    fa: {
      name: 'مانتو آنلاین',
      industry: 'فروشگاه پوشاک زنانه',
      market: 'ارسال به سراسر ایران',
      summary: 'فروشگاه اینترنتی مانتو، شومیز، کت، پالتو، پافر و ست‌های زنانه؛ با تولید مستقیم، ارسال رایگان به سراسر ایران و پشتیبانی ۲۴ ساعته.',
      features: ['اسلایدر کالکشن‌های فصلی', 'معرفی جدیدترین و پرفروش‌ترین محصولات', 'راهنمای گام‌به‌گام ثبت سفارش', 'نوار ناوبری پایین صفحه در موبایل', 'اتصال به اینستاگرام و تلگرام', 'بخش مطالب و وبلاگ'],
      platform: ['وردپرس', 'ووکامرس', 'المنتور'],
      font: 'پیدا',
    },
    en: {
      name: 'Manto Online',
      industry: 'Women’s fashion store',
      market: 'Nationwide delivery, Iran',
      summary: 'An online store for women’s manteaux, blouses, jackets, coats, puffers and sets — made in-house, with free nationwide delivery and 24-hour support.',
      features: ['Seasonal collection slider', 'Newest and best-selling products', 'Step-by-step ordering guide', 'Bottom navigation bar on mobile', 'Instagram and Telegram integration', 'Blog and articles section'],
      platform: ['WordPress', 'WooCommerce', 'Elementor'],
      font: 'Peyda',
    },
  },
];

// merge the language-specific fields onto the shared ones
export const loc = (item, lang) => ({ ...item, ...item[lang] });

export const shot = (p, name) => `/shots/${p.slug}/${name}.webp`;
export const catOf = (slug) => CATEGORIES.find((c) => c.slug === slug);
export const projectsIn = (cat) => PROJECTS.filter((p) => p.cat === cat);
export const projectPath = (p) => `/work/${p.cat}/${p.slug}`;
