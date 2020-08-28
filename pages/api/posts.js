import dbConnect from "../../config/dbConnect";
dbConnect();
import { PostModel } from "../../models";

export default async (_, res) => {
  const posts = await PostModel.find({})
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
    })
    .sort({ createdAt: -1 });
  res.status(200).json({ posts });
};
