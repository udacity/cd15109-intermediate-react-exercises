import { render, screen } from "@testing-library/react";
import { StatusBadge } from "./StatusBadge";

test("renders the status label", () => {
  render(<StatusBadge status="triage" />);
  expect(screen.getByText(/triage/i)).toBeInTheDocument();
});
