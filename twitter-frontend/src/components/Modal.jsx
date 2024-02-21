import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { TERipple, TEModal, TEModalDialog, TEModalContent, TEModalHeader, TEModalBody, TEModalFooter } from "tw-elements-react";
import { useAuth } from "../context/useAuth";

const Modal = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState('');
  const [image, setImage] = useState();
  const [displayImage, setDisplayImage] = useState('');
  const {token} = useAuth();

  const createTweet = async(e)=>{
    e.preventDefault();
    console.log(image);
    const formData = new FormData();
    formData.append("tweet", image);
    formData.append("content", content);
    try {
      console.log(content);
      await axios.post(`http://192.168.1.111:3003/api/tweet`, formData, {
        headers: {"Authorization":`Bearer ${token}`}
      }).then((res) => {
        console.log(res);
        toast('Tweeted');
        setImage('');
        setContent('');
        setDisplayImage('');
      }).catch((err) => { console.log(err); })
    } catch (error) {
      console.log(error);
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
        <button
          type="button"
          className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          onClick={() => setShowModal(true)}
        >
          {props.name}
        </button>
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
                setContent('');
              setDisplayImage('');}}
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
            <form onSubmit={createTweet}>
            <TEModalBody>
              <textarea name="" id="" cols="30" rows="5" className="border p-2 border-2 resize-none block" onChange={(e)=>{setContent(e.target.value)}} value={content}></textarea>
              <input type="file" name="tweet" accept="image/*" id="tweet" className="hidden" onChange={(e) => { setImage(e.target.files[0]) }}/>
              <label htmlFor="tweet">
                <i className="fa fa-image my-2 text-2xl cursor-pointer"></i>
              </label>
              {displayImage ? <img src={displayImage} alt="image"/> : <></> }
            </TEModalBody>
            <TEModalFooter>
              <TERipple rippleColor="light">
                <button
                  type="button"
                  className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                  onClick={() => {setShowModal(false);
                  setImage('');
                setContent('');
              setDisplayImage('');}}
                >
                  Close
                </button>
              </TERipple>
              <TERipple rippleColor="light">
                <button
                  type="submit"
                  className="ml-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  
                >
                  Tweet
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

export default Modal;