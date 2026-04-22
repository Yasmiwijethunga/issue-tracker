import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import BugReportRoundedIcon from "@mui/icons-material/BugReportRounded";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import Navbar from "../components/Navbar";
import IssueCard from "../components/IssueCard";
import IssueForm from "../components/IssueForm";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchIssues, resetIssueState } from "../features/issues/issueSlice";

function Dashboard() {
  const dispatch = useAppDispatch();
  const { issues, isLoading, isError, message } = useAppSelector(
    (state) => state.issues,
  );

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [status, setStatus] = useState("All Statuses");
  const [priority, setPriority] = useState("All Priorities");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(resetIssueState());
  }, [dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    dispatch(fetchIssues({ search: debouncedSearch, status, priority }));
  }, [dispatch, debouncedSearch, status, priority]);

  const openCount = useMemo(
    () => issues.filter((issue) => issue.status === "Open").length,
    [issues],
  );

  const inProgressCount = useMemo(
    () => issues.filter((issue) => issue.status === "In Progress").length,
    [issues],
  );

  const resolvedCount = useMemo(
    () => issues.filter((issue) => issue.status === "Resolved").length,
    [issues],
  );

  const closedCount = useMemo(
    () => issues.filter((issue) => issue.status === "Closed").length,
    [issues],
  );

  return (
    <>
      <Navbar />

      <Container
        maxWidth="xl"
        sx={{
          pt: { xs: 4, md: 5 },
          pb: { xs: 5, md: 6 },
        }}
      >
        <Stack spacing={3.5}>
          {/* Hero */}
          <Card
            sx={{
              borderRadius: { xs: 5, md: 8 },
              overflow: "hidden",
              background:
                "linear-gradient(135deg, rgba(37,99,235,0.95) 0%, rgba(124,58,237,0.95) 100%)",
              border: "1px solid rgba(255,255,255,0.10)",
              boxShadow: "0 20px 45px rgba(0,0,0,0.24)",
            }}
          >
            <CardContent
              sx={{
                px: { xs: 3, md: 5 },
                py: { xs: 3.5, md: 4.5 },
              }}
            >
              <Stack spacing={2}>
                <Chip
                  label="Issue Operations Center"
                  sx={{
                    alignSelf: "flex-start",
                    backgroundColor: "rgba(255,255,255,0.18)",
                    color: "#fff",
                    fontWeight: 700,
                    backdropFilter: "blur(8px)",
                  }}
                />

                <Typography
                  variant="h2"
                  sx={{
                    fontSize: {
                      xs: "2rem",
                      sm: "2.4rem",
                      md: "3rem",
                      lg: "3.4rem",
                    },
                    lineHeight: 1.05,
                    color: "#fff",
                    maxWidth: 760,
                    letterSpacing: "-0.03em",
                  }}
                >
                  Track, prioritize, and resolve issues with confidence.
                </Typography>

                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.86)",
                    fontSize: { xs: "1rem", md: "1.05rem" },
                    maxWidth: 610,
                    lineHeight: 1.7,
                  }}
                >
                  Manage issue workflows in a polished dashboard built for
                  clarity, speed, and professional team operations.
                </Typography>
              </Stack>
            </CardContent>
          </Card>

          {/* Stats */}
          <Grid container spacing={2.5}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={statCardSx}>
                <CardContent sx={{ p: 3 }}>
                  <Stack
                    direction="row"
                    sx={{
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography color="text.secondary" gutterBottom>
                        Open Issues
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: { xs: "2.4rem", md: "2.8rem" },
                          fontWeight: 800,
                        }}
                      >
                        {openCount}
                      </Typography>
                    </Box>
                    <Box sx={iconBoxBlue}>
                      <BugReportRoundedIcon />
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={statCardSx}>
                <CardContent sx={{ p: 3 }}>
                  <Stack
                    direction="row"
                    sx={{
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography color="text.secondary" gutterBottom>
                        In Progress
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: { xs: "2.4rem", md: "2.8rem" },
                          fontWeight: 800,
                        }}
                      >
                        {inProgressCount}
                      </Typography>
                    </Box>
                    <Box sx={iconBoxOrange}>
                      <AutorenewRoundedIcon />
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={statCardSx}>
                <CardContent sx={{ p: 3 }}>
                  <Stack
                    direction="row"
                    sx={{
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography color="text.secondary" gutterBottom>
                        Resolved
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: { xs: "2.4rem", md: "2.8rem" },
                          fontWeight: 800,
                        }}
                      >
                        {resolvedCount}
                      </Typography>
                    </Box>
                    <Box sx={iconBoxGreen}>
                      <CheckCircleRoundedIcon />
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={statCardSx}>
                <CardContent sx={{ p: 3 }}>
                  <Stack
                    direction="row"
                    sx={{
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography color="text.secondary" gutterBottom>
                        Closed
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: { xs: "2.4rem", md: "2.8rem" },
                          fontWeight: 800,
                        }}
                      >
                        {closedCount}
                      </Typography>
                    </Box>
                    <Box sx={iconBoxSlate}>
                      <TaskAltRoundedIcon />
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Toolbar */}
          <Card sx={{ borderRadius: { xs: 5, md: 6 } }}>
            <CardContent sx={{ p: { xs: 2, md: 2.5 } }}>
              <Stack spacing={2}>
                <Grid container spacing={2} sx={{ alignItems: "center" }}>
                  <Grid size={{ xs: 12, lg: 7 }}>
                    <TextField
                      label="Search issues"
                      placeholder="Search by title..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      fullWidth
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6, lg: 2 }}>
                    <TextField
                      select
                      label="Status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      fullWidth
                    >
                      <MenuItem value="All Statuses">All Statuses</MenuItem>
                      <MenuItem value="Open">Open</MenuItem>
                      <MenuItem value="In Progress">In Progress</MenuItem>
                      <MenuItem value="Resolved">Resolved</MenuItem>
                      <MenuItem value="Closed">Closed</MenuItem>
                    </TextField>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6, lg: 2 }}>
                    <TextField
                      select
                      label="Priority"
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                      fullWidth
                    >
                      <MenuItem value="All Priorities">All Priorities</MenuItem>
                      <MenuItem value="Low">Low</MenuItem>
                      <MenuItem value="Medium">Medium</MenuItem>
                      <MenuItem value="High">High</MenuItem>
                    </TextField>
                  </Grid>

                  <Grid size={{ xs: 12, lg: 1 }}>
                    <Button
                      variant="contained"
                      startIcon={<AddRoundedIcon />}
                      onClick={() => setShowForm((prev) => !prev)}
                      sx={{
                        minHeight: 56,
                        width: "100%",
                        px: 2,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {showForm ? "Hide Form" : "New Issue"}
                    </Button>
                  </Grid>
                </Grid>

                <Divider sx={{ borderColor: "rgba(255,255,255,0.06)" }} />

                <Stack
                  direction="row"
                  spacing={1.2}
                  useFlexGap
                  sx={{ flexWrap: "wrap" }}
                >
                  <Chip label={`Total: ${issues.length}`} sx={toolbarChipSx} />
                  <Chip label={`Open: ${openCount}`} sx={toolbarChipSx} />
                  <Chip
                    label={`In Progress: ${inProgressCount}`}
                    sx={toolbarChipSx}
                  />
                  <Chip
                    label={`Resolved: ${resolvedCount}`}
                    sx={toolbarChipSx}
                  />
                  <Chip label={`Closed: ${closedCount}`} sx={toolbarChipSx} />
                </Stack>
              </Stack>
            </CardContent>
          </Card>

          {/* Create Form */}
          {showForm && (
            <IssueForm
              onSuccess={() => {
                setShowForm(false);
                dispatch(
                  fetchIssues({ search: debouncedSearch, status, priority }),
                );
              }}
            />
          )}

          {/* States */}
          {isLoading && <Alert severity="info">Loading issues...</Alert>}
          {isError && <Alert severity="error">{message}</Alert>}

          {!isLoading && !isError && issues.length === 0 && (
            <Card sx={{ borderRadius: 5 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" gutterBottom>
                  No issues found
                </Typography>
                <Typography color="text.secondary">
                  Try changing your filters or create a new issue to get
                  started.
                </Typography>
              </CardContent>
            </Card>
          )}

          {/* Issues */}
          {!isLoading && !isError && issues.length > 0 && (
            <Stack spacing={2.5}>
              <Box sx={{ pt: 0.5 }}>
                <Typography variant="h4" gutterBottom>
                  Recent Issues
                </Typography>
                <Typography color="text.secondary">
                  Review, update, and manage reported issues from one place.
                </Typography>
              </Box>

              <Grid container spacing={3}>
                {issues.map((issue) => (
                  <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={issue._id}>
                    <IssueCard issue={issue} />
                  </Grid>
                ))}
              </Grid>
            </Stack>
          )}
        </Stack>
      </Container>
    </>
  );
}

const statCardSx = {
  borderRadius: 5,
  height: "100%",
  minHeight: 140,
};

const toolbarChipSx = {
  backgroundColor: "rgba(255,255,255,0.05)",
  color: "text.primary",
  border: "1px solid rgba(255,255,255,0.08)",
  fontWeight: 700,
};

const iconBoxBlue = {
  width: 52,
  height: 52,
  borderRadius: "16px",
  display: "grid",
  placeItems: "center",
  background: "rgba(59,130,246,0.16)",
  color: "#60a5fa",
};

const iconBoxOrange = {
  width: 52,
  height: 52,
  borderRadius: "16px",
  display: "grid",
  placeItems: "center",
  background: "rgba(245,158,11,0.16)",
  color: "#fbbf24",
};

const iconBoxGreen = {
  width: 52,
  height: 52,
  borderRadius: "16px",
  display: "grid",
  placeItems: "center",
  background: "rgba(34,197,94,0.16)",
  color: "#4ade80",
};

const iconBoxSlate = {
  width: 52,
  height: 52,
  borderRadius: "16px",
  display: "grid",
  placeItems: "center",
  background: "rgba(148,163,184,0.16)",
  color: "#cbd5e1",
};

export default Dashboard;
