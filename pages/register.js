import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../context/auth";
import fetch from "isomorphic-unfetch";
import { validateEmail } from "../common/functions";
import { Form, Button, Spinner } from "react-bootstrap";

const Register = () => {
  const { replace } = useRouter();
  const { setUserData } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    const trimName = name.trim();
    const trimEmail = email.trim();
    const trimPassword = password.trim();
    if (!trimName || !trimEmail || !trimPassword) {
      alert("All fields must be required");
      return;
    }
    if (!validateEmail(trimEmail)) {
      alert("All fields must be required");
      return;
    }
    try {
      setLoading(true);
      const req = await fetch("/api/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: trimName,
          email: trimEmail,
          password: trimPassword
        })
      });
      const { user, message, error } = await req.json();
      if (error) {
        alert(message);
        return;
      }
      setUserData(user);
      replace("/");
    } catch (error) {
      alert("something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-20">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            disabled={loading}
            placeholder="Enter name"
            onChange={({ target }) => setName(target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            disabled={loading}
            placeholder="Enter email"
            onChange={({ target }) => setEmail(target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            disabled={loading}
            placeholder="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Group>
        <Button variant="primary" disabled={loading} type="submit">
          {loading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />{" "}
              Requesting...
            </>
          ) : (
            "Create Account"
          )}
        </Button>
        <br />
        <br />
        {!loading && (
          <Form.Text className="text-center">
            Already have an account?{" "}
            <Link href="/login">
              <a>Login</a>
            </Link>
          </Form.Text>
        )}
      </Form>
    </div>
  );
};

export default Register;
