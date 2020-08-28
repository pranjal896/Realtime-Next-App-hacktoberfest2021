const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Like = new Schema({
  user: {
    ref: "users",
    type: Schema.ObjectId
  }
});

const Comment = new Schema({
  user: {
    ref: "users",
    type: Schema.ObjectId
  },
  text: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const PostSchema = new Schema({
  user: {
    ref: "users",
    required: true,
    type: Schema.ObjectId
  },
  text: {
    type: String,
    required: true
  },
  likes: {
    type: [Like]
  },
  comments: {
    type: [Comment]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.models.posts || mongoose.model("posts", PostSchema);
