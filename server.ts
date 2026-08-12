import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

// Define __dirname safely if needed
const __dirname = process.cwd();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client (Only server-side, safe from browser exposure)
// We set user-agent to 'aistudio-build' as required
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("WARNING: GEMINI_API_KEY is not defined in the environment.");
    return null;
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// Default high-quality local safety alerts/briefings to show if the API key is not configured or fails
const defaultBriefings = [
  {
    title: "Regional Security Alert: High-Way Coordination Teams Deployed in Oyo Sector",
    summary: "In response to logistics corridor security reviews, Oyo western sector commands have deployed auxiliary escort and mobile response units to ensure uninterrupted transit along major trade hubs.",
    date: "July 17, 2026",
    sourceUrl: "https://www.antiriskng.com/news/western-sector-security",
    sourceName: "Anti-Risk Operations"
  },
  {
    title: "National Police Reform & Infrastructure Protection Expansion",
    summary: "The federal government has announced renewed partnerships with private security agencies to safeguard critical national telemetry, energy infrastructure, and maritime trade terminals.",
    date: "July 15, 2026",
    sourceUrl: "https://www.antiriskng.com/news/infrastructure-protection",
    sourceName: "Federal Security Briefings"
  },
  {
    title: "Southeastern Logistics Corridor Alert: Abia-Port Harcourt Expressway Transit Advisory",
    summary: "Security dog services and highway escort patrols have increased surveillance around key junction points to optimize logistical safety and VIP convoys across the Abia and River state boundaries.",
    date: "July 12, 2026",
    sourceUrl: "https://www.antiriskng.com/news/southeastern-advisory",
    sourceName: "Anti-Risk Intelligence Desk"
  }
];

// Server-side API endpoint for fetching Nigerian Security Briefings with Google Search Grounding
app.get("/api/security-briefings", async (req, res) => {
  try {
    const ai = getGeminiClient();
    if (!ai) {
      console.log("Gemini client not initialized, returning default local briefs.");
      return res.json({ briefings: defaultBriefings, source: "Local Intelligence Database" });
    }

    const prompt = `Search the web for the absolute latest (year 2026) major security-related news, safety briefs, security bulletins, or government security advisories in Nigeria.
Focus on developments relevant to corporate safety, logistics, executive transport, or general regional security updates.
Select exactly 3 recent and relevant news stories.

You MUST populate the sourceUrl and sourceName fields with real, verified URLs and publisher names (e.g. Vanguard, Premium Times, Punch, etc.) retrieved from your search grounding results.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are an elite corporate risk intelligence analyst. You specialize in synthesizing recent security news and briefings in Nigeria for enterprise logistics and high-value operations.",
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          description: "List of 3 recent security briefings in Nigeria with sources.",
          items: {
            type: Type.OBJECT,
            properties: {
              title: { 
                type: Type.STRING, 
                description: "A highly clear, professional title describing the Nigerian security news or safety bulletin." 
              },
              summary: { 
                type: Type.STRING, 
                description: "A highly concise 1-2 sentence description of the event or security brief." 
              },
              date: { 
                type: Type.STRING, 
                description: "The approximate date when the event was reported or happened, formatted like 'Month Day, 2026'." 
              },
              sourceUrl: { 
                type: Type.STRING, 
                description: "A real, complete, grounded HTTP/HTTPS web link to the source article." 
              },
              sourceName: { 
                type: Type.STRING, 
                description: "The name of the publishing source/agency (e.g., Vanguard, Premium Times, Punch, etc.)." 
              }
            },
            required: ["title", "summary", "date", "sourceUrl", "sourceName"]
          }
        }
      }
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error("Received empty response from Gemini.");
    }

    const parsedBriefings = JSON.parse(responseText.trim());

    // Make sure we have an array with elements
    if (Array.isArray(parsedBriefings) && parsedBriefings.length > 0) {
      return res.json({ briefings: parsedBriefings.slice(0, 3), source: "Gemini Real-time Grounded Search" });
    } else {
      throw new Error("Parsed data is not a valid array.");
    }

  } catch (error: any) {
    const isQuotaError = error?.status === 429 || error?.message?.includes("429") || error?.message?.includes("RESOURCE_EXHAUSTED");
    if (isQuotaError) {
      console.warn("Gemini API quota reached (429). Serving verified local intelligence briefings.");
    } else {
      console.warn("Gemini briefings unavailable, serving local fallback:", error?.message || error);
    }
    // Gracefully fallback to high-quality default briefings so the app never fails
    return res.json({ briefings: defaultBriefings, source: "Local Intelligence Database" });
  }
});

// Internal database of Daily Security Tips
const internalSecurityTips = [
  {
    id: "tip-01",
    code: "SEC-TIP-101",
    category: "Perimeter Defense",
    title: "Maintain Clear Line-of-Sight",
    tip: "Ensure overhanging foliage and untrimmed shrubbery near estate gates or perimeter walls do not obstruct CCTV cameras or guard sentry sightlines.",
    actionable: "Trim all vegetation within 1.5 meters of perimeter fences to eliminate intruder blind spots.",
    severity: "normal",
    tags: ["Perimeter", "Estate", "CCTV"]
  },
  {
    id: "tip-02",
    code: "SEC-TIP-102",
    category: "Corporate Access",
    title: "Eliminate Tailgating at Turnstiles",
    tip: "Unverified visitors following staff through access barriers present a primary breach vector in commercial facilities.",
    actionable: "Require all personnel to swipe individually and train reception guards to challenge unbadged followers.",
    severity: "high",
    tags: ["Corporate", "Access Control", "Visitor"]
  },
  {
    id: "tip-03",
    code: "SEC-TIP-103",
    category: "Executive Travel",
    title: "Vary Daily Commute Routes",
    tip: "Predictable travel schedules and static driving routes increase vulnerability during executive transit across metropolitan corridors.",
    actionable: "Alternate departure times and utilize secondary verified routes at least twice per week.",
    severity: "high",
    tags: ["Executive", "Escort", "Transit"]
  },
  {
    id: "tip-04",
    code: "SEC-TIP-104",
    category: "Residential Estate",
    title: "Verify Visitor Pre-Clearance Codes",
    tip: "Estate security gates should enforce digital one-time access passes (OTPs) generated directly by residents before opening visitor gates.",
    actionable: "Never allow gate pass bypasses without direct resident phone authorization.",
    severity: "normal",
    tags: ["Residential", "Gates", "Authentication"]
  },
  {
    id: "tip-05",
    code: "SEC-TIP-105",
    category: "Cyber & Physical Hygiene",
    title: "Secure Unattended Workstations",
    tip: "Physical access to unlocked computers allows unauthorized personnel to harvest sensitive company credentials in under 30 seconds.",
    actionable: "Enforce Win+L / Cmd+Ctrl+Q screen locking policies whenever stepping away from desks.",
    severity: "normal",
    tags: ["Cyber", "Corporate", "Data Security"]
  },
  {
    id: "tip-06",
    code: "SEC-TIP-106",
    category: "Nighttime Patrols",
    title: "Verify RFID Guard Clocking Intervals",
    tip: "Consistent hourly perimeter logging ensures guards remain active and alert throughout overnight shifts.",
    actionable: "Ensure supervisor alerts trigger immediately if an RFID clocking point is missed by >15 minutes.",
    severity: "high",
    tags: ["Patrol", "Guard Force", "Overnight"]
  },
  {
    id: "tip-07",
    code: "SEC-TIP-107",
    category: "Emergency Response",
    title: "Inspect Panic Button Telemetry",
    tip: "Silent alarm panic buttons in reception desks and security booths must undergo monthly silent test signal verifications with the Command Center.",
    actionable: "Schedule a monthly panic transmitter test every first Monday at 09:00 AM.",
    severity: "critical",
    tags: ["Panic System", "Emergency", "Command Center"]
  },
  {
    id: "tip-08",
    code: "SEC-TIP-108",
    category: "Industrial Logistics",
    title: "Dual-Signoff Fleet Dispatch Checks",
    tip: "High-value goods leaving manufacturing warehouses require dual authorization logs matching manifest item counts before gate exit.",
    actionable: "Implement mandatory seal verification by both warehouse manager and chief guard sentry.",
    severity: "high",
    tags: ["Logistics", "Warehouse", "Cargo"]
  },
  {
    id: "tip-09",
    code: "SEC-TIP-109",
    category: "Fire Safety",
    title: "Keep Emergency Exit Passages Clear",
    tip: "Corridors and fire exit doors blocked by temporary boxes or equipment severely compromise evacuation safety during emergencies.",
    actionable: "Conduct daily end-of-shift audits to ensure emergency egress paths remain 100% unobstructed.",
    severity: "critical",
    tags: ["Fire Safety", "Compliance", "Evacuation"]
  },
  {
    id: "tip-10",
    code: "SEC-TIP-110",
    category: "K9 Canine Patrols",
    title: "Optimal Wind Direction for Dog Patrols",
    tip: "When patrolling expansive perimeters with security dogs, always walk upwind along perimeter fences to maximize scent detection distance.",
    actionable: "Train K9 handlers to adjust patrol direction based on real-time wind conditions.",
    severity: "normal",
    tags: ["K9 Unit", "Patrol", "Detection"]
  },
  {
    id: "tip-11",
    code: "SEC-TIP-111",
    category: "CCTV & Lighting",
    title: "Eliminate Infrared Camera Washouts",
    tip: "Bright external floodlights pointing directly into CCTV lenses cause night-vision sensor blinding and whiteout artifacts.",
    actionable: "Position security lighting above or behind camera housings, pointing outward toward dark zones.",
    severity: "normal",
    tags: ["Surveillance", "Lighting", "CCTV"]
  },
  {
    id: "tip-12",
    code: "SEC-TIP-112",
    category: "Event & VIP Security",
    title: "Establish Secondary Safe Rooms",
    tip: "High-profile public events require a designated, pre-inspected safe room equipped with dedicated communication lines and medical supplies.",
    actionable: "Verify safe room lock integrity and communications before guests arrive on site.",
    severity: "high",
    tags: ["VIP Escort", "Events", "Close Protection"]
  }
];

// Server-side API endpoint for Daily Security Tips
app.get("/api/security-tips", (req, res) => {
  try {
    const categoryFilter = req.query.category as string;
    let tips = internalSecurityTips;
    if (categoryFilter) {
      tips = tips.filter(t => t.category.toLowerCase().includes(categoryFilter.toLowerCase()));
    }
    res.json({
      success: true,
      count: tips.length,
      tips: tips,
      source: "Anti-Risk Internal Tactical Database"
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to query security tips database." });
  }
});

// Server-side API endpoint for floating Live Chat Support
app.post("/api/chat", async (req, res) => {
  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required." });
  }

  // Pre-compiled high-quality offline rule responses if Gemini is not available
  const getFallbackResponse = (msg: string): { response: string; triggerContactForm: boolean } => {
    const text = msg.toLowerCase();
    
    // City-specific Queries
    if (text.includes("lagos") || text.includes("ikeja")) {
      return {
        response: `📍 *Anti-Risk Lagos Headquarters & Command Center*\n` +
               `• Address: Plot 15, Alhaji Hussein Street, Ikeja, Lagos State, Nigeria.\n` +
               `• Direct Support Hotline: +234 805 731 5673\n` +
               `• Operations Dispatch Email: lagos.ops@antiriskng.com\n` +
               `• Sector Commander: Commander Samuel Adebayo\n` +
               `• Active Strength: 150+ Vetted Officers | 24 Active Response Patrol Units\n` +
               `• Specialized Capabilities: Maritime Security Logistics, Executive Escorts, Industrial Vulnerability Consulting.\n\n` +
               `You can request an immediate security survey or dispatch escort by filling out our Quote Calculator or submitting a query on the Contact page. Our Ikeja dispatch desk monitors this channel 24/7.`,
        triggerContactForm: false
      };
    }
    
    if (text.includes("abuja") || text.includes("garki")) {
      return {
        response: `📍 *Anti-Risk Abuja Federal Capital Territory Command*\n` +
               `• Address: Suite 4A, Garki II Commercial Plaza, Area 11, Garki, Abuja, Nigeria.\n` +
               `• Direct Support Hotline: +234 802 112 4432\n` +
               `• Operations Dispatch Email: abuja.ops@antiriskng.com\n` +
               `• Sector Commander: Superintendent Ibrahim Yusuf\n` +
               `• Active Strength: 80+ Vetted Close Protection Officers | 12 Patrol Units\n` +
               `• Specialized Capabilities: Diplomatic Convoy Protection, VIP Close Protection, Embassy Security Audits.\n\n` +
               `Our Garki tactical unit coordinates directly with federal authorities and handles VIP close protection. Let us know how we can secure your Abuja operations!`,
        triggerContactForm: false
      };
    }
    
    if (text.includes("calabar") || text.includes("cross river")) {
      return {
        response: `📍 *Anti-Risk Calabar South-South Regional Command*\n` +
               `• Address: Suite 12, Ndidem Usang Iso Road, Calabar, Cross River State, Nigeria.\n` +
               `• Direct Support Hotline: +234 805 731 5680\n` +
               `• Operations Dispatch Email: calabar.ops@antiriskng.com\n` +
               `• Sector Commander: Captain Effiong Edet\n` +
               `• Active Strength: 50+ Vetted Officers | 8 Patrol Units\n` +
               `• Specialized Capabilities: Inland Waterway Security, Offshore Vessel Protection, Port Logistics Security.\n\n` +
               `Our Calabar South-South Command specializes in marine escort and maritime asset guarding.`,
        triggerContactForm: false
      };
    }
    
    if (text.includes("oyo") || text.includes("ibadan")) {
      return {
        response: `📍 *Anti-Risk Oyo Western Command Sector Office*\n` +
               `• Address: Sector 3, Ring Road Industrial Estate, Ibadan, Oyo State, Nigeria.\n` +
               `• Direct Support Hotline: +234 802 112 4435\n` +
               `• Operations Dispatch Email: oyo.ops@antiriskng.com\n` +
               `• Sector Commander: Assistant Commander Segun Ojo\n` +
               `• Active Strength: 65+ Vetted Officers | 10 Patrol Units\n` +
               `• Specialized Capabilities: Industrial Complex Guarding, Agricultural Perimeter Defense, Inter-State Patrols.\n\n` +
               `The Oyo command manages warehouse guarding and agricultural security surveys across the western sector.`,
        triggerContactForm: false
      };
    }
    
    if (text.includes("abia") || text.includes("aba")) {
      return {
        response: `📍 *Anti-Risk Abia Eastern Region Command Hub*\n` +
               `• Address: Aba-Owerri Road Express Sector, Aba, Abia State, Nigeria.\n` +
               `• Direct Support Hotline: +234 809 334 7768\n` +
               `• Operations Dispatch Email: abia.ops@antiriskng.com\n` +
               `• Sector Commander: Commander Kenneth Nwachukwu\n` +
               `• Active Strength: 90+ Vetted Officers | 14 Patrol Units\n` +
               `• Specialized Capabilities: Commercial Center Protection, High-Value Asset Transit, Escort Logistics.\n\n` +
               `Our Eastern Command specializes in secure cash-in-transit, high-value asset escorts, and retail hub security in Aba.`,
        triggerContactForm: false
      };
    }
    
    // Contact Information / Hotline Directory
    if (text.includes("phone") || text.includes("contact") || text.includes("call") || text.includes("number") || text.includes("email") || text.includes("hotline")) {
      return {
        response: `📞 *Anti-Risk Security Hotline & Dispatch Directory*\n\n` +
               `You can reach our active dispatch stations 24/7 via the following direct contact lines:\n\n` +
               `• *Lagos Headquarters (Ikeja)*: +234 805 731 5673 | lagos.ops@antiriskng.com\n` +
               `• *Abuja Command (Garki)*: +234 802 112 4432 | abuja.ops@antiriskng.com\n` +
               `• *Calabar Command (Ndidem Usang Iso)*: +234 805 731 5680 | calabar.ops@antiriskng.com\n` +
               `• *Oyo Office (Ibadan)*: +234 802 112 4435 | oyo.ops@antiriskng.com\n` +
               `• *Abia Hub (Aba)*: +234 809 334 7768 | abia.ops@antiriskng.com\n\n` +
               `For high-priority, formal security bids and written proposals, please use our main Contact Form, or calculate an immediate pricing model using our Quote Calculator.`,
        triggerContactForm: false
      };
    }
    
    // Office Locations / Addresses
    if (text.includes("address") || text.includes("location") || text.includes("where") || text.includes("office") || text.includes("hub") || text.includes("station")) {
      return {
        response: `🏢 *Anti-Risk Physical Command Hub Directory*\n\n` +
               `Our regional response centers are physically located at:\n\n` +
               `1. *Lagos (Ikeja)*: Plot 15, Alhaji Hussein Street, Ikeja, Lagos State.\n` +
               `2. *Abuja (Garki)*: Suite 4A, Garki II Commercial Plaza, Area 11, Garki, Abuja.\n` +
               `3. *Calabar*: Suite 12, Ndidem Usang Iso Road, Calabar, Cross River State.\n` +
               `4. *Oyo (Ibadan)*: Sector 3, Ring Road Industrial Estate, Ibadan, Oyo State.\n` +
               `5. *Abia (Aba)*: Aba-Owerri Road Express Sector, Aba, Abia State.\n\n` +
               `All of our hubs are fully operational with 24/7 sentry desks, response fleets, and radio dispatcher links.`,
        triggerContactForm: false
      };
    }
    
    // Guard Services
    if (text.includes("guard") || text.includes("patrol") || text.includes("sentinel") || text.includes("hire") || text.includes("force")) {
      return {
        response: `🛡️ *Anti-Risk Guard Force Operations*\n\n` +
               `Our physical guard force stands apart due to rigorous selection and technology-driven accountability:\n` +
               `• *Vetting*: 100% biometric fingerprint vetting, character guarantees, and background checks verified by NSCDC.\n` +
               `• *Training*: Our guards undergo intense drills at our Lagos Training Academy covering self-defense, fire combat, surveillance, and first-aid CPR.\n` +
               `• *Accountability*: Armed with real-time RFID patrol clocking logs. Supervisors receive live notifications of patrol status.\n` +
               `• *Response*: Backed by our 24/7 regional tactical patrol units.\n\n` +
               `Calculate custom guard deployment costs immediately using our *Quote Calculator* on the home page!`,
        triggerContactForm: false
      };
    }
    
    // VIP close protection / Mopol / Escort
    if (text.includes("mopol") || text.includes("escort") || text.includes("bodyguard") || text.includes("vip") || text.includes("convoy") || text.includes("transit") || text.includes("close protection")) {
      return {
        response: `🚔 *Anti-Risk Armed Escort & VIP Close Protection*\n\n` +
               `We coordinate elite, high-level transit protection for executives, dignitaries, and diplomatic convoys:\n` +
               `• *Armed Escorts*: Direct integration with Mobile Police (MOPOL) forces under licensed security clearance.\n` +
               `• *Close Protection*: Low-profile or high-profile CPO officers trained in defensive tactics, evasive driving, and threat avoidance.\n` +
               `• *Logistics*: Secure, armored, or unmarked pursuit vehicles with radio linking to our nearest Command Hub.\n` +
               `• *Pre-Route Audits*: Technical analysts scan travel paths, highway checkpoints, and regional alerts prior to wheels-up.\n\n` +
               `For security escorts across Lagos, Abuja, Abia, Oyo, or Calabar highways, please submit a request through our main Contact Form for a secure threat briefing.`,
        triggerContactForm: true
      };
    }
    
    // CCTV / AI / Electronic Surveillance
    if (text.includes("cctv") || text.includes("camera") || text.includes("surveillance") || text.includes("alarm") || text.includes("sensor")) {
      return {
        response: `📹 *AI-Powered CCTV & Electronic Surveillance Networks*\n\n` +
               `We deploy, integrate, and monitor cutting-edge defense electronics for residential and industrial complexes:\n` +
               `• *Smart Vision*: Ultra-HD infrared night-vision CCTV cameras with AI facial and vehicle plate recognition.\n` +
               `• *Perimeter Defense*: Thermal imaging cameras and automatic laser tripwires that trigger silent alarms at our Command Center.\n` +
               `• *Biometrics*: Advanced fingerprint/retina access gates and metal-detection portals.\n` +
               `• *24/7 Monitoring*: Remote feeds can be piped directly into our nearest regional command room for active sentinel dispatch.\n\n` +
               `Request a technical surveyor to audit your facility's vulnerability by using our main Contact Form.`,
        triggerContactForm: true
      };
    }
    
    // K9 / Dogs
    if (text.includes("dog") || text.includes("k9") || text.includes("k-9") || text.includes("sniffer")) {
      return {
        response: `🐕 *Anti-Risk K-9 Guard & Scent Detection Division*\n\n` +
               `Our specialized K-9 division matches highly trained protection dogs with certified handlers:\n` +
               `• *Breeds*: Purebred German Shepherds, Belgian Malinois, and Rottweilers selected for temperament and agility.\n` +
               `• *Scent Detection*: Dogs certified in explosive detection, weapon sweeps, and illegal contraband tracking.\n` +
               `• *Complex Patrol*: Active physical patrol dogs for warehouses, estate perimeters, and maritime port boundaries.\n` +
               `• *Handlers*: Professional K-9 handlers trained in tactical dog command and humane deployment rules.\n\n` +
               `Select 'K-9 Scent Squad' in our Quote Calculator to estimate a tailored deployment cost.`,
        triggerContactForm: false
      };
    }
    
    // Academy / Training / Career
    if (text.includes("training") || text.includes("academy") || text.includes("recruit") || text.includes("job") || text.includes("apply") || text.includes("career")) {
      return {
        response: `🎓 *Anti-Risk Security Training Academy & Careers*\n\n` +
               `We run Nigeria's premier training center for security professionals:\n` +
               `• *Courses*: Certified modules in physical combat, defensive tactics, emergency fire containment, and first-aid CPR.\n` +
               `• *Corporate Training*: Hostile environment awareness training (HEAT) and control room operator certification.\n` +
               `• *Recruitment*: If you are looking to join our elite squad, we hire physically fit, mentally sharp, and highly disciplined candidates.\n` +
               `• *How to Apply*: Navigate directly to our *Careers* section in the navigation menu. You can review our rigorous physical benchmarks and submit your CV directly to our HR portal.\n\n` +
               `All our tactical officers and guards are graduates of our Lagos Training Academy.`,
        triggerContactForm: false
      };
    }
    
    // Pricing / Cost
    if (text.includes("price") || text.includes("cost") || text.includes("how much") || text.includes("rate") || text.includes("fee") || text.includes("quote")) {
      return {
        response: `💰 *Anti-Risk Custom Security Quotations & Pricing*\n\n` +
               `We pride ourselves on transparent, risk-adjusted pricing. Because every security detail depends on your specific assets and geography, we don't use flat rates:\n` +
               `• *Quote Calculator*: We have built an interactive Quote Calculator right here on our platform. Select your required service, desired region, and team size, and it will immediately generate an itemized cost profile!\n` +
               `• *Custom Bids*: For multi-location deployments, diplomatic embassies, or maritime logistics, please submit your specifications via our main Contact Form, and an assistant commander will draft a formal proposal within 24 hours.`,
        triggerContactForm: false
      };
    }
    
    // Greeting
    if (text.includes("hello") || text.includes("hi ") || text.includes("hey") || text.includes("good day") || text.includes("morning") || text.includes("afternoon") || text.includes("evening")) {
      return {
        response: `Good day and a warm welcome to the Anti-Risk Security Command Center. I am Officer Grace, your customer support dispatcher.\n\n` +
               `I can provide detailed, specific, and actionable information on any of the following topics:\n` +
               `• *Locations*: Lagos HQ, Abuja, Calabar, Oyo, and Abia (Addresses, hotlines, and emails).\n` +
               `• *Services*: Vetted Guard Forces, VIP Close Protection, CCTV AI Networks, and K-9 Patrol Dogs.\n` +
               `• *Pricing*: How to calculate your quote.\n` +
               `• *Careers*: Training academy details and applying for roles.\n\n` +
               `What security information can I assist you with today, Sir/Ma?`,
        triggerContactForm: false
      };
    }
    
    // General fallback informative block
    return {
      response: `Thank you for contacting the Anti-Risk Security Command Desk. I am Officer Grace, and I want to make sure you get the exact information you need.\n\n` +
             `• *Lagos Headquarters (Ikeja)*: Plot 15, Alhaji Hussein Street | Hotline: +234 805 731 5673 | lagos.ops@antiriskng.com\n` +
             `• *Abuja FCT Command (Garki)*: Suite 4A, Garki II Commercial Plaza | Hotline: +234 802 112 4432 | abuja.ops@antiriskng.com\n` +
             `• *Calabar Command (Ndidem Usang Iso)*: Suite 12, Ndidem Usang Iso Road | Hotline: +234 805 731 5680 | calabar.ops@antiriskng.com\n` +
             `• *Oyo Office (Ibadan)*: Sector 3, Ring Road Industrial Estate | Hotline: +234 802 112 4435 | oyo.ops@antiriskng.com\n` +
             `• *Abia Hub (Aba)*: Aba-Owerri Road Express Sector | Hotline: +234 809 334 7768 | abia.ops@antiriskng.com\n\n` +
             `Please ask me anything about our specific addresses, active response telephone lines, guard vetting standards, K-9 units, CCTV installations, or VIP armed escorts, and I will supply full details immediately.`,
      triggerContactForm: true
    };
  };
 
   try {
     const ai = getGeminiClient();
     if (!ai) {
       console.log("Gemini client not initialized, running high-quality rule-based dispatcher response.");
       // Small simulated response delay for natural chat experience
       await new Promise((resolve) => setTimeout(resolve, 800));
       const fallback = getFallbackResponse(message);
       return res.json({ response: fallback.response, triggerContactForm: fallback.triggerContactForm, source: "Officer Grace | Dispatch" });
     }
 
     // Format chat history for Gemini system instructions
     const formattedHistory = Array.isArray(history) 
       ? history.map((h: any) => `${h.sender === "user" ? "Client" : "Officer Grace"}: ${h.text}`).join("\n")
       : "";
 
     const prompt = `You are Officer Grace, an elite customer support dispatcher and security assistant at Anti-Risk Security Services in Nigeria. 
Your tone must be professional, polite, highly reassuring, vigilant, and structured. 

SERVICES KNOWLEDGE BASE:
1. Manned Guard Force: 100% vetted, NSCDC-certified, fingerprint vetted, police record checked. Deployed with real-time RFID patrol clocking logs hourly to prevent sleeping or negligence. Backed by 24/7 supervisor patrols and armed quick response teams.
2. VIP Escort & Convoy: Elite Close Protection Officers (CPOs) integrated with Mobile Police (MOPOL) forces under licensed security clearance. Uses secure, unmarked, or armored chase vehicles. Reassuring, tactical, pre-route audits completed before travel.
3. Electronic Alarm & CCTV: Ultra-HD infrared night-vision CCTV with AI facial and vehicle plate recognition, laser perimeter tripwires, thermal sensors, remote monitoring active control center.
4. Maritime & Vessel Protection: Secure maritime escorts for logistics vessels, ports, inland waterways, and offshore terminals. Handled in sync with our Calabar and Port Harcourt regional commands.
5. K-9 Scent Squad: Purebred German Shepherds, Belgian Malinois, Rottweilers. Certified in explosive/weapon detection, narcotics sweeps, and active perimeter tracking. Deployed with certified professional handlers.
6. Guard Training Academy: Elite physical camp and physical/cognitive vetting led by retired Nigerian Armed Forces officers. Includes physical combat, fire safety, corporate courtesy, first-aid CPR.

FAQ KNOWLEDGE BASE:
- How are guards monitored during night shifts? We mount RFID perimeter patrol tags around the client's site. Guards must physically tap their tracking clocks hourly, which uploads real-time logs to our HQ.
- What happens in case of a distress signal? Personnel deploy panic transmitters. Triggering this sends instant site coordinate signals to our nearest armed quick-response supervisor squad, who arrives within minutes.
- Vetting Criteria: Nigerian citizen (21-35 years old), WAEC/NECO/SSCE minimum qualification, Height: Male >= 1.72m, Female >= 1.65m, two high-standing guarantors, clean police record.

REGIONAL HUBS DIRECTORY:
- Lagos Headquarters (Ikeja): Plot 15, Alhaji Hussein Street, Ikeja, Lagos State, Nigeria. Phone: +234 805 731 5673. Email: lagos.ops@antiriskng.com. Commander Samuel Adebayo. 150+ Guards, 24 Patrol Units.
- Abuja Regional Command (Garki): Suite 4A, Garki II Commercial Plaza, Area 11, Garki, Abuja, Nigeria. Phone: +234 802 112 4432. Email: abuja.ops@antiriskng.com. Superintendent Ibrahim Yusuf. 80+ Guards, 12 Patrol Units.
- Port Harcourt Maritime (Trans-Amadi): Trans-Amadi Industrial Layout, Port Harcourt, Rivers State, Nigeria. Phone: +234 805 731 5680. Email: calabar.ops@antiriskng.com. (Port Harcourt works in sync with Calabar operations).
- Calabar South-South Command (Ndidem Usang Iso): Suite 12, Ndidem Usang Iso Road, Calabar, Cross River State, Nigeria. Phone: +234 805 731 5680. Email: calabar.ops@antiriskng.com. Captain Effiong Edet. 50+ Guards, 8 Patrol Units.
- Oyo Western Sector (Ibadan): Sector 3, Ring Road Industrial Estate, Ibadan, Oyo State, Nigeria. Phone: +234 802 112 4435. Email: oyo.ops@antiriskng.com. Assistant Commander Segun Ojo. 65+ Guards, 10 Patrol Units.
- Abia Eastern Command (Aba): Aba-Owerri Road Express Sector, Aba, Abia State, Nigeria. Phone: +234 809 334 7768. Email: abia.ops@antiriskng.com. Commander Kenneth Nwachukwu. 90+ Guards, 14 Patrol Units.

GOAL & BEHAVIOR:
- Answer inquiries accurately using this knowledge base. Be highly informative, polite, reassuring, and structured (use bold text, lists, and clear bullet points).
- Speak in an authoritative yet extremely polite Nigerian-corporate tone (e.g., 'Good day', 'Highly welcome', 'Sir/Ma').
- FALLBACK TRIGGER: If the client asks a question you cannot answer using the provided facts, or if they ask for highly complex corporate biddings, custom multi-site deployment contracts, or specific confidential rates, set "triggerContactForm" to true in your JSON response and politely guide them to submit their specifications on the official Contact Form so our commanders can draft a formal proposal.

PREVIOUS CHAT HISTORY:
${formattedHistory}

NEW USER MESSAGE:
${message}

Please generate your response.`;

     const response = await ai.models.generateContent({
       model: "gemini-3.6-flash",
       contents: prompt,
       config: {
         systemInstruction: "You are Officer Grace, the premier Anti-Risk security assistant and lead dispatcher at the Anti-Risk Security Command Center in Nigeria. You assist corporate and private entities with protection logistics, security dog assets, armed escorts, and electronic surveillance inquiries with precise facts, contact details, and locations.",
         temperature: 0.7,
         responseMimeType: "application/json",
         responseSchema: {
           type: Type.OBJECT,
           properties: {
             response: { 
               type: Type.STRING, 
               description: "The highly informative, polite, professional, and detailed answer from Officer Grace." 
             },
             triggerContactForm: { 
               type: Type.BOOLEAN, 
               description: "Set to true if you do not have a specific/accurate answer, or if the client is asking for custom pricing, multi-site deployments, or high-level armed security operations that require direct consultation with the security commanders." 
             }
           },
           required: ["response", "triggerContactForm"]
         }
       }
     });

     const responseText = response.text;
     if (responseText && responseText.trim()) {
       const parsedData = JSON.parse(responseText.trim());
       return res.json({ 
         response: parsedData.response || "", 
         triggerContactForm: parsedData.triggerContactForm || false,
         source: "Officer Grace | Dispatch" 
       });
     } else {
       throw new Error("Received empty response text from Gemini.");
     }

   } catch (error: any) {
     const isQuotaError = error?.status === 429 || error?.message?.includes("429") || error?.message?.includes("RESOURCE_EXHAUSTED");
     if (isQuotaError) {
       console.warn("Gemini API quota reached (429). Serving rule-based dispatch response.");
     } else {
       console.warn("Gemini support assistant unavailable, serving rule-based response:", error?.message || error);
     }
     const fallback = getFallbackResponse(message);
     return res.json({ response: fallback.response, triggerContactForm: fallback.triggerContactForm, source: "Officer Grace | Dispatch" });
   }
});

// Configure Vite and static assets routing
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Development Mode: Mount Vite's middleware for instant updates and asset serving
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production Mode: Serve compiled assets directly
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
