import './LoginPage.css';
import AuthPanel from './AuthPanel';
import LeftPanel from './LeftPanel';
import LanguageSwitcher from './LanguageSwitcher';
import { useLang } from '../../context/LanguageContext';
import logoMobilis from '../../assets/mobilis_logo_.png';

export default function LoginPage({ onLoginSuccess }) {
  const { lang, t } = useLang();
  const text = t.auth;

  return (
    <div className="page-wrapper" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="lang-switcher-wrapper">
        <LanguageSwitcher />
      </div>
      <div className="mobile-header">
        <img src={logoMobilis} alt="Mobilis" className="mobilis-logo" />
        <span>
          {text.left_title_1[lang]} <span className="green-text">{text.left_title_2[lang]}</span>
        </span>
      </div>
      <div className="auth-card">
        <LeftPanel />
        <AuthPanel onLoginSuccess={onLoginSuccess} />
      </div>
    </div>
  );
}
