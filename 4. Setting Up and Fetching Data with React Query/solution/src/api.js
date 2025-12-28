function delay(ms, { signal } = {}) {
  return new Promise((resolve, reject) => {
    const id = window.setTimeout(resolve, ms);

    function onAbort() {
      window.clearTimeout(id);
      reject(new DOMException("Aborted", "AbortError"));
    }

    if (signal) {
      if (signal.aborted) onAbort();
      signal.addEventListener("abort", onAbort, { once: true });
    }
  });
}

export async function fetchIncidents({ signal, mode }) {
  await delay(650, { signal });

  if (mode === "fail") {
    throw new Error("Network error: could not fetch incidents.");
  }

  if (mode === "empty") {
    return [];
  }

  return [
    { id: "inc-101", title: "Login latency spike", severity: "high" },
    { id: "inc-102", title: "Webhook retries elevated", severity: "medium" },
    {
      id: "inc-103",
      title: "Minor UI regression in dashboard",
      severity: "low",
    },
  ];
}
