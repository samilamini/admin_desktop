import { useState } from 'react';
import { useLang } from '../../context/LanguageContext';

function validate(name, value, signupPassword, text, lang) {
  switch (name) {
    case 'email':
      if (!value) return text.email_required[lang];
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return text.email_invalid[lang];
      return '';
    case 'phone':
      if (!value) return text.phone_required[lang];
      if (!/^\+?[0-9\s-]{10,15}$/.test(value)) return text.phone_invalid[lang];
      return '';
    case 'password':
      if (!value) return text.password_required[lang];
      if (value.length < 6) return text.password_short[lang];
      return '';
    case 'confirm':
      if (!value) return text.confirm_required[lang];
      if (value !== signupPassword) return text.confirm_mismatch[lang];
      return '';
    default:
      return '';
  }
}

export default function AuthPanel({ onLoginSuccess }) {
  const { lang, t } = useLang();
  const text = t.auth;
  const [login, setLogin] = useState({ email: '', password: '' });
  const [loginErr, setLoginErr] = useState({});
  const [loginTouched, setLoginTouched] = useState({});
  const [showLoginPass, setShowLoginPass] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  function handleLoginChange(e) {
    const { name, value } = e.target;
    setLogin((p) => ({ ...p, [name]: value }));
    if (loginTouched[name]) setLoginErr((p) => ({ ...p, [name]: validate(name, value, undefined, text, lang) }));
  }

  function handleLoginBlur(e) {
    const { name, value } = e.target;
    setLoginTouched((p) => ({ ...p, [name]: true }));
    setLoginErr((p) => ({ ...p, [name]: validate(name, value, undefined, text, lang) }));
  }

  function handleLoginSubmit() {
    const fields = ['email', 'password'];
    const touched = Object.fromEntries(fields.map((f) => [f, true]));
    const errors = Object.fromEntries(fields.map((f) => [f, validate(f, login[f], undefined, text, lang)]));
    setLoginTouched(touched);
    setLoginErr(errors);
    if (Object.values(errors).every((e) => !e)) onLoginSuccess?.();
  }

  return (
    <div className="auth-panel">
      <div className="auth-form-container">
        <div className="auth-form-inner">
          <div className="auth-forms-body">
            <div className="auth-form auth-form--visible">
              <Field label={text.email[lang]} error={loginErr.email}>
                <input
                  name="email"
                  type="email"
                  className={`field-input ${loginTouched.email ? (loginErr.email ? 'input-error' : 'input-ok') : ''}`}
                  placeholder="youremail@gmail.com"
                  value={login.email}
                  onChange={handleLoginChange}
                  onBlur={handleLoginBlur}
                />
              </Field>

              <Field label={text.password[lang]} error={loginErr.password}>
                <div className="input-icon-wrap">
                  <input
                    name="password"
                    type={showLoginPass ? 'text' : 'password'}
                    className={`field-input ${loginTouched.password ? (loginErr.password ? 'input-error' : 'input-ok') : ''}`}
                    placeholder="••••••••••"
                    value={login.password}
                    onChange={handleLoginChange}
                    onBlur={handleLoginBlur}
                  />
                  <button type="button" className="eye-btn" onClick={() => setShowLoginPass((p) => !p)}>
                    {showLoginPass ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </Field>

              <div className="login-meta">
                <label className="checkbox-label">
                  <input type="checkbox" checked={rememberMe} onChange={() => setRememberMe((v) => !v)} />
                  <span>{text.remember_me[lang]}</span>
                </label>
                <a href="#" className="forgot-link">{text.forgot_password[lang]}</a>
              </div>

              <button type="button" className="btn-primary" onClick={handleLoginSubmit}>
                {text.login_btn[lang]}
              </button>
              <div className="divider"><span>{text.or_label[lang]}</span></div>
              <button type="button" className="btn-google">
                <GoogleIcon />{text.google_btn[lang]}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <div className="field-group">
      <label className="field-label">{label}</label>
      {children}
      <div className="field-error-slot">
        {error && <span className="field-error"><WarningIcon /> {error}</span>}
      </div>
    </div>
  );
}

function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ flexShrink: 0, marginTop: '1px' }}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
    </svg>
  );
}
