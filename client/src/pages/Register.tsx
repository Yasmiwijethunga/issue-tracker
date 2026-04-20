import { useState, type FormEvent, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setError("");
    setSuccessMessage("");
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.password.trim() ||
      !formData.confirmPassword.trim()
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Temporary frontend-only success flow
    setSuccessMessage("Registration form submitted successfully.");

    // Later, after backend connection:
    // dispatch(register({ name, email, password }))

    setTimeout(() => {
      navigate("/login");
    }, 900);
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Register</h1>
        <p style={subtitleStyle}>Create a new account to manage issues.</p>

        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={fieldGroupStyle}>
            <label htmlFor="name" style={labelStyle}>
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div style={fieldGroupStyle}>
            <label htmlFor="email" style={labelStyle}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div style={fieldGroupStyle}>
            <label htmlFor="password" style={labelStyle}>
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div style={fieldGroupStyle}>
            <label htmlFor="confirmPassword" style={labelStyle}>
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          {error && <p style={errorStyle}>{error}</p>}
          {successMessage && <p style={successStyle}>{successMessage}</p>}

          <button type="submit" style={buttonStyle}>
            Create Account
          </button>
        </form>

        <p style={footerTextStyle}>
          Already have an account?{" "}
          <Link to="/login" style={linkStyle}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

const pageStyle: React.CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#f5f7fb",
  padding: "24px",
  fontFamily: "Arial, sans-serif",
};

const cardStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: "460px",
  backgroundColor: "#ffffff",
  padding: "32px",
  borderRadius: "16px",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
};

const titleStyle: React.CSSProperties = {
  margin: "0 0 8px 0",
  fontSize: "32px",
  color: "#111827",
};

const subtitleStyle: React.CSSProperties = {
  margin: "0 0 24px 0",
  color: "#6b7280",
  fontSize: "15px",
};

const formStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "18px",
};

const fieldGroupStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const labelStyle: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: 600,
  color: "#374151",
};

const inputStyle: React.CSSProperties = {
  padding: "12px 14px",
  border: "1px solid #d1d5db",
  borderRadius: "10px",
  fontSize: "14px",
  outline: "none",
};

const buttonStyle: React.CSSProperties = {
  padding: "12px",
  border: "none",
  borderRadius: "10px",
  backgroundColor: "#2563eb",
  color: "#ffffff",
  fontSize: "15px",
  fontWeight: 600,
  cursor: "pointer",
};

const errorStyle: React.CSSProperties = {
  margin: 0,
  color: "#dc2626",
  fontSize: "14px",
};

const successStyle: React.CSSProperties = {
  margin: 0,
  color: "#16a34a",
  fontSize: "14px",
};

const footerTextStyle: React.CSSProperties = {
  marginTop: "20px",
  fontSize: "14px",
  color: "#4b5563",
  textAlign: "center",
};

const linkStyle: React.CSSProperties = {
  color: "#2563eb",
  textDecoration: "none",
  fontWeight: 600,
};

export default Register;