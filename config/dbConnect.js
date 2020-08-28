import mongoos from "mongoose";
import { mongoURI } from "../common/constant";

const connection = {};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }
  const db = await mongoos.connect(mongoURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true
  });
  connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;
