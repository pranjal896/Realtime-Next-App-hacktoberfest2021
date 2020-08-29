import React, { useState } from "react";
import Comment from "./Comment";
import { FiThumbsUp } from "react-icons/fi";
import { Button, Spinner } from "react-bootstrap";
import { useAuth } from "../context/auth";

const Post = ({ data }) => {
  const postId = data._id;
  let likes = data.likes;
  const comments = data.comments;
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const liked = likes.some(o => o.user === user.id);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const req = await fetch("/api/like-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          liked,
          postId,
          id: user.id
        })
      });
      const { message, error, likedPost } = await req.json();
      if (error) {
        alert(message);
        return;
      }
    } catch (error) {
      alert("something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post mt-20">
      <h5>{data?.user?.name}</h5>
      <p className="post-date">{new Date().toLocaleDateString()}</p>
      <hr />
      <p>{data?.text}</p>
      <div className="post-details">
        <p>
          <Button
            disabled={loading}
            onClick={handleSubmit}
            variant={liked ? "info" : "outline-info"}
          >
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                {"  "}
                <FiThumbsUp />
              </>
            ) : (
              <FiThumbsUp />
            )}
          </Button>
          {"  "}
          {"  "}
          {likes.length} {likes.length > 1 ? " Likes" : " Like"}
        </p>
        <p>
          {comments.length} {comments.length > 1 ? "Comments" : "Comment"}
        </p>
      </div>
      <Comment postId={postId} comments={comments} />
    </div>
  );
};

export default Post;
