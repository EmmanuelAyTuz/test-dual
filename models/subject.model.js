const mongoose = require("mongoose");
const { Schema, model } = mongoose;

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
        require: false,
      },
    ],
  },
  { timestamps: true }
);

//Get enum credit of subject
const getEnumCredit = async () =>
  await SubjectSchema.path("credit").options.enum;

const Subject = model("Subject", SubjectSchema);
module.exports = { Subject, getEnumCredit };
