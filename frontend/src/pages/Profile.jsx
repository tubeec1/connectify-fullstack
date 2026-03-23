import React, { useContext } from "react";
import { SysContext } from "../layouts/layout";

const Profile = () => {
  const { state, dispatch } = useContext(SysContext);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6 mt-16">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sidebar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
          <h1 className="text-xl font-bold mb-6 text-gray-700">
            Welcome {state.user?.name}
          </h1>

          {state.user && (
            <img
              src={`http://localhost/Fullstack-Layered-Social-API/backend/public/${state.user.profile_image}`}
              alt="profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-blue-500"
            />
          )}

          <h2 className="mt-4 text-lg font-semibold text-gray-800">
            {state.user?.name}
          </h2>

          <p className="text-gray-500">{state.user?.email}</p>

          <div className="mt-6 w-full">
            <button
              className="w-full py-2 rounded-xl bg-red-600 text-white font-semibold hover:bg-blue-700 transition"
              onClick={() => {
                dispatch({ type: "IS_LOGIN", payload: { isLogin: false } });
              }}
            >
              logout
            </button>
          </div>
        </div>

        {/* Main Form */}
        <div className="md:col-span-2 bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-700 mb-6">
            Update Your Profile
          </h1>

          <form className="flex flex-col gap-5">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              defaultValue={state.user?.name}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              defaultValue={state.user?.email}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />

            <input
              type="password"
              name="password"
              placeholder="New Password"
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />

            <input
              type="file"
              name="profile_image"
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />

            <button
              type="submit"
              className="bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition duration-300 shadow-md"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
