import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import {
  HOST,
  CREATE_CHANNEL_ROUTE,
  GET_ALL_CONTACTS_ROUTE,
  SEARCH_CONTACT_ROUTE,
} from "@/utils/constants";
import { useAppStore } from "@/store";
import toast from "react-hot-toast";
import apiClient from "@/lib/api-client";
import { getColor } from "@/lib/utils";

const CreateChannel = () => {
  const { addChannel } = useAppStore();
  const [allContacts, setAllContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [channelName, setChannelName] = useState("");

  useEffect(() => {
    const getData = async () => {
      const res = await apiClient.get(GET_ALL_CONTACTS_ROUTE, {
        withCredentials: true,
      });
      setAllContacts(res.data.contacts);
      setSelectedContacts([]);
    };
    getData();
  }, []);

  const createChannel = async () => {
    try {
      if (channelName.length > 0 && selectedContacts.length > 0) {
        const res = await fetch(CREATE_CHANNEL_ROUTE, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            name: channelName,
            members: selectedContacts.map((contact) => contact._id),
          }),
        });
        const data = await res.json();
        if (res.status === 201) {
          setChannelName("");
          setSelectedContacts([]);
          addChannel(data.channel);
          document.getElementById("newChannelModel").close();
        }
      } else {
        toast.error("Please select contacts and set Channel Name");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="tooltip" data-tip="Create New Channel">
        <FaPlus
          className="text-neutral-400 font-light text-opacity-90 text-start hover:text-neutral-100 cursor-pointer transition-all duration-300"
          onClick={() => {
            document.getElementById("newChannelModel").showModal();
          }}
        />
      </div>
      <dialog id="newChannelModel" className="modal">
        <div className="modal-box">
          <p className="py-4">Channel Name</p>
          <input
            type="text"
            placeholder="Channel Name"
            className="rounded-lg p-2 bg-[#2c2e3b] border-none w-full"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
          />
          <p className="py-4">Please select contacts</p>
          {/* <div className="flex w-full items-center justify-center">
            <input
              type="text"
              placeholder="Search Contacts"
              className="rounded-lg p-2 bg-[#2c2e3b] border-none w-full"
              onChange={(e) => searchContacts(e.target.value)}
            />
          </div> */}
          <ul className="menu bg-base-200 rounded-box w-full mt-4">
            {allContacts.map((contact) => (
              <div
                key={contact._id}
                className={`flex gap-3 items-center cursor-pointer p-1 m-1 hover:bg-blue-700 rounded-full transition-all duration-300 ${
                  selectedContacts.includes(contact)
                    ? "bg-blue-900"
                    : "bg-transparent"
                }`}
                onClick={() => {
                  if (selectedContacts.includes(contact)) {
                    let newArray = selectedContacts;
                    selectedContacts.forEach((element) => {
                      if (element != contact) {
                        newArray.push(element);
                      }
                    });

                    setSelectedContacts(newArray);
                  } else {
                    setSelectedContacts([...selectedContacts, contact]);
                  }
                }}
              >
                <div className="w-12 h-12 relative">
                  <div className="avatar h-12 w-12 rounded-full overflow-hidden">
                    {contact.image ? (
                      <div className="object-cover w-full h-full bg-black">
                        <img src={`${HOST}/${contact.image}`} />
                      </div>
                    ) : (
                      <span
                        className={`uppercase h-12 w-12 text-3xl border-[1px] flex items-center justify-center rounded-full ${getColor(
                          contact.color
                        )}`}
                      >
                        {contact.firstName
                          ? contact.firstName.split("").shift()
                          : contact.email.split("").shift()}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col">
                  <span>
                    {contact.firstName && contact.lastName
                      ? `${contact.firstName} ${contact.lastName}`
                      : ""}
                  </span>
                  <span className="text-xs">{contact.email}</span>
                </div>

                {/* <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.value) {
                      setSelectedContacts([...selectedContacts, contact]);
                    }
                  }}
                  className="checkbox border-indigo-600 bg-indigo-500 checked:bg-blue-400 checked:text-blue-800 checked:border-blue-500 "
                /> */}
              </div>
            ))}
          </ul>
          <div className="modal-action">
            <button className="btn" onClick={createChannel}>
              Create Channel
            </button>
            <button
              className="btn"
              onClick={() => {
                document.getElementById("newChannelModel").close();
                setSelectedContacts([]);
                setChannelName("");
              }}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default CreateChannel;
