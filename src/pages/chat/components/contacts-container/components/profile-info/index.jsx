import apiClient from "@/lib/api-client";
import { getColor } from "@/lib/utils";
import { useAppStore } from "@/store";
import { HOST, LOGOUT_ROUTE } from "@/utils/constants";
import React from "react";
import { FiEdit2 } from "react-icons/fi";
import { IoPowerSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const ProfileInfo = () => {
  const { userInfo, setUserInfo } = useAppStore();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const res = await apiClient.post(
        LOGOUT_ROUTE,
        {},
        { withCredentials: true }
      );
      if (res.status === 200) {
        navigate("/auth");
        setUserInfo(null);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="absolute bottom-0 h-16 flex items-center justify-between px-10 w-full bg-[#2a2b33]">
      <div className="flex gap-3 items-center justify-center">
        <div className="w-12 h-12 relative">
          <div className="avatar h-12 w-12 rounded-full overflow-hidden">
            {userInfo.image ? (
              <div className="object-cover w-full h-full bg-black">
                <img src={`${HOST}/${userInfo.image}`} />
              </div>
            ) : (
              <span
                className={`uppercase h-12 w-12 text-2xl border-[1px] flex items-center justify-center rounded-full ${getColor(
                  userInfo.selectedColor
                )}`}
              >
                {userInfo.firstName
                  ? userInfo.firstName.split("").shift()
                  : userInfo.email.split("").shift()}
              </span>
            )}
          </div>
        </div>
        <div>
          {userInfo.firstName && userInfo.lastName
            ? `${userInfo.firstName} ${userInfo.lastName}`
            : ""}
        </div>
      </div>
      <div className="flex gap-5">
        <div className="tooltip" data-tip="Edit Profile">
          <FiEdit2
            className="text-purple-500 text-xl font-medium"
            onClick={() => navigate("/profile")}
          />
        </div>
        <div className="tooltip" data-tip="Log Out">
          <IoPowerSharp
            className="text-red-500 text-xl font-medium"
            onClick={logout}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
