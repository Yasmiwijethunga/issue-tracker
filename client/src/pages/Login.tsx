import { useEffect, useState, type FormEvent } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Navbar from "../components/Navbar";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { login, resetAuthState } from "../features/auth/authSlice";

function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLoading, isError, isSuccess, message } = useAppSelector(
    (state) => state.auth,
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(resetAuthState());
      navigate("/dashboard");
    }
  }, [isSuccess, dispatch, navigate]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(login({ email, password }));
    }
  };

  return (
    <>
      <Navbar />

      <Box
        sx={{
          minHeight: "100vh",
          height: "100vh",
          overflow: "hidden",
          background:
            "radial-gradient(circle at top left, rgba(37, 99, 235, 0.15), transparent 28%), radial-gradient(circle at top right, rgba(124, 58, 237, 0.15), transparent 25%), linear-gradient(180deg, #0b1120 0%, #111827 100%)",
          py: { xs: 5, md: 7 },
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={6} sx={{ alignItems: "center", minHeight: "calc(100vh - 140px)" }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack spacing={4} sx={{ pr: { md: 4 } }}>
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: { xs: "2.2rem", md: "3.5rem" },
                    fontWeight: 800,
                    lineHeight: 1.15,
                    color: "#f8fafc",
                    maxWidth: 600,
                  }}
                >
                  Continue your workflow with a faster issue management experience.
                </Typography>

                <Typography
                  sx={{
                    color: "rgba(248,250,252,0.74)",
                    fontSize: { xs: "0.95rem", md: "1.05rem" },
                    lineHeight: 1.8,
                    maxWidth: 580,
                    fontWeight: 400,
                  }}
                >
                  Log in to manage issue reports, monitor statuses, and keep your team workflow organized in one place.
                </Typography>

                <Stack spacing={2}>
                  <Feature text="Secure login with JWT-based authentication" />
                  <Feature text="Manage issue lifecycle efficiently" />
                  <Feature text="Professional responsive dashboard experience" />
                  <Feature text="View, update, and resolve issues with confidence" />
                </Stack>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Card
                sx={{
                  borderRadius: 2.5,
                  background: "rgba(15, 23, 42, 0.7)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  boxShadow: "0 20px 50px rgba(0, 0, 0, 0.3)",
                }}
              >
                <CardContent sx={{ p: { xs: 3, md: 4.5 } }}>
                  <Stack spacing={3.5}>
                    <Box>
                      <Typography variant="h4" gutterBottom sx={{ color: "#f8fafc", fontWeight: 700 }}>
                        Welcome Back
                      </Typography>
                      <Typography sx={{ color: "rgba(248,250,252,0.70)", fontSize: "0.95rem" }}>
                        Login to continue managing your issues.
                      </Typography>
                    </Box>

                    {isError && <Alert severity="error">{message}</Alert>}

                    <Box component="form" onSubmit={handleSubmit}>
                      <Stack spacing={3}>
                        <TextField
                          label="Email"
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (errors.email) setErrors({ ...errors, email: undefined });
                          }}
                          fullWidth
                          variant="outlined"
                          size="medium"
                          error={!!errors.email}
                          helperText={errors.email}
                          slotProps={{
                            input: {
                              sx: {
                                background: "rgba(255, 255, 255, 0.04)",
                                "&:hover": {
                                  background: "rgba(255, 255, 255, 0.06)",
                                },
                              },
                            },
                          }}
                        />

                        <TextField
                          label="Password"
                          type="password"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                            if (errors.password) setErrors({ ...errors, password: undefined });
                          }}
                          fullWidth
                          variant="outlined"
                          size="medium"
                          error={!!errors.password}
                          helperText={errors.password}
                          slotProps={{
                            input: {
                              sx: {
                                background: "rgba(255, 255, 255, 0.04)",
                                "&:hover": {
                                  background: "rgba(255, 255, 255, 0.06)",
                                },
                              },
                            },
                          }}
                        />

                        <Button
                          type="submit"
                          variant="contained"
                          size="large"
                          disabled={isLoading}
                          fullWidth
                          sx={{
                            py: 1.5,
                            fontWeight: 700,
                            fontSize: "1rem",
                            textTransform: "none",
                            borderRadius: 2,
                          }}
                        >
                          {isLoading ? "Signing in..." : "Login"}
                        </Button>
                      </Stack>
                    </Box>

                    <Typography sx={{ textAlign: "center", fontSize: "0.9rem" }} color="text.secondary">
                      Don&apos;t have an account?{" "}
                      <Button
                        component={RouterLink}
                        to="/register"
                        sx={{
                          textTransform: "none",
                          fontWeight: 700,
                          color: "#3b82f6",
                          p: 0,
                          "&:hover": { background: "transparent", textDecoration: "underline" },
                        }}
                      >
                        Register
                      </Button>
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

function Feature({ text }: { text: string }) {
  return (
    <Box
      sx={{
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 2,
        px: 2,
        py: 1.5,
        background: "rgba(255,255,255,0.03)",
        color: "#e2e8f0",
      }}
    >
      {text}
    </Box>
  );
}

export default Login;