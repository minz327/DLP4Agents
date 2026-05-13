export type ReportSeries = {
  label: string;
  values: number[];
  display: string[];
  wow: string;
  wo4w: string;
}

export type ReportRow = {
  id: string;
  stage: string;
  indent?: boolean;
  tenant?: ReportSeries;
  agent?: ReportSeries;
}

export type VisitTrendPoint = {
  date: string;
  inventory: number;
  details: number;
  investigation: number;
}

export const REPORT_WEEKS = ['3/13', '3/20', '3/27', '4/3', '4/10', '4/17']

export const REPORT_ROWS: ReportRow[] = [
  {
    id: 'ms-frontier-tenants',
    stage: 'MS Frontier tenants',
    tenant: {
      label: 'Tenant funnel',
      values: [30.2, 31.5, 32.9, 34.2, 39.2, 42.2],
      display: ['30.2K', '31.5K', '32.9K', '34.2K', '39.2K', '42.2K'],
      wow: '7.7%',
      wo4w: '34.0%',
    },
  },
  {
    id: 'agent-365-frontier-tenants',
    stage: 'Agent 365 Frontier tenants',
    tenant: {
      label: 'Tenant funnel',
      values: [5.4, 5.58, 5.77, 5.97, 6.58, 7.11],
      display: ['5.40K', '5.58K', '5.77K', '5.97K', '6.58K', '7.11K'],
      wow: '8.1%',
      wo4w: '27.4%',
    },
  },
  {
    id: 'active-tenants-agents',
    stage: 'Active Tenants/Agents',
    tenant: {
      label: 'Tenant funnel',
      values: [3.72, 3.8, 3.88, 3.97, 4.06, 4.16],
      display: ['3.72K', '3.80K', '3.88K', '3.97K', '4.06K', '4.16K'],
      wow: '2.3%',
      wo4w: '9.5%',
    },
    agent: {
      label: 'Agent funnel',
      values: [167.2, 178.2, 188.8, 205.5, 205.5, 223.7],
      display: ['167.2K', '178.2K', '188.8K', '205.5K', '205.5K', '223.7K'],
      wow: '8.9%',
      wo4w: '33.7%',
    },
  },
  {
    id: 'monthly-protected-tenants',
    stage: 'Monthly Protected Tenants',
    tenant: {
      label: 'Tenant funnel',
      values: [1454, 1531, 1602, 1680, 1762, 1848],
      display: ['1,454', '1,531', '1,602', '1,680', '1,762', '1,848'],
      wow: '4.9%',
      wo4w: '20.7%',
    },
    agent: {
      label: 'Agent funnel',
      values: [143.6, 152.7, 171.7, 193.2, 193.2, 217.4],
      display: ['143.6K', '152.7K', '171.7K', '193.2K', '193.2K', '217.4K'],
      wow: '12.5%',
      wo4w: '51.4%',
    },
  },
  {
    id: 'dlp',
    stage: 'Data Loss Prevention',
    indent: true,
    tenant: {
      label: 'Tenant funnel',
      values: [621, 647, 673, 698, 724, 751],
      display: ['621', '647', '673', '698', '724', '751'],
      wow: '3.7%',
      wo4w: '16.1%',
    },
    agent: {
      label: 'Agent funnel',
      values: [72.7, 77, 85, 94.5, 94.5, 105.1],
      display: ['72.7K', '77.0K', '85.0K', '94.5K', '94.5K', '105.1K'],
      wow: '11.2%',
      wo4w: '44.6%',
    },
  },
  {
    id: 'agent-risk',
    stage: 'Agent Risk',
    indent: true,
    tenant: {
      label: 'Tenant funnel',
      values: [383, 396, 409, 421, 433, 446],
      display: ['383', '396', '409', '421', '433', '446'],
      wow: '3.0%',
      wo4w: '12.6%',
    },
    agent: {
      label: 'Agent funnel',
      values: [39.4, 42, 46.9, 52.7, 52.7, 59.2],
      display: ['39.4K', '42.0K', '46.9K', '52.7K', '52.7K', '59.2K'],
      wow: '12.4%',
      wo4w: '50.3%',
    },
  },
  {
    id: 'agent-safety',
    stage: 'Agent Safety (CC)',
    indent: true,
    tenant: {
      label: 'Tenant funnel',
      values: [133, 139, 145, 150, 155, 160],
      display: ['133', '139', '145', '150', '155', '160'],
      wow: '3.3%',
      wo4w: '15.1%',
    },
    agent: {
      label: 'Agent funnel',
      values: [12.1, 12.9, 14.5, 16.3, 16.3, 18.3],
      display: ['12.1K', '12.9K', '14.5K', '16.3K', '16.3K', '18.3K'],
      wow: '12.4%',
      wo4w: '51.2%',
    },
  },
  {
    id: 'data-lifecycle',
    stage: 'Data Lifecycle Mgmt',
    indent: true,
    tenant: {
      label: 'Tenant funnel',
      values: [120, 124, 128, 132, 136, 140],
      display: ['120', '124', '128', '132', '136', '140'],
      wow: '3.1%',
      wo4w: '12.9%',
    },
    agent: {
      label: 'Agent funnel',
      values: [15, 15.7, 17.5, 19.7, 19.7, 22.2],
      display: ['15.0K', '15.7K', '17.5K', '19.7K', '19.7K', '22.2K'],
      wow: '12.6%',
      wo4w: '48.0%',
    },
  },
  {
    id: 'information-protection',
    stage: 'Information Protection',
    indent: true,
    tenant: {
      label: 'Tenant funnel',
      values: [423, 436, 449, 461, 473, 486],
      display: ['423', '436', '449', '461', '473', '486'],
      wow: '2.7%',
      wo4w: '11.5%',
    },
    agent: {
      label: 'Agent funnel',
      values: [24.5, 25.3, 28.4, 31.9, 31.9, 35.8],
      display: ['24.5K', '25.3K', '28.4K', '31.9K', '31.9K', '35.8K'],
      wow: '12.3%',
      wo4w: '46.1%',
    },
  },
  {
    id: 'ediscovery',
    stage: 'eDiscovery',
    indent: true,
    tenant: {
      label: 'Tenant funnel',
      values: [435, 449, 463, 476, 489, 503],
      display: ['435', '449', '463', '476', '489', '503'],
      wow: '2.8%',
      wo4w: '12.0%',
    },
    agent: {
      label: 'Agent funnel',
      values: [24.3, 25.1, 28.2, 31.7, 31.7, 35.6],
      display: ['24.3K', '25.1K', '28.2K', '31.7K', '31.7K', '35.6K'],
      wow: '12.4%',
      wo4w: '46.5%',
    },
  },
  {
    id: 'dso',
    stage: 'Data Security Observability',
    tenant: {
      label: 'Tenant funnel',
      values: [687, 740, 790, 840, 892, 947],
      display: ['687', '740', '790', '840', '892', '947'],
      wow: '6.2%',
      wo4w: '28.0%',
    },
    agent: {
      label: 'Agent funnel',
      values: [47.2, 51.1, 57.4, 64.5, 64.5, 72.5],
      display: ['47.2K', '51.1K', '57.4K', '64.5K', '64.5K', '72.5K'],
      wow: '12.4%',
      wo4w: '53.6%',
    },
  },
  {
    id: 'details-viewed',
    stage: 'Agent details viewed',
    indent: true,
    tenant: {
      label: 'Tenant funnel',
      values: [277, 298, 318, 338, 359, 381],
      display: ['277', '298', '318', '338', '359', '381'],
      wow: '6.1%',
      wo4w: '27.9%',
    },
    agent: {
      label: 'Agent funnel',
      values: [519, 561, 631, 709, 709, 797],
      display: ['519', '561', '631', '709', '709', '797'],
      wow: '12.4%',
      wo4w: '53.6%',
    },
  },
  {
    id: 'activities-investigated',
    stage: 'Agent activities investigated',
    indent: true,
    tenant: {
      label: 'Tenant funnel',
      values: [82, 88, 94, 99, 104, 110],
      display: ['82', '88', '94', '99', '104', '110'],
      wow: '5.3%',
      wo4w: '25.0%',
    },
    agent: {
      label: 'Agent funnel',
      values: [116, 129, 145, 163, 163, 183],
      display: ['116', '129', '145', '163', '163', '183'],
      wow: '12.3%',
      wo4w: '57.8%',
    },
  },
]

export const VISIT_TREND_DATA: VisitTrendPoint[] = [
  { date: '3/22/2026', inventory: 65, details: 25, investigation: 6 },
  { date: '3/23/2026', inventory: 524, details: 193, investigation: 48 },
  { date: '3/24/2026', inventory: 574, details: 193, investigation: 36 },
  { date: '3/25/2026', inventory: 600, details: 208, investigation: 50 },
  { date: '3/26/2026', inventory: 575, details: 207, investigation: 63 },
  { date: '3/27/2026', inventory: 474, details: 169, investigation: 39 },
  { date: '3/28/2026', inventory: 44, details: 12, investigation: 3 },
  { date: '3/29/2026', inventory: 45, details: 11, investigation: 1 },
  { date: '3/30/2026', inventory: 501, details: 149, investigation: 43 },
  { date: '3/31/2026', inventory: 512, details: 182, investigation: 42 },
  { date: '4/1/2026', inventory: 517, details: 149, investigation: 43 },
  { date: '4/2/2026', inventory: 512, details: 173, investigation: 37 },
  { date: '4/3/2026', inventory: 228, details: 69, investigation: 23 },
  { date: '4/4/2026', inventory: 57, details: 25, investigation: 7 },
  { date: '4/5/2026', inventory: 46, details: 15, investigation: 1 },
  { date: '4/6/2026', inventory: 313, details: 98, investigation: 26 },
  { date: '4/7/2026', inventory: 529, details: 164, investigation: 37 },
  { date: '4/8/2026', inventory: 475, details: 154, investigation: 41 },
  { date: '4/9/2026', inventory: 517, details: 167, investigation: 50 },
  { date: '4/10/2026', inventory: 413, details: 142, investigation: 42 },
  { date: '4/11/2026', inventory: 57, details: 20, investigation: 2 },
  { date: '4/12/2026', inventory: 81, details: 28, investigation: 9 },
  { date: '4/13/2026', inventory: 416, details: 127, investigation: 25 },
  { date: '4/14/2026', inventory: 532, details: 159, investigation: 30 },
  { date: '4/15/2026', inventory: 671, details: 199, investigation: 34 },
  { date: '4/16/2026', inventory: 714, details: 205, investigation: 49 },
  { date: '4/17/2026', inventory: 509, details: 154, investigation: 34 },
]