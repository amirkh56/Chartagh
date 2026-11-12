export const EMAIL = 'chartagh.agency@gmail.com';

const ICONS = {
  telegram: <path d="M21.5 4.2 2.9 11.4c-1 .4-1 1.8.1 2.1l4.7 1.5 1.8 5.6c.3.9 1.4 1.1 2 .4l2.6-2.7 4.9 3.6c.8.6 1.9.1 2.1-.8L24 5.6c.3-1.1-.8-2-1.9-1.6ZM9.6 14.6l8.6-7.3-6.8 8.6-.4 3.4-1.4-4.7Z" />,
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.3" cy="6.7" r="1.2" />
    </>
  ),
  email: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="m3.5 7 8.5 6.2L20.5 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </>
  ),
};

export const CONTACTS = [
  { key: 'telegram', href: 'https://t.me/chartagh_support', text: '@chartagh_support' },
  { key: 'instagram', href: 'https://www.instagram.com/chartagh.agency/', text: 'chartagh.agency' },
  { key: 'email', href: `mailto:${EMAIL}`, text: EMAIL },
];

export default function ContactLinks({ className = '' }) {
  return (
    <ul className={`clinks ${className}`}>
      {CONTACTS.map((c) => (
        <li key={c.key}>
          <a
            className={`clink clink--${c.key}`}
            href={c.href}
            {...(c.key === 'email' ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
          >
            <span className="clink__icon" aria-hidden>
              <svg viewBox="0 0 24 24" fill="currentColor">
                {ICONS[c.key]}
              </svg>
            </span>
            <span className="clink__text">{c.text}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
