import React, { useState } from "react";
import { Nav } from "./homeComponent/Nav";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function Signup() {
  const [user, setUser] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    role: "user",
  });
  const navigate = useNavigate();
  const success = () => {
    toast.success("account created  successful!", {
      autoClose: 7000,
    });
    toast.success("Login now", {
      autoClose: 7000,
    });
  };
  const err = () => {
    toast.error("Account with this email already exists or try again", {
      autoClose: 7000,
    });
  };
  const [loading, isLoading] = useState(false);
  function handleChange(event) {
    const { name, value } = event.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    isLoading(true);
    const backendUrl = process.env.REACT_APP_BACKENDURL;

    const resp = await fetch(`${backendUrl}/signup`, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",

      body: JSON.stringify(user),
      method: "POST",
    });
    if (resp.ok) {
      success();
      isLoading(false);
      navigate("/login");
    } else {
      err();
      isLoading(false);
    }
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={7000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Nav />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-emerald-50 rounded-xl p-8 shadow-md">
          {/* Branding */}
          <div className="mb-6 text-center">
            <h1 className="text-4xl font-bold text-emerald-600">SwiftTrack</h1>
            <h2 className="mt-2 text-2xl font-semibold text-gray-800">
              Create your account
            </h2>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={user.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                value={user.phone}
                onChange={handleChange}
                placeholder="03XXXXXXXXX"
                className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={user.email}
                onChange={handleChange}
                autoComplete="email"
                required
                placeholder="you@example.com"
                className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={user.password}
                onChange={handleChange}
                autoComplete="new-password"
                placeholder="••••••••"
                className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sign up as
              </label>
              <div className="flex items-center space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="user"
                    checked={user.role === "user"}
                    onChange={handleChange}
                    className="form-radio text-emerald-600"
                    required
                  />
                  <span className="ml-2 text-gray-700">User</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="admin"
                    checked={user.role === "admin"}
                    onChange={handleChange}
                    className="form-radio text-emerald-600"
                  />
                  <span className="ml-2 text-gray-700">Admin</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="rider"
                    checked={user.role === "rider"}
                    onChange={handleChange}
                    className="form-radio text-emerald-600"
                  />
                  <span className="ml-2 text-gray-700">Rider</span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            {!loading ? (
              <div>
                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  Sign Up
                </button>
              </div>
            ) : (
              <div>
                <button
                  disabled
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  signing up...
                </button>
              </div>
            )}
          </form>

          {/* Footer Link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-emerald-600 font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
