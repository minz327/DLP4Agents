import { usePolicy } from '../context/PolicyContext';

export default function ConfigureNotifications() {
  const { policy, updatePolicy } = usePolicy();
  const { notifications } = policy;

  const update = (updates: Partial<typeof notifications>) => {
    updatePolicy({ notifications: { ...notifications, ...updates } });
  };

  return (
    <div className="step-content">
      <h2>Configure notifications</h2>
      <label>
        <input type="checkbox" checked={notifications.notifyAdmin} onChange={(e) => update({ notifyAdmin: e.target.checked })} />
        Notify admins when a policy match occurs
      </label>
      {notifications.notifyAdmin && (
        <label>
          Admin email
          <input type="email" value={notifications.adminEmail} onChange={(e) => update({ adminEmail: e.target.value })} placeholder="admin@contoso.com" />
        </label>
      )}
      <label>
        <input type="checkbox" checked={notifications.notifyUser} onChange={(e) => update({ notifyUser: e.target.checked })} />
        Show policy tips to users
      </label>
      <label>
        Custom notification message
        <textarea value={notifications.customMessage} onChange={(e) => update({ customMessage: e.target.value })} rows={3} placeholder="This content may contain sensitive information..." />
      </label>
    </div>
  );
}
