import { usePolicy } from '../context/PolicyContext';

export default function NamePolicy() {
  const { policy, updatePolicy } = usePolicy();

  return (
    <div className="step-content">
      <h2>Name your policy</h2>
      <label>
        Policy name
        <input
          type="text"
          value={policy.name}
          onChange={(e) => updatePolicy({ name: e.target.value })}
          placeholder="e.g., Financial Data Protection"
        />
      </label>
      <label>
        Description (optional)
        <textarea
          value={policy.description}
          onChange={(e) => updatePolicy({ description: e.target.value })}
          placeholder="Describe what this policy protects..."
          rows={3}
        />
      </label>
    </div>
  );
}
