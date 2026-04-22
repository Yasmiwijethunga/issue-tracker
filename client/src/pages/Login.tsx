import { useEffect, useState, type FormEvent } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import Navbar from "../components/Navbar";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { login, resetAuthState } from "../features/auth/authSlice";

function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, isSuccess, message } = useAppSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isSuccess) {
      dispatch(resetAuthState());
      navigate("/dashboard");
    }
  }, [isSuccess, navigate, dispatch]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          background:
            "linear-gradient(180deg, #041d3d 0%, #f8fafc 50%, #ffffff82 100%)",
          py: 6,
        }}
      >
        <Container maxWidth="sm">
          <Card>
            <CardContent sx={{ p: 4 }}>
              <Stack spacing={3}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="h4" gutterBottom>
                    Welcome back
                  </Typography>
                  <Typography color="text.secondary">
                    Sign in to manage your issues professionally.
                  </Typography>
                </Box>

                {isError && <Alert severity="error">{message}</Alert>}

                <Box component="form" onSubmit={handleSubmit}>
                  <Stack spacing={2.5}>
                    <TextField
                      label="Email"
                      type="email"
                      fullWidth
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                      label="Password"
                      type="password"
                      fullWidth
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing in..." : "Login"}
                    </Button>
                  </Stack>
                </Box>

                <Typography sx={{ textAlign: "center" }} color="text.secondary">
                  Don&apos;t have an account?{" "}
                  <Button component={RouterLink} to="/register">
                    Register
                  </Button>
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
}

export default Login;