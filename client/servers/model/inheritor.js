import mongoose from "mongoose";
const Schema = mongoose.Schema;

const InheritorSchema = new Schema(
  {
    address: {
      type: String,
    },
    alias: {
      type: String,
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },

  { timestamps: true }
);

// exports.inheritorS = new Schema(
//   {
//     address: {
//       type: String,
//     },
//     alias: {
//       type: String,
//     },
//     users: [
//       {
//         type: Schema.Types.ObjectId,
//         ref: "User",
//       },
//     ],
//   },

//   { timestamps: true }
// );
// export default mongoose.models.Inheritors ||
//   mongoose.model("inheritors", inheritorSchema);
console.log(mongoose.models);
const inheritorsDb =
  mongoose.models.inheritors || mongoose.model("inheritors", InheritorSchema);
export default inheritorsDb;

// const users = mongoose.models.User || mongoose.model("User", UserSchema);
// export default users;
