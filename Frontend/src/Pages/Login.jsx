import React, { useState } from "react";
import { Link } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Sign In
        </h1>
        <form className="flex flex-col gap-5">
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
          <button className="bg-slate-700 text-white font-bold text-lg py-4 rounded-lg uppercase transition-all disabled:opacity-80">
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
