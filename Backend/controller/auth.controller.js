import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../Utils/error.js";
export const register = async (req, res, next) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const profileimage = req.file; // Assuming you're using middleware like multer for file uploads

    if (!profileimage) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const profileimagePath = profileimage.path;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(errorHandler(409,"User already exist!"));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      profileimagePath,
    });

    await newUser.save();
    console.log(newUser);

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    next(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res,next) => {
  try {
    const { email, password } = req.body;

    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found" ));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Wrong Credenitials" ));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const { password: pass, ...rest } = validUser._doc;

    res.status(200).json({ token, user: rest });
  } catch (error) {
   next(error);
  }
};
