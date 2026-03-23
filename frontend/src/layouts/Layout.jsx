import React, { createContext, useEffect, useReducer, useState } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import sysReducer from "../sysReducer";
import Header from "../components/Header";

export const SysContext = createContext(null);

let initialValue = {
  user: null,
  posts: [],
  comments: [],
  isLogout: false,
};

const Layout = () => {
  let [state, dispatch] = useReducer(sysReducer, initialValue);
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    console.log(state);
    async function fetchProfile() {
      setLoading(true);
      try {
        const res = await fetch(
          "http://localhost/Fullstack-Layered-Social-API/backend/public/api/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await res.json();

        if (data.status) {
          dispatch({ type: "login", payload: { user: data.user } });
          dispatch({ type: "IS_LOGIN", payload: { isLogin: true } });
        } else {
          localStorage.removeItem("token");
          dispatch({ type: "IS_LOGIN", payload: { isLogin: false } });
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }

    if (token && !state.user) {
      fetchProfile();
    }
  }, [dispatch]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <SysContext.Provider value={{ state, dispatch }}>
      <div>
        {state.isLogin && <Navigate to="/home" />}
        {!state.isLogin && <Navigate to="/" />}
        {state.isLogin && <Header />}
        <Outlet />
      </div>
    </SysContext.Provider>
  );
};

export default Layout;
