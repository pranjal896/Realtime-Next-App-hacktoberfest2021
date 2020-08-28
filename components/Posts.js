import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import Post from "./Post";
import fetch from "isomorphic-unfetch";
// import useSocket from "../config/useSocket";
import io from "socket.io-client";
const socket = io();
// const socket = require("socket.io-client")("http://localhost:3000", {
//   // transports: ["websocket"],
//   // rejectUnauthorized: false
// });

const Posts = () => {
  let mounted = false;
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mounted = true;

    const fetchPosts = async () => {
      try {
        const req = await fetch("/api/posts");
        const { posts } = await req.json();
        setPosts([...posts]);
      } finally {
        setLoading(false);
      }
    };

    if (mounted) {
      fetchPosts();
      socket.on("now", post => {
        console.log(post, " useSocket post");
        // setPosts([...posts, post]);
      });
    }
  }, []);

  return loading ? (
    <div className="text-center">
      <Spinner animation="border" />
    </div>
  ) : posts && posts.length > 0 ? (
    posts.map(post => <Post key={post._id} data={post} />)
  ) : (
    <p className="text-center">No Post Available</p>
  );
};

export default Posts;
