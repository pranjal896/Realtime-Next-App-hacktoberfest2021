import dbConnect from "../../config/dbConnect";
dbConnect();
import { UserModel } from "../../models";

export default async (req, res) => {
  const {
    body: { id }
  } = req;
  const user = await UserModel.findOne({ _id: id });
  res.status(200).json({ user });
};
