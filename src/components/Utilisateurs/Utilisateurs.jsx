import { useState } from 'react';
import { Search, Eye, Ban, ChevronLeft, ChevronRight, Users, UserCheck, UserX, X } from 'lucide-react';
import './Utilisateurs.css';

const allData = [
  { msisdn: '213697******', date: '12/01/26', signalements: 3,  status: 'Actif' },
  { msisdn: '213697******', date: '10/01/26', signalements: 6,  status: 'Suspendu' },
  { msisdn: '213697******', date: '19/12/25', signalements: 10, status: 'Actif' },
  { msisdn: '213697******', date: '12/12/25', signalements: 9,  status: 'Actif' },
  { msisdn: '213697******', date: '9/12/25',  signalements: 5,  status: 'Suspendu' },
];

export default function Utilisateurs() {
  const [search, setSearch]             = useState('');
  const [filter, setFilter]             = useState('tous les utilisateurs');
  const [page, setPage]                 = useState(1);
  const [showModal, setShowModal]       = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [raison, setRaison]             = useState('');
  const [dateDebut, setDateDebut]       = useState('');
  const [dateFin, setDateFin]           = useState('');
  const totalPages = 40;

  const filtered = allData.filter(row => {
    const matchSearch = row.msisdn.includes(search);
    const matchFilter = filter === 'tous les utilisateurs' || row.status === filter;
    return matchSearch && matchFilter;
  });

  const openModal = (user) => {
    setSelectedUser(user);
    setRaison(''); setDateDebut(''); setDateFin('');
    setShowModal(true);
  };

  const closeModal = () => { setShowModal(false); setSelectedUser(null); };

  const handleEnregistrer = () => {
    console.log({ user: selectedUser, raison, dateDebut, dateFin });
    closeModal();
  };

  return (
    <div className="util-page">

      <div className="util-stats">
        <div className="util-stat-card">
          <div className="util-stat-icon" style={{ background: '#e8f5ee' }}>
            <Users size={22} color="#1b6b3a" />
          </div>
          <div>
            <p className="util-stat-label">Total utilisateurs</p>
            <p className="util-stat-value">5 631</p>
          </div>
        </div>
        <div className="util-stat-card">
          <div className="util-stat-icon" style={{ background: '#e8f5ee' }}>
            <UserCheck size={22} color="#1b6b3a" />
          </div>
          <div>
            <p className="util-stat-label">Utilisateurs actifs</p>
            <p className="util-stat-value">4 882</p>
          </div>
        </div>
        <div className="util-stat-card">
          <div className="util-stat-icon" style={{ background: '#fff0f0' }}>
            <UserX size={22} color="#e63946" />
          </div>
          <div>
            <p className="util-stat-label">Utilisateurs suspendus</p>
            <p className="util-stat-value">214</p>
          </div>
        </div>
      </div>

      <div className="util-table-card">
        <div className="util-topbar">
          <div className="util-search-wrap">
            <Search size={14} color="#aaa" />
            <input
              className="util-search"
              placeholder="Recherche par MSISDN..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <select className="util-select" value={filter} onChange={e => setFilter(e.target.value)}>
            <option>tous les utilisateurs</option>
            <option>Actif</option>
            <option>Suspendu</option>
          </select>
        </div>

        <table className="util-table">
          <thead>
            <tr>
              {['MSISDN', "Date d'inscription", 'Signalements', 'Status', 'Action'].map(h => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, i) => (
              <tr key={i}>
                <td>{row.msisdn}</td>
                <td>{row.date}</td>
                <td>{row.signalements}</td>
                <td>
                  <span className={`util-badge ${row.status === 'Actif' ? 'badge-actif' : 'badge-suspendu'}`}>
                    {row.status}
                  </span>
                </td>
                <td>
                  <div className="util-actions">
                    <button className="util-action-btn view"><Eye size={14} /></button>
                    <button className="util-action-btn ban" onClick={() => openModal(row)}>
                      <Ban size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="util-pagination">
          <button className="util-page-btn" onClick={() => setPage(p => Math.max(1, p - 1))}>
            <ChevronLeft size={14} />
          </button>
          {[1, 2, 3, 4].map(n => (
            <button key={n} className={`util-page-btn ${page === n ? 'active' : ''}`} onClick={() => setPage(n)}>{n}</button>
          ))}
          <span className="util-page-dots">...</span>
          <button className="util-page-btn" onClick={() => setPage(totalPages)}>{totalPages}</button>
          <button className="util-page-btn" onClick={() => setPage(p => Math.min(totalPages, p + 1))}>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Suspendre utilisateur</h3>
              <button className="modal-close" onClick={closeModal}><X size={18} /></button>
            </div>
            <div className="modal-body">
              <div className="modal-field">
                <label>Raison de suspension</label>
                <textarea
                  className="modal-textarea"
                  placeholder="Décrivez votre probleme ......"
                  value={raison}
                  onChange={e => setRaison(e.target.value)}
                />
              </div>
              <div className="modal-field">
                <label>Date de debut</label>
                <div className="modal-input-wrap">
                  <input type="date" className="modal-input" value={dateDebut} onChange={e => setDateDebut(e.target.value)} />
                </div>
              </div>
              <div className="modal-field">
                <label>Date de fin</label>
                <div className="modal-input-wrap">
                  <input type="date" className="modal-input" value={dateFin} onChange={e => setDateFin(e.target.value)} />
                </div>
              </div>
              <button className="modal-submit" onClick={handleEnregistrer}>Enregistrer</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}