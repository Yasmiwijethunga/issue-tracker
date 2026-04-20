function FilterBar() {
  return (
    <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
      <select style={{ padding: "10px", borderRadius: "8px" }}>
        <option>All Statuses</option>
        <option>Open</option>
        <option>In Progress</option>
        <option>Resolved</option>
        <option>Closed</option>
      </select>

      <select style={{ padding: "10px", borderRadius: "8px" }}>
        <option>All Priorities</option>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
    </div>
  );
}

export default FilterBar;