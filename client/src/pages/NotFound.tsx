import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>404 - Page Not Found</h1>
      <Link to="/login">Go to Login</Link>
    </div>
  );
}

export default NotFound;