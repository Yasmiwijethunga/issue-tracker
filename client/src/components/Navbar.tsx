import { useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import BugReportRoundedIcon from "@mui/icons-material/BugReportRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Dashboard", path: "/dashboard" },
  { label: "Login", path: "/login" },
  { label: "Register", path: "/register" },
];

function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDrawer = () => {
    setMobileOpen((prev) => !prev);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: "rgba(15, 23, 42, 0.55)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            sx={{
              minHeight: { xs: 74, md: 84 },
              px: { xs: 0.5, md: 0 },
              justifyContent: "space-between",
            }}
          >
            {/* Brand */}
            <Box
              component={RouterLink}
              to="/"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.4,
                textDecoration: "none",
                color: "#f8fafc",
                flexShrink: 0,
              }}
            >
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: "14px",
                  display: "grid",
                  placeItems: "center",
                  background:
                    "linear-gradient(135deg, rgba(59,130,246,0.95), rgba(124,58,237,0.95))",
                  boxShadow: "0 10px 24px rgba(59,130,246,0.28)",
                }}
              >
                <BugReportRoundedIcon sx={{ color: "#fff", fontSize: 22 }} />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontSize: { xs: "1.05rem", md: "1.2rem" },
                    fontWeight: 800,
                    color: "#f8fafc",
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  IssueTracker 
                </Typography>
                <Typography
                  sx={{
                    display: { xs: "none", sm: "block" },
                    fontSize: "0.78rem",
                    color: "rgba(248,250,252,0.66)",
                    mt: 0.2,
                  }}
                >
                  Smart issue workflow management
                </Typography>
              </Box>
            </Box>

            {/* Desktop Nav */}
            <Stack
              direction="row"
              spacing={1}
              sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
            >
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  component={RouterLink}
                  to={item.path}
                  variant={isActive(item.path) ? "contained" : "text"}
                  color={isActive(item.path) ? "primary" : "inherit"}
                  sx={{
                    px: 2,
                    py: 1.1,
                    borderRadius: "14px",
                    fontWeight: 700,
                    color: isActive(item.path)
                      ? "#ffffff"
                      : "rgba(248,250,252,0.82)",
                    background: isActive(item.path)
                      ? "linear-gradient(135deg, #3b82f6, #2563eb)"
                      : "transparent",
                    boxShadow: isActive(item.path)
                      ? "0 10px 24px rgba(37,99,235,0.28)"
                      : "none",
                    "&:hover": {
                      background: isActive(item.path)
                        ? "linear-gradient(135deg, #3b82f6, #2563eb)"
                        : "rgba(255,255,255,0.06)",
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}

              {/* <Button
                component={RouterLink}
                to="/dashboard"
                startIcon={<DashboardRoundedIcon />}
                variant="outlined"
                sx={{
                  ml: 1,
                  px: 2.2,
                  py: 1.1,
                  borderRadius: "14px",
                  borderColor: "rgba(255,255,255,0.14)",
                  color: "#f8fafc",
                  background: "rgba(255,255,255,0.04)",
                  "&:hover": {
                    borderColor: "rgba(255,255,255,0.22)",
                    background: "rgba(255,255,255,0.08)",
                  },
                }}
              >
                Open App
              </Button> */}
            </Stack>

            {/* Mobile Menu Button */}
            <IconButton
              onClick={toggleDrawer}
              sx={{
                display: { xs: "inline-flex", md: "none" },
                color: "#f8fafc",
                border: "1px solid rgba(255,255,255,0.10)",
                background: "rgba(255,255,255,0.05)",
              }}
            >
              <MenuRoundedIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={toggleDrawer}
        PaperProps={{
          sx: {
            width: 290,
            background: "rgba(15, 23, 42, 0.96)",
            color: "#f8fafc",
            borderLeft: "1px solid rgba(255,255,255,0.08)",
            p: 2,
          },
        }}
      >
        <Box sx={{ mb: 2, mt: 1 }}>
          <Typography fontSize="1.15rem" fontWeight={800}>
            Navigation
          </Typography>
          <Typography
            sx={{ color: "rgba(248,250,252,0.66)", fontSize: "0.9rem", mt: 0.5 }}
          >
            Move through the app quickly
          </Typography>
        </Box>

        <Stack spacing={1.2}>
          {navItems.map((item) => (
            <Button
              key={item.path}
              component={RouterLink}
              to={item.path}
              onClick={toggleDrawer}
              fullWidth
              variant={isActive(item.path) ? "contained" : "text"}
              sx={{
                justifyContent: "flex-start",
                px: 2,
                py: 1.4,
                borderRadius: "14px",
                fontWeight: 700,
                color: isActive(item.path)
                  ? "#ffffff"
                  : "rgba(248,250,252,0.86)",
                background: isActive(item.path)
                  ? "linear-gradient(135deg, #3b82f6, #2563eb)"
                  : "rgba(255,255,255,0.03)",
              }}
            >
              {item.label}
            </Button>
          ))}

          <Button
            component={RouterLink}
            to="/dashboard"
            onClick={toggleDrawer}
            variant="outlined"
            startIcon={<DashboardRoundedIcon />}
            sx={{
              mt: 1,
              justifyContent: "flex-start",
              px: 2,
              py: 1.4,
              borderRadius: "14px",
              borderColor: "rgba(255,255,255,0.12)",
              color: "#f8fafc",
            }}
          >
            Open Dashboard
          </Button>
        </Stack>
      </Drawer>
    </>
  );
}

export default Navbar;