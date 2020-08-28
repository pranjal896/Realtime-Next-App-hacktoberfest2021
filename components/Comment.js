import React, { useState, useMemo } from "react";
import { FiSend } from "react-icons/fi";
import { useAuth } from "../context/auth";
import fetch from "isomorphic-unfetch";
import {
  InputGroup,
  FormControl,
  Form,
  Button,
  Spinner
} from "react-bootstrap";

const Comment = ({ postId, comments }) => {
  const { user } = useAuth();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e && e.preventDefault();
    const trimText = text.trim();
    if (!trimText) {
      alert("Comment text must be required!");
      return;
    }
    try {
      setLoading(true);
      const req = await fetch("/api/post-comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          postId,
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

  const formElement = useMemo(
    () => (
      <Form onSubmit={handleSubmit}>
        <InputGroup className="mt-3">
          <FormControl
            value={text}
            disabled={loading}
            placeholder="Write comment here..."
            onChange={({ target }) => setText(target.value)}
          />
          <InputGroup.Append>
            <Button variant="info" disabled={loading} onClick={handleSubmit}>
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />{" "}
                  <FiSend />
                </>
              ) : (
                <FiSend />
              )}
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
    ),
    [text, loading]
  );
  return (
    <div className="comment-wrapper">
      {comments
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map(comment => (
          <div className="comment" key={comment._id}>
            <p className="commentor-name">Shariq Ahmed</p>
            <p className="comment-text">{comment.text}</p>
          </div>
        ))}
      {formElement}
    </div>
  );
};

export default Comment;
