import { usePolicy } from '../context/PolicyContext';
import type { PolicyTemplate } from '../types/policy';

const templates: { id: PolicyTemplate; name: string; description: string }[] = [
  { id: 'financial', name: 'Financial data', description: 'Detect credit card numbers, bank account info, and financial records.' },
  { id: 'privacy', name: 'Privacy', description: 'Detect personally identifiable information (PII) such as SSN, passport numbers.' },
  { id: 'health', name: 'Health', description: 'Detect health records and medical information (HIPAA).' },
  { id: 'custom', name: 'Custom policy', description: 'Build a policy from scratch with your own rules.' },
];

export default function ChooseTemplate() {
  const { policy, updatePolicy } = usePolicy();

  return (
    <div className="step-content">
      <h2>Choose a template</h2>
      <p>Start with a predefined template or create a custom policy.</p>
      <div className="template-grid">
        {templates.map((t) => (
          <button
            key={t.id}
            className={`template-card ${policy.template === t.id ? 'selected' : ''}`}
            onClick={() => updatePolicy({ template: t.id })}
          >
            <h3>{t.name}</h3>
            <p>{t.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
