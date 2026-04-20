import './TopBar.css';

export default function TopBar() {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="topbar-hamburger" aria-label="Menu">☰</button>
        <span className="topbar-brand">Microsoft Purview</span>
      </div>
      <div className="topbar-center">
        <div className="topbar-search">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search for solutions, users, articles, and more"
            className="search-input"
          />
        </div>
      </div>
      <div className="topbar-right">
        <button className="topbar-copilot-btn">
          <span className="copilot-icon">✦</span> Copilot
        </button>
        <button className="topbar-icon-btn" aria-label="Notifications">🔔</button>
        <button className="topbar-icon-btn" aria-label="Settings">⚙️</button>
        <button className="topbar-icon-btn" aria-label="Help">❓</button>
        <div className="topbar-avatar">MZ</div>
      </div>
    </header>
  );
}
