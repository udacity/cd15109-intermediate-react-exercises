let onUnauthorized = null;

export function registerUnauthorizedHandler(fn) {
  onUnauthorized = typeof fn === "function" ? fn : null;
}

export function triggerUnauthorized() {
  if (onUnauthorized) onUnauthorized();
}
