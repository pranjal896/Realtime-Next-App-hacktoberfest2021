import Server from "socket.io";
import { PostModel } from "../../models";
import dbConnect from "../../config/dbConnect";

dbConnect();

export default async (req, res) => {
  const {
    body: { id, text, postId }
  } = req;

  const commentedPost = await PostModel.findOneAndUpdate(
    { _id: postId },
    {
      $push: {
        comments: {
          text,
          user: id
        }
      }
    },
    { new: true }
  ).populate({
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
    socket.emit("postcomment", {
      commentedPost: commentedPost
    });
  });
  res.status(200).json({ commentedPost });
};
