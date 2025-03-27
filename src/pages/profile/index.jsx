import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store";
import { IoArrowBack } from "react-icons/io5";
import { colors, getColor } from "@/lib/utils.js";
import { FaTrash, FaPlus } from "react-icons/fa";
import apiClient from "@/lib/api-client";
import {
  ADD_PROFILE_IMAGE_ROUTE,
  HOST,
  REMOVE_PROFILE_IMAGE_ROUTE,
  UPDATE_PROFILE_ROUTE,
} from "@/utils/constants";

const Profile = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useAppStore();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (userInfo.profileSetup) {
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      setSelectedColor(userInfo.color);
    }
    if (userInfo.image) {
      setImage(`${HOST}/${userInfo.image}`);
    }
  }, [userInfo]);

  const handleNavigate = () => {
    if (userInfo.profileSetup) {
      navigate("/chat");
    } else {
      toast.error("Please setup your profile to continue");
    }
  };

  const validateProfile = () => {
    if (!firstName || !lastName) {
      toast.error("Please fill in all fields");
      return false;
    } else {
      return true;
    }
  };

  const saveChanges = async () => {
    if (validateProfile()) {
      try {
        const res = await fetch(UPDATE_PROFILE_ROUTE, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ firstName, lastName, color: selectedColor }),
        });
        const data = res.json();
        if (res.status === 200 && data) {
          setUserInfo(data);
          toast.success("Profile updated successfully");
          navigate("/chat");
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profile-image", file);
      const res = await apiClient.post(ADD_PROFILE_IMAGE_ROUTE, formData, {
        withCredentials: true,
      });
      if (res.status === 200 && res.data.image) {
        setUserInfo({ ...userInfo, image: res.data.image });
        toast.success("Image updated successfully");
      }
    }
  };

  const handleDeleteImage = async () => {
    try {
      const res = await fetch(REMOVE_PROFILE_IMAGE_ROUTE, {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (res.status === 200) {
        setUserInfo({ ...userInfo, image: null });
        toast.success("Image removed successfully");
        setImage(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-[#1b1c24] h-[100vh] flex items-center justify-center gap-10 flex-col">
      <div className="flex flex-col gap-10 w-[80vw] md:w-max">
        <div onClick={handleNavigate}>
          <IoArrowBack className="text-4xl lg:text-6xl text-white/90 cursor-pointer" />
        </div>
        <div className="grid grid-cols-2">
          <div
            className="h-full w-32  md:w-48 relative flex items-center justify-center"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <div className="avatar h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden">
              {image ? (
                <div className="object-cover w-full h-full bg-black">
                  <img src={image} />
                </div>
              ) : (
                <span
                  className={`uppercase h-32 w-32 md:w-48 md:h-48 text-6xl border-[1px] flex items-center justify-center rounded-full ${getColor(
                    selectedColor
                  )}`}
                >
                  {firstName
                    ? firstName.split("").shift()
                    : userInfo.email.split("").shift()}
                </span>
              )}
            </div>
            {hovered && (
              <div
                onClick={image ? handleDeleteImage : handleFileInputClick}
                className="absolute inset-0 flex items-center justify-center bg-black/50 ring-fuchsia-500 rounded-full cursor-pointer"
              >
                {image ? (
                  <FaTrash className="text-white text-3xl cursor-pointer" />
                ) : (
                  <FaPlus className="text-white text-3xl cursor-pointer" />
                )}
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageChange}
              name="profile-image"
              accept="image/*"
            />
          </div>
          <form
            className="flex min-w-32 md:min-w-64 flex-col gap-5 text-white items-center justify-center"
            onSubmit={(e) => {
              e.preventDefault();
              saveChanges();
            }}
          >
            <div className="w-full">
              <input
                placeholder="Email"
                type="email"
                disabled
                value={userInfo.email}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              />
            </div>
            <div className="w-full">
              <input
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                value={firstName}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              />
            </div>
            <div className="w-full">
              <input
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                value={lastName}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              />
            </div>
            <div className="w-full flex gap-5">
              {colors.map((color, index) => (
                <div
                  className={`${color} h-8 w-8 rounded-full  cursor-pointer transition-all duration-100 ${
                    selectedColor === index
                      ? "outline outline-white/50 outline-3"
                      : ""
                  }`}
                  key={index}
                  onClick={() => setSelectedColor(index)}
                ></div>
              ))}
            </div>
            <button
              className="h-16 w-full bg-blue-700 hover:bg-blue-900 transition-all duration-300 rounded-md"
              onClick={(e) => {
                e.preventDefault();
                saveChanges();
              }}
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
