// Portfolio content. Add a project: drop its screenshots in /public/work/<slug>/ and add an entry below.
// Screenshots were captured at: desktop 1440px (full page + 1440×900 hero), tablet 834×1194, mobile 390px @2x.

export const CATEGORIES = [
  {
    slug: 'web',
    title: 'طراحی سایت',
    en: 'Web Design',
    icon: 'web',
    desc: 'فروشگاه‌های اینترنتی، سایت‌های شرکتی و خدماتی؛ از طراحی رابط کاربری تا انتشار.',
    subs: ['فروشگاهی', 'اختصاصی', 'خدماتی'],
    pattern: 'herati',
  },
  {
    slug: 'poster',
    title: 'طراحی پوستر',
    en: 'Poster Design',
    icon: 'poster',
    desc: 'پوستر تبلیغاتی، کاور شبکه‌های اجتماعی، بنر و اعلان.',
    subs: [],
    pattern: 'boteh',
  },
  {
    slug: 'seo',
    title: 'سئو',
    en: 'SEO',
    icon: 'seo',
    desc: 'سئوی فنی، محتوا و سرعت؛ برای دیده‌شدن در نتایج جست‌وجو.',
    subs: [],
    pattern: 'khatai',
  },
];

export const PROJECTS = [
  {
    slug: 'amirimusic',
    cat: 'web',
    sub: 'فروشگاهی',
    name: 'گالری موسیقی امیری',
    en: 'AMIRI MUSIC',
    url: 'https://amirimusic.ir/',
    domain: 'amirimusic.ir',
    industry: 'فروشگاه ساز و تجهیزات موسیقی',
    city: 'گنبدکاووس',
    summary:
      'فروشگاه اینترنتی تخصصی ساز و تجهیزات موسیقی؛ گیتار، ویولن، سه‌تار، سنتور، دف، تنبک، کاخن و کالیمبا، همراه با مشاوره‌ی پیش از خرید و معرفی آموزشگاه موسیقی آوای پارسیان.',
    features: ['دسته‌بندی تصویری سازها با آیکون‌های اختصاصی', 'جست‌وجوی سریع در سازها و تجهیزات', 'اسلایدر معرفی با تصویرسازی ساز', 'بخش آموزشگاه موسیقی', 'نسخه‌ی موبایل کامل و واکنش‌گرا', 'سبد خرید و حساب کاربری'],
    platform: ['وردپرس', 'ووکامرس', 'المنتور'],
    font: 'یکان بخ',
    palette: ['#1E3534', '#316463', '#D4733A', '#F6E2CA', '#F8F0E8'],
    accent: '#316463',
    tint: '#F6E2CA',
    shots: { desktopH: 9804, mobileH: 15600 },
  },
  {
    slug: 'mantoonline',
    cat: 'web',
    sub: 'فروشگاهی',
    name: 'مانتو آنلاین',
    en: 'MANTO ONLINE',
    url: 'https://mantoonline.com/',
    domain: 'mantoonline.com',
    industry: 'فروشگاه پوشاک زنانه',
    city: 'ارسال به سراسر ایران',
    summary:
      'فروشگاه اینترنتی مانتو، شومیز، کت، پالتو، پافر و ست‌های زنانه؛ با تولید مستقیم، ارسال رایگان به سراسر ایران و پشتیبانی ۲۴ ساعته.',
    features: ['اسلایدر کالکشن‌های فصلی', 'معرفی جدیدترین و پرفروش‌ترین محصولات', 'راهنمای گام‌به‌گام ثبت سفارش', 'نوار ناوبری پایین صفحه در موبایل', 'اتصال به اینستاگرام و تلگرام', 'بخش مطالب و وبلاگ'],
    platform: ['وردپرس', 'ووکامرس', 'المنتور'],
    font: 'پیدا',
    palette: ['#332821', '#5C4A3F', '#8C7562', '#D8C5AD', '#F8EFE3'],
    accent: '#5C4A3F',
    tint: '#E9DCCB',
    shots: { desktopH: 4783, mobileH: 12940 },
  },
];

export const shot = (p, name) => `/work/${p.slug}/${name}.webp`;
export const catOf = (slug) => CATEGORIES.find((c) => c.slug === slug);
export const projectsIn = (cat) => PROJECTS.filter((p) => p.cat === cat);
export const projectHref = (p) => `/work/${p.cat}/${p.slug}`;
