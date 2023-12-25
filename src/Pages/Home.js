import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../assets/css/style-prefix.css";
import "../assets/css/style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Banners from "../components/Banners";
import Category from "../components/Category";
import Blogs from "../components/Blogs";
import TCS from "../components/TCS";
import Products from "../components/Products";
import NotifucationToast from "../components/NotifucationToast";

export default function Home() {
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthActions = async () => {
      if (localStorage.getItem("TargetWithGoogle") && user) {
        if (localStorage.getItem("TargetWithGoogle") === "SignupContainer") {
          await signup();
        } else if (
          localStorage.getItem("TargetWithGoogle") === "LoginContainer"
        ) {
          await login();
        } else {
          console.log(`Login to get more advantage...`);
        }
      }
    };

    handleAuthActions();
  }, [user]);

  const signup = async () => {
    try {
      const response = await axios.post("http://localhost:9000/mirchmasala/signup", {
        firstName: user.name.split(" ")[0],
        lastName: user.name.split(" ")[1],
        email: user.email,
        contactNumber: " ",
        withGoogle: true,
      });

      alert(response.data.message);
      localStorage.setItem("TargetWithGoogle", undefined);
    } catch (error) {
      handleAuthError(error);
    }
  };

  const login = async () => {
    try {
      const response = await axios.post("http://localhost:9000/mirchmasala/login", {
        usernameOrEmail: user.email,
        withGoogle: true,
      });

      if (response.data.status) {
        sessionStorage.setItem("userData", JSON.stringify(response.data.user));
        localStorage.setItem("TargetWithGoogle", undefined);
      } else {
        alert(response.data.message);
        localStorage.setItem("TargetWithGoogle", undefined);
      }
    } catch (error) {
      handleAuthError(error);
    }
  };

  const handleAuthError = (error) => {
    if (error.response) {
      if (error.response.status === 404) {
        alert("Not found in my Database, Sign up now...");
      } else if (error.response.status === 401) {
        alert("Invalid username or password");
      } else if (error.response.status === 500) {
        alert("Internal server error");
      }
    } else {
      alert(error.message || "Network error, please try again later.");
    }
  };

  return (
    <div>
      <NotifucationToast />
      <main>
        <Banners />
        <Category />
        <Products />
        <TCS />
        <Blogs />
      </main>
    </div>
  );
}
