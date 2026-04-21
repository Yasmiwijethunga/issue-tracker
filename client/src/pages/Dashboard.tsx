import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import Pagination from "../components/Pagination";
import IssueCard from "../components/IssueCard";
import IssueForm from "../components/IssueForm";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchIssues, resetIssueState } from "../features/issues/issueSlice";

function Dashboard() {
  const dispatch = useAppDispatch();
  const { issues, isLoading, isError, message } = useAppSelector(
    (state) => state.issues
  );

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [status, setStatus] = useState("All Statuses");
  const [priority, setPriority] = useState("All Priorities");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    dispatch(fetchIssues({ search: debouncedSearch, status, priority }));

    return () => {
      dispatch(resetIssueState());
    };
  }, [dispatch, debouncedSearch, status, priority]);

  const openCount = useMemo(
    () => issues.filter((issue) => issue.status === "Open").length,
    [issues]
  );

  const inProgressCount = useMemo(
    () => issues.filter((issue) => issue.status === "In Progress").length,
    [issues]
  );

  const resolvedCount = useMemo(
    () => issues.filter((issue) => issue.status === "Resolved").length,
    [issues]
  );

  return (
    <div style={{ fontFamily: "Arial", padding: "20px" }}>
      <Navbar />
      <h1>Dashboard</h1>
      <p>Issue Tracker dashboard page</p>

      <IssueForm
        onSuccess={() => {
          dispatch(fetchIssues({ search: debouncedSearch, status, priority }));
        }}
      />

      <div style={{ display: "flex", gap: "12px", margin: "20px 0" }}>
        <div style={statCardStyle}>
          <h3>Open</h3>
          <p>{openCount}</p>
        </div>

        <div style={statCardStyle}>
          <h3>In Progress</h3>
          <p>{inProgressCount}</p>
        </div>

        <div style={statCardStyle}>
          <h3>Resolved</h3>
          <p>{resolvedCount}</p>
        </div>
      </div>

      <SearchBar value={search} onChange={setSearch} />
      <FilterBar
        status={status}
        priority={priority}
        onStatusChange={setStatus}
        onPriorityChange={setPriority}
      />

      {isLoading && <p>Loading issues...</p>}
      {isError && <p style={{ color: "red" }}>{message}</p>}
      {!isLoading && !isError && issues.length === 0 && <p>No issues found.</p>}

      <div style={{ marginTop: "20px" }}>
        {issues.map((issue) => (
          <IssueCard key={issue._id} issue={issue} />
        ))}
      </div>

      <Pagination />
    </div>
  );
}

const statCardStyle: React.CSSProperties = {
  padding: "16px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  minWidth: "120px",
};

export default Dashboard;