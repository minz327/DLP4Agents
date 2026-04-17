import { usePolicy } from '../context/PolicyContext';

export default function ChooseLocations() {
  const { policy, updatePolicy } = usePolicy();

  const toggleLocation = (id: string) => {
    const locations = policy.locations.map((loc) =>
      loc.id === id ? { ...loc, enabled: !loc.enabled } : loc
    );
    updatePolicy({ locations });
  };

  return (
    <div className="step-content">
      <h2>Choose locations</h2>
      <p>Select where you want to apply this policy.</p>
      <div className="location-list">
        {policy.locations.map((loc) => (
          <label key={loc.id} className="location-item">
            <input
              type="checkbox"
              checked={loc.enabled}
              onChange={() => toggleLocation(loc.id)}
            />
            <span>{loc.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
