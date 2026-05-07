import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Search } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './Carte.css';


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const createIcon = (color) => L.divIcon({
  className: '',
  html: `<div style="
    width:16px;height:16px;border-radius:50%;
    background:${color};border:2px solid white;
    box-shadow:0 2px 6px rgba(0,0,0,0.4);
  "></div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

const zones = [
  { name: 'Bab Ezzouar',  signals: 218, bts: 'BTS-12', level: 'Critique', color: '#e63946', lat: 36.7193, lng: 3.1872 },
  { name: 'El Harrach',   signals: 184, bts: 'BTS-15', level: 'Critique', color: '#e63946', lat: 36.7056, lng: 3.1342 },
  { name: "Sidi M'Hamed", signals: 153, bts: 'BTS-09', level: 'Élevé',    color: '#f4a261', lat: 36.7425, lng: 3.0865 },
  { name: 'Dar El Beïda', signals: 128, bts: 'BTS-07', level: 'Élevé',    color: '#f4a261', lat: 36.7300, lng: 3.2150 },
  { name: 'Kouba',        signals: 77,  bts: 'BTS-02', level: 'Faible',   color: '#2d6a4f', lat: 36.7167, lng: 3.1000 },
];

const levelClass = {
  'Critique': 'badge-critique',
  'Élevé':    'badge-eleve',
  'Faible':   'badge-faible',
};

export default function Carte() {
  const [search, setSearch] = useState('');

  const filtered = zones.filter(z =>
    z.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="carte-page">

      
      <div className="carte-map">
        <MapContainer
          center={[36.7200, 3.1500]}
          zoom={12}
          style={{ width: '100%', height: '100%', borderRadius: 12 }}
          zoomControl={true}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />
          {zones.map(z => (
            <Marker
              key={z.name}
              position={[z.lat, z.lng]}
              icon={createIcon(z.color)}
            >
              <Popup>
                <strong>{z.name}</strong><br />
                {z.signals} signalements · {z.bts}<br />
                <span style={{ color: z.color }}>{z.level}</span>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      
      <div className="carte-sidebar">

        
        <div className="carte-search-wrap">
          <Search size={14} color="#aaa" />
          <input
            className="carte-search"
            placeholder="Recherche..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

     
        <div className="carte-panel">
          <h3 className="carte-panel-title">Zones critiques</h3>
          <div className="carte-zones">
            {filtered.map(z => (
              <div key={z.name} className="carte-zone-row">
                <div className="carte-zone-info">
                  <span className="carte-zone-name">{z.name}</span>
                  <span className="carte-zone-sub">{z.signals} signalements · {z.bts}</span>
                </div>
                <span className={`carte-badge ${levelClass[z.level]}`}>{z.level}</span>
              </div>
            ))}
          </div>
        </div>

       
        <div className="carte-panel">
          <h3 className="carte-panel-title">Niveau de criticité</h3>
          <div className="carte-legend">
            <div className="carte-legend-item">
              <span className="carte-dot" style={{ background: '#e63946' }} />
              <span>Critique (+80 signalements)</span>
            </div>
            <div className="carte-legend-item">
              <span className="carte-dot" style={{ background: '#f4a261' }} />
              <span>Élevé 40–80</span>
            </div>
            <div className="carte-legend-item">
              <span className="carte-dot" style={{ background: '#2d6a4f' }} />
              <span>Faible &lt;40</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}