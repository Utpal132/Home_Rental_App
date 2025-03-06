import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

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
      return res.status(409).json({ message: "User already exists" });
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
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
