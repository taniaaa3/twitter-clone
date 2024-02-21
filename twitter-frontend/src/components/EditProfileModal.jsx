import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { TERipple, TEModal, TEModalDialog, TEModalContent, TEModalHeader, TEModalBody, TEModalFooter } from "tw-elements-react";
import { useAuth } from "../context/useAuth";

const EditProfileModal = (props) => {
  const [showModal, setShowModal] = useState(false);
  const {token} = useAuth();
  const [details, setDetails] = useState({
    name: props.user.name,
    location: props.user.location ? props.user.location : "",
    dob: ""
  });

  const editProfile = async(e)=>{
        e.preventDefault();
        try {
            await axios.put(`http://192.168.1.111:3003/api/user/${props.id}`,details,{
                headers: {"Authorization":`Bearer ${token}`}
            }).then((res)=>{
                console.log(res);
                toast('User Edited');
            }).catch((err)=>{
                console.log(err);
                toast.error("User unable to edit")
            })
        } catch (error) {
            console.log(error);
        }
  }

  return (
    <div>
      {/* <!-- Button trigger modal --> */}
      <TERipple rippleColor="white">
        <button onClick={() => setShowModal(true)} className='px-9 sm:px-4 py-2 border border-black m-3'>Edit</button>
      </TERipple>

      {/* <!-- Modal --> */}
      <TEModal show={showModal} setShow={setShowModal}>
        <TEModalDialog>
          <TEModalContent>
            <TEModalHeader>
              {/* <!--Modal title--> */}
              <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                {props.title}
              </h5>
              {/* <!--Close button--> */}
              <button
                type="button"
                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                onClick={() => {setShowModal(false);
                  }}
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </TEModalHeader>
            {/* <!--Modal body--> */}
            <form onSubmit={editProfile}>
            <TEModalBody>
                <div className="flex flex-col">
              <label className="cursor-pointer" htmlFor="name">Name</label>
              <input required id="name" className="border rounded-lg w-auto m-2 px-2 py-1" value={details.name} onChange={(e)=>{setDetails({...details, ["name"]:e.target.value})}} type="text" />
              </div>
              <div className="flex flex-col">
              <label className="cursor-pointer" htmlFor="location">Location</label>
              <input required id="location" className="border rounded-lg w-auto m-2 px-2 py-1" value={details.location} onChange={(e)=>{setDetails({...details, ["location"]:e.target.value})}} type="text" />
              </div>
              <div className="flex flex-col">
              <label className="cursor-pointer" htmlFor="dob">Date of Birth</label>
              <input required id="dob" className="border rounded-lg w-auto m-2 px-2 py-1" value={details.dob} onChange={(e)=>{setDetails({...details, ["dob"]:e.target.value})}} type="date" />
              </div>
              
            </TEModalBody>
            <TEModalFooter>
              <TERipple rippleColor="light">
                <button
                  type="button"
                  className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                  onClick={() => {setShowModal(false);
                  }}
                >
                  Close
                </button>
              </TERipple>
              <TERipple rippleColor="light">
                <button
                  type="submit"
                  className="ml-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  
                >
                  Edit
                </button>
              </TERipple>
            </TEModalFooter>
            </form>
          </TEModalContent>
        </TEModalDialog>
      </TEModal>
    </div>
  );
}

export default EditProfileModal;