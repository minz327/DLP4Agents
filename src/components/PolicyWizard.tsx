import { useState } from 'react';
import './PolicyWizard.css';

const STEPS = [
  { label: 'Data to protect', status: 'completed' as const },
  { label: 'Template or custom policy', status: 'current' as const },
  { label: 'Name', status: 'upcoming' as const },
  { label: 'Admin units', status: 'upcoming' as const },
  { label: 'Locations', status: 'upcoming' as const },
  { label: 'Policy settings', status: 'upcoming' as const },
  { label: 'Advanced DLP rules', status: 'upcoming' as const, indent: true },
  { label: 'Policy mode', status: 'upcoming' as const },
  { label: 'Finish', status: 'upcoming' as const },
];

const CATEGORIES = ['Enhanced', 'Financial', 'Medical and health', 'Privacy', 'Custom'];

interface Regulation {
  name: string;
  description: string;
}

const REGULATIONS: Record<string, Regulation[]> = {
  'Enhanced': [
    { name: 'Enhanced sensitive info', description: 'Detect enhanced sensitive information types across your organization.' },
  ],
  'Financial': [
    { name: 'U.S. Financial Data', description: 'Detect financial data such as credit card numbers, bank account numbers, and ABA routing numbers.' },
    { name: 'U.K. Financial Data', description: 'Detect U.K. financial data such as credit card and debit card numbers.' },
  ],
  'Medical and health': [
    { name: 'U.S. Health Insurance Act (HIPAA)', description: 'Detect health information subject to the Health Insurance Portability and Accountability Act (HIPAA).' },
  ],
  'Privacy': [
    { name: 'U.S. Personally Identifiable Information (PII)', description: 'Detect personally identifiable information (PII) such as Social Security numbers and passport numbers.' },
    { name: 'U.S. State Social Security Number', description: 'Detect U.S. state-issued Social Security numbers.' },
  ],
  'Custom': [
    { name: 'Custom policy', description: 'Create a custom policy from scratch. You will choose the type of content to protect and how you want to protect it.' },
  ],
};

interface PolicyWizardProps {
  onCancel: () => void;
}

interface RuleDefinition {
  id: number;
  name: string;
  status: 'On';
}

interface RuleGroup {
  id: number;
  conditions: string[];
}

export default function PolicyWizard({ onCancel }: PolicyWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All countries or regions');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedRegulation, setSelectedRegulation] = useState<string | null>(null);
  const [policyName, setPolicyName] = useState('Protect sensitive data used by agents and tools');
  const [policyDescription, setPolicyDescription] = useState('Create a custom policy from scratch. You will choose the type of content to protect and how you want to protect it.');
  const [selectedLocations, setSelectedLocations] = useState<Set<string>>(new Set());
  const [editingLocation, setEditingLocation] = useState<string | null>(null);
  const [agentCoverage, setAgentCoverage] = useState<'all' | 'categories' | 'specific'>('all');
  const [scopeView, setScopeView] = useState<'cards' | 'detail'>('cards');
  const [agentCategories, setAgentCategories] = useState({
    copilotStudio: false, foundry: false, nonMicrosoft: false, local: false,
  });
  const [localAgents, setLocalAgents] = useState({ githubCopilot: false, claudeCode: false });
  const [agentSearch, setAgentSearch] = useState('');
  const [selectedAgents, setSelectedAgents] = useState<Set<string>>(new Set());
  const [rules, setRules] = useState<RuleDefinition[]>([]);
  const [isCreatingRule, setIsCreatingRule] = useState(false);
  const [draftRuleName, setDraftRuleName] = useState('');
  const [draftRuleDescription, setDraftRuleDescription] = useState('');
  const [draftRuleGroups, setDraftRuleGroups] = useState<RuleGroup[]>([{ id: 1, conditions: [] }]);
  const [draftRuleActions, setDraftRuleActions] = useState<string[]>([]);
  const [incidentReportsEnabled, setIncidentReportsEnabled] = useState(true);
  const [incidentReportMode, setIncidentReportMode] = useState<'every' | 'threshold'>('every');
  const [incidentCountEnabled, setIncidentCountEnabled] = useState(false);
  const [incidentVolumeEnabled, setIncidentVolumeEnabled] = useState(false);

  const CONDITION_OPTIONS = [
    'Content contains sensitive info',
    'Content is shared externally',
    'Content contains trainable classifiers',
    'File properties match conditions',
  ];

  const ACTION_OPTIONS = [
    'Restrict access to content',
    'Send user notification',
    'Block activity',
    'Generate incident report',
  ];

  const SAMPLE_AGENTS = [
    { id: 'agent-001', name: 'Learning guide', color: '#0078d4', letter: 'L', publisher: 'Created by your org', platform: 'Microsoft Copilot Studio' },
    { id: 'agent-002', name: 'Support Help Desk', color: '#038387', letter: 'S', publisher: 'Created by user', platform: 'Microsoft Copilot Studio' },
    { id: 'agent-003', name: 'Researcher', color: '#107c10', letter: 'R', publisher: 'Microsoft', platform: '' },
    { id: 'agent-004', name: 'Zava support', color: '#e74c3c', letter: 'Z', publisher: 'Created by your org', platform: 'Azure AI Foundry' },
    { id: 'agent-005', name: 'Change Management Agent', color: '#0078d4', letter: 'C', publisher: 'Created by user', platform: 'Azure AI Foundry' },
    { id: 'agent-006', name: 'AI Buzz', color: '#8764b8', letter: 'A', publisher: 'Created by user', platform: 'SharePoint agent' },
    { id: 'agent-007', name: 'PerfSync', color: '#0078d4', letter: 'P', publisher: 'Created by user', platform: 'Microsoft Copilot Studio Lite' },
    { id: 'agent-008', name: 'Corp Travel Agent', color: '#038387', letter: 'C', publisher: 'Created by user', platform: 'SharePoint agent' },
    { id: 'agent-009', name: 'Comms agent', color: '#0078d4', letter: 'C', publisher: 'Created by your org', platform: 'Azure AI Foundry' },
    { id: 'agent-010', name: 'Metrics Hub', color: '#107c10', letter: 'M', publisher: 'Created by user', platform: 'SharePoint agent' },
    { id: 'agent-011', name: 'MarketPulse', color: '#e74c3c', letter: 'M', publisher: 'Created by your org', platform: 'Microsoft Copilot Studio' },
    { id: 'agent-012', name: 'Analyst IQ', color: '#605e5c', letter: 'A', publisher: 'Analyst IQ Inc.', platform: 'Microsoft Copilot Studio' },
    { id: 'agent-013', name: 'Quant Deck', color: '#0078d4', letter: 'Q', publisher: 'Created by user', platform: 'Azure AI Foundry' },
  ];
  const filteredAgents = SAMPLE_AGENTS.filter((a) =>
    a.name.toLowerCase().includes(agentSearch.toLowerCase()) || a.id.toLowerCase().includes(agentSearch.toLowerCase())
  );
  const toggleAgent = (id: string) => {
    setSelectedAgents((prev) => { const next = new Set(prev); if (next.has(id)) next.delete(id); else next.add(id); return next; });
  };

  const toggleLocation = (name: string) => {
    setSelectedLocations((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const LOCATIONS = [
    { color: '#0078d4', letter: 'E', name: 'Exchange email', scopeLabel: 'All users and groups' },
    { color: '#038387', letter: 'S', name: 'SharePoint sites', scopeLabel: 'All sites' },
    { color: '#0078d4', letter: 'O', name: 'OneDrive accounts', scopeLabel: 'All users and groups' },
    { color: '#6264a7', letter: 'T', name: 'Teams chat and channel messages', scopeLabel: 'All users and groups' },
    { color: '#0078d4', letter: 'D', name: 'Devices', scopeLabel: 'All devices' },
    { color: '#8764b8', letter: 'I', name: 'Instances', scopeLabel: 'All instances' },
    { color: '#0078d4', letter: 'R', name: 'On-premises repositories', scopeLabel: 'All repositories' },
    { color: '#0078d4', letter: 'A', name: 'Agents', scopeLabel: 'All agents' },
    { color: '#6264a7', letter: 'C', name: 'Microsoft 365 Copilot', scopeLabel: 'All Copilot interactions' },
  ];

  const getAgentsScopeLabel = () => {
    if (agentCoverage === 'all') return 'All agents';
    if (agentCoverage === 'categories') {
      const cats = [];
      if (agentCategories.copilotStudio) cats.push('Copilot Studio');
      if (agentCategories.foundry) cats.push('Foundry');
      if (agentCategories.nonMicrosoft) cats.push('Non-Microsoft');
      if (agentCategories.local) {
        const localSubs = [];
        if (localAgents.githubCopilot) localSubs.push('GitHub Copilot CLI');
        if (localAgents.claudeCode) localSubs.push('Claude Code');
        if (localSubs.length > 0) {
          cats.push(`Local agents - ${localSubs.join(', ')}`);
        } else {
          cats.push('Local agents');
        }
      }
      return cats.length > 0 ? cats.join(', ') : 'No categories selected';
    }
    if (agentCoverage === 'specific') {
      if (selectedAgents.size === 0) return 'No agents selected';
      const names = SAMPLE_AGENTS.filter((a) => selectedAgents.has(a.id)).map((a) => a.name);
      if (names.length <= 2) return names.join(', ');
      return `${names.length} agents selected`;
    }
    return 'All agents';
  };

  const steps = STEPS.map((step, i) => ({
    ...step,
    status: i < currentStep ? 'completed' as const : i === currentStep ? 'current' as const : 'upcoming' as const,
  }));

  const resetRuleDraft = () => {
    setDraftRuleName('');
    setDraftRuleDescription('');
    setDraftRuleGroups([{ id: 1, conditions: [] }]);
    setDraftRuleActions([]);
    setIncidentReportsEnabled(true);
    setIncidentReportMode('every');
    setIncidentCountEnabled(false);
    setIncidentVolumeEnabled(false);
  };

  const openRuleEditor = () => {
    resetRuleDraft();
    setIsCreatingRule(true);
  };

  const closeRuleEditor = () => {
    setIsCreatingRule(false);
    resetRuleDraft();
  };

  const addConditionToGroup = (groupId: number) => {
    setDraftRuleGroups((prev) =>
      prev.map((group) => {
        if (group.id !== groupId) {
          return group;
        }

        const nextCondition = CONDITION_OPTIONS[group.conditions.length % CONDITION_OPTIONS.length];
        return { ...group, conditions: [...group.conditions, nextCondition] };
      })
    );
  };

  const removeConditionFromGroup = (groupId: number, index: number) => {
    setDraftRuleGroups((prev) =>
      prev.map((group) => {
        if (group.id !== groupId) {
          return group;
        }

        return {
          ...group,
          conditions: group.conditions.filter((_, conditionIndex) => conditionIndex !== index),
        };
      })
    );
  };

  const addConditionGroup = () => {
    setDraftRuleGroups((prev) => [...prev, { id: Date.now(), conditions: [] }]);
  };

  const addRuleAction = () => {
    setDraftRuleActions((prev) => [...prev, ACTION_OPTIONS[prev.length % ACTION_OPTIONS.length]]);
  };

  const removeRuleAction = (index: number) => {
    setDraftRuleActions((prev) => prev.filter((_, actionIndex) => actionIndex !== index));
  };

  const saveRule = () => {
    const trimmedName = draftRuleName.trim();

    if (!trimmedName) {
      return;
    }

    setRules((prev) => [...prev, { id: Date.now(), name: trimmedName, status: 'On' }]);
    closeRuleEditor();
  };

  const handleBack = () => {
    if (currentStep === 6 && isCreatingRule) {
      closeRuleEditor();
      return;
    }

    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleNext = () => {
    if (currentStep === 6 && isCreatingRule) {
      return;
    }

    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  return (
    <div className="create-wizard">
      <div className="wizard-breadcrumb">
        <button className="breadcrumb-link" onClick={onCancel}>Data loss prevention</button>
        <span className="breadcrumb-sep">&gt;</span>
        <span className="breadcrumb-current">Create policy</span>
      </div>

      <div className="wizard-body">
        <aside className="wizard-stepper">
          {steps.map((step, i) => (
            <div key={step.label} className={`stepper-item ${'indent' in step && step.indent ? 'stepper-indent' : ''}`}>
              <div className={`stepper-dot ${step.status}`}>
                {step.status === 'completed' ? (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : null}
              </div>
              <span className={`stepper-label ${step.status}`}>{step.label}</span>
              {i < steps.length - 1 && <div className="stepper-line" />}
            </div>
          ))}
        </aside>

        <main className="wizard-main">
          {currentStep === 1 && (
            <div className="template-step">
              <h1 className="wizard-title">Start with a template or create a custom policy</h1>
              <p className="wizard-desc">
                Choose an industry regulation to see the DLP policy templates you can use to protect that info or create a custom policy start from scratch. If you need to protect labeled content, you'll be able to choose labels later.{' '}
                <a href="#learn-templates">Learn more about DLP policy templates</a>
              </p>

              <div className="wizard-info-banner">
                <span className="info-icon">ℹ️</span>
                <span>
                  <strong>Protect content in Microsoft 365 Copilot.</strong> You can now prevent Copilot from processing specific types of content (like files with sensitivity labels applied). To try it out, make sure you start with a custom policy below.{' '}
                  <a href="#learn-copilot">Learn more about protecting content in Copilot</a>
                </span>
              </div>

              <div className="template-filters">
                <div className="template-search">
                  <span className="search-icon-sm">🔍</span>
                  <input
                    type="text"
                    placeholder="Search for specific templates"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <select
                  className="region-select"
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                >
                  <option>All countries or regions</option>
                  <option>United States</option>
                  <option>European Union</option>
                  <option>United Kingdom</option>
                  <option>Australia</option>
                </select>
              </div>

              <div className="template-content">
                <div className="categories-panel">
                  <h3 className="categories-title">Categories</h3>
                  <ul className="categories-list">
                    {CATEGORIES.map((cat) => (
                      <li key={cat}>
                        <button
                          className={`category-item ${selectedCategory === cat ? 'active' : ''}`}
                          onClick={() => { setSelectedCategory(cat); setSelectedRegulation(null); }}
                        >
                          {cat}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="regulations-panel">
                  {selectedCategory && (
                    <>
                      <h3 className="regulations-title">Regulations</h3>
                      <ul className="regulations-list">
                        {(REGULATIONS[selectedCategory] || []).map((reg) => (
                          <li key={reg.name}>
                            <button
                              className={`regulation-item ${selectedRegulation === reg.name ? 'active' : ''}`}
                              onClick={() => setSelectedRegulation(reg.name)}
                            >
                              {reg.name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
                <div className="description-panel">
                  {selectedRegulation && selectedCategory && (
                    <>
                      <h3 className="description-title">{selectedRegulation}</h3>
                      <p className="description-text">
                        {REGULATIONS[selectedCategory]?.find((r) => r.name === selectedRegulation)?.description}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="name-step">
              <h1 className="wizard-title">Name your DLP policy</h1>
              <p className="wizard-desc">
                Create a DLP policy to detect sensitive data across locations and apply protection actions when the conditions match.
              </p>
              <div className="name-field">
                <label className="field-label">
                  Name <span className="required">*</span>
                  <span className="field-info" title="Policy name is required">&#9432;</span>
                </label>
                <input
                  type="text"
                  className="field-input"
                  value={policyName}
                  onChange={(e) => setPolicyName(e.target.value)}
                />
              </div>
              <div className="name-field">
                <label className="field-label">Description</label>
                <textarea
                  className="field-textarea"
                  value={policyDescription}
                  onChange={(e) => setPolicyDescription(e.target.value)}
                  rows={6}
                />
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="admin-units-step">
              <h1 className="wizard-title">Assign admin units</h1>
              <p className="wizard-desc">
                Choose the admin units you'd like to assign this policy to. Admin units are created in Microsoft Entra ID and restrict the policy to a specific set of users or groups. Your selections will affect the location options available to you in the next step.
              </p>
              <p className="wizard-desc">
                If you want to assign this policy to all users and groups, select 'Next' and proceed.{' '}
                <a href="#learn-admin-units">Learn more about admin units</a>
              </p>
              <div className="wizard-info-banner">
                <span className="info-icon">&#9432;</span>
                <span>
                  <strong>Admin units aren't supported for all locations.</strong> Admin units aren't applicable to some locations, such as Fabric and Microsoft 365 Copilot. As a result, if you select admin units here, you won't be able to scope this policy to those locations in the next step.
                </span>
              </div>
              <button className="add-admin-units-btn">+ Add or remove admin units</button>
              <div className="admin-units-summary">
                <h3 className="admin-units-summary-title">Admin units</h3>
                <p className="admin-units-summary-value">Full directory</p>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="locations-step">
              <h1 className="wizard-title">Choose where to apply the policy</h1>
              <p className="wizard-desc">
                We'll apply the policy to data that's stored in the locations you choose.
              </p>
              <div className="wizard-info-banner wizard-info-banner-blue">
                <span className="info-icon">&#9432;</span>
                <span>
                  If your role group permissions are restricted to a specific set of users or groups, you'll only be able to apply this policy to those users or groups.{' '}
                  <a href="#learn-role-group">Learn more about role group permissions.</a>
                </span>
                <button className="banner-btn">View role groups</button>
                <button className="banner-close" aria-label="Close">✕</button>
              </div>
              <div className="wizard-info-banner">
                <span className="info-icon">&#9432;</span>
                <span>
                  Protecting sensitive info in on-premises repositories (SharePoint sites and file shares) is now in Preview. Note that there are prerequisite steps needed to support this new capability.{' '}
                  <a href="#learn-prerequisites">Learn more about the prerequisites</a>
                </span>
              </div>
              <table className="locations-table">
                <thead>
                  <tr>
                    <th className="loc-col-check"></th>
                    <th className="loc-col-name">Location</th>
                    <th className="loc-col-scope">Scope</th>
                    <th className="loc-col-actions">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {LOCATIONS.map((loc) => {
                    const isSelected = selectedLocations.has(loc.name);
                    const hasAnySelection = selectedLocations.size > 0;
                    const isInactive = hasAnySelection && !isSelected;
                    return (
                      <tr
                        key={loc.name}
                        className={`loc-row-clickable ${isSelected ? 'loc-row-active' : isInactive ? 'loc-row-inactive' : ''}`}
                        onClick={() => toggleLocation(loc.name)}
                      >
                        <td className="loc-col-check">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleLocation(loc.name)}
                          />
                        </td>
                        <td className="loc-col-name">
                          <span className="loc-icon-box" style={{ background: loc.color }}>{loc.letter}</span>
                          {loc.name}
                        </td>
                        <td className="loc-col-scope">
                          {isSelected ? (loc.name === 'Agents' ? getAgentsScopeLabel() : loc.scopeLabel) : <span className="loc-scope-text">Turn on location to scope</span>}
                        </td>
                        <td className="loc-col-actions">
                          {isSelected && (
                            <button
                              className="loc-edit-btn"
                              onClick={(e) => { e.stopPropagation(); setEditingLocation(loc.name); }}
                            >Edit</button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {currentStep === 5 && (
            <div className="policy-settings-step">
              <h1 className="wizard-title">Define policy settings</h1>
              <p className="wizard-desc">
                Decide if you want to use the default settings from the template you selected to quickly set up a policy or configure custom rules to refine your policy further.
              </p>
              <div className="policy-settings-options">
                <label className="policy-settings-radio">
                  <input type="radio" name="policySettings" value="default" disabled />
                  <span className="policy-settings-label">
                    Review and customize default settings from the template.
                    <span className="field-info" title="Uses template defaults">&#9432;</span>
                  </span>
                </label>
                <label className="policy-settings-radio">
                  <input type="radio" name="policySettings" value="advanced" defaultChecked />
                  <span className="policy-settings-label">
                    Create or customize advanced DLP rules
                    <span className="field-info" title="Configure custom rules">&#9432;</span>
                  </span>
                </label>
              </div>
            </div>
          )}

          {currentStep === 6 && (
            <div className="advanced-rules-step">
              <h1 className="wizard-title">Customize advanced DLP rules</h1>
              <p className="wizard-desc">
                The rules here are made up of conditions and actions that define the protection requirements for this policy. You can edit existing rules or create new ones.
              </p>
              <button className="add-rule-btn" onClick={openRuleEditor}>+ Create rule</button>
              <div className="rules-list-empty">
                <div className="rules-list-header">
                  <span className="rules-item-count">{rules.length} item{rules.length === 1 ? '' : 's'}</span>
                </div>
                <table className="rules-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rules.length === 0 ? (
                      <tr>
                        <td colSpan={2} className="rules-empty-message">No rules created</td>
                      </tr>
                    ) : (
                      rules.map((rule) => (
                        <tr key={rule.id}>
                          <td className="rules-name-cell">{rule.name}</td>
                          <td>{rule.status}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {currentStep !== 1 && currentStep !== 2 && currentStep !== 3 && currentStep !== 4 && currentStep !== 5 && currentStep !== 6 && (
            <div className="step-placeholder">
              <h1 className="wizard-title">{steps[currentStep].label}</h1>
              <p className="wizard-desc">This step is under construction.</p>
            </div>
          )}
        </main>
      </div>

      <footer className="wizard-bottom-bar">
        <div className="wizard-bottom-left">
          <button className="btn-back" onClick={handleBack} disabled={currentStep === 0}>Back</button>
          <button className="btn-next" onClick={handleNext}>Next</button>
        </div>
        <button className="btn-cancel" onClick={onCancel}>Cancel</button>
      </footer>

      {editingLocation === 'Agents' && (
        <>
          <div className="scope-overlay" onClick={() => { setEditingLocation(null); setScopeView('cards'); }} />
          <div className="scope-panel">
            <div className="scope-panel-header">
              <h2 className="scope-panel-title">
                {scopeView === 'cards' && 'Choose agent coverage'}
                {scopeView === 'detail' && agentCoverage === 'categories' && 'Select agent categories'}
                {scopeView === 'detail' && agentCoverage === 'specific' && 'Add agents to the scope'}
              </h2>
              <button className="scope-panel-close" onClick={() => { setEditingLocation(null); setScopeView('cards'); }}>✕</button>
            </div>
            <div className="scope-panel-body">

              {/* Cards view */}
              {scopeView === 'cards' && (
                <>
                  <p className="scope-helper">Select how you want to scope this policy. You can change this later.</p>
                  <div className="scope-cards">
                    <label className={`scope-card ${agentCoverage === 'all' ? 'scope-card-selected' : ''}`} onClick={() => setAgentCoverage('all')}>
                      <input type="radio" name="coverage" className="scope-card-radio" checked={agentCoverage === 'all'} readOnly />
                      <div className="scope-card-content">
                        <strong>All agents</strong>
                        <p>Applies to every supported agent type (Microsoft, non-Microsoft, and local).</p>
                      </div>
                    </label>
                    <label className={`scope-card ${agentCoverage === 'categories' ? 'scope-card-selected' : ''}`} onClick={() => { setAgentCoverage('categories'); setScopeView('detail'); }}>
                      <input type="radio" name="coverage" className="scope-card-radio" checked={agentCoverage === 'categories'} readOnly />
                      <div className="scope-card-content">
                        <strong>Agent categories</strong>
                        <p>Choose one or more categories (Copilot Studio, Foundry, non-Microsoft, local).</p>
                      </div>
                    </label>
                    <label className={`scope-card ${agentCoverage === 'specific' ? 'scope-card-selected' : ''}`} onClick={() => { setAgentCoverage('specific'); setScopeView('detail'); }}>
                      <input type="radio" name="coverage" className="scope-card-radio" checked={agentCoverage === 'specific'} readOnly />
                      <div className="scope-card-content">
                        <strong>Specific agents</strong>
                        <p>Select individual agents by name or ID.</p>
                      </div>
                    </label>
                  </div>
                </>
              )}

              {/* Detail: Agent categories */}
              {scopeView === 'detail' && agentCoverage === 'categories' && (
                <>
                  <button className="scope-back-link" onClick={() => setScopeView('cards')}>← Back to coverage options</button>
                <div className="scope-categories">
                  <p className="scope-helper">Choose one or more categories.</p>
                  <label className="scope-checkbox-item">
                    <input type="checkbox" checked={agentCategories.copilotStudio} onChange={(e) => setAgentCategories({ ...agentCategories, copilotStudio: e.target.checked })} />
                    <span>Microsoft Copilot Studio agents</span>
                  </label>
                  <label className="scope-checkbox-item">
                    <input type="checkbox" checked={agentCategories.foundry} onChange={(e) => setAgentCategories({ ...agentCategories, foundry: e.target.checked })} />
                    <span>Microsoft Foundry agents</span>
                  </label>
                  <label className="scope-checkbox-item">
                    <input type="checkbox" checked={agentCategories.nonMicrosoft} onChange={(e) => setAgentCategories({ ...agentCategories, nonMicrosoft: e.target.checked })} />
                    <span>Non-Microsoft platform agents</span>
                  </label>
                  <label className="scope-checkbox-item">
                    <input type="checkbox" checked={agentCategories.local} onChange={(e) => setAgentCategories({ ...agentCategories, local: e.target.checked })} />
                    <span>Local agents (runs on user devices)</span>
                  </label>
                  {agentCategories.local && (
                    <div className="scope-sub-options">
                      <label className="scope-checkbox-item scope-sub-item">
                        <input type="checkbox" checked={localAgents.githubCopilot} onChange={(e) => setLocalAgents({ ...localAgents, githubCopilot: e.target.checked })} />
                        <span>GitHub Copilot CLI agents</span>
                      </label>
                      <label className="scope-checkbox-item scope-sub-item">
                        <input type="checkbox" checked={localAgents.claudeCode} onChange={(e) => setLocalAgents({ ...localAgents, claudeCode: e.target.checked })} />
                        <span>Claude Code agents</span>
                      </label>
                    </div>
                  )}
                </div>
                </>
              )}

              {/* Detail: Specific agents */}
              {scopeView === 'detail' && agentCoverage === 'specific' && (
                <>
                  <button className="scope-back-link" onClick={() => setScopeView('cards')}>← Back to coverage options</button>
                <div className="scope-specific">
                  <p className="scope-specific-desc">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.{' '}
                    <a href="#learn-more">Learn more</a>
                  </p>
                  <div className="scope-specific-search scope-specific-search-full">
                    <input type="text" placeholder="Search" value={agentSearch} onChange={(e) => setAgentSearch(e.target.value)} />
                    <span className="scope-search-icon-right">🔍</span>
                  </div>
                  <div className="scope-specific-toolbar">
                    <div className="scope-filter-pills">
                      <span className="scope-filter-pill">Publisher: Any</span>
                      <span className="scope-filter-pill">Platform: Any</span>
                    </div>
                    <span className="scope-agent-count">{filteredAgents.length} Agents</span>
                  </div>
                  <table className="scope-agents-table">
                    <thead>
                      <tr>
                        <th className="scope-th-check"><input type="checkbox" /></th>
                        <th>Agent name ↓</th>
                        <th>Publisher</th>
                        <th>Platform</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAgents.map((agent) => (
                        <tr
                          key={agent.id}
                          className={selectedAgents.has(agent.id) ? 'scope-agent-selected' : ''}
                          onClick={() => toggleAgent(agent.id)}
                          style={{ cursor: 'pointer' }}
                        >
                          <td><input type="checkbox" checked={selectedAgents.has(agent.id)} onChange={() => toggleAgent(agent.id)} /></td>
                          <td className="scope-agent-name-cell">
                            <span className="scope-agent-avatar" style={{ background: agent.color }}>{agent.letter}</span>
                            <span>{agent.name}</span>
                          </td>
                          <td className="scope-agent-publisher">{agent.publisher}</td>
                          <td className="scope-agent-platform">{agent.platform}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                </>
              )}
            </div>
            <div className="scope-panel-footer">
              <button className="btn-next" onClick={() => { setEditingLocation(null); setScopeView('cards'); }}>
                {agentCoverage === 'specific' && selectedAgents.size > 0 ? `Add (${selectedAgents.size})` : 'Done'}
              </button>
              <button className="btn-cancel" onClick={() => { setEditingLocation(null); setScopeView('cards'); }}>Cancel</button>
            </div>
          </div>
        </>
      )}

      {currentStep === 6 && isCreatingRule && (
        <>
          <div className="rule-flyout-overlay" onClick={closeRuleEditor} />
          <div className="rule-flyout-panel">
            <div className="rule-flyout-header">
              <h2 className="rule-flyout-title">Create rule</h2>
              <button className="rule-flyout-close" onClick={closeRuleEditor} aria-label="Close">✕</button>
            </div>

            <div className="rule-flyout-body">
              <div className="rule-editor-step">
                <p className="wizard-desc rule-flyout-desc">
                  Use rules to define the type of sensitive information you want to protect. If the content matches many rules, the most restrictive one will be enforced.{' '}
                  <a href="#learn-rules">Learn more about rules</a>
                </p>

                <div className="rule-editor-section rule-editor-section-first">
                  <div className="name-field">
                    <label className="field-label">
                      Name <span className="required">*</span>
                      <span className="field-info" title="Rule name is required">&#9432;</span>
                    </label>
                    <input
                      type="text"
                      className="field-input"
                      value={draftRuleName}
                      onChange={(e) => setDraftRuleName(e.target.value)}
                    />
                  </div>
                  <div className="name-field rule-editor-description-field">
                    <label className="field-label">Description</label>
                    <textarea
                      className="field-textarea"
                      rows={4}
                      value={draftRuleDescription}
                      onChange={(e) => setDraftRuleDescription(e.target.value)}
                    />
                  </div>
                </div>

                <section className="rule-editor-section">
                  <div className="rule-section-header-row">
                    <h2 className="rule-section-title">Conditions</h2>
                  </div>
                  <p className="rule-section-desc">Define the conditions that must be met for this policy to be applied. Include specific content, senders, and recipients that you want the rule to detect. For more complex rules, create groups to exclude or include items. <a href="#condition-builder">Learn how the condition builder works</a></p>
                  <div className="rule-link-row rule-link-row-tight">
                    <button className="rule-inline-link" onClick={() => addConditionToGroup(draftRuleGroups[0].id)}>+ Add condition</button>
                    <button className="rule-inline-link" onClick={addConditionGroup}>Add group</button>
                  </div>
                  {draftRuleGroups.some((group) => group.conditions.length > 0) && (
                    <div className="rule-groups-stack rule-groups-inline">
                      {draftRuleGroups.map((group, groupIndex) =>
                        group.conditions.length > 0 ? (
                          <div key={group.id} className="rule-group-card rule-group-card-compact">
                            <div className="rule-group-header">
                              <div>
                                <p className="rule-group-label">Group {groupIndex + 1}</p>
                              </div>
                            </div>
                            <div className="rule-chip-list">
                              {group.conditions.map((condition, conditionIndex) => (
                                <div key={`${group.id}-${condition}-${conditionIndex}`} className="rule-chip-row">
                                  <span className="rule-chip-label">{condition}</span>
                                  <button
                                    className="rule-chip-remove"
                                    onClick={() => removeConditionFromGroup(group.id, conditionIndex)}
                                    aria-label={`Remove ${condition}`}
                                  >
                                    ✕
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : null
                      )}
                    </div>
                  )}
                </section>

                <section className="rule-editor-section">
                  <div className="rule-section-header-row">
                    <h2 className="rule-section-title">Actions</h2>
                  </div>
                  <p className="rule-section-desc">Use actions to protect content when the conditions are met.</p>
                  <div className="rule-link-row rule-link-row-tight">
                    <button className="rule-inline-link" onClick={addRuleAction}>+ Add an action</button>
                  </div>
                  {draftRuleActions.length > 0 && (
                    <div className="rule-group-card rule-group-card-compact rule-group-card-actions">
                      <div className="rule-chip-list">
                        {draftRuleActions.map((action, actionIndex) => (
                          <div key={`${action}-${actionIndex}`} className="rule-chip-row">
                            <span className="rule-chip-label">{action}</span>
                            <button
                              className="rule-chip-remove"
                              onClick={() => removeRuleAction(actionIndex)}
                              aria-label={`Remove ${action}`}
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </section>

                <section className="rule-editor-section">
                  <div className="rule-section-header-row">
                    <h2 className="rule-section-title">Incident reports</h2>
                  </div>
                  <div className="incident-panel">
                    <div className="incident-row">
                      <span className="incident-label">Send an alert to admins when a rule match occurs.</span>
                      <button
                        className={`incident-toggle ${incidentReportsEnabled ? 'on' : ''}`}
                        onClick={() => setIncidentReportsEnabled((prev) => !prev)}
                        aria-pressed={incidentReportsEnabled}
                      >
                        <span className="incident-toggle-knob" />
                      </button>
                      <span className="incident-toggle-text">{incidentReportsEnabled ? 'On' : 'Off'}</span>
                    </div>

                    <div className="incident-subsection">
                      <p className="incident-subtitle">Send email alerts to these people (optional)</p>
                      <button className="rule-inline-link">+ Add or remove users</button>
                    </div>

                    <div className="incident-subsection">
                      <label className="incident-radio-row">
                        <input
                          type="radio"
                          name="incidentMode"
                          checked={incidentReportMode === 'every'}
                          onChange={() => setIncidentReportMode('every')}
                          disabled={!incidentReportsEnabled}
                        />
                        <span>Send alert every time an activity matches the rule</span>
                      </label>
                      <label className="incident-radio-row">
                        <input
                          type="radio"
                          name="incidentMode"
                          checked={incidentReportMode === 'threshold'}
                          onChange={() => setIncidentReportMode('threshold')}
                          disabled={!incidentReportsEnabled}
                        />
                        <span>Send alert when the volume of matched activities reaches a threshold</span>
                      </label>

                      <div className={`incident-threshold-block ${incidentReportMode !== 'threshold' || !incidentReportsEnabled ? 'disabled' : ''}`}>
                        <label className="incident-threshold-line">
                          <input
                            type="checkbox"
                            checked={incidentCountEnabled}
                            onChange={(e) => setIncidentCountEnabled(e.target.checked)}
                            disabled={!incidentReportsEnabled || incidentReportMode !== 'threshold'}
                          />
                          <span>Instances more than or equal to</span>
                          <input className="incident-mini-input" type="text" value="15" readOnly disabled={!incidentReportsEnabled || incidentReportMode !== 'threshold' || !incidentCountEnabled} />
                          <span>matched activities</span>
                        </label>
                        <label className="incident-threshold-line">
                          <input
                            type="checkbox"
                            checked={incidentVolumeEnabled}
                            onChange={(e) => setIncidentVolumeEnabled(e.target.checked)}
                            disabled={!incidentReportsEnabled || incidentReportMode !== 'threshold'}
                          />
                          <span>Volume more than or equal to</span>
                          <input className="incident-mini-input" type="text" value="0" readOnly disabled={!incidentReportsEnabled || incidentReportMode !== 'threshold' || !incidentVolumeEnabled} />
                          <span>MB</span>
                        </label>
                        <div className="incident-threshold-line incident-threshold-line-plain">
                          <span>During the last</span>
                          <input className="incident-mini-input" type="text" value="60" readOnly disabled={!incidentReportsEnabled || incidentReportMode !== 'threshold'} />
                          <span>minutes</span>
                        </div>
                        <div className="incident-threshold-line incident-threshold-line-plain">
                          <span>For <strong>All users</strong></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            <div className="rule-flyout-footer">
              <button className="btn-next" onClick={saveRule} disabled={!draftRuleName.trim()}>Save</button>
              <button className="btn-cancel" onClick={closeRuleEditor}>Cancel</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
