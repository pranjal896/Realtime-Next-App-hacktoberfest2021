import { PostModel } from "../../models";
import dbConnect from "../../config/dbConnect";
// import io from "../../server";

var express = require("express");

// App setup
var app = express();
var socket = require("socket.io");

var server = app.listen(4000, function() {
  console.log("listening for requests on port 4000,");
});

let io = socket(server);
io.on("connection", function(socket) {
  console.log(`${socket.id} is connected`);
});

dbConnect();

export default async (req, res) => {
  const {
    body: { id, text }
  } = req;
  const newPost = new PostModel({
    text,
    user: id
  });
  await newPost.save().then(async doc => {
    const id = doc._id;
    const post = await PostModel.findOne({ _id: id })
      .populate("user", {
        _id: 1,
        name: 1,
        email: 1
      })
      .populate({
        path: "comments",
        populate: {
          path: "user",
          select: {
            _id: 1,
            name: 1,
            email: 1
          }
        }
      });

    io.emit("addpost", {
      post: post
    });
  });
  res.status(200).json({ success: true });
};
