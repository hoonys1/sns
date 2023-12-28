const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    room: String,
    members: [
      {
        type: mongoose.Schema.ObjectId,
        unique: true,
        ref: "User",
      },
    ],
  },
  { timestamp: true }
);

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
