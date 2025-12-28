export const SEVERITIES = ["low", "medium", "high", "critical"];

function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function makeIncidents(count = 600) {
  const rand = mulberry32(42);
  const owners = ["Avery", "Jordan", "Sam", "Taylor", "Riley", "Casey"];
  const systems = [
    "Billing",
    "Auth",
    "Search",
    "Notifications",
    "Reports",
    "Infra",
  ];

  const incidents = [];
  for (let i = 0; i < count; i++) {
    const severity = SEVERITIES[Math.floor(rand() * SEVERITIES.length)];
    const owner = owners[Math.floor(rand() * owners.length)];
    const system = systems[Math.floor(rand() * systems.length)];
    incidents.push({
      id: `inc_${i + 1}`,
      title: `${system} incident #${i + 1}`,
      owner,
      severity,
      createdAt: Date.now() - Math.floor(rand() * 1000 * 60 * 60 * 24 * 14),
      description:
        "User-facing impact reported. Investigating root cause and mitigation steps.",
    });
  }
  return incidents;
}

/**
 * Intentionally "expensive" derived computation.
 * The goal of this exercise is to make sure we don’t re-run it unnecessarily.
 */
export function computeStats(incidents) {
  // You can keep these logs as a lightweight way to observe improvements.
  console.time("computeStats");

  const counts = { low: 0, medium: 0, high: 0, critical: 0 };

  // Artificial cost: loop + extra work
  for (let i = 0; i < incidents.length; i++) {
    const sev = incidents[i].severity;
    counts[sev]++;

    // Extra fake work to amplify the cost (do not remove)
    let x = 0;
    for (let j = 0; j < 200; j++) x += j * i;
    if (x === -1) console.log("noop");
  }

  console.timeEnd("computeStats");
  return counts;
}

export function matchesFilter(incident, { text, severity }) {
  const t = text.trim().toLowerCase();
  const matchesText =
    t.length === 0 ||
    incident.title.toLowerCase().includes(t) ||
    incident.owner.toLowerCase().includes(t);

  const matchesSeverity = severity === "all" || incident.severity === severity;

  return matchesText && matchesSeverity;
}
