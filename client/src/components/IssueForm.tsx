import { useState, type FormEvent } from "react";
import {
  Alert,
  Button,
  Card,
  CardContent,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
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
      onSuccess?.();
    }
  };

  return (
    <Card>
      <CardContent sx={{ p: 3 }}>
        <Stack spacing={3}>
          <Typography variant="h4">Create New Issue</Typography>

          {error && <Alert severity="error">{error}</Alert>}

          <form onSubmit={handleSubmit}>
            <Stack spacing={2.5}>
              <TextField
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
              />

              <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                multiline
                rows={4}
              />

              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    select
                    label="Status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value as IssueStatus)}
                    fullWidth
                  >
                    <MenuItem value="Open">Open</MenuItem>
                    <MenuItem value="In Progress">In Progress</MenuItem>
                    <MenuItem value="Resolved">Resolved</MenuItem>
                    <MenuItem value="Closed">Closed</MenuItem>
                  </TextField>
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    select
                    label="Priority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as IssuePriority)}
                    fullWidth
                  >
                    <MenuItem value="Low">Low</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                  </TextField>
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    label="Severity"
                    value={severity}
                    onChange={(e) => setSeverity(e.target.value)}
                    fullWidth
                  />
                </Grid>
              </Grid>

              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={isLoading}
              >
                {isLoading ? "Creating..." : "Create Issue"}
              </Button>
            </Stack>
          </form>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default IssueForm;