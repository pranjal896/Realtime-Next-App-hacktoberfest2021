import React, { useState } from "react";
import Posts from "../components/Posts";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import fetch from "isomorphic-unfetch";
import { useAuth } from "../context/auth";
import { Form, Button, Spinner } from "react-bootstrap";

const Home = () => {
  const { replace } = useRouter();
  const [text, setText] = useState("");
  const { user, setUserData } = useAuth();
  const [loading, setLoading] = useState(false);

  const logout = () => {
    setUserData(null, true);
    replace("/login");
  };

  const handleSubmit = async e => {
    e && e.preventDefault();
    const trimText = text.trim();
    if (!trimText) {
      alert("Post text must be required!");
      return;
    }
    try {
      setLoading(true);
      const req = await fetch("/api/create-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: user.id,
          text: trimText
        })
      });
      const { message, error } = await req.json();
      if (error) {
        alert(message);
        return;
      }
      setText("");
    } catch (error) {
      alert("something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    user && (
      <div>
        <Navbar onClick={logout} />
        <br />
        <div className="container mt-20 pb-20">
          <Form onSubmit={handleSubmit}>
            <Form.Control
              rows="5"
              value={text}
              as="textarea"
              disabled={loading}
              placeholder="Write a post here..."
              onChange={({ target }) => setText(target.value)}
            />
            <Button
              className="mt-20"
              variant="success"
              disabled={loading}
              onClick={handleSubmit}
            >
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />{" "}
                  Posting...
                </>
              ) : (
                "Post"
              )}
            </Button>
          </Form>
          <br />
          <Posts />
        </div>
      </div>
    )
  );
};

export default Home;
