import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Container, Typography } from "@mui/material";
import Navbar from "../components/Navbar";

function NotFound() {
  return (
    <>
      <Navbar />
      <Container maxWidth="md">
        <Box
          sx={{
            minHeight: "70vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography variant="h1" color="primary" gutterBottom>
            404
          </Typography>
          <Typography variant="h4" gutterBottom>
            Page not found
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            The page you requested does not exist or may have been moved.
          </Typography>
          <Button component={RouterLink} to="/" variant="contained">
            Back to Home
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default NotFound;