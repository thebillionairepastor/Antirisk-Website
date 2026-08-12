export interface SecurityTip {
  id: string;
  code: string;
  category: string;
  title: string;
  tip: string;
  actionable: string;
  severity: 'normal' | 'high' | 'critical';
  tags: string[];
}

export const securityTipsDatabase: SecurityTip[] = [
  {
    id: 'tip-01',
    code: 'SEC-TIP-101',
    category: 'Perimeter Defense',
    title: 'Maintain Clear Line-of-Sight',
    tip: 'Ensure overhanging foliage and untrimmed shrubbery near estate gates or perimeter walls do not obstruct CCTV cameras or guard sentry sightlines.',
    actionable: 'Trim all vegetation within 1.5 meters of perimeter fences to eliminate intruder blind spots.',
    severity: 'normal',
    tags: ['Perimeter', 'Estate', 'CCTV']
  },
  {
    id: 'tip-02',
    code: 'SEC-TIP-102',
    category: 'Corporate Access',
    title: 'Eliminate Tailgating at Turnstiles',
    tip: 'Unverified visitors following staff through access barriers present a primary breach vector in commercial facilities.',
    actionable: 'Require all personnel to swipe individually and train reception guards to challenge unbadged followers.',
    severity: 'high',
    tags: ['Corporate', 'Access Control', 'Visitor']
  },
  {
    id: 'tip-03',
    code: 'SEC-TIP-103',
    category: 'Executive Travel',
    title: 'Vary Daily Commute Routes',
    tip: 'Predictable travel schedules and static driving routes increase vulnerability during executive transit across metropolitan corridors.',
    actionable: 'Alternate departure times and utilize secondary verified routes at least twice per week.',
    severity: 'high',
    tags: ['Executive', 'Escort', 'Transit']
  },
  {
    id: 'tip-04',
    code: 'SEC-TIP-104',
    category: 'Residential Estate',
    title: 'Verify Visitor Pre-Clearance Codes',
    tip: 'Estate security gates should enforce digital one-time access passes (OTPs) generated directly by residents before opening visitor gates.',
    actionable: 'Never allow gate pass bypasses without direct resident phone authorization.',
    severity: 'normal',
    tags: ['Residential', 'Gates', 'Authentication']
  },
  {
    id: 'tip-05',
    code: 'SEC-TIP-105',
    category: 'Cyber & Physical Hygiene',
    title: 'Secure Unattended Workstations',
    tip: 'Physical access to unlocked computers allows unauthorized personnel to harvest sensitive company credentials in under 30 seconds.',
    actionable: 'Enforce Win+L / Cmd+Ctrl+Q screen locking policies whenever stepping away from desks.',
    severity: 'normal',
    tags: ['Cyber', 'Corporate', 'Data Security']
  },
  {
    id: 'tip-06',
    code: 'SEC-TIP-106',
    category: 'Nighttime Patrols',
    title: 'Verify RFID Guard Clocking Intervals',
    tip: 'Consistent hourly perimeter logging ensures guards remain active and alert throughout overnight shifts.',
    actionable: 'Ensure supervisor alerts trigger immediately if an RFID clocking point is missed by >15 minutes.',
    severity: 'high',
    tags: ['Patrol', 'Guard Force', 'Overnight']
  },
  {
    id: 'tip-07',
    code: 'SEC-TIP-107',
    category: 'Emergency Response',
    title: 'Inspect Panic Button Telemetry',
    tip: 'Silent alarm panic buttons in reception desks and security booths must undergo monthly silent test signal verifications with the Command Center.',
    actionable: 'Schedule a monthly panic transmitter test every first Monday at 09:00 AM.',
    severity: 'critical',
    tags: ['Panic System', 'Emergency', 'Command Center']
  },
  {
    id: 'tip-08',
    code: 'SEC-TIP-108',
    category: 'Industrial Logistics',
    title: 'Dual-Signoff Fleet Dispatch Checks',
    tip: 'High-value goods leaving manufacturing warehouses require dual authorization logs matching manifest item counts before gate exit.',
    actionable: 'Implement mandatory seal verification by both warehouse manager and chief guard sentry.',
    severity: 'high',
    tags: ['Logistics', 'Warehouse', 'Cargo']
  },
  {
    id: 'tip-09',
    code: 'SEC-TIP-109',
    category: 'Fire Safety',
    title: 'Keep Emergency Exit Passages Clear',
    tip: 'Corridors and fire exit doors blocked by temporary boxes or equipment severely compromise evacuation safety during emergencies.',
    actionable: 'Conduct daily end-of-shift audits to ensure emergency egress paths remain 100% unobstructed.',
    severity: 'critical',
    tags: ['Fire Safety', 'Compliance', 'Evacuation']
  },
  {
    id: 'tip-10',
    code: 'SEC-TIP-110',
    category: 'K9 Canine Patrols',
    title: 'Optimal Wind Direction for Dog Patrols',
    tip: 'When patrolling expansive perimeters with security dogs, always walk upwind along perimeter fences to maximize scent detection distance.',
    actionable: 'Train K9 handlers to adjust patrol direction based on real-time wind conditions.',
    severity: 'normal',
    tags: ['K9 Unit', 'Patrol', 'Detection']
  },
  {
    id: 'tip-11',
    code: 'SEC-TIP-111',
    category: 'CCTV & Lighting',
    title: 'Eliminate Infrared Camera Washouts',
    tip: 'Bright external floodlights pointing directly into CCTV lenses cause night-vision sensor blinding and whiteout artifacts.',
    actionable: 'Position security lighting above or behind camera housings, pointing outward toward dark zones.',
    severity: 'normal',
    tags: ['Surveillance', 'Lighting', 'CCTV']
  },
  {
    id: 'tip-12',
    code: 'SEC-TIP-112',
    category: 'Event & VIP Security',
    title: 'Establish Secondary Safe Rooms',
    tip: 'High-profile public events require a designated, pre-inspected safe room equipped with dedicated communication lines and medical supplies.',
    actionable: 'Verify safe room lock integrity and communications before guests arrive on site.',
    severity: 'high',
    tags: ['VIP Escort', 'Events', 'Close Protection']
  }
];
