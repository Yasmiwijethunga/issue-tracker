import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import Pagination from "../components/Pagination";
import IssueCard from "../components/IssueCard";
import type { Issue } from "../types/issue";

const sampleIssues: Issue[] = [
  {
    _id: "1",
    title: "Login button not working",
    description: "Users cannot log in after clicking the login button.",
    status: "Open",
    priority: "High",
  },
  {
    _id: "2",
    title: "Dashboard layout issue",
    description: "Cards overlap on smaller screens.",
    status: "In Progress",
    priority: "Medium",
  },
];

function Dashboard() {
  return (
    <div style={{ fontFamily: "Arial", padding: "20px" }}>
      <Navbar />
      <h1>Dashboard</h1>
      <p>Issue Tracker dashboard page</p>

      <div style={{ display: "flex", gap: "12px", margin: "20px 0" }}>
        <div
          style={{
            padding: "16px",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        >
          <h3>Open</h3>
          <p>1</p>
        </div>

        <div
          style={{
            padding: "16px",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        >
          <h3>In Progress</h3>
          <p>1</p>
        </div>

        <div
          style={{
            padding: "16px",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        >
          <h3>Resolved</h3>
          <p>0</p>
        </div>
      </div>

      <SearchBar />
      <FilterBar />

      <div style={{ marginTop: "20px" }}>
        {sampleIssues.map((issue) => (
          <IssueCard key={issue._id} issue={issue} />
        ))}
      </div>

      <Pagination />
    </div>
  );
}

export default Dashboard;