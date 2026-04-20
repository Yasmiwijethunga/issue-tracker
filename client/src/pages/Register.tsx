import { Link } from "react-router-dom";

function Register() {
  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Register</h1>
      <p>Create your account here</p>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Register;