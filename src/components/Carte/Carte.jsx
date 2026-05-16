import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Search } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './Carte.css';
import t from '../../translations.json';
import { useLang } from '../../context/LanguageContext';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const createIcon = (color) => L.divIcon({
  className: '',
  html: `<div style="width:16px;height:16px;border-radius:50%;background:${color};border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.4);"></div>`,
  iconSize: [16, 16], iconAnchor: [8, 8],
});

const zones = [
  { nameKey: 'babEzzouar', signals: 218, bts: 'BTS-12', levelKey: 'critique', color: '#e63946', lat: 36.7193, lng: 3.1872 },
  { nameKey: 'elHarrach',  signals: 184, bts: 'BTS-15', levelKey: 'critique', color: '#e63946', lat: 36.7056, lng: 3.1342 },
  { nameKey: 'sidiMhamed', signals: 153, bts: 'BTS-09', levelKey: 'eleve',    color: '#f4a261', lat: 36.7425, lng: 3.0865 },
  { nameKey: 'darElBeida', signals: 128, bts: 'BTS-07', levelKey: 'eleve',    color: '#f4a261', lat: 36.7300, lng: 3.2150 },
  { nameKey: 'kouba',      signals: 77,  bts: 'BTS-02', levelKey: 'faible',   color: '#2d6a4f', lat: 36.7167, lng: 3.1000 },
];

const levelClass = { critique: 'badge-critique', eleve: 'badge-eleve', faible: 'badge-faible' };

export default function Carte() {
  const { lang } = useLang();
  const c = t.carte;
  const [search, setSearch] = useState('');

  const filtered = zones.filter(z =>
    c.levels[z.levelKey] && (
      (t.signalements.regions[z.nameKey]?.[lang] ?? z.nameKey)
        .toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="carte-page">
      <div className="carte-map">
        <MapContainer center={[36.7200, 3.1500]} zoom={12} style={{ width: '100%', height: '100%', borderRadius: 12 }}>
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          />
          {zones.map(z => (
            <Marker key={z.nameKey} position={[z.lat, z.lng]} icon={createIcon(z.color)}>
              <Popup>
                <strong>{t.signalements.regions[z.nameKey]?.[lang]}</strong><br />
                {z.signals} {c.criticalZones.signalements[lang]} · {z.bts}<br />
                <span style={{ color: z.color }}>{c.levels[z.levelKey][lang]}</span>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="carte-sidebar">
        <div className="carte-search-wrap">
          <Search size={14} color="#aaa" />
          <input className="carte-search" placeholder={c.searchPlaceholder[lang]} value={search} onChange={e => setSearch(e.target.value)} />
        </div>

        <div className="carte-panel">
          <h3 className="carte-panel-title">{c.criticalZones.title[lang]}</h3>
          <div className="carte-zones">
            {filtered.map(z => (
              <div key={z.nameKey} className="carte-zone-row">
                <div className="carte-zone-info">
                  <span className="carte-zone-name">{t.signalements.regions[z.nameKey]?.[lang]}</span>
                  <span className="carte-zone-sub">{z.signals} {c.criticalZones.signalements[lang]} · {z.bts}</span>
                </div>
                <span className={`carte-badge ${levelClass[z.levelKey]}`}>{c.levels[z.levelKey][lang]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="carte-panel">
          <h3 className="carte-panel-title">{c.criticityLevel.title[lang]}</h3>
          <div className="carte-legend">
            <div className="carte-legend-item">
              <span className="carte-dot" style={{ background: '#e63946' }} />
              <span>{c.criticityLevel.critique[lang]}</span>
            </div>
            <div className="carte-legend-item">
              <span className="carte-dot" style={{ background: '#f4a261' }} />
              <span>{c.criticityLevel.eleve[lang]}</span>
            </div>
            <div className="carte-legend-item">
              <span className="carte-dot" style={{ background: '#2d6a4f' }} />
              <span>{c.criticityLevel.faible[lang]}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}