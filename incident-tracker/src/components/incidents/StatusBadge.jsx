import { cn } from "@/lib/utils";

const STYLES_BY_STATUS = {
  open: "bg-red-50 text-red-700 border-red-200",
  investigating: "bg-amber-50 text-amber-800 border-amber-200",
  resolved: "bg-emerald-50 text-emerald-800 border-emerald-200",
};

function formatStatus(status) {
  if (!status) return "Unknown";
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export function StatusBadge({ status = "open" }) {
  const classes =
    STYLES_BY_STATUS[status] ?? "bg-muted text-muted-foreground border-border";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        classes
      )}
    >
      {formatStatus(status)}
    </span>
  );
}
