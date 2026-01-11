export const queryKeys = {
  incidents: () => ["incidents"],
  incident: (id) => ["incident", String(id)],
  approvals: () => ["approvals"],
  incidentActivity: (id) => ["incidentActivity", String(id)],
};
