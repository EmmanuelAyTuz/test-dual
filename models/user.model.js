const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    //name: { type: String, required: true, uppercase: true, trim: true },
    //flastname: { type: String, required: true, uppercase: true, trim: true },
    //mlastname: { type: String, required: true, uppercase: true, trim: true },
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    type_user: {
      type: String,
      enum: ["root", "admin", "student", "teacher"],
      required: false,
    },
    subject: [
      {
        type: Schema.Types.ObjectId,
        ref: "Subject",
        require: false,
        validate: {
          validator: async (id) =>
            await model("Subject").findById(id, (err, result) =>
              result ? true : false
            ),
          message: "Subject no found",
        },
      },
    ],
    //email: { type: String, required: true, index: { unique: true } },
  },
  { timestamps: true }
);

//Get enum credit of subject
const getEnumTypeUser = async () =>
  await UserSchema.path("type_user").enumValues;

const User = model("User", UserSchema);

module.exports = { User, getEnumTypeUser };
