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
import Pagination from "../components/Pagination";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchIssues, resetIssueState } from "../features/issues/issueSlice";
import issueService from "../features/issues/issueService";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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
    setCurrentPage(1); // Reset to page 1 when filters change
    dispatch(fetchIssues({ search: debouncedSearch, status, priority, page: 1 }));
  }, [dispatch, debouncedSearch, status, priority]);

  // Fetch pagination data whenever page changes
  useEffect(() => {
    if (currentPage > 1) {
      dispatch(fetchIssues({ search: debouncedSearch, status, priority, page: currentPage }));
    }
  }, [dispatch, currentPage, debouncedSearch, status, priority]);

  // Get pagination metadata
  useEffect(() => {
    const getPaginationData = async () => {
      try {
        const response = await issueService.getIssues({
          search: debouncedSearch,
          status: status !== "All Statuses" ? status : undefined,
          priority: priority !== "All Priorities" ? priority : undefined,
          page: currentPage,
        });
        setTotalPages(response.pagination.pages);
      } catch (error) {
        console.error("Failed to fetch pagination data:", error);
        // Estimate pages based on current issues length
        setTotalPages(issues.length >= 10 ? currentPage + 1 : currentPage);
      }
    };

    getPaginationData();
  }, [debouncedSearch, status, priority, currentPage, issues.length]);

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
          <Card sx={{ borderRadius: { xs: 1, md: 1 } }}>
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
                        px: 3,
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
                  fetchIssues({ 
                    search: debouncedSearch, 
                    status, 
                    priority,
                    page: currentPage 
                  }),
                );
              }}
            />
          )}

          {/* States */}
          {isLoading && <Alert severity="info">Loading issues...</Alert>}
          {isError && <Alert severity="error">{message}</Alert>}

          {!isLoading && !isError && issues.length === 0 && (
            <Card sx={{ borderRadius: 2 }}>
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

              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  isLoading={isLoading}
                />
              )}
            </Stack>
          )}
        </Stack>
      </Container>
    </>
  );
}

const statCardSx = {
  borderRadius: 1,
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
  borderRadius: "12px",
  display: "grid",
  placeItems: "center",
  background: "rgba(59,130,246,0.16)",
  color: "#60a5fa",
};

const iconBoxOrange = {
  width: 52,
  height: 52,
  borderRadius: "12px",
  display: "grid",
  placeItems: "center",
  background: "rgba(245,158,11,0.16)",
  color: "#fbbf24",
};

const iconBoxGreen = {
  width: 52,
  height: 52,
  borderRadius: "12px",
  display: "grid",
  placeItems: "center",
  background: "rgba(34,197,94,0.16)",
  color: "#4ade80",
};

const iconBoxSlate = {
  width: 52,
  height: 52,
  borderRadius: "12px",
  display: "grid",
  placeItems: "center",
  background: "rgba(148,163,184,0.16)",
  color: "#cbd5e1",
};

export default Dashboard;
