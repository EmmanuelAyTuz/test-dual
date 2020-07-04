const mongoose = require("mongoose");
const { Schema, model } = mongoose;

//Validations
const userExist = async (id) =>
  (await model("User").findById(id)) ? true : false;

const userAdded = async (user_id, sb_id) => {
  const sb = await model("Subject").find({ _id: sb_id }, "student");
  return sb[0].student.includes(user_id);
};

//Schema
const SubjectSchema = new Schema(
  {
    title: {
      type: Schema.Types.String,
      required: true,
      uppercase: true,
      trim: true,
      max: 50,
    },
    description: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
      max: 120,
    },
    credit: {
      type: Schema.Types.Number,
      enum: [2, 3, 4, 5, 6, 7],
      required: true,
    },
    student: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        validate: [
          {
            validator: userExist,
            message: "User no found",
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

//SubjectSchema.index({ student: 1 }, { unique: true, dropDups: true });

//Get enum credit of subject
const getEnumCredit = async () =>
  await SubjectSchema.path("credit").options.enum;

const Subject = model("Subject", SubjectSchema);
module.exports = { Subject, getEnumCredit, userAdded };
