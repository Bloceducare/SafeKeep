import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    address: {
      type: String,
    },
    inheritors: [
      {
        type: Schema.Types.ObjectId,
        ref: "inheritors",
      },
    ],
  },

  { timestamps: true }
);
const users =
  mongoose.models.User || mongoose.model("User", UserSchema, "User");
export default users;
