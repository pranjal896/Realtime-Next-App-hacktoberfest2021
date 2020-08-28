import React, { useState, useEffect } from "react";
import Comment from "./Comment";
import fetch from "isomorphic-unfetch";

const Post = ({ data }) => {
  const postId = data._id;
  const [comments, setComment] = useState(data.comments);

  // const addComment = obj => {
  //   setComment([...comments, obj]);
  // };

  // useEffect(() => {
  //   mounted = true;

  //   const fetchPosts = async () => {
  //     try {
  //       const req = await fetch("/api/posts");
  //       const { posts } = await req.json();
  //       setPosts([...posts]);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (mounted) {
  //     fetchPosts();
  //   }
  // }, []);

  return (
    <div className="post mt-20">
      <h5>{data?.user?.name}</h5>
      <p className="post-date">{new Date().toLocaleDateString()}</p>
      <hr />
      <p>{data?.text}</p>
      <div className="post-details">
        <p>
          {data.likes.length} {data.likes.length > 1 ? "Likes" : "Like"}
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
