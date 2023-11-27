import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    surname: {
      type: String,
    },
    accountType: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    accountNumber: {
      type: String,
      required: true,
    },
    accountBalance: {
      type: Number,
      required: true,
    },
    beneficiaries: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    dateOfBirth: {
      month: {
        type: String,
      },
      day: {
        type: String,
      },
      year: {
        type: String,
      },
    },
    city: {
      type: String,
    },
    homeAddress: {
      type: String,
    },
    postalCode: {
      type: String,
    },
    BVN: {
      type: String,
    },
    PIN: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

export default User;
