import { usePolicy } from '../context/PolicyContext';
import { PolicyRule } from '../types/policy';

const SENSITIVE_INFO_TYPES = [
  { id: 'cc', name: 'Credit Card Number', category: 'Financial' },
  { id: 'ssn', name: 'Social Security Number', category: 'PII' },
  { id: 'passport', name: 'Passport Number', category: 'PII' },
  { id: 'bankacct', name: 'Bank Account Number', category: 'Financial' },
  { id: 'driverslicense', name: "Driver's License Number", category: 'PII' },
  { id: 'healthid', name: 'Health Insurance ID', category: 'Health' },
];

export default function DefineRules() {
  const { policy, updatePolicy } = usePolicy();

  const addRule = () => {
    const newRule: PolicyRule = {
      id: crypto.randomUUID(),
      name: `Rule ${policy.rules.length + 1}`,
      sensitiveInfoTypes: [],
      confidenceLevel: 'medium',
      instanceCount: 1,
      action: { blockAccess: false, notifyUser: true, requireOverride: false, generateAlert: true },
    };
    updatePolicy({ rules: [...policy.rules, newRule] });
  };

  const updateRule = (id: string, updates: Partial<PolicyRule>) => {
    const rules = policy.rules.map((r) => (r.id === id ? { ...r, ...updates } : r));
    updatePolicy({ rules });
  };

  const removeRule = (id: string) => {
    updatePolicy({ rules: policy.rules.filter((r) => r.id !== id) });
  };

  const toggleInfoType = (ruleId: string, infoTypeId: string) => {
    const rule = policy.rules.find((r) => r.id === ruleId);
    if (!rule) return;
    const has = rule.sensitiveInfoTypes.some((t) => t.id === infoTypeId);
    const sensitiveInfoTypes = has
      ? rule.sensitiveInfoTypes.filter((t) => t.id !== infoTypeId)
      : [...rule.sensitiveInfoTypes, SENSITIVE_INFO_TYPES.find((t) => t.id === infoTypeId)!];
    updateRule(ruleId, { sensitiveInfoTypes });
  };

  return (
    <div className="step-content">
      <h2>Define rules</h2>
      <p>Configure what content to detect and what action to take.</p>
      {policy.rules.map((rule) => (
        <div key={rule.id} className="rule-card">
          <div className="rule-header">
            <input
              value={rule.name}
              onChange={(e) => updateRule(rule.id, { name: e.target.value })}
            />
            <button className="btn-danger" onClick={() => removeRule(rule.id)}>Remove</button>
          </div>
          <div className="info-types">
            <strong>Sensitive info types:</strong>
            {SENSITIVE_INFO_TYPES.map((t) => (
              <label key={t.id}>
                <input
                  type="checkbox"
                  checked={rule.sensitiveInfoTypes.some((s) => s.id === t.id)}
                  onChange={() => toggleInfoType(rule.id, t.id)}
                />
                {t.name}
              </label>
            ))}
          </div>
          <label>
            Confidence level:
            <select
              value={rule.confidenceLevel}
              onChange={(e) => updateRule(rule.id, { confidenceLevel: e.target.value as PolicyRule['confidenceLevel'] })}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </label>
          <div className="actions-group">
            <label><input type="checkbox" checked={rule.action.blockAccess} onChange={(e) => updateRule(rule.id, { action: { ...rule.action, blockAccess: e.target.checked } })} /> Block access</label>
            <label><input type="checkbox" checked={rule.action.notifyUser} onChange={(e) => updateRule(rule.id, { action: { ...rule.action, notifyUser: e.target.checked } })} /> Notify user</label>
            <label><input type="checkbox" checked={rule.action.requireOverride} onChange={(e) => updateRule(rule.id, { action: { ...rule.action, requireOverride: e.target.checked } })} /> Require override</label>
            <label><input type="checkbox" checked={rule.action.generateAlert} onChange={(e) => updateRule(rule.id, { action: { ...rule.action, generateAlert: e.target.checked } })} /> Generate alert</label>
          </div>
        </div>
      ))}
      <button className="btn-primary" onClick={addRule}>+ Add rule</button>
    </div>
  );
}
