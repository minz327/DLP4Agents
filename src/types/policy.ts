export interface DLPPolicy {
  name: string;
  description: string;
  template: PolicyTemplate | null;
  locations: PolicyLocation[];
  rules: PolicyRule[];
  notifications: NotificationSettings;
  mode: PolicyMode;
}

export type PolicyTemplate =
  | 'financial'
  | 'privacy'
  | 'health'
  | 'custom';

export interface PolicyLocation {
  id: string;
  name: string;
  type: 'exchange' | 'sharepoint' | 'onedrive' | 'teams' | 'devices';
  enabled: boolean;
}

export interface PolicyRule {
  id: string;
  name: string;
  sensitiveInfoTypes: SensitiveInfoType[];
  confidenceLevel: 'low' | 'medium' | 'high';
  instanceCount: number;
  action: RuleAction;
}

export interface SensitiveInfoType {
  id: string;
  name: string;
  category: string;
}

export interface RuleAction {
  blockAccess: boolean;
  notifyUser: boolean;
  requireOverride: boolean;
  generateAlert: boolean;
}

export interface NotificationSettings {
  notifyAdmin: boolean;
  notifyUser: boolean;
  adminEmail: string;
  customMessage: string;
}

export type PolicyMode = 'test' | 'test-with-tips' | 'enforce';

export const DEFAULT_LOCATIONS: PolicyLocation[] = [
  { id: 'exchange', name: 'Exchange email', type: 'exchange', enabled: false },
  { id: 'sharepoint', name: 'SharePoint sites', type: 'sharepoint', enabled: false },
  { id: 'onedrive', name: 'OneDrive accounts', type: 'onedrive', enabled: false },
  { id: 'teams', name: 'Teams chat and channel messages', type: 'teams', enabled: false },
  { id: 'devices', name: 'Devices', type: 'devices', enabled: false },
];

export const INITIAL_POLICY: DLPPolicy = {
  name: '',
  description: '',
  template: null,
  locations: DEFAULT_LOCATIONS,
  rules: [],
  notifications: {
    notifyAdmin: true,
    notifyUser: true,
    adminEmail: '',
    customMessage: '',
  },
  mode: 'test',
};
