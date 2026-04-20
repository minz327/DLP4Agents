import { usePolicy } from '../context/PolicyContext';
import type { PolicyMode } from '../types/policy';

const modes: { id: PolicyMode; name: string; description: string }[] = [
  { id: 'test', name: 'Test it out first', description: 'Run the policy in test mode without showing policy tips.' },
  { id: 'test-with-tips', name: 'Test with policy tips', description: 'Run in test mode but show policy tips to users.' },
  { id: 'enforce', name: 'Turn it on right away', description: 'Enforce the policy immediately.' },
];

export default function ReviewAndCreate() {
  const { policy, updatePolicy } = usePolicy();

  return (
    <div className="step-content">
      <h2>Review and create</h2>

      <div className="review-section">
        <h3>Policy summary</h3>
        <dl>
          <dt>Name</dt><dd>{policy.name || '(not set)'}</dd>
          <dt>Template</dt><dd>{policy.template || '(none)'}</dd>
          <dt>Locations</dt><dd>{policy.locations.filter((l) => l.enabled).map((l) => l.name).join(', ') || '(none)'}</dd>
          <dt>Rules</dt><dd>{policy.rules.length} rule(s)</dd>
        </dl>
      </div>

      <div className="review-section">
        <h3>Policy mode</h3>
        {modes.map((m) => (
          <label key={m.id} className="mode-option">
            <input type="radio" name="mode" checked={policy.mode === m.id} onChange={() => updatePolicy({ mode: m.id })} />
            <div>
              <strong>{m.name}</strong>
              <p>{m.description}</p>
            </div>
          </label>
        ))}
      </div>

      <button className="btn-primary btn-create" onClick={() => alert('Policy created! (mock)')}>
        Create policy
      </button>
    </div>
  );
}
