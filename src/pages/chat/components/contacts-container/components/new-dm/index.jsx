import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { getColor } from "@/lib/utils";
import apiClient from "@/lib/api-client";
import { HOST, SEARCH_CONTACT_ROUTE } from "@/utils/constants";
import { useAppStore } from "@/store";

const NewDm = () => {
  const { setSelectedChatType, setSelectedChatData } = useAppStore();
  const [searchedContacts, setSearchedContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const searchContacts = async () => {
    try {
      if (searchTerm.length > 0) {
        const res = await apiClient.post(
          SEARCH_CONTACT_ROUTE,
          { searchTerm },
          { withCredentials: true }
        );
        if (res.status === 200 && res.data.contacts) {
          setSearchedContacts(res.data.contacts);
        }
      } else {
        setSearchedContacts([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const selectNewContact = (contact) => {
    document.getElementById("newDMModal").close();
    setSelectedChatType("contact");
    setSelectedChatData(contact);
    setSearchedContacts([]);
  };

  return (
    <>
      <div className="tooltip" data-tip="Select New Contact">
        <FaPlus
          className="text-neutral-400 font-light text-opacity-90 text-start hover:text-neutral-100 cursor-pointer transition-all duration-300"
          onClick={() => {
            document.getElementById("newDMModal").showModal();
            setSearchedContacts([]);
          }}
        />
      </div>
      <dialog id="newDMModal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Please select a contact!</p>
          <div className="flex w-full items-center justify-center">
            <input
              type="text"
              placeholder="Search Contacts"
              className="rounded-lg p-2 bg-[#2c2e3b] border-none w-full"
              onChange={(e) => {
                setSearchTerm(e.target.value);
                searchContacts();
              }}
            />
          </div>
          <ul className="menu bg-base-200 rounded-box w-full mt-4">
            {searchedContacts.map((contact) => (
              <div
                key={contact._id}
                className="flex gap-3 items-center cursor-pointer m-1 p-1 hover:bg-blue-700 rounded-full transition-all duration-300"
                onClick={() => {
                  selectNewContact(contact);
                  setSearchTerm("");
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
              </div>
            ))}
          </ul>
          <div className="modal-action">
            <button
              className="btn"
              onClick={() => document.getElementById("newDMModal").close()}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default NewDm;
