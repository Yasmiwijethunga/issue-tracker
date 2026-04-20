function SearchBar() {
  return (
    <div style={{ marginBottom: "12px" }}>
      <input
        type="text"
        placeholder="Search issues..."
        style={{
          padding: "10px",
          width: "300px",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />
    </div>
  );
}

export default SearchBar;