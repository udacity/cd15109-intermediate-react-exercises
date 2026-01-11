import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/products", () => {
    return HttpResponse.json([
      { id: "p1", name: "Widget", price: 5 },
      { id: "p2", name: "Gadget", price: 7 },
    ]);
  }),
];
