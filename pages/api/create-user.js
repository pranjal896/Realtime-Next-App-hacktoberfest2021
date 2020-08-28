import bcrypt from "bcrypt";
import { UserModel } from "../../models";
import dbConnect from "../../config/dbConnect";

dbConnect();

export default async (req, res) => {
  const {
    body: { name, email, password }
  } = req;
  const checkUser = await UserModel.findOne({ email });
  if (checkUser) {
    return res
      .status(500)
      .json({ error: 1, message: "Email is already exists" });
  }
  const hash = bcrypt.hashSync(password, 10);
  let newUser = new UserModel({
    name,
    email,
    password: hash
  });
  const user = await newUser.save();
  res.status(200).json({
    user: {
      id: user._id,
      name,
      email
    }
  });
};
