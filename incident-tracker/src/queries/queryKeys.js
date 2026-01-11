export const queryKeys = {
  incidents: (filters) => {
    const status = filters?.status ?? "all";
    const q = filters?.q ?? "";
    return ["incidents", "status", String(status), "q", String(q)];
  },
  incident: (id) => ["incident", String(id)],
  approvals: () => ["approvals"],
  incidentActivity: (id) => ["incidentActivity", String(id)],
};
