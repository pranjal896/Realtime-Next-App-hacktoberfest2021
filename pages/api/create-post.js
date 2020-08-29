import Server from "socket.io";
import { PostModel } from "../../models";
import dbConnect from "../../config/dbConnect";

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
    const io = new Server(res.socket.server);
    io.on("connection", socket => {
      socket.emit("addpost", {
        post: post
      });
    });
    res.status(200).json({ post });
  });
};
