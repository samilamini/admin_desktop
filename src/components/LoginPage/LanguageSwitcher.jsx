import { useState } from 'react';
import { useLang } from '../../context/LanguageContext';

export default function LanguageSwitcher() {
  const { lang, setLang, t } = useLang();
  const text = t.auth;
  const [open, setOpen] = useState(false);

  const languages = [
    { code: 'fr', label: text.lang_french[lang] },
    { code: 'en', label: text.lang_english[lang] },
    { code: 'ar', label: text.lang_arabic[lang] },
  ];

  const current = languages.find((l) => l.code === lang) ?? languages[0];

  return (
    <div className="lang-switcher">
      <button className="lang-btn" onClick={() => setOpen((p) => !p)}>
        <GlobeIcon />
        <span>{current.label}</span>
        <ChevronIcon open={open} />
      </button>
      {open && (
        <div className="lang-dropdown">
          {languages
            .filter((l) => l.code !== lang)
            .map((l) => (
              <button key={l.code} className="lang-option" onClick={() => { setLang(l.code); setOpen(false); }}>
                {l.label}
              </button>
          ))}
        </div>
      )}
    </div>
  );
}

function GlobeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function ChevronIcon({ open }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
