import './Sidebar.css';

const ICON_NAV = [
  { icon: '\u2302', label: 'Home', active: false },
  { icon: '\u229E', label: 'Solutions', active: false },
  { icon: '\u27E8/\u27E9', label: 'Agents', active: false },
  { icon: '\u25A1', label: 'Learn', active: false },
  { icon: '\u25A6', label: 'Usage center\n(preview)', active: false },
  { icon: '\u2699', label: 'Settings', active: false },
  { icon: '\u2B1A', label: 'DSPM', active: false },
  { icon: '\u2263', label: 'Audit', active: false },
  { icon: '\u26E8', label: 'Data Loss\nPrevention', active: true },
];

const DLP_NAV = [
  { icon: '\u2B1C', label: 'Overview', active: false },
  { icon: '\u2261', label: 'Policies', active: true },
  { icon: '\u2606', label: 'Recommendations', active: false },
  { icon: '\u26A0', label: 'Alerts', active: false },
  { icon: '\u2696', label: 'Classifiers', active: false, expandable: true },
  { icon: '\u0398', label: 'Explorers', active: false, expandable: true },
  { icon: '\u2042', label: 'Diagnostics', active: false },
  { icon: '\u25A3', label: 'Posture reports', active: false },
  { icon: '\u229E', label: 'Security Store', active: false },
];

const RELATED = [
  { icon: '\u2637', label: 'Data Security\nInvestigations' },
  { icon: '\u26BF', label: 'Information Protection' },
  { icon: '\u2623', label: 'Insider Risk Management' },
];

export default function Sidebar() {
  return (
    <div className="sidebar-wrapper">
      <nav className="icon-strip">
        {ICON_NAV.map((item) => (
          <button
            key={item.label}
            className={`icon-strip-btn ${item.active ? 'active' : ''}`}
            title={item.label.replace('\n', ' ')}
          >
            <span className="icon-strip-icon">{item.icon}</span>
            <span className="icon-strip-label">{item.label}</span>
          </button>
        ))}
      </nav>
      <aside className="sidebar-panel">
        <div className="sidebar-panel-top">
          <button className="sidebar-collapse-btn" aria-label="Collapse">{'\u2261'}</button>
        </div>
        <div className="sidebar-header">
          <svg className="sidebar-header-icon" width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="4" fill="#0078d4"/>
            <text x="16" y="22" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">{'\u26E8'}</text>
          </svg>
          <span className="sidebar-header-text">Data Loss<br/>Prevention</span>
        </div>
        <nav className="sidebar-nav">
          {DLP_NAV.map((item) => (
            <button
              key={item.label}
              className={`sidebar-nav-item ${item.active ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
              {item.expandable && <span className="nav-chevron">{'\u2304'}</span>}
            </button>
          ))}
        </nav>
        <div className="sidebar-related">
          <span className="related-title">Related solutions</span>
          {RELATED.map((item) => (
            <button key={item.label} className="sidebar-nav-item related-item">
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </div>
      </aside>
    </div>
  );
}
