import { Link } from "react-router-dom";
import type { Issue } from "../types/issue";
import StatusBadge from "./StatusBadge";
import PriorityBadge from "./PriorityBadge";

interface IssueCardProps {
  issue: Issue;
}

function IssueCard({ issue }: IssueCardProps) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "16px",
        marginBottom: "16px",
      }}
    >
      <h3>{issue.title}</h3>
      <p>{issue.description}</p>

      <div style={{ display: "flex", gap: "10px", margin: "10px 0" }}>
        <StatusBadge status={issue.status} />
        <PriorityBadge priority={issue.priority} />
      </div>

      <Link to={`/issues/${issue._id}`}>View Details</Link>
    </div>
  );
}

export default IssueCard;