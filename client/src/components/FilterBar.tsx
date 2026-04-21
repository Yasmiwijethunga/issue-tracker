interface FilterBarProps {
  status: string;
  priority: string;
  onStatusChange: (value: string) => void;
  onPriorityChange: (value: string) => void;
}

function FilterBar({
  status,
  priority,
  onStatusChange,
  onPriorityChange,
}: FilterBarProps) {
  return (
    <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        style={{ padding: "10px", borderRadius: "8px" }}
      >
        <option>All Statuses</option>
        <option>Open</option>
        <option>In Progress</option>
        <option>Resolved</option>
        <option>Closed</option>
      </select>

      <select
        value={priority}
        onChange={(e) => onPriorityChange(e.target.value)}
        style={{ padding: "10px", borderRadius: "8px" }}
      >
        <option>All Priorities</option>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
    </div>
  );
}

export default FilterBar;