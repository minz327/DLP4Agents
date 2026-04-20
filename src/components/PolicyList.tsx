import { useState } from 'react';
import { SAMPLE_POLICIES } from '../data/samplePolicies';
import type { PolicyItem } from '../data/samplePolicies';
import './PolicyList.css';

interface PolicyListProps {
  onCreatePolicy: () => void;
}

export default function PolicyList({ onCreatePolicy }: PolicyListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const filtered = SAMPLE_POLICIES.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === filtered.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filtered.map((p) => p.id)));
    }
  };

  const getModeClass = (mode: PolicyItem['mode']) => {
    if (mode === 'On') return 'mode-on';
    if (mode === 'Off') return 'mode-off';
    return 'mode-simulation';
  };

  const getSyncDot = (status: PolicyItem['syncStatus']) => {
    if (status === 'Not available') return 'sync-dot-red';
    if (status === 'N/A') return 'sync-dot-gray';
    return 'sync-dot-green';
  };

  return (
    <div className="policy-list-page">
      <div className="page-header">
        <h1>Policies</h1>
        <p className="page-description">
          Use data loss prevention (DLP) policies to help identify and protect your organization's sensitive info. For example you can set up policies to help make sure information in email and docs isn't shared with the wrong people.{' '}
          <a href="#learn">Learn more about DLP</a>
        </p>
      </div>

      <div className="info-banner info-banner-blue">
        <span className="banner-icon">ℹ️</span>
        <span>
          To help protect against potential data leaks, we will set up 5 default policies that prevent sensitive info from being shared outside your org. You can opt out of these policies within 30 days.{' '}
          <a href="#learn-default">Learn more about default DLP policies.</a>
        </span>
        <button className="banner-action">Opt out</button>
      </div>

      <div className="info-banner info-banner-yellow">
        <span className="banner-icon">⚠️</span>
        <span>
          Some data loss prevention policy features are pay-as-you-go. Your org will be charged based on usage.{' '}
          <a href="#billing">Learn more about pay-as-you-go billing</a>
        </span>
      </div>

      <div className="toolbar">
        <div className="toolbar-left">
          <button className="toolbar-btn toolbar-btn-primary" onClick={onCreatePolicy}>
            <span>+</span> Create policy
          </button>
          <button className="toolbar-btn">
            📤 Export policies <span className="dropdown-caret">▾</span>
          </button>
          <button className="toolbar-btn">🔄 Refresh</button>
          <button className="toolbar-btn">
            ✦ Copilot <span className="dropdown-caret">▾</span>
          </button>
        </div>
        <div className="toolbar-right">
          <span className="item-count">{filtered.length} items</span>
          <div className="toolbar-search">
            <span>🔍</span>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="toolbar-btn">⚙️ Customize columns</button>
        </div>
      </div>

      <div className="policy-table-wrapper">
        <table className="policy-table">
          <thead>
            <tr>
              <th className="col-checkbox">
                <input
                  type="checkbox"
                  checked={selectedIds.size === filtered.length && filtered.length > 0}
                  onChange={toggleSelectAll}
                />
              </th>
              <th className="col-name">Name <span className="sort-icon">▾</span></th>
              <th className="col-priority">Priority <span className="sort-icon">▾</span></th>
              <th className="col-mode">Mode <span className="sort-icon">▾</span></th>
              <th className="col-sync">Policy sync status (preview) <span className="sort-icon">▾</span></th>
              <th className="col-modified">Last modified <span className="sort-icon">▾</span></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((policy) => (
              <tr key={policy.id} className={selectedIds.has(policy.id) ? 'selected' : ''}>
                <td className="col-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedIds.has(policy.id)}
                    onChange={() => toggleSelect(policy.id)}
                  />
                </td>
                <td className="col-name">
                  <span className="policy-actions-btn" title="Actions">⋮</span>
                  <a href="#" className="policy-name-link">{policy.name}</a>
                </td>
                <td className="col-priority">{policy.priority}</td>
                <td className={`col-mode ${getModeClass(policy.mode)}`}>{policy.mode}</td>
                <td className="col-sync">
                  <span className={`sync-dot ${getSyncDot(policy.syncStatus)}`}></span>
                  {policy.syncStatus}
                </td>
                <td className="col-modified">{policy.lastModified}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
