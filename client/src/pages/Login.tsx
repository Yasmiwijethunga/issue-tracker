import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    dispatch(login({ email, password }));
  };

  // Redirect after success
  if (isSuccess) {
    dispatch(resetAuthState());
    navigate("/dashboard");
  }

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h1>Login</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />

          <button type="submit" style={buttonStyle}>
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>

        {isError && <p style={{ color: "red" }}>{message}</p>}
      </div>
    </div>
  );
}

const pageStyle = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const cardStyle = {
  padding: "30px",
  border: "1px solid #ccc",
  borderRadius: "10px",
};

const inputStyle = {
  display: "block",
  margin: "10px 0",
  padding: "10px",
  width: "250px",
};

const buttonStyle = {
  padding: "10px",
  width: "100%",
};

export default Login;