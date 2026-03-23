import React, { useContext, useState, useRef } from "react";
import { SysContext } from "../layouts/layout";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  let imageRef = useRef();
  let navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    profileImage: null,
  });

  const { state, dispatch } = useContext(SysContext);

  function handleSubmit(e) {
    e.preventDefault();
    let formData = new FormData();
    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("profile_image", user.profileImage);
    fetchApi(formData);

    async function fetchApi(user) {
      let res = await fetch(
        "http://localhost/Fullstack-Layered-Social-API/backend/public/api/signup",
        {
          method: "POST",
          body: user,
        },
      );
      let data = await res.json();
      if (data.status) {
        alert(data.message);
        setUser({
          name: "",
          email: "",
          password: "",
          profileImage: null,
        });
        imageRef.current.value = "";
        navigate("/");
      } else {
        alert(data.message);
      }
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="flex flex-col md:flex-row bg-white shadow-xl rounded-2xl overflow-hidden max-w-5xl w-full">
        {/* Image Section */}
        <div className="md:w-1/2 hidden md:block">
          <img
            src="/src/images/loginImage.jpg"
            alt="Signup"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Create Account
          </h2>
          <p className="text-gray-500 mb-6">
            Join us and start your journey 🚀
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              value={user.name}
              type="text"
              placeholder="Full Name"
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />

            <input
              value={user.email}
              type="email"
              placeholder="Email Address"
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />

            <input
              value={user.password}
              type="password"
              placeholder="Password"
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />

            <input
              ref={imageRef}
              type="file"
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              onChange={(e) =>
                setUser({ ...user, profileImage: e.target.files[0] })
              }
            />

            <button
              type="submit"
              className="bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition duration-300 shadow-md"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-6 text-gray-600 text-sm text-center">
            Already have an account?{" "}
            <Link to="/" lassName="text-blue-600 font-semibold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
