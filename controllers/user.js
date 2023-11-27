import expressAsyncHandler from "express-async-handler";
import User from "../models/user.js";

export const getUser = expressAsyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

export const updateProfile = expressAsyncHandler(async (req, res) => {
  const {
    name,
    dateOfBirth,
    phoneNumber,
    country,
    city,
    homeAddress,
    postalCode,
    BVN,
    PIN,
    surname,
  } = req.body;
  const { id } = req.user;

  console.log(
    name,
    dateOfBirth,
    phoneNumber,
    country,
    city,
    homeAddress,
    postalCode,
    BVN,
    PIN,
    surname
  );

  if (
    !name ||
    !dateOfBirth ||
    !phoneNumber ||
    !country ||
    !city ||
    !homeAddress ||
    !postalCode ||
    !BVN ||
    !PIN ||
    !surname
  ) {
    throw new Error("All fields are required");
  }

  if (typeof PIN === "undefined") {
    throw new Error("Please provide a PIN");
  }

  const user = await User.findOne({ _id: id });
  if (!user) {
    throw new Error("User does not exist");
  }

  user.set({
    name,
    surname,
    dateOfBirth,
    phoneNumber,
    country,
    city,
    homeAddress,
    postalCode,
    PIN,
    BVN,
  });

  await user.save();

  res.status(200).json({ message: "success" });
});
