function IssueForm() {
  return (
    <form style={{ display: "grid", gap: "12px", maxWidth: "500px" }}>
      <input type="text" placeholder="Issue title" />
      <textarea placeholder="Issue description" rows={5} />
      <select>
        <option>Open</option>
        <option>In Progress</option>
        <option>Resolved</option>
        <option>Closed</option>
      </select>
      <select>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <button type="submit">Save Issue</button>
    </form>
  );
}

export default IssueForm;