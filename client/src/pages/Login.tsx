import { Link } from "react-router-dom";

function Login() {
  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Login</h1>
      <p>Issue Tracker login page</p>
      <p>
        Don&apos;t have an account? <Link to="/register">Register</Link>
      </p>
      <p>
        <Link to="/dashboard">Go to Dashboard</Link>
      </p>
    </div>
  );
}

export default Login;