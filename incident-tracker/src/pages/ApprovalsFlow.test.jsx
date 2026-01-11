import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createMemoryRouter, Outlet, RouterProvider } from "react-router-dom";

import { ProtectedRoute } from "@/auth/ProtectedRoute";
import { ApprovalsPage } from "@/pages/ApprovalsPage";

let mockIncidents = [];

vi.mock("@/api/incidents", () => {
  return {
    fetchIncidents: vi.fn(async () => mockIncidents),
    approveIncident: vi.fn(async ({ incidentId }) => ({ id: Number(incidentId), status: "approved" })),
    rejectIncident: vi.fn(async ({ incidentId }) => ({ id: Number(incidentId), status: "open" })),
  };
});

vi.mock("@/auth/useAuth", () => {
  return {
    useAuth: () => ({
      isAuthenticated: true,
      isResolving: false,
      user: { id: "1", name: "Casey", role: "reviewer" },
      logout: vi.fn(),
      login: vi.fn(),
    }),
  };
});

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
}

function makeRouter() {
  return createMemoryRouter(
    [
      {
        path: "/",
        element: <Outlet />,
        children: [
          {
            path: "approvals",
            element: (
              <ProtectedRoute title="Approvals">
                <ApprovalsPage />
              </ProtectedRoute>
            ),
          },
          { path: "login", element: <div>Login</div> },
        ],
      },
    ],
    { initialEntries: ["/approvals"] }
  );
}

describe("Approvals flow", () => {
  beforeEach(() => {
    mockIncidents = [
      { id: 42, title: "Mobile layout overlap on iOS", status: "triage", priority: "medium" },
      { id: 7, title: "PDF export fails intermittently", status: "open", priority: "high" },
    ];
  });

  it("approves a triage item and removes it from the queue", async () => {
    const user = userEvent.setup();
    const queryClient = makeQueryClient();
    const router = makeRouter();

    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    );

    expect(await screen.findByText("Mobile layout overlap on iOS")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Approve" }));

    expect(await screen.findByText("No incidents are currently waiting for approval.")).toBeInTheDocument();
    expect(screen.queryByText("Mobile layout overlap on iOS")).not.toBeInTheDocument();
  });
});
