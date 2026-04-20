import './CreatePolicyModal.css';

interface CreatePolicyModalProps {
  onClose: () => void;
  onSelect: (type: 'enterprise' | 'inline') => void;
}

export default function CreatePolicyModal({ onClose, onSelect }: CreatePolicyModalProps) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        <h2 className="modal-title">What info do you want to protect?</h2>
        <p className="modal-description">
          Let us know what type of data you want your policy to cover, and we'll guide you through a tailored setup experience.{' '}
          <a href="#learn-options">Learn more about these options</a>
        </p>
        <div className="modal-cards">
          <button className="modal-card" onClick={() => onSelect('enterprise')}>
            <div className="modal-card-illustration">
              <svg width="120" height="80" viewBox="0 0 120 80" fill="none">
                <rect x="10" y="15" width="30" height="50" rx="3" fill="#d4e6f1" stroke="#5b9bd5" strokeWidth="1.5"/>
                <rect x="16" y="22" width="8" height="6" rx="1" fill="#5b9bd5"/>
                <rect x="26" y="22" width="8" height="6" rx="1" fill="#5b9bd5"/>
                <rect x="16" y="32" width="8" height="6" rx="1" fill="#5b9bd5"/>
                <rect x="26" y="32" width="8" height="6" rx="1" fill="#5b9bd5"/>
                <rect x="16" y="42" width="8" height="6" rx="1" fill="#5b9bd5"/>
                <rect x="26" y="42" width="8" height="6" rx="1" fill="#5b9bd5"/>
                <rect x="50" y="25" width="25" height="40" rx="3" fill="#e8d5e8" stroke="#9b59b6" strokeWidth="1.5"/>
                <rect x="55" y="30" width="15" height="10" rx="1" fill="#c39bd3"/>
                <rect x="55" y="44" width="15" height="4" rx="1" fill="#c39bd3"/>
                <rect x="55" y="52" width="15" height="4" rx="1" fill="#c39bd3"/>
                <rect x="82" y="20" width="28" height="35" rx="3" fill="#d5f5e3" stroke="#27ae60" strokeWidth="1.5"/>
                <circle cx="96" cy="30" r="6" fill="#82e0aa"/>
                <rect x="87" y="40" width="18" height="3" rx="1" fill="#82e0aa"/>
                <rect x="87" y="46" width="14" height="3" rx="1" fill="#82e0aa"/>
              </svg>
            </div>
            <h3 className="modal-card-title">Enterprise applications & devices</h3>
            <p className="modal-card-desc">
              Includes protection for data across all connected sources in your organization — including Microsoft
              365 locations, Microsoft Copilot experiences, data connectors, enterprise-registered apps, and managed
              apps accessed with the Edge for Business browser.
            </p>
          </button>
          <button className="modal-card" onClick={() => onSelect('inline')}>
            <div className="modal-card-illustration">
              <svg width="120" height="80" viewBox="0 0 120 80" fill="none">
                <rect x="15" y="10" width="50" height="35" rx="3" fill="#fdebd0" stroke="#e67e22" strokeWidth="1.5"/>
                <rect x="20" y="16" width="40" height="4" rx="1" fill="#f0b27a"/>
                <rect x="20" y="24" width="35" height="4" rx="1" fill="#f0b27a"/>
                <rect x="20" y="32" width="25" height="4" rx="1" fill="#f0b27a"/>
                <path d="M75 30 L95 20 L95 45 L75 35 Z" fill="#aed6f1" stroke="#2e86c1" strokeWidth="1.5"/>
                <rect x="85" y="45" width="25" height="25" rx="3" fill="#d4efdf" stroke="#27ae60" strokeWidth="1.5"/>
                <path d="M92 57 L97 62 L105 52" stroke="#27ae60" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                <circle cx="35" cy="65" r="10" fill="#e8daef" stroke="#8e44ad" strokeWidth="1.5"/>
                <rect x="31" y="61" width="8" height="8" rx="1" fill="#c39bd3"/>
              </svg>
            </div>
            <h3 className="modal-card-title">Inline web traffic</h3>
            <p className="modal-card-desc">
              Includes protection for data transferred in real-time
              with unmanaged cloud apps through the Edge for
              Business browser and network SASE/SSE integrations.
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
