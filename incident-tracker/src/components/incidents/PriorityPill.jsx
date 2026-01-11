import { cn } from "@/lib/utils";

const STYLES_BY_PRIORITY = {
  low: "bg-slate-50 text-slate-700 border-slate-200",
  medium: "bg-blue-50 text-blue-700 border-blue-200",
  high: "bg-purple-50 text-purple-700 border-purple-200",
};

function formatPriority(priority) {
  if (!priority) return "Unknown";
  return priority.charAt(0).toUpperCase() + priority.slice(1);
}

export function PriorityPill({ priority = "medium" }) {
  const classes =
    STYLES_BY_PRIORITY[priority] ??
    "bg-muted text-muted-foreground border-border";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        classes
      )}
    >
      {formatPriority(priority)}
    </span>
  );
}
