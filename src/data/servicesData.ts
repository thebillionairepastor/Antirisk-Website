import { SecurityService, Page } from '../types';

export interface ExtendedSecurityService extends SecurityService {
  pageKey: Page;
  longBio: string;
  image: string;
  gallery?: string[];
  technologyUsed: string[];
}

export const servicesData: ExtendedSecurityService[] = [
  {
    id: 'routine',
    pageKey: 'service_routine',
    title: 'Routine & General duty Security Guards',
    shortDescription: 'Uniformed, highly disciplined security officers vetted and trained for maximum assets and life protection.',
    longDescription: 'Our Routine & General Duty guarding force represents the absolute foundation of robust physical security. Each security officer undergoes background verification checks through state police systems, fingerprint registers, and reliable guarantor audits. We deploy alert, courteous, and immaculately dressed sentinels to safeguard corporate offices, residential estates, financial institutions, and manufacturing sites.',
    longBio: 'Anti-Risk’s Routine & General Duty Sentinels represent our first line of physical defense. Under our strict policy, guards are not merely observers—they are active responders. Each sentinel is trained at our Academy in conflict de-escalation, rapid panic notifications, access gates verification, and fire prevention. We pair physical patrols with electronic clocking tools to ensure absolute coverage, 24 hours a day, 365 days a year.',
    icon: 'shield',
    image: '/src/assets/images/security_guards_parade_1786474226648.jpg',
    gallery: [
      '/src/assets/images/security_guards_parade_1786474226648.jpg',
      '/src/assets/images/guards_lineup_hero_1786457870663.jpg'
    ],
    features: [
      '24/7 Static & Active Perimeter Patrol Sentinels',
      'Electronic RFID Guard Clocking & Verification',
      'Continuous Unannounced Supervisory Checkups',
      'Strict Radio Intercom Communication Protocols',
      'Vetted Fingerprint Checked Personnel Only',
      'Corporate, Tactical, and Ceremonial Uniform Options'
    ],
    technologyUsed: [
      'RFID Wand Logging Recorders',
      'VHF Tactical Multi-Channel Transceivers',
      'Handheld Under-Vehicle Inspection Scanners',
      'Remote Distress Alarm Transmitters'
    ]
  },
  {
    id: 'special',
    pageKey: 'service_special',
    title: 'Special Operations ( Escort/Body) Gaurds',
    shortDescription: 'Executive bodyguards, armed convoys, and secure logistical transits for high-net-worth VIPs.',
    longDescription: 'Our Close Protection Units (CPU) provide high-end personal safety and security escorts for executives, diplomats, and international visitors. We coordinate armed mobile police escorts, secure transport, and experienced defensive drivers.',
    longBio: 'Special Operations require extreme vigilance and split-second decision-making. Our executive protection teams comprise elite operatives who undergo specialized defensive intelligence, offensive driving, and emergency evacuation drills. We manage transport itineraries from airports to remote project sites, providing bulletproof logistics, tactical convoy operations, and live satellite tracking with immediate response coordination.',
    icon: 'escort',
    image: '/src/assets/images/vip_security_escort_1784299328559.jpg',
    features: [
      'Elite Close Protection Officers (Executive Bodyguards)',
      'Armed Mobile Police (MOPOL) Joint Coordination',
      'Fully Vetted Defensive Convoy Drivers',
      'Armed Airport Meet & Greet Logistical Escorts',
      'Executive Bulletproof SUVs (Level B6/B7 Options)',
      'Continuous Route Risk Profiling & Real-Time GPS Tracking'
    ],
    technologyUsed: [
      'Live GPS Satellite Fleet Monitors',
      'Level BR6 Armored Vehicular Shielding',
      'Secure High-Frequency Mobile Transmitters',
      'Encrypted Real-Time Mobile Dispatch Intercom'
    ]
  },
  {
    id: 'cctv',
    pageKey: 'service_cctv',
    title: 'CCTV Installation & Training',
    shortDescription: 'State-of-the-art smart CCTV installation, AI analytics, and command room surveillance training.',
    longDescription: 'We design, install, and support state-of-the-art closed-circuit television networks integrated with advanced artificial intelligence and remote surveillance feeds, paired with technical training for operator staff.',
    longBio: 'Anti-Risk’s Electronic Surveillance division brings smart technology to physical asset defense. We analyze physical structures to locate blindspots and install high-definition AI security cameras with tripwire alerts and thermal detection. Additionally, we run specialized training workshops for corporate staff, building expert command center watch operators who can actively monitor, triage, and log threats.',
    icon: 'cctv',
    image: '/src/assets/images/smart_surveillance_center_1784299347627.jpg',
    features: [
      'AI-Powered Smart Camera Network & System Integration',
      'Thermal Imaging & Night-Vision Long-Range Lenses',
      'Central Operations Control Room Setup',
      'Hands-On Surveillance Operator Training Certification',
      'Biometric Fingerprint & RFID Secure Access Gates',
      'Smart Intercom & Wireless Intrusion Sensor Alarms'
    ],
    technologyUsed: [
      'AI Neural Object & Face Detection Algorithms',
      'Network Video Recorders (NVR) with Secure Backups',
      'Smart Laser Tripwires & Motion Analyzers',
      'Cloud-Based Real-Time Video Feeds Encryption'
    ]
  },
  {
    id: 'dogs',
    pageKey: 'service_dogs',
    title: 'Security Dogs Services',
    shortDescription: 'Elite K-9 protection squads, sniffer dogs, and highly trained handlers for search & detection.',
    longDescription: 'Our specialized K-9 tactical units provide superior biological deterrence, explosive and narcotic detection, and physical security patrol support with professional handlers.',
    longBio: 'Nothing deters unauthorized perimeter breach like a professional, alert K-9 patrol. Our Security Dogs Division breeds, raises, and deploys elite German Shepherds, Rottweilers, and Belgian Malinois trained in scent tracking, narcotics screening, and threat interception. Every dog is paired with a highly skilled, certified handler, ensuring respectful, disciplined crowd-control and industrial yard safety.',
    icon: 'dog',
    image: '/src/assets/images/k9_unit_patrol_1784299580956.jpg',
    features: [
      'Professional Guard Dogs for Perimeter Active Patrol',
      'Narcotics and Explosives Scent Detection Dogs',
      'Certified and Vetted K-9 Command Handlers',
      'Industrial Yard & Estate Night Patrol Support',
      'High-Scale Event Crowd Screening Deterrence',
      'Rigorous Veterinary Checkups & Safety Audits'
    ],
    technologyUsed: [
      'Advanced Bite-Protection Kevlar Sleeves & Suits',
      'Tactical GPS Dog Harnesses & Trackers',
      'Explosive Scent Trainer Vials (Simulated)',
      'High-Grade Tactical K-9 Audio Transmitters'
    ]
  },
  {
    id: 'equipment',
    pageKey: 'service_equipment',
    title: 'Instrument/Equipment Security',
    shortDescription: 'Asset guarding, high-tech scanner screens, inventory logistics, and cash-in-transit security.',
    longDescription: 'Comprehensive protection for high-value machinery, medical systems, banking electronics, transit assets, and secure containment vault integrations.',
    longBio: 'Industrial complexes, data centers, and banks house sensitive instruments and equipment that are prime targets. Our specialized equipment security team provides round-the-clock guarding, access scans, and cargo escorts. We implement high-tech screening methods, asset barcodes tracking, and strict administrative access logs to ensure zero unauthorized interference.',
    icon: 'key',
    image: '/src/assets/images/instrument_equipment_security_1784301027171.jpg',
    features: [
      'High-Value Laboratory & Technical Systems Guarding',
      'Strict Access Audits for Server Rooms & Vaults',
      'Secured Asset Transport and Cash-in-Transit Protection',
      'Metal Detectors and X-Ray Baggage Screeners Deployments',
      'Anti-Sabotage Infrastructure Checks & Vulnerability Controls',
      'RFID Asset Tracking & Inventory Seals Inspection'
    ],
    technologyUsed: [
      'Under-Vehicle High-Resolution Cameras',
      'Biometric Iris & Vein Recognition Scanners',
      'Asset Tamper-Evident RFID Electronic Seals',
      'Broad-Spectrum Portable Signal Analyzers'
    ]
  },
  {
    id: 'safety_training',
    pageKey: 'service_safety_training',
    title: 'Safety & Security Training',
    shortDescription: 'Rigorous guard training academy courses, civil defense drills, fire combat, and first aid certificates.',
    longDescription: 'We provide certified physical defensive, first-aid, occupational health, and emergency combat courses for corporate organizations and aspiring security guards.',
    longBio: 'At Anti-Risk, we believe education is the bedrock of threat prevention. Our Guard Training Academy offers highly rated, NSCDC-compliant programs for both corporate safety officers and private individuals. Instructors include former military specialists, emergency medical responders, and cyber experts. We provide certifications in physical self-defense, cardiac life support, and tactical fire prevention.',
    icon: 'graduation-cap',
    image: '/src/assets/images/safety_security_training_1784301042719.jpg',
    features: [
      'Certified Unarmed Combat & Restraint Maneuvers',
      'Emergency First-Aid, CPR & Automated Defibrillator Training',
      'Real-Time Tactical Fire Extinguishing Drills',
      'Corporate Threat Awareness & Crisis Evacuation Runs',
      'Customer Care & Civil Front-Desk Ethics',
      'NSCDC Syllabus Certification & Vetting Support'
    ],
    technologyUsed: [
      'Simulated Medical Resusci-Annes for CPR',
      'Controlled Academy Fire Demonstration Units',
      'Digital E-Learning Guard Testing Systems',
      'Panic Simulation Audio and Laser Rooms'
    ]
  },
  {
    id: 'advisory',
    pageKey: 'service_advisory',
    title: 'Advisory & Consultancy',
    shortDescription: 'Corporate risk audits, security policies, background vetting checks, and emergency crisis protocols.',
    longDescription: 'Our intelligence consultants provide strategic threat modeling, physical risk audits, comprehensive background checks, and business continuity policy designs.',
    longBio: 'True protection begins with smart, forward-looking strategy. Our security consultants—comprising retired intelligence officers and national security directors—audit your facility’s design, staff hierarchies, and emergency policies. We produce comprehensive vulnerability indexes and design resilient crisis plans, helping your enterprise maintain business continuity in any socioeconomic scenario.',
    icon: 'clipboard-check',
    image: '/src/assets/images/advisory_consultancy_1784301059536.jpg',
    features: [
      'Corporate Physical Infrastructure Threat Audits',
      'Employee & Vendor High-Standing Vetting Checks',
      'Business Continuity and Disaster Mitigation Protocols',
      'Tailored Corporate Safety Policy Guidelines',
      'Kidnap-Risk Transit and Emergency Evacuation Plans',
      'Socio-Economic Intelligence & Hazard Mapping Reports'
    ],
    technologyUsed: [
      'Advanced Vulnerability Scoring Audits Software',
      'National Vetting & Background Verification Databases',
      '3D Architectural Threat Modeling Simulators',
      'Geo-Spatial Real-Time Security Incident Mapping'
    ]
  },
  {
    id: 'other',
    pageKey: 'service_other',
    title: 'Other Security Services',
    shortDescription: 'Maritime vessel protection, event crowd control management, and bespoke security operations.',
    longDescription: 'Bespoke security programs including maritime cargo escorts, political rally safety screenings, and temporary high-security event lockdowns.',
    longBio: 'No two security threats are identical. For unique assignments that fall outside traditional guarding, our Specialized Services Division creates customized safety plans. Whether you need ISPS-code compliant maritime asset protection, emergency medical support, or a full secure lockdown for an annual general meeting, we provide the physical and technical sentinel logistics required.',
    icon: 'anchor',
    image: '/src/assets/images/maritime_patrol_1784299597812.jpg',
    features: [
      'ISPS Code-Compliant Maritime Vessel Armed Escort',
      'Port Terminal & Shipping Berth Static Sentinels',
      'Corporate AGM & High-Scale Event Crowd Protection',
      'Personal Residential Alarm & Panic Button Installations',
      'Temporary Venue Lockdowns and Explosives Sweeping',
      'Direct Crisis Liaison with Government Armed Agencies'
    ],
    technologyUsed: [
      'High-Speed Bulletproof Coastal Security Vessels',
      'Multi-Zone Walk-Through Metal Detectors',
      'High-Power Portable Jamming Systems',
      'Automatic Distress Emergency Call Responders'
    ]
  }
];
