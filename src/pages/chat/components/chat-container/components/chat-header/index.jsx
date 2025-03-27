import { colors, getColor } from "@/lib/utils";
import { useAppStore } from "@/store";
import { HOST } from "@/utils/constants";
import { RiCloseFill } from "react-icons/ri";

const index = () => {
  const { closeChat, selectedChatData, selectedChatType } = useAppStore();

  return (
    <div className="h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-between px-20">
      <div className="flex gap-5 items-center w-full justify-between">
        <div className="flex gap-3 items-center justify-center ">
          <div className="w-12 h-12 relative">
            {selectedChatType === "contact" ? (
              <div className="avatar h-12 w-12 rounded-full overflow-hidden">
                {selectedChatData.image ? (
                  <div className="object-cover w-full h-full bg-black">
                    <img src={`${HOST}/${selectedChatData.image}`} />
                  </div>
                ) : (
                  <span
                    className={`uppercase h-12 w-12 text-2xl border-[1px] flex items-center justify-center rounded-full ${getColor(
                      selectedChatData.color
                    )}`}
                  >
                    {selectedChatData.firstName
                      ? selectedChatData.firstName.split("").shift()
                      : selectedChatData.email.split("").shift()}
                  </span>
                )}
              </div>
            ) : (
              <div className="bg-[#ffffff22] h-10 w-10 flex items-center justify-center rounded-full ">
                #
              </div>
            )}
          </div>
          {selectedChatType === "channel" && (
            <div className="flex flex-col justify-center items-center">
              {selectedChatData.name}
            </div>
          )}
          {selectedChatType === "contact" && (
            <div className="flex flex-col">
              <span className={`text-lg`}>
                {selectedChatType === "contact" && selectedChatData.firstName
                  ? selectedChatData.firstName + " " + selectedChatData.lastName
                  : selectedChatData.email}
              </span>
              <span
                className={`text-sm ${
                  selectedChatType === "contact" &&
                  selectedChatData.firstName
                    ? ""
                    : "hidden"
                }`}
              >
                {selectedChatType === "contact" ? selectedChatData.email : ""}
              </span>
            </div>
          )}
        </div>
        <div className="flex justify-center items-center gap-5">
          <button
            onClick={closeChat}
            className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
          >
            <RiCloseFill className="text-3xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default index;
