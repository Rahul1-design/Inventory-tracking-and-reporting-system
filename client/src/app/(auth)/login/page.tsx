"use client";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

import { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
} from "mdb-react-ui-kit";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.message);
      return;
    }

    if (data.token) {
      localStorage.setItem("token", data.token);
      window.location.href = "/dashboard";
    }
  };

  return (
    <MDBContainer fluid className="p-0 m-0">
      <MDBRow className="g-0" style={{ height: "100vh" }}>

        {/* LEFT IMAGE */}
        <MDBCol md="6" className="h-100">
          <MDBCardImage
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
            alt="login form"
            className="w-100 h-100"
            style={{ objectFit: "cover" }}
          />
        </MDBCol>

        {/* RIGHT LOGIN FORM */}
        <MDBCol
          md="6"
          className="d-flex align-items-center justify-content-center"
          style={{ background: "white" }}
        >
          <MDBCardBody style={{ width: "80%", maxWidth: "400px" }}>

            <div className="d-flex flex-row mb-3">
              <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: "#ff6219" }} />
              <span className="h1 fw-bold">ITARS</span>
            </div>

            <h5 className="fw-normal pb-3" style={{ letterSpacing: "1px" }}>
              Sign into your account
            </h5>

            {error && (
              <p className="text-danger bg-light p-2 rounded text-center mb-3">
                {error}
              </p>
            )}

            <MDBInput
              wrapperClass="mb-4"
              label="Email address"
              type="email"
              size="lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              type="password"
              size="lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <MDBBtn
              className="mb-4 px-5"
              color="dark"
              size="lg"
              onClick={handleLogin}
            >
              Login
            </MDBBtn>

            <p>
              Don't have an account?
              <a href="/register" style={{ color: "#393f81" }}> Register here</a>
            </p>
          </MDBCardBody>
        </MDBCol>

      </MDBRow>
    </MDBContainer>
  );
}

