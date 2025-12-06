"use client";

import { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    setError("");

    // Frontend validation
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "Registration failed");
      return;
    }

    alert("User registered successfully");
    window.location.href = "/login";
  };

  return (
    <MDBContainer fluid className="p-0 m-0">
      <MDBRow className="g-0" style={{ height: "100vh" }}>
        <MDBCol md="6" className="h-100">
          <MDBCardImage
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
            alt="register form"
            className="w-100 h-100"
            style={{ objectFit: "cover" }}
          />
        </MDBCol>

        <MDBCol
          md="6"
          className="d-flex align-items-center justify-content-center"
          style={{ background: "white" }}
        >
          <MDBCardBody style={{ width: "80%", maxWidth: "400px" }}>
            <div className="d-flex flex-row mb-3">
              <MDBIcon fas icon="user-plus fa-3x me-3" style={{ color: "#ff6219" }} />
              <span className="h1 fw-bold">Register</span>
            </div>

            <h5 className="fw-normal pb-3" style={{ letterSpacing: "1px" }}>
              Create your account
            </h5>

            {error && (
              <p className="text-danger bg-light p-2 rounded text-center mb-3">
                {error}
              </p>
            )}

            {/* Username */}
            <MDBInput
              wrapperClass="mb-4"
              label="Username"
              type="text"
              size="lg"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            {/* Email */}
            <MDBInput
              wrapperClass="mb-4"
              label="Email address"
              type="email"
              size="lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Password */}
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              type="password"
              size="lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Confirm Password */}
            <MDBInput
              wrapperClass="mb-4"
              label="Confirm password"
              type="password"
              size="lg"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />

            <MDBBtn color="dark" size="lg" className="mb-4 px-5" onClick={handleRegister}>
              Register
            </MDBBtn>

            <p>
              Already have an account?
              <a href="/login" style={{ color: "#393f81" }}> Login here</a>
            </p>
          </MDBCardBody>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}