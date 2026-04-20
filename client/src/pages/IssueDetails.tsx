import { useParams, Link } from "react-router-dom";

function IssueDetails() {
  const { id } = useParams();

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Issue Details</h1>
      <p>Issue ID: {id}</p>
      <p>This page will show full issue information.</p>
      <Link to="/dashboard">Back to Dashboard</Link>
    </div>
  );
}

export default IssueDetails;