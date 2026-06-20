const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/inner.solv?igsh=MW9zNDFqd2FxZHpncQ%3D%3D&utm_source=qr",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
        <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="17.5" cy="6.5" r="1.3" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Behance",
    href: "https://www.behance.net/innersolv",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
        <path
          d="M4 6h6.1c2.3 0 3.8 1.2 3.8 3.1 0 1.2-.6 2.1-1.7 2.5 1.4.4 2.2 1.4 2.2 2.9 0 2.2-1.7 3.5-4.2 3.5H4V6zm5.7 4.7c.9 0 1.4-.4 1.4-1.2s-.5-1.2-1.4-1.2H6.9v2.4h2.8zm.3 5c1 0 1.6-.5 1.6-1.4s-.6-1.4-1.6-1.4H6.9v2.8H10z"
          fill="currentColor"
        />
        <path d="M15.6 7.2h5.1v1.5h-5.1V7.2zm2.8 3.3c2.2 0 3.6 1.5 3.6 3.8v.6h-5.1c.2.9.8 1.4 1.7 1.4.7 0 1.2-.3 1.5-.8h1.8c-.5 1.7-1.8 2.7-3.4 2.7-2.1 0-3.5-1.5-3.5-3.8s1.4-3.9 3.4-3.9zm1.6 3.1c-.1-.8-.7-1.3-1.6-1.3-.8 0-1.4.5-1.6 1.3H20z" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1EaXPku5Un/?mibextid=wwXIfr",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
        <path
          d="M14 8.6V7.1c0-.7.3-1.1 1.2-1.1H17V3.2c-.8-.1-1.5-.2-2.3-.2-2.4 0-4 1.5-4 4v1.6H8v3.2h2.7V21H14v-9.2h2.8l.4-3.2H14z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@innersolv?_r=1&_t=ZS-97EdxweCPAb",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
        <path
          d="M15.2 3c.4 2.5 1.8 4 4.1 4.2v3.1c-1.5 0-2.8-.4-4-1.3v5.7c0 3.1-2.1 5.3-5.1 5.3-2.8 0-5-2-5-4.7 0-2.9 2.1-4.9 5-4.9.4 0 .8.1 1.1.2v3.2c-.3-.1-.7-.2-1-.2-1.2 0-2 .7-2 1.7s.8 1.7 1.8 1.7c1.2 0 2-.8 2-2.2V3h3.1z"
          fill="currentColor"
        />
      </svg>
    ),
  },
];

export default function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {socialLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          aria-label={`Visit Innersolv on ${link.label}`}
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-current px-4 text-sm font-semibold transition hover:-translate-y-0.5"
        >
          {link.icon}
          <span>{link.label}</span>
        </a>
      ))}
    </div>
  );
}
