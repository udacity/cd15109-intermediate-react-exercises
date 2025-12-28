export const tickets = [
  {
    id: "t-100",
    title: "Login button does nothing",
    status: "open",
    activity: ["Reported by support", "Reproduced on Chrome"],
  },
  {
    id: "t-101",
    title: "Profile page loads slowly",
    status: "open",
    activity: ["Added logs", "Suspect large payload"],
  },
  {
    id: "t-102",
    title: "Typo in billing settings",
    status: "closed",
    activity: ["Fixed copy", "Shipped in v1.0.3"],
  },
];

export function getTicketById(id) {
  return tickets.find((t) => t.id === id) ?? null;
}
