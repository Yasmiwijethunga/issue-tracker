import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { register, resetAuthState } from "../features/auth/authSlice";

function Register() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLoading, isError, isSuccess, message } = useAppSelector(
    (state) => state.auth
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    dispatch(register({ name, email, password }));
  };

  if (isSuccess) {
    dispatch(resetAuthState());
    navigate("/login");
  }

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h1>Register</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
          />

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
            {isLoading ? "Loading..." : "Register"}
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

export default Register;