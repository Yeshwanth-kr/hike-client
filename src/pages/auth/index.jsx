import React, { useState } from "react";
import toast from "react-hot-toast";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "@/utils/constants.js";
import { useAppStore } from "@/store";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const { setUserInfo } = useAppStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [page, setPage] = useState("login");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validateLogin = () => {
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return false;
    } else {
      if (password.length < 8) {
        toast.error("Password should be minimum of 8 characters");
        return false;
      } else {
        return true;
      }
    }
  };

  const validateSignup = () => {
    if (!email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return false;
    } else {
      if (password.length < 8) {
        toast.error("Password should be minimum of 8 characters");
        return false;
      } else {
        if (password != confirmPassword) {
          toast.error("Passwords do not match");
          return false;
        } else {
          return true;
        }
      }
    }
  };

  const handleLogin = async () => {
    if (validateLogin()) {
      const res = await fetch(LOGIN_ROUTE, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await res.json();
      console.log(data);
      console.log(res);
      if (data._id) {
        setUserInfo(data);
        if (data.profileSetup) {
          navigate("/chat");
        } else {
          navigate("/profile");
        }
      }
      if (data.error) {
        toast.error(data.error);
      }
    }
  };

  const handleSignup = async () => {
    if (validateSignup()) {
      const res = await fetch(SIGNUP_ROUTE, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await res.json();
      if (res.status === 201) {
        setUserInfo(data);
        navigate("/profile");
      } else if (data.error) {
        toast.error(data.error);
      }
    }
  };

  return (
    <div className="h-[100vh] w-[100vw] flex justify-center items-center">
      <div className="h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:[60vw] rounded-3xl grid">
        <div className="flex flex-col gap-10 items-center justify-center">
          <div className="flex items-center justify-center flex-col">
            <div className="flex items-center justify-center">
              <h1 className="text-5xl font-bold md:text-6xl">
                <span className="text-blue-500">Hike</span>{" "}
                <span className="text-black">Messenger</span>
              </h1>
            </div>
            <p className="font-normal text-lg text-center text-black pt-4">
              Fiil in the details to get started with Hike Messenger.
            </p>
            <div className="flex w-3/4 justify-around pt-4">
              <button
                className={`text-black h-8 md:h-12 w-1/3 rounded-md transition-all duration-300 ${
                  page === "login" ? "bg-blue-400" : "bg-gray-200"
                }`}
                onClick={() => setPage("login")}
              >
                Login
              </button>
              <button
                className={`text-black h-8 md:h-12 w-1/3 rounded-md transition-all duration-300 ${
                  page === "signup" ? "bg-blue-400" : "bg-gray-200"
                }`}
                onClick={() => setPage("signup")}
              >
                SignUp
              </button>
            </div>
            {page === "login" && (
              <>
                <form
                  className="flex flex-col h-30 md:h-60 justify-between w-full py-4 items-center"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleLogin();
                  }}
                >
                  <input
                    className="text-black h-8 md:h-12 rounded-full w-full border-1 px-6 border-blue-300 transition-all duration-300 validator"
                    type="email"
                    required
                    value={email}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    className="text-black border-blue-300 h-8 md:h-12 rounded-full py-2 px-6 w-full border-1 transition-all duration-300"
                    type="password"
                    value={password}
                    required
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    className="text-black bg-blue-400 h-8 md:h-12 rounded-full w-3/4"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLogin();
                    }}
                  >
                    Login
                  </button>
                </form>
              </>
            )}
            {page === "signup" && (
              <>
                <form
                  className="flex flex-col h-30 md:h-60 justify-between w-full py-4 items-center"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSignup();
                  }}
                >
                  <input
                    className="validator text-black h-8 md:h-12 rounded-full w-full border-1 px-6 border-blue-300"
                    type="email"
                    required
                    value={email}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    className="text-black border-blue-300 h-8 md:h-12 rounded-full py-2 px-6 w-full border-1"
                    type="password"
                    value={password}
                    placeholder="Password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <input
                    className="text-black border-blue-300 h-8 md:h-12 rounded-full py-2 px-6 w-full border-1"
                    type="password"
                    value={confirmPassword}
                    placeholder="Confirm Password"
                    required
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    className="text-black bg-blue-400 h-8 md:h-12 rounded-full w-3/4"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSignup();
                    }}
                  >
                    Login
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
