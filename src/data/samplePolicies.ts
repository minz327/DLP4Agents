export interface PolicyItem {
  id: string;
  name: string;
  priority: number;
  mode: 'On' | 'Off' | 'In simulation with notifications' | 'In simulation without notifications';
  syncStatus: 'Not available' | 'N/A' | 'Synced';
  lastModified: string;
}

export const SAMPLE_POLICIES: PolicyItem[] = [
  { id: '1', name: 'Default DLP policy - Protect sensitive M365 Copilot interactions', priority: 0, mode: 'On', syncStatus: 'Not available', lastModified: 'Apr 17, 2026 4:06 PM' },
  { id: '2', name: 'User Scope Test – SSN DLP', priority: 1, mode: 'In simulation with notifications', syncStatus: 'Not available', lastModified: 'Mar 24, 2026 5:48 PM' },
  { id: '3', name: 'SSN Prompt Protection Policy', priority: 2, mode: 'Off', syncStatus: 'Not available', lastModified: 'Apr 3, 2026 3:16 PM' },
  { id: '4', name: 'U.S. Financial Data', priority: 3, mode: 'In simulation with notifications', syncStatus: 'Not available', lastModified: 'Mar 24, 2026 5:47 PM' },
  { id: '5', name: 'GDPR Enhanced - agent only policy', priority: 4, mode: 'On', syncStatus: 'Not available', lastModified: 'Oct 30, 2025 3:44 PM' },
  { id: '6', name: 'DLP for teams', priority: 5, mode: 'On', syncStatus: 'Not available', lastModified: 'Nov 4, 2025 2:37 PM' },
  { id: '7', name: 'U.S. Financial Data - SPO, OD, EXO', priority: 6, mode: 'On', syncStatus: 'Not available', lastModified: 'Nov 5, 2025 11:29 AM' },
  { id: '8', name: 'U.S. Financial Data - devices', priority: 7, mode: 'On', syncStatus: 'Not available', lastModified: 'Nov 4, 2025 2:43 PM' },
  { id: '9', name: 'DLP for Copilot SITs', priority: 8, mode: 'In simulation with notifications', syncStatus: 'Not available', lastModified: 'Dec 1, 2025 1:44 PM' },
  { id: '10', name: 'Custom policy Dom copilot', priority: 9, mode: 'In simulation with notifications', syncStatus: 'Not available', lastModified: 'Dec 29, 2025 9:58 AM' },
  { id: '11', name: 'Dom Policy', priority: 10, mode: 'In simulation with notifications', syncStatus: 'Not available', lastModified: 'Dec 29, 2025 10:00 AM' },
  { id: '12', name: 'Test EXO policy', priority: 11, mode: 'In simulation with notifications', syncStatus: 'Not available', lastModified: 'Jan 6, 2026 12:19 PM' },
  { id: '13', name: 'DSPM for AI: Detect sensitive info added to AI sites', priority: 12, mode: 'On', syncStatus: 'Not available', lastModified: 'Jan 12, 2026 6:46 PM' },
  { id: '14', name: 'Custom policy -Exclude Confidential Data from Agent Processing', priority: 13, mode: 'On', syncStatus: 'Not available', lastModified: 'Jan 29, 2026 3:47 PM' },
  { id: '15', name: 'Prevent Confidential Data from processing by Agents', priority: 14, mode: 'On', syncStatus: 'Not available', lastModified: 'Mar 30, 2026 3:16 PM' },
  { id: '16', name: 'Block prompt in Agents', priority: 15, mode: 'Off', syncStatus: 'Not available', lastModified: 'Apr 3, 2026 3:17 PM' },
  { id: '17', name: 'Custom policy alksdlaksjd', priority: 16, mode: 'In simulation without notifications', syncStatus: 'N/A', lastModified: 'Feb 12, 2026 3:57 PM' },
  { id: '18', name: 'Trainable', priority: 17, mode: 'In simulation without notifications', syncStatus: 'N/A', lastModified: 'Feb 12, 2026 3:59 PM' },
  { id: '19', name: 'DLPCopilotPolicy', priority: 18, mode: 'On', syncStatus: 'Not available', lastModified: 'Feb 12, 2026 4:00 PM' },
  { id: '20', name: 'DLP Copilot CredScan', priority: 19, mode: 'On', syncStatus: 'Not available', lastModified: 'Feb 13, 2026 10:36 AM' },
  { id: '21', name: 'Test Procurement Agent Policy', priority: 20, mode: 'On', syncStatus: 'Not available', lastModified: 'Feb 18, 2026 6:57 AM' },
];
