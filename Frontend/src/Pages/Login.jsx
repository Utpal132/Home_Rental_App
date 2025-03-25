import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLogin } from "../redux/slice/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      if (data.token && data.user) {
        dispatch(
          setLogin({
            user: data.user, 
            token: data.token,
          })
        );
        navigate("/"); 
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Sign In
        </h1>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <input
            type="email"
            className="p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-slate-700 text-white font-bold text-lg py-4 rounded-lg uppercase transition-all disabled:opacity-80"
          >
            Login
          </button>
        </form>
        <div className="mt-5 flex gap-2">
          <p>Don't have an account?</p>
          <Link to="/register">
            <span className="text-blue-700">Sign Up</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
