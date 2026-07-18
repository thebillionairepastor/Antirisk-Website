export interface CareerPosition {
  pageKey: 'career_guard' | 'career_escort' | 'career_cctv' | 'career_k9';
  title: string;
  department: string;
  salary: string;
  location: string;
  type: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
}

export const careersData: CareerPosition[] = [
  {
    pageKey: 'career_guard',
    title: 'Routine Patrol Guard',
    department: 'Guarding Force Division',
    salary: '₦85,000 - ₦120,000 / Month',
    location: 'Lagos, Abuja, Oyo (Ibadan), Abia (Aba)',
    type: 'Full-Time (Rotational Shifts)',
    summary: 'We are seeking vigilant and highly disciplined Routine Patrol Guards to safeguard client properties, factories, warehouses, and corporate facilities. As the first line of defense, you will control access, conduct foot patrols, and report irregularities using advanced RFID clocking systems.',
    responsibilities: [
      'Control entry and exit points for vehicles, staff, and visitors, enforcing strict security protocol.',
      'Conduct regular, rigorous foot patrols around premises boundaries using RFID tags for clocking.',
      'Inspect gates, fences, locks, and security equipment daily to ensure zero vulnerabilities.',
      'De-escalate conflicts professionally and handle access incidents with tact and authority.',
      'Liaise with local law enforcement and our 24/7 Command Center in the event of any security breach.'
    ],
    requirements: [
      'Senior Secondary School Certificate (SSCE / WAEC / NECO) minimum qualification.',
      'Age between 21 and 35 years with outstanding physical conditioning.',
      'Minimum height of 1.72m (5ft 8in) for males, or 1.65m (5ft 5in) for females.',
      'Two high-standing guarantors who can accept absolute legal & financial indemnity.',
      'Clean criminal record with biometric police clearance (verified upon recruitment).'
    ],
    benefits: [
      'Competitive monthly salary with punctual payouts on the 25th of every month.',
      'Complete tactical uniform suite (boots, belts, security gadgets) provided for free.',
      'Subsidized healthcare insurance and routine corporate health checkups.',
      'Comprehensive tactical training boot camp prior to first site deployment.',
      'Clear career pathways to Guard Sergeant and Sector Commander roles.'
    ]
  },
  {
    pageKey: 'career_escort',
    title: 'Close Protection & VIP Escort Officer',
    department: 'Special Operations Division',
    salary: '₦180,000 - ₦250,000 / Month',
    location: 'Lagos, Abuja, Port Harcourt (Maritime)',
    type: 'Full-Time (Contract Basis)',
    summary: 'We are hiring elite, highly trained Close Protection Officers (CPOs) and escort professionals to provide secure transit and executive body protection. You will coordinate with our armed mobile police (MOPOL) partners to escort executives, expatriates, and high-net-worth families across major travel corridors.',
    responsibilities: [
      'Provide close proximity protection to designated VIPs, staying alert to environmental threats.',
      'Pre-reconnoiter transit routes, identify emergency egress paths, and manage threat exposure risks.',
      'Manage secure high-value logistics and coordinate armed escort vehicles during inter-state transits.',
      'Execute defensive driving maneuvers and emergency evacuation protocols under intense stress.',
      'Interface directly with regional command teams to maintain real-time telemetry coordinates.'
    ],
    requirements: [
      'Ex-Serviceman (Nigerian Army, Navy, Air Force) or certified NSCDC elite security graduate.',
      'Excellent verbal communications, leadership presence, and extreme discipline.',
      'Advanced certificate in defensive driving or close protection operations.',
      'Height of 1.78m (5ft 10in) minimum with superb cardiovascular and combative stamina.',
      'Comprehensive background vetting and psychological evaluation certificate.'
    ],
    benefits: [
      'Premium hazard insurance and generous travel allowance packages.',
      'Dedicated state-of-the-art ballistic gear and communication apparatus.',
      'Annual tactical advanced shooting and de-escalation drills in our academy.',
      'Performance-based dispatch bonuses for incident-free regional tours.',
      'Access to standard fitness gyms and executive rest lounges.'
    ]
  },
  {
    pageKey: 'career_cctv',
    title: 'CCTV & Command Room Operator',
    department: 'Electronic Security Division',
    salary: '₦100,000 - ₦140,000 / Month',
    location: 'Lagos Headquarters (Ikeja)',
    type: 'Full-Time (Shift-Based)',
    summary: 'Seeking detail-oriented CCTV and Technical Command Room Operators to monitor live surveillance feeds and sensor alerts. You will serve as the cerebral core of our security infrastructure, triaging live motion alerts, laser tripwire breaks, and coordinating tactical response teams.',
    responsibilities: [
      'Monitor multi-channel CCTV grids, infrared security cameras, and perimeter alarm consoles continuously.',
      'Detect anomalous behaviors, suspicious activities, and hardware faults instantly.',
      'Dispatch mobile response units and guard forces to specific coordinates via high-frequency radio.',
      'Maintain precise, clear, and comprehensive digital security logs of all daily events.',
      'Perform regular telemetry health checks on client remote setups and report downtime.'
    ],
    requirements: [
      'OND, NCE, or B.Sc in Information Technology, Computer Science, or equivalent technical training.',
      'Exceptional visual concentration, focus, and ability to multitask under pressure.',
      'Strong technical proficiency in Windows, network routers, and security software interfaces.',
      'Excellent telephone and radio communication etiquette.',
      'Willingness to work night shifts and holidays on a rotating roster.'
    ],
    benefits: [
      'Premium air-conditioned command room work environment with ergonomic seating.',
      'Specialized professional certification training in AI surveillance systems.',
      'Free meals during overnight shifts and standard transport allowances.',
      'Health insurance plan covering primary medical care.',
      'Direct growth prospects into Electronic Security Supervisor and Systems Administrator roles.'
    ]
  },
  {
    pageKey: 'career_k9',
    title: 'K-9 Handler & Patrol Specialist',
    department: 'Canine Services Division',
    salary: '₦110,000 - ₦150,000 / Month',
    location: 'Lagos, Abuja, Calabar',
    type: 'Full-Time',
    summary: 'Our Canine Division is expanding and looking for passionate, certified K-9 Handlers. You will work in a unified team with our trained German Shepherds, Belgian Malinois, and Rottweilers, executing scent detection operations and high-profile security patrols at critical infrastructure hubs.',
    responsibilities: [
      'Co-patrol client estates, airports, shipping docks, or stadiums with assigned security dogs.',
      'Conduct professional canine-led scent sweeps for explosives, narcotics, or weapons.',
      'Ensure the optimal feeding, hygiene, exercise, veterinary care, and grooming of assigned dogs.',
      'Conduct regular agility training and bite-work exercises to maintain operational canine standards.',
      'Ensure the safety of the general public during canine-assisted access control sweeps.'
    ],
    requirements: [
      'Certified K-9 training and handling credentials from an accredited security training academy.',
      'Deep, natural affinity for working with and caring for large, high-drive security dogs.',
      'Exceptional physical stamina to manage high-energy canines during lengthy patrols.',
      'Calm temperament, extreme patience, and high verbal control over dog handlers.',
      'WAEC/SSCE or higher qualification with clean police vetting.'
    ],
    benefits: [
      'Unified veterinary support, premium dog food, and handling gear fully supplied.',
      'Advanced canine psychology and tactical handler masterclasses in Lagos.',
      'Free medical health plan for both handler and family.',
      'Performance and health bonuses for exceptionally maintained security canines.',
      'Secure transit to and from assigned guard facilities.'
    ]
  }
];
