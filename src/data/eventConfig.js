/**
 * EVENT CONFIGURATION (Source of Truth)
 * 
 * Organizers: Update this file to modify all event dates, locations,
 * rules, schedules, and club contact details across the entire landing page.
 * 
 * All placeholders are clearly indicated with [PLACEHOLDER] tags.
 */

export const EVENT_CONFIG = {
  // Brand & Creative
  title: "THE LAST CREWMATE",
  tagline: "Trust no one. Complete the mission.",
  subtitle: "Your crew. Your mission. One suspicious spaceship.",
  theme: "Among Us Collegiate Live-Action Mystery & Sabotage Event",
  statusLabel: "CREW RECRUITMENT ACTIVE // SECTOR-07",
  alertLevel: "DEFCON 2 — SUB-LIGHT TRAJECTORY",

  // Dates & Venue (Placeholders for organizers)
  eventDate: "Friday, November 14, 2026",
  eventTime: "5:30 PM – 9:30 PM (IST)",
  eventIsoDate: "2026-11-14T17:30:00+05:30",
  venue: "Central Campus Quad & Science Atrium",
  venueNote: "Check-in at Ground Level Terminal B (Sector 7)",
  expectedAttendance: "120 Recruits Max",
  admission: "Free for verified students (College ID required)",

  // Club & Contact Information
  organizer: {
    clubName: "Campus Gaming & Creative Tech Society",
    department: "Student Affairs & Interactive Media Guild",
    email: "crew-operations@campusgaming.edu",
    discordUrl: "https://discord.gg/placeholder-crew",
    instagramUrl: "https://instagram.com/placeholder_crew",
    githubUrl: "https://github.com/placeholder-crew",
    feedbackFormUrl: "https://forms.gle/placeholder-feedback"
  },

  // Event Briefing details
  briefing: {
    badge: "MISSION PARAMETERS",
    headline: "A Real-World Deception Experience",
    summary:
      "The campus has been converted into an interstellar transport vessel suffering catastrophic subsystem failures. Among the 120 crew members, rogue operatives have been covertly inserted to disrupt repairs. Will your squad decode the sabotage in time, or will the impostors vent without a trace?",
    highlights: [
      {
        label: "Squad Size",
        value: "8–10 Crewmates",
        detail: "Form your own squadron or get assigned to an elite mixed crew."
      },
      {
        label: "Mission Duration",
        value: "4 Hours Live",
        detail: "3 escalation phases across 6 physical campus task stations."
      },
      {
        label: "Role Secrecy",
        value: "Classified 100%",
        detail: "Roles distributed through encrypted NFC tags or sealed dossiers."
      },
      {
        label: "Survival Rewards",
        value: "Trophies & Swag",
        detail: "Exclusive 3D-printed crewmate trophies, club merch, and certificates."
      }
    ]
  },

  // Mission Cards
  missions: [
    {
      id: "mission-impostor",
      callsign: "OBJECTIVE 01",
      title: "Find the Impostor",
      tag: "Social Deduction",
      accent: "red",
      description:
        "Observe body language, verify alibis, and catch deceptive operatives fabricating task logs. Keep your eyes sharp—the most helpful crewmate might be the saboteur.",
      taskTypes: ["Alibi Cross-Referencing", "Surveillance Log Audits", "Behavioral Heatmaps"]
    },
    {
      id: "mission-emergency",
      callsign: "OBJECTIVE 02",
      title: "Emergency Meeting",
      tag: "Council Debate",
      accent: "gold",
      description:
        "When an alarm triggers or a crewmate goes missing, hit the Emergency Button. Enter the deliberation chamber, present evidence, and vote to eject suspected infiltrators.",
      taskTypes: ["Time-Limited Debates", "Physical Ballot Voting", "Evidence Presentation"]
    },
    {
      id: "mission-survive",
      callsign: "OBJECTIVE 03",
      title: "Survive & Complete Tasks",
      tag: "Interactive Puzzles",
      accent: "blue",
      description:
        "Fulfill live engineering challenges: reroute power circuits, calibrate campus beacons, and align reactor cores before oxygen reservoirs deplete.",
      taskTypes: ["Circuit Wire Fixing", "Reactor Sequence Timing", "Fuel Depot Logistics"]
    }
  ],

  // Event Schedule
  schedule: [
    {
      time: "17:00 – 17:30",
      phase: "PHASE 00",
      title: "Crewmate Arrival & Terminal Check-in",
      location: "Sector 7 Main Atrium",
      description: "Receive your color visor lanyard, classified role card, and campus sector map.",
      badge: "Pre-Flight"
    },
    {
      time: "17:30 – 18:00",
      phase: "PHASE 01",
      title: "Captains' Briefing & Station Walkthrough",
      location: "Auditorium Hall Alpha",
      description: "Full audio-visual briefing explaining safety protocol, referee roles, and task mechanics.",
      badge: "Briefing"
    },
    {
      time: "18:00 – 19:15",
      phase: "PHASE 02",
      title: "Campus Sabotage — Wave 1 & 2",
      location: "Science Block & Library Concourse",
      description: "Crewmates disperse to complete physical tasks. Impostors execute stealth sabotages.",
      badge: "Active Mission"
    },
    {
      time: "19:15 – 20:15",
      phase: "PHASE 03",
      title: "The Great Deliberation & Emergency Votes",
      location: "Central Amphitheater",
      description: "Emergency alarms echo. Squads assemble to review claims, dispute accusations, and vote.",
      badge: "High Alert"
    },
    {
      time: "20:15 – 21:00",
      phase: "PHASE 04",
      title: "Reactor Core Meltdown Final Stand",
      location: "Engineering Quadrangle",
      description: "The remaining crewmates must coordinate simultaneous manual stabilization overrides.",
      badge: "Climax"
    },
    {
      time: "21:00 – 21:30",
      phase: "PHASE 05",
      title: "Mission Debrief, Ejection Reveal & Prizes",
      location: "Sector 7 Main Atrium",
      description: "Impostors unmasked! Best sleuth, highest task completion, and survival awards presented.",
      badge: "Closing"
    }
  ],

  // Participation Rules
  rules: [
    {
      number: "01",
      title: "Student Verification",
      detail: "Open to all enrolled undergraduate and graduate students. Bring a valid physical or digital college ID."
    },
    {
      number: "02",
      title: "Ghost Silence Protocol",
      detail: "Eliminated crewmates (ghosts) may continue solving tasks silently, but must strictly refrain from speaking or gesturing."
    },
    {
      number: "03",
      title: "Fair Play & Physical Boundaries",
      detail: "No running in restricted lab corridors. Dedicated Game Marshals monitor each task station for sportsmanship and safety."
    },
    {
      number: "04",
      title: "Squad Formations",
      detail: "Register individually (you will be assigned to a welcoming squad) or sign up as a squad of 4 to 8 comrades."
    },
    {
      number: "05",
      title: "Smartphone Device",
      detail: "At least one member per squad must have an internet-enabled smartphone to scan task station QR checkpoints."
    },
    {
      number: "06",
      title: "Respectful Conduct",
      detail: "Deception is strictly in-game. Harassment, physical obstruction, or personal insults result in immediate disqualification."
    }
  ],

  // Frequently Asked Questions
  faqs: [
    {
      q: "Do I need prior experience playing Among Us?",
      a: "Not at all! The physical tasks and social deduction rules are taught during the 30-minute opening briefing. Anyone who enjoys puzzles and mystery games will feel right at home."
    },
    {
      q: "Can I register alone or do I need a full team?",
      a: "Both! Solo crewmates are matched with enthusiastic peers during check-in. If you have friends, specify your squad name during registration to stay together."
    },
    {
      q: "What should I wear?",
      a: "Comfortable shoes for walking across campus! Bonus points if you dress in a single solid crewmate color (Red, Cyan, Lime, Yellow, Purple, Orange)."
    },
    {
      q: "How does the registration process work?",
      a: "This demo page allows you to preview the registration card and test your student identity pass. Once official registrations open, organizers will link their verified college registration portal."
    }
  ]
};
