import React, { Component } from "react";
import { Spinner } from "react-bootstrap";
import Post from "./Post";
import fetch from "isomorphic-unfetch";
import socket from "socket.io-client";
import { removeDuplicate } from "../common/functions";

class Posts extends Component {
  state = {
    posts: null,
    loading: true
  };

  componentDidMount() {
    this.fetchPosts();
  }

  socketConnection = () => {
    socket().on("addpost", data => {
      const newPost = data.post;
      this.mergePosts(newPost);
    });
    socket().on("postcomment", data => {
      const newCommentedPost = data.commentedPost;
      this.mergeCommentedPost(newCommentedPost);
    });
    socket().on("likepost", data => {
      const likedPost = data.likedPost;
      this.mergeLikedPost(likedPost);
    });
  };

  fetchPosts = async () => {
    try {
      const req = await fetch("/api/posts");
      const res = await req.json();
      this.setState({ posts: res.posts });
    } finally {
      this.setState({ loading: false });
      this.socketConnection();
    }
  };

  mergePosts = newPost => {
    const { posts } = this.state;
    this.setState({
      posts: posts ? removeDuplicate([newPost, ...posts]) : [newPost]
    });
  };

  mergeCommentedPost = newCommentedPost => {
    let { posts } = this.state;
    const postId = newCommentedPost._id;
    const index = posts.findIndex(o => o._id === postId);
    posts[index].comments = newCommentedPost.comments;
    this.setState({ posts });
  };

  mergeLikedPost = likedPost => {
    let { posts } = this.state;
    const postId = likedPost._id;
    const index = posts.findIndex(o => o._id === postId);
    posts[index].likes = likedPost.likes;
    this.setState({ posts });
  };

  render() {
    const { loading, posts } = this.state;
    return loading ? (
      <div className="text-center">
        <Spinner animation="border" />
      </div>
    ) : posts && posts.length > 0 ? (
      posts
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map(post => <Post key={post._id} data={post} />)
    ) : (
      <p className="text-center">No Post Available</p>
    );
  }
}

export default Posts;
