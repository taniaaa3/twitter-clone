import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { TERipple, TEModal, TEModalDialog, TEModalContent, TEModalHeader, TEModalBody, TEModalFooter } from "tw-elements-react";
import { useAuth } from "../context/useAuth";

const UploadPFPModal = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState();
  const [displayImage, setDisplayImage] = useState();
  const {token} = useAuth();

  const handle = async (e) => {
    e.preventDefault();
    console.log(image);
    const formData = new FormData();
    formData.append("pfp", image);
    try {
      await axios.post(`https://twitter-clone-llkn.onrender.com/api/user/${props.id}/uploadProfilePic`, formData, {
        headers: {"Authorization":`Bearer ${token}`}
      }).then((res) => {
        console.log(res);
        toast('Profile Picture Updated');
        setImage('');
        setDisplayImage('');
      }).catch((err) => { console.log(err);
        toast.error("Select image") })
    } catch (error) {
      console.log(error);
      toast.error("Select image")
    }
  }
  useEffect(()=>{
      if(image){
      const reader = new FileReader();
      reader.onload = (e)=>{
          setDisplayImage(e.target.result)
      };
      reader.readAsDataURL(image);}
  },[image])
  return (
    <div>
      {/* <!-- Button trigger modal --> */}
      <TERipple rippleColor="white">
        <button onClick={() => setShowModal(true)} className='text-blue-500 border border-blue-500 p-2 w-max'>Upload PFP</button>
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
                    setImage('');
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
            <form onSubmit={handle}>
            <TEModalBody>
            
          <input type="file" className="text-transparent" name="pfp" accept='image/png, image/jpg, image.jpeg' onChange={(e) => setImage(e.target.files[0])} />
          {displayImage ? <img src={displayImage} alt="image"/> : <></> }
        
            </TEModalBody>
            <TEModalFooter>
              <TERipple rippleColor="light">
                <button
                  type="button"
                  className="inline-block rounded bg-blue-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-blue-accent-100 focus:bg-blue-accent-100 focus:outline-none focus:ring-0 active:bg-blue-accent-200"
                  onClick={() => {setShowModal(false);
                            setDisplayImage('');
                  }}
                >
                  Close
                </button>
              </TERipple>
              <TERipple rippleColor="light">
                <button
                  type="submit"
                  className="ml-1 inline-block rounded bg-blue-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-blue-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-blue-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  
                >
                  Change PFP
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

export default UploadPFPModal;