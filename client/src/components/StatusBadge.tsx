import type { IssueStatus } from "../types/issue";

interface StatusBadgeProps {
  status: IssueStatus;
}

function StatusBadge({ status }: StatusBadgeProps) {
  let backgroundColor = "#e5e7eb";

  if (status === "Open") backgroundColor = "#dbeafe";
  if (status === "In Progress") backgroundColor = "#fed7aa";
  if (status === "Resolved") backgroundColor = "#bbf7d0";
  if (status === "Closed") backgroundColor = "#e5e7eb";

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
      {status}
    </span>
  );
}

export default StatusBadge;