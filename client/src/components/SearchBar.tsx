interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div style={{ marginBottom: "12px" }}>
      <input
        type="text"
        placeholder="Search issues..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
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