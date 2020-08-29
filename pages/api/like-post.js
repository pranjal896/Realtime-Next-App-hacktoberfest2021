import Server from "socket.io";
import { PostModel } from "../../models";
import dbConnect from "../../config/dbConnect";

dbConnect();

export default async (req, res) => {
  const {
    body: { id, liked, postId }
  } = req;
  var obj = {};
  if (liked) {
    obj = {
      $pull: {
        likes: {
          user: id
        }
      }
    };
  } else {
    obj = {
      $push: {
        likes: {
          user: id
        }
      }
    };
  }
  const likedPost = await PostModel.findOneAndUpdate(
    { _id: postId },
    { ...obj },
    { new: true }
  );
  const io = new Server(res.socket.server);
  io.on("connection", socket => {
    socket.emit("likepost", {
      likedPost
    });
  });
  res.status(200).json({ likedPost });
};
