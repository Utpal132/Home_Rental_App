import express from "express";
import multer from "multer";
import { register } from "../controller/auth.controller.js";

const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cd(null, file.originalname);
  },
});

const upload = multer({ storage });

router.post("/register", upload.single("profileimage"), register);

export default router;
