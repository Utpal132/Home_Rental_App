import React, { useState } from "react";
import upload from "../assets/upload.png";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
    profileimage: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      [name]: name === "profileimage" ? files[0] : value,
    });
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Sign Up
        </h1>
        <form className="flex flex-col gap-5">
          <input
            type="text"
            className="p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="firstname"
            placeholder="First Name"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            className="p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="lastname"
            placeholder="Last Name"
            value={formData.lastname}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            className="p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            className="p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            className="p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="confirmpassword"
            placeholder="Confirm Password"
            value={formData.confirmpassword}
            onChange={handleChange}
            required
          />
          <input
            type="file"
            id="image"
            className="hidden"
            name="profileimage"
            accept="image/*"
            onChange={handleChange}
            required
          />
          <label
            htmlFor="image"
            className="flex items-center justify-center gap-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100"
          >
            {formData.profileimage ? (
              <img
                src={URL.createObjectURL(formData.profileimage)}
                alt="profile photo"
                style={{ maxWidth: "80px" }}
              />
            ) : (
              <img src={upload} alt="Upload" className="w-8 h-8" />
            )}

            <p className="text-lg text-gray-700">Upload Your Photo</p>
          </label>
          <button className="bg-slate-700  text-white font-bold text-lg py-4 rounded-lg uppercase transition-all">
            Register
          </button>
        </form>
        <div className="mt-5 flex gap-2">
          <p>Already have an account?</p>
          <Link to={"/login"}>
            <span className="text-blue-700">Sign in</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
