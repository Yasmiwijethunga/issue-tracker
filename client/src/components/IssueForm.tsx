import { useState, type FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { createNewIssue } from "../features/issues/issueSlice";
import type { IssuePriority, IssueStatus } from "../types/issue";

interface IssueFormProps {
  onSuccess?: () => void;
}

function IssueForm({ onSuccess }: IssueFormProps) {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.issues);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<IssueStatus>("Open");
  const [priority, setPriority] = useState<IssuePriority>("Medium");
  const [severity, setSeverity] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      setError("Title and description are required.");
      return;
    }

    setError("");

    const resultAction = await dispatch(
      createNewIssue({
        title,
        description,
        status,
        priority,
        severity,
      })
    );

    if (createNewIssue.fulfilled.match(resultAction)) {
      setTitle("");
      setDescription("");
      setStatus("Open");
      setPriority("Medium");
      setSeverity("");

      if (onSuccess) {
        onSuccess();
      }
    } else {
      setError(
        (resultAction.payload as string) || "Failed to create issue."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2 style={{ marginTop: 0 }}>Create New Issue</h2>

      <div style={fieldStyle}>
        <label style={labelStyle}>Title</label>
        <input
          type="text"
          placeholder="Enter issue title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle}
        />
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>Description</label>
        <textarea
          placeholder="Enter issue description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          style={textareaStyle}
        />
      </div>

      <div style={rowStyle}>
        <div style={fieldStyle}>
          <label style={labelStyle}>Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as IssueStatus)}
            style={inputStyle}
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as IssuePriority)}
            style={inputStyle}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>Severity</label>
        <input
          type="text"
          placeholder="Optional severity"
          value={severity}
          onChange={(e) => setSeverity(e.target.value)}
          style={inputStyle}
        />
      </div>

      {error && <p style={errorStyle}>{error}</p>}

      <button type="submit" style={buttonStyle} disabled={isLoading}>
        {isLoading ? "Creating..." : "Create Issue"}
      </button>
    </form>
  );
}

const formStyle: React.CSSProperties = {
  border: "1px solid #ddd",
  borderRadius: "12px",
  padding: "20px",
  marginBottom: "24px",
  backgroundColor: "#fff",
  maxWidth: "700px",
};

const fieldStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  marginBottom: "14px",
};

const rowStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "12px",
};

const labelStyle: React.CSSProperties = {
  marginBottom: "6px",
  fontWeight: 600,
};

const inputStyle: React.CSSProperties = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
};

const textareaStyle: React.CSSProperties = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  resize: "vertical",
};

const buttonStyle: React.CSSProperties = {
  padding: "12px 16px",
  border: "none",
  borderRadius: "8px",
  backgroundColor: "#2563eb",
  color: "#fff",
  fontWeight: 600,
  cursor: "pointer",
};

const errorStyle: React.CSSProperties = {
  color: "red",
  marginTop: "0",
};

export default IssueForm;