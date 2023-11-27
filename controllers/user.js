import expressAsyncHandler from "express-async-handler";
import User from "../models/user.js";

export const getUser = expressAsyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

export const updateProfile = expressAsyncHandler(async (req, res) => {
  const {
    name,
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

  console.log(id);

  console.log(
    name,
    phoneNumber,
    country,
    city,
    homeAddress,
    postalCode,
    BVN,
    PIN,
    surname
  );

  if (typeof PIN === "undefined") {
    throw new Error("Please provide a PIN");
  }

  const user = await User.findOne({ _id: id });
  if (!user) {
    throw new Error("User does not exist");
  }

  if (name) {
    user.name = name;
  }

  if (BVN) {
    user.BVN = BVN;
  }

  if (PIN) {
    user.PIN = PIN;
  }

  if (postalCode) {
    user.postalCode = postalCode;
  }

  if (homeAddress) {
    user.homeAddress = homeAddress;
  }

  if (country) {
    user.country = country;
  }

  if (city) {
    user.city = city;
  }

  if (surname) {
    user.surname = surname;
  }

  if (phoneNumber) {
    user.phoneNumber = phoneNumber;
  }

  await user.save();
  console.log(user);
  res.status(200).json({ message: "success" });
});
