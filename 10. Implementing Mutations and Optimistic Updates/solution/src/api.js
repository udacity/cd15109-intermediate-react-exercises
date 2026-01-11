const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let TASKS = [
  { id: "t1", title: "Review PR #184", completed: false },
  { id: "t2", title: "Write release notes", completed: true },
  { id: "t3", title: "Triage bug reports", completed: false },
];

export async function fetchTasks() {
  await sleep(300);
  return [...TASKS];
}

export async function addTask({ title }) {
  await sleep(400);

  if (!title || !title.trim()) {
    throw new Error("Title is required.");
  }

  const next = {
    id: `t${Math.random().toString(16).slice(2)}`,
    title: title.trim(),
    completed: false,
  };

  TASKS = [next, ...TASKS];
  return next;
}

export async function renameTask({ id, title }) {
  await sleep(350);

  if (!title || !title.trim()) {
    throw new Error("Title is required.");
  }

  const idx = TASKS.findIndex((t) => t.id === id);
  if (idx === -1) throw new Error("Task not found.");

  const updated = { ...TASKS[idx], title: title.trim() };
  TASKS = TASKS.map((t) => (t.id === id ? updated : t));
  return updated;
}

export async function toggleTask({ id }) {
  await sleep(350);

  const idx = TASKS.findIndex((t) => t.id === id);
  if (idx === -1) throw new Error("Task not found.");

  const shouldFail = Math.random() < 0.35;
  if (shouldFail) {
    throw new Error("Server error. Try again.");
  }

  const updated = { ...TASKS[idx], completed: !TASKS[idx].completed };
  TASKS = TASKS.map((t) => (t.id === id ? updated : t));
  return updated;
}
