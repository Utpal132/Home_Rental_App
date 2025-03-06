import React, { useEffect, useState } from "react";
import upload from "../assets/upload.png";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
    profileimage: null,
  });

  const [passwordMatch, setPasswordMatch] = useState(true);
  const [previewImage, setPreviewImage] = useState(null);
  const navigate = useNavigate();

  // Ensure password validation only runs when password or confirmPassword changes
  useEffect(() => {
    setPasswordMatch(
      formData.password === formData.confirmpassword || formData.confirmpassword === ""
    );
  }, [formData.password, formData.confirmpassword]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "profileimage" ? files[0] : value,
    }));

    // Handle image preview
    if (name === "profileimage" && files[0]) {
      const objectUrl = URL.createObjectURL(files[0]);
      setPreviewImage(objectUrl);
    }
  };

  // Cleanup image preview to prevent memory leaks
  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const registerForm = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        registerForm.append(key, value);
      });

      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        body: registerForm,
      });

      if (response.ok) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Sign Up
        </h1>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
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
          {!passwordMatch && (
            <p className="text-red-600">Passwords do not match</p>
          )}
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
            {previewImage ? (
              <img
                src={previewImage}
                alt="Profile Preview"
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <img src={upload} alt="Upload" className="w-8 h-8" />
            )}
            <p className="text-lg text-gray-700">Upload Your Photo</p>
          </label>
          <button
            className="bg-slate-700 text-white font-bold text-lg py-4 rounded-lg uppercase transition-all disabled:opacity-80"
            disabled={!passwordMatch}
          >
            Register
          </button>
        </form>
        <div className="mt-5 flex gap-2">
          <p>Already have an account?</p>
          <Link to="/login">
            <span className="text-blue-700">Sign in</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
