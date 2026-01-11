import { apiFetch } from "./client";

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function shouldForceFail(kind) {
  if (typeof window === "undefined") return false;

  const global = window.__FORCE_APPROVAL_FAIL__;
  if (global === "1" || global === kind) return true;

  const ss = window.sessionStorage.getItem("incident-tracker.forceApprovalFail");
  if (ss === "1" || ss === kind) return true;

  const ls = window.localStorage.getItem("incident-tracker.forceApprovalFail");
  if (ls === "1" || ls === kind) return true;

  return false;
}

export async function fetchIncidents() {
  return apiFetch("/api/incidents.json");
}

export async function fetchIncidentById(id) {
  const incidents = await fetchIncidents();
  const incident = incidents.find((i) => String(i.id) === String(id));

  if (!incident) {
    throw new Error(`Incident ${id} not found`);
  }

  return incident;
}

export async function fetchIncidentActivityById(id) {
  const all = await apiFetch("/api/incident-activity.json");
  const incidentId = Number(id);

  if (!Number.isFinite(incidentId)) {
    throw new Error("Invalid incident id");
  }

  return Array.isArray(all) ? all.filter((e) => e.incidentId === incidentId) : [];
}

export async function createIncident(payload) {
  if (!payload?.title) {
    throw new Error("Title is required");
  }

  return {
    id: Date.now(),
    title: payload.title,
    status: "open",
    priority: payload.priority ?? "medium",
  };
}

export async function addIncidentComment({ incidentId, message }) {
  if (!incidentId || !message) {
    throw new Error("Invalid comment payload");
  }

  return {
    id: Date.now(),
    incidentId,
    type: "comment",
    message,
    at: new Date().toISOString(),
  };
}

async function updateIncidentStatus({ incidentId, status, failKind }) {
  const idNum = Number(incidentId);
  if (!Number.isFinite(idNum)) {
    throw new Error("Invalid incident id");
  }

  await delay(450);

if (shouldForceFail(failKind)) {
  window.sessionStorage.removeItem("incident-tracker.forceApprovalFail");
  window.localStorage.removeItem("incident-tracker.forceApprovalFail");
  window.__FORCE_APPROVAL_FAIL__ = null;
  throw new Error("Simulated failure");
}

  return { id: idNum, status };
}

export async function approveIncident({ incidentId }) {
  return updateIncidentStatus({ incidentId, status: "approved", failKind: "approve" });
}

export async function rejectIncident({ incidentId }) {
  return updateIncidentStatus({ incidentId, status: "open", failKind: "reject" });
}
