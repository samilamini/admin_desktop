import { MapPin, TrendingUp, Zap } from 'lucide-react';
import { useLang } from '../../context/LanguageContext';
import logoMobilis from '../../assets/mobilis_logo_.png';
import carteFaded from '../../assets/faded_map_.png';

export default function LeftPanel() {
  const { lang, t } = useLang();
  const text = t.auth;

  return (
    <div className="left-panel">
      <div className="top-section">
        <img src={logoMobilis} alt="Mobilis" className="mobilis-logo" />
        <h1 className="main-title">
          {text.left_title_1[lang]} <span className="green-text">{text.left_title_2[lang]}</span> {text.left_title_3[lang]}
          <span className="green-text">{text.left_title_4[lang]}</span> {text.left_title_5[lang]}
        </h1>
        <p className="description">{text.left_desc[lang]}</p>
        <div className="features">
          <div className="feature-item">
            <MapPin className="icon" />
            <span>{text.left_feature_1[lang]}</span>
          </div>
          <div className="feature-item">
            <TrendingUp className="icon" />
            <span>{text.left_feature_2[lang]}</span>
          </div>
          <div className="feature-item">
            <Zap className="icon" />
            <span>{text.left_feature_3[lang]}</span>
          </div>
        </div>
      </div>
      <div className="bottom-map-image">
        <img src={carteFaded} alt="carte réseau" className="map-img" />
      </div>
    </div>
  );
}
