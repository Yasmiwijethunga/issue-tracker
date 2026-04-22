import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
  Chip,
} from "@mui/material";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import ManageSearchRoundedIcon from "@mui/icons-material/ManageSearchRounded";
import Navbar from "../components/Navbar";

function Landing() {
  return (
    <>
      <Navbar />

      <Box
        sx={{
          minHeight: "100vh",
          py: { xs: 6, md:8 },
        
          background:
            "radial-gradient(circle at top left, rgba(37, 100, 235, 0.58), transparent 28%), radial-gradient(circle at top right, rgba(121, 56, 234, 0.57), transparent 25%), linear-gradient(180deg, #0b1120 0%, #111827 100%)",
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3} sx={{ textAlign:"left", mb: 6}}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem" },
                lineHeight: 1.1,
                color: "#f8fafc",
              }}
            >
              Manage issues with clarity, speed, and confidence.
            </Typography>

            <Typography
              variant="h6"
              sx={{
                maxWidth: 820,
                mx: "auto",
                lineHeight: 1.7,
                color: "rgba(248,250,252,0.78)",
                fontSize: { xs: "1rem", md: "1rem" },
                textAlign: "center",
              }}
            >
              A modern full-stack issue tracking platform with status
              management, search, filtering and detailed views.
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <Button
                component={RouterLink}
                to="/register"
                variant="contained"
                size="large"
              >
                Get Started
              </Button>

              <Button
                component={RouterLink}
                to="/dashboard"
                variant="outlined"
                size="large"
                sx={{
                  color: "#cbd5e1",
                  borderColor: "rgba(255,255,255,0.18)",
                }}
              >
                View Dashboard
              </Button>
            </Stack>
          </Stack>

          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
              <Card>
                <CardContent sx={{ p: 3 }}>
                  <DashboardRoundedIcon
                    color="primary"
                    sx={{ fontSize: 36, mb: 2 }}
                  />
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ color: "#f8fafc" }}
                  >
                    Executive Dashboard
                  </Typography>
                  <Typography sx={{ color: "rgba(248,250,252,0.72)" }}>
                    Monitor issue counts, priorities, and operational status in
                    a clean, focused workspace.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Card>
                <CardContent sx={{ p: 3 }}>
                  <ManageSearchRoundedIcon
                    color="primary"
                    sx={{ fontSize: 36, mb: 2 }}
                  />
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ color: "#f8fafc" }}
                  >
                    Search & Filter
                  </Typography>
                  <Typography sx={{ color: "rgba(248,250,252,0.72)" }}>
                    Quickly find issues with smart filtering by status,
                    priority, and debounced search.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Card>
                <CardContent sx={{ p: 3 }}>
                  <SecurityRoundedIcon
                    color="primary"
                    sx={{ fontSize: 36, mb: 2 }}
                  />
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ color: "#f8fafc" }}
                  >
                    Secure Access
                  </Typography>
                  <Typography sx={{ color: "rgba(248,250,252,0.72)" }}>
                    JWT-based authentication with protected issue operations and
                    user-specific data access.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default Landing;
