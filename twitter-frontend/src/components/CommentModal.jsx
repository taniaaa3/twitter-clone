import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { TERipple, TEModal, TEModalDialog, TEModalContent, TEModalHeader, TEModalBody, TEModalFooter } from "tw-elements-react";
import { useAuth } from "../context/useAuth";

const CommentModal = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState('');
  const [id, setID] = useState();
  const {token} = useAuth();

  const commentTweet = async(e)=>{
    e.preventDefault();
    try {
      console.log(content);
      if(content){
      await axios.post(`http://192.168.1.111:3003/api/tweet/${id}/reply`, {content}, {
        headers: {"Authorization":`Bearer ${token}`}
      }).then((res) => {
        console.log(res);
        toast('Commented');
        setContent('');
      }).catch((err) => { console.log(err); })}
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      {/* <!-- Button trigger modal --> */}
      <TERipple rippleColor="white">
        <div onClick={(e) => {setShowModal(true); e.stopPropagation(); setID(props.val._id)}} className='mr-2 hover:bg-blue-300 cursor-pointer px-2 py-1 flex flex-row items-center'>
                    <i className='fa-regular text-blue-500 fa-message m-1'></i>
                    <p>{props.val.replies ? props.val.replies.length : "0"}</p>
                  </div>
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
                onClick={() => setShowModal(false)}
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
            <form onSubmit={commentTweet}>
            <TEModalBody>
              <textarea name="" id="" cols="30" rows="10" className="border p-2 border-2 resize-none block" onChange={(e)=>{setContent(e.target.value)}} value={content}></textarea>
            </TEModalBody>
            <TEModalFooter>
              <TERipple rippleColor="light">
                <button
                  type="button"
                  className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </TERipple>
              <TERipple rippleColor="light">
                <button
                  type="submit"
                  className="ml-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                >
                  Comment
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

export default CommentModal;