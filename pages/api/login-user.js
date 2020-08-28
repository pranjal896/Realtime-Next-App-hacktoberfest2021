import bcrypt from "bcrypt";
import { UserModel } from "../../models";
import dbConnect from "../../config/dbConnect";

dbConnect();

export default async (req, res) => {
  const {
    body: { email, password }
  } = req;
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res
      .status(500)
      .json({ error: 1, message: "Account does not exists!" });
  }
  const compare = bcrypt.compareSync(password, user.password);
  if (!compare) {
    return res.status(500).json({ error: 1, message: "Wrong password!" });
  }
  res.status(200).json({
    user: {
      id: user._id,
      name: user.name,
      email
    }
  });
};
