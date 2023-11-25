import expressAsyncHandler from "express-async-handler";
import isEmail from "validator/lib/isEmail.js";
import isStrongPassword from "validator/lib/isStrongPassword.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

function generateRandomNumbersString() {
  let result = "";

  for (let i = 0; i < 10; i++) {
    const randomNumber = Math.floor(Math.random() * 10);
    result += randomNumber.toString();
  }

  return result;
}

export const register = expressAsyncHandler(async (req, res) => {
  const { email, password, country, phoneNumber } = req.body;

  if (!email || !password || !country || !phoneNumber) {
    throw new Error("All fields are required");
  }

  if (!isEmail(email)) {
    throw new Error(email + " is not a valid address");
  }

  if (!isStrongPassword(password)) {
    throw new Error("Please enter a strong password");
  }

  const exists = await User.findOne({ email });
  if (exists) {
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    email,
    accountType: "personal",
    password,
    country,
    phoneNumber,
    accountBalance: 100000,
    beneficiaries: [],
    password: hashedPassword,
    accountNumber: generateRandomNumbersString(),
  });

  res.status(201).json({
    _id: user._id,
    token: generateToken(user._id),
  });
});

export const login = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
 
  if (!email || !password) {
    throw new Error("All fields are required");
  }

  const user = await User.findOne({ email });
  console.log(user)
  
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  res.status(200).json({
    user: user._id,
    token: generateToken(user._id),
  });
});
