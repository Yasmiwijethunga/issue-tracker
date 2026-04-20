import type { IssuePriority } from "../types/issue";

interface PriorityBadgeProps {
  priority: IssuePriority;
}

function PriorityBadge({ priority }: PriorityBadgeProps) {
  let backgroundColor = "#dcfce7";

  if (priority === "Low") backgroundColor = "#dcfce7";
  if (priority === "Medium") backgroundColor = "#fed7aa";
  if (priority === "High") backgroundColor = "#fecaca";

  return (
    <span
      style={{
        padding: "4px 10px",
        borderRadius: "999px",
        fontSize: "12px",
        fontWeight: 600,
        backgroundColor,
      }}
    >
      {priority}
    </span>
  );
}

export default PriorityBadge;