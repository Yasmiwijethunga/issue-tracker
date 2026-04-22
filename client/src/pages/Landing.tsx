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
          background:
            "radial-gradient(circle at top left, rgba(37, 100, 235, 0.15), transparent 28%), radial-gradient(circle at top right, rgba(124, 58, 237, 0.15), transparent 25%), linear-gradient(180deg, #0b1120 0%, #111827 100%)",
          py: { xs: 6, md: 8 },
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={4} sx={{ textAlign: "center", mb: 8 }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3.8rem" },
                fontWeight: 800,
                lineHeight: 1.15,
                color: "#f8fafc",
              }}
            >
              Manage issues with clarity, speed, and confidence.
            </Typography>

            <Typography
              variant="h6"
              sx={{
                maxWidth: 700,
                mx: "auto",
                lineHeight: 1.7,
                color: "rgba(248,250,252,0.75)",
                fontSize: { xs: "0.95rem", md: "1.05rem" },
                fontWeight: 400,
              }}
            >
              A modern full-stack issue tracking platform with status management, search, filtering, and detailed views.
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{
                justifyContent: "center",
                alignItems: "center",
              }}
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
              <Card
                sx={{
                  background: "rgba(15, 23, 42, 0.6)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: 2.5,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background: "rgba(15, 23, 42, 0.8)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
                  <DashboardRoundedIcon
                    color="primary"
                    sx={{ fontSize: 40, mb: 2.5 }}
                  />
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ color: "#f8fafc", fontWeight: 700 }}
                  >
                    Executive Dashboard
                  </Typography>
                  <Typography sx={{ color: "rgba(248,250,252,0.70)", lineHeight: 1.6 }}>
                    Monitor issue counts, priorities, and operational status in a clean, focused workspace.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Card
                sx={{
                  background: "rgba(15, 23, 42, 0.6)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: 2.5,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background: "rgba(15, 23, 42, 0.8)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
                  <ManageSearchRoundedIcon
                    color="primary"
                    sx={{ fontSize: 40, mb: 2.5 }}
                  />
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ color: "#f8fafc", fontWeight: 700 }}
                  >
                    Search & Filter
                  </Typography>
                  <Typography sx={{ color: "rgba(248,250,252,0.70)", lineHeight: 1.6 }}>
                    Quickly find issues with smart filtering by status, priority, and debounced search.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Card
                sx={{
                  background: "rgba(15, 23, 42, 0.6)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: 2.5,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background: "rgba(15, 23, 42, 0.8)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
                  <SecurityRoundedIcon
                    color="primary"
                    sx={{ fontSize: 40, mb: 2.5 }}
                  />
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ color: "#f8fafc", fontWeight: 700 }}
                  >
                    Secure Access
                  </Typography>
                  <Typography sx={{ color: "rgba(248,250,252,0.70)", lineHeight: 1.6 }}>
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
