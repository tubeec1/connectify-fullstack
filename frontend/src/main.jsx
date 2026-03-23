import React, { useContext } from "react";
import { createRoot } from "react-dom/client";
import "./css/index.css";
import Layout from "./layouts/layout";
import Home from "./pages/Home";
import Signup from "./pages/Signup.jsx";
import Profile from "./pages/Profile.jsx";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { SysContext } from "./layouts/layout";
import Login from "./pages/login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "*",
    element: <h1>404 Page Not Found</h1>,
  },
]);
const root = createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
