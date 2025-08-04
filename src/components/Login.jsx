import React, { useState } from "react";
import { Nav } from "./homeComponent/Nav";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import cookie from "js-cookie";
export default function Login() {
  const [loading, isLoading] = useState(false);

  const [user, setUser] = useState({
    email: "",
    password: "",
    role: "user",
  });
  const navigate = useNavigate();
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

    const resp = await fetch(`${backendUrl}/login`, {
      credentials: "include",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
      method: "POST",
    });
    const success = () => {
      toast.success("login  successful!", {
        autoClose: 7000,
      });
    };
    const err = () => {
      toast.error("user not registered", {
        autoClose: 7000,
      });
      toast.error("create account now", {
        autoClose: 7000,
      });
    };
    if (resp.ok) {
      success();
      isLoading(false);
      const data = await resp.json();
      cookie.set("token", data.token);
      cookie.set("role", user.role);
      if (user.role === "user") {
        navigate("/user/dashboard");
      } else if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (user.role === "rider") {
        navigate("/rider/dashboard");
      }
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 h-screen">
        <div className="w-full max-w-md bg-emerald-50 rounded-xl p-8 shadow-md -translate-y-6">
          {/* Branding */}
          <div className="mb-6 text-center">
            <h1 className="text-4xl font-bold text-emerald-600">SwiftTrack</h1>
            <h2 className="mt-4 text-2xl font-semibold text-gray-800">
              Sign in to your account
            </h2>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Role Selection */}
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                Select Role
              </label>
              <select
                id="role"
                name="role"
                value={user.role}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="rider">Rider</option>
              </select>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={user.email}
                onChange={handleChange}
                required
                autoComplete="email"
                className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="you@example.com"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Link
                  to="/forgot"
                  className="text-sm text-emerald-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                value={user.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
                className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="••••••••"
              />
            </div>

            {/* Button */}
            {!loading ? (
              <div>
                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  Login
                </button>
              </div>
            ) : (
              <div>
                <button
                  disabled
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <span class="loading loading-spinner loading-lg duration-200"></span>
                </button>
              </div>
            )}
          </form>

          {/* Footer Link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Not a member?{" "}
            <Link
              to="/signup"
              className="text-emerald-600 font-medium hover:underline"
            >
              Signup
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
