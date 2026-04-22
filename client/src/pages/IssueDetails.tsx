import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Navbar from "../components/Navbar";
import ConfirmModal from "../components/ConfirmModal";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  fetchIssueById,
  updateExistingIssue,
  deleteExistingIssue,
  fetchIssues,
  resetIssueState,
} from "../features/issues/issueSlice";
import type { IssuePriority, IssueStatus } from "../types/issue";

function IssueDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { issue, isLoading, isError, message } = useAppSelector(
    (state) => state.issues,
  );

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<IssueStatus>("Open");
  const [priority, setPriority] = useState<IssuePriority>("Medium");
  const [severity, setSeverity] = useState("");

  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [confirmStatusOpen, setConfirmStatusOpen] = useState(false);
  const [pendingSubmit, setPendingSubmit] = useState<null | (() => void)>(null);

  useEffect(() => {
    if (id) dispatch(fetchIssueById(id));

    return () => {
      dispatch(resetIssueState());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (issue) {
      setTitle(issue.title || "");
      setDescription(issue.description || "");
      setStatus(issue.status || "Open");
      setPriority(issue.priority || "Medium");
      setSeverity(issue.severity || "");
    }
  }, [issue]);

  const submitUpdate = async () => {
    if (!id) return;

    const resultAction = await dispatch(
      updateExistingIssue({
        id,
        issueData: { title, description, status, priority, severity },
      }),
    );

    if (updateExistingIssue.fulfilled.match(resultAction)) {
      setIsEditing(false);
      dispatch(fetchIssueById(id));
      dispatch(fetchIssues());
    }
  };

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();

    const originalStatus = issue?.status;
    const statusChangedToSensitive =
      status !== originalStatus &&
      (status === "Resolved" || status === "Closed");

    if (statusChangedToSensitive) {
      setPendingSubmit(() => submitUpdate);
      setConfirmStatusOpen(true);
      return;
    }

    await submitUpdate();
  };

  const handleDelete = async () => {
    if (!id) return;

    const resultAction = await dispatch(deleteExistingIssue(id));

    if (deleteExistingIssue.fulfilled.match(resultAction)) {
      dispatch(fetchIssues());
      navigate("/dashboard");
    }
  };

  if (isLoading && !issue) {
    return (
      <>
        <Navbar />
        <Container sx={{ py: 5 }}>
          <Alert severity="info">Loading issue details...</Alert>
        </Container>
      </>
    );
  }

  if (isError && !issue) {
    return (
      <>
        <Navbar />
        <Container sx={{ py: 5 }}>
          <Alert severity="error">{message}</Alert>
        </Container>
      </>
    );
  }

  if (!issue) {
    return (
      <>
        <Navbar />
        <Container sx={{ py: 5 }}>
          <Alert severity="warning">Issue not found.</Alert>
        </Container>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Stack spacing={3}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ justifyContent: "space-between" }}
          >
            <Box>
              <Typography variant="h3" gutterBottom>
                {isEditing ? "Edit Issue" : issue.title}
              </Typography>
              {!isEditing && (
                <Typography color="text.secondary">
                  {issue.description}
                </Typography>
              )}
            </Box>

            <Button component={RouterLink} to="/dashboard" variant="outlined">
              Back to Dashboard
            </Button>
          </Stack>

          {isError && <Alert severity="error">{message}</Alert>}

          {!isEditing ? (
            <Card>
              <CardContent sx={{ p: 4 }}>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Card sx={{ boxShadow: "none" }}>
                      <CardContent>
                        <Typography color="text.secondary">Status</Typography>
                        <Chip
                          label={issue.status}
                          color="primary"
                          sx={{ mt: 1 }}
                        />
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid size={{ xs: 12, md: 4 }}>
                    <Card sx={{ boxShadow: "none" }}>
                      <CardContent>
                        <Typography color="text.secondary">Priority</Typography>
                        <Chip
                          label={issue.priority}
                          color="warning"
                          sx={{ mt: 1 }}
                        />
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid size={{ xs: 12, md: 4 }}>
                    <Card sx={{ boxShadow: "none" }}>
                      <CardContent>
                        <Typography color="text.secondary">Severity</Typography>
                        <Typography sx={{ mt: 1 }}>
                          {issue.severity || "Not specified"}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <Card sx={{ boxShadow: "none" }}>
                      <CardContent>
                        <Typography color="text.secondary">
                          Created At
                        </Typography>
                        <Typography sx={{ mt: 1 }}>
                          {issue.createdAt
                            ? new Date(issue.createdAt).toLocaleString()
                            : "-"}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <Card sx={{ boxShadow: "none" }}>
                      <CardContent>
                        <Typography color="text.secondary">
                          Updated At
                        </Typography>
                        <Typography sx={{ mt: 1 }}>
                          {issue.updatedAt
                            ? new Date(issue.updatedAt).toLocaleString()
                            : "-"}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>

                <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
                  <Button
                    variant="contained"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Issue
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => setConfirmDeleteOpen(true)}
                  >
                    Delete Issue
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent sx={{ p: 4 }}>
                <Box component="form" onSubmit={handleUpdate}>
                  <Stack spacing={2.5}>
                    <TextField
                      label="Title"
                      value={title}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setTitle(e.target.value)
                      }
                      fullWidth
                    />

                    <TextField
                      label="Description"
                      value={description}
                      onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                        setDescription(e.target.value)
                      }
                      multiline
                      rows={5}
                      fullWidth
                    />

                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                          select
                          label="Status"
                          value={status}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setStatus(e.target.value as IssueStatus)
                          }
                          fullWidth
                        >
                          <MenuItem value="Open">Open</MenuItem>
                          <MenuItem value="In Progress">In Progress</MenuItem>
                          <MenuItem value="Resolved">Resolved</MenuItem>
                          <MenuItem value="Closed">Closed</MenuItem>
                        </TextField>
                      </Grid>

                      <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                          select
                          label="Priority"
                          value={priority}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setPriority(e.target.value as IssuePriority)
                          }
                          fullWidth
                        >
                          <MenuItem value="Low">Low</MenuItem>
                          <MenuItem value="Medium">Medium</MenuItem>
                          <MenuItem value="High">High</MenuItem>
                        </TextField>
                      </Grid>

                      <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                          label="Severity"
                          value={severity}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setSeverity(e.target.value)
                          }
                          fullWidth
                        />
                      </Grid>
                    </Grid>

                    <Stack direction="row" spacing={2}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="success"
                        disabled={isLoading}
                      >
                        {isLoading ? "Saving..." : "Save Changes"}
                      </Button>

                      <Button
                        variant="outlined"
                        onClick={() => {
                          setIsEditing(false);
                          setTitle(issue.title || "");
                          setDescription(issue.description || "");
                          setStatus(issue.status || "Open");
                          setPriority(issue.priority || "Medium");
                          setSeverity(issue.severity || "");
                        }}
                      >
                        Cancel
                      </Button>
                    </Stack>
                  </Stack>
                </Box>
              </CardContent>
            </Card>
          )}
        </Stack>
      </Container>

      <ConfirmModal
        open={confirmDeleteOpen}
        title="Delete issue?"
        message="This action cannot be undone. The selected issue will be permanently removed."
        confirmText="Delete"
        cancelText="Cancel"
        danger
        onConfirm={() => {
          setConfirmDeleteOpen(false);
          handleDelete();
        }}
        onCancel={() => setConfirmDeleteOpen(false)}
      />

      <ConfirmModal
        open={confirmStatusOpen}
        title={`Mark issue as ${status}?`}
        message={`You are changing this issue status to "${status}". Please confirm this status update.`}
        confirmText="Confirm Status Change"
        cancelText="Cancel"
        onConfirm={() => {
          setConfirmStatusOpen(false);
          pendingSubmit?.();
          setPendingSubmit(null);
        }}
        onCancel={() => {
          setConfirmStatusOpen(false);
          setPendingSubmit(null);
        }}
      />
    </>
  );
}

export default IssueDetails;
