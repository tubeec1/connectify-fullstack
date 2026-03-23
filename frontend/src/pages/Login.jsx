import { useContext, useState } from "react";
import React from "react";
import { SysContext } from "../layouts/layout";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let { state, dispatch } = useContext(SysContext);

  function handleSubmit(e) {
    e.preventDefault();
    let newUser = {
      email,
      password,
    };
    if (!newUser.email || !newUser.password) {
      alert("Email and Password fields are required");
      return;
    }
    fetchApi();
    async function fetchApi() {
      let res = await fetch(
        "http://localhost/Fullstack-Layered-Social-API/backend/public/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        },
      );
      let data = await res.json();

      if (data.status) {
        alert(data.message);
        localStorage.setItem("token", data.token);
        console.log(localStorage.getItem("token"));
        console.log("thsi si user loging", data.user);
        dispatch({ type: "login", payload: { user: data.user } });
        dispatch({ type: "IS_LOGIN", payload: { isLogin: true } });
        navigate("/home");
      } else {
        alert(data.message);
      }
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="flex flex-col md:flex-row bg-white shadow-2xl rounded-2xl overflow-hidden max-w-5xl w-full">
        {/* Image Section */}
        <div className="md:w-1/2 hidden md:block">
          <img
            src="/src/images/loginImage.jpg"
            alt="Login"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Welcome Back 👋
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Enter your password"
              className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              className="bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-gray-600 text-sm">
            Don't have an account?{" "}
            <Link
              className="text-blue-600 font-semibold hover:underline"
              to="/signup"
            >
              Register new account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
