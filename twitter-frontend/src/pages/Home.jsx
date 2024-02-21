import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import axios from 'axios';
import { useAuth } from '../context/useAuth';
import Modal from '../components/Modal';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import CommentModal from '../components/CommentModal';

const Home = () => {
  const { token, user } = useAuth();
  const [tweets, setTweets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const fetchTweets = async () => {
    try {
      await axios.get("https://twitter-clone-llkn.onrender.com/api/tweet").then((res) => {
        setTweets(res.data.tweets);
        setIsLoading(false);
      }).catch((err) => {
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  }
  const like_dislike = async (id) => {
    try {
      await axios.post(`https://twitter-clone-llkn.onrender.com/api/tweet/${id}/like`, "", {
        headers: { "Authorization": `Bearer ${token}` }
      }).then((res) => {
        toast(`🦄${res.data.msg}`);
        console.log(res);
      }).catch(async (err) => {
        if (err.response.data.msg == "Cannot like already liked tweet") {
          await axios.post(`https://twitter-clone-llkn.onrender.com/api/tweet/${id}/dislike`, "", {
            headers: { "Authorization": `Bearer ${token}` }
          }).then((res) => {
            toast(`🦄${res.data.msg}`);
            console.log(res);
          }).catch((err) => {
            console.log(err);
          })
        }
      })
    } catch (error) {
      console.log(error);
    }
  }
  const retweet = async (id) => {
    try {
      await axios.post(`https://twitter-clone-llkn.onrender.com/api/tweet/${id}/retweet`, {}, {
        headers: { "Authorization": `Bearer ${token}` }
      }).then((res) => {
        toast(`🦄${res.data.msg}`, {
          theme: "dark"
        })
      }).catch((err) => {
        toast.error(err.response.data.msg);
      })
    } catch (error) {
      console.log(error);
    }
  }
  const deleteTweet = async(tweet)=>{
    try {
      if(tweet.tweetedBy._id == user._id){
          await axios.delete(`https://twitter-clone-llkn.onrender.com/api/tweet/${tweet._id}`,{
            headers: {"Authorization": `Bearer ${token}`}
          }).then((res)=>{
            console.log(res);
            toast(res.data.msg);
          }).catch((err)=>{
            console.log(err);
            toast.error(err.response.data.msg);
          })
      }
      else{
        toast.error("You cannot delete this tweet");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (token) {
      fetchTweets();
    }
  })
  return (
    isLoading ? <Loader/> : 
      <div className='h-screen w-5/6 sm:w-1/2 bg-white m-1 relative overflow-x-hidden'>
        <header className='flex flex-row justify-between items-center m-4'>
          <h1 className='text-lg font-semibold'>Home</h1>
          <Modal name="tweet" title="New Tweet"/>
        </header>
        {tweets.map((val) => {
          let likeExists = val.likes.filter((me) => { return me._id == user._id });
          return (
            <div onClick={()=>{navigate(`/tweet/${val._id}`)}} className='cursor-pointer hover:bg-blue-100 sm:m-4 m-1 border rounded-sm p-3'>
              {val.retweetBy.length > 0 ? 
              <p className='pl-14 text-gray-500 text-sm'><i className='fa fa-retweet text-gray-500'></i>{` Retweeted by ${val.retweetBy[val.retweetBy.length - 1].username}`}</p>
              : ''}
            <div className='relative overflow-y-auto flex flex-row'>
              <img src={val.tweetedBy.profilePicture ? `/profilePics/${val.tweetedBy.profilePicture}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTalURue8uREswsyHXvJ9qmw4TSZqCxIEQNjg&usqp=CAU"} alt="pfp" className='w-12 h-12 rounded-full mr-2' />
              <div className='flex flex-col items-start justify-start'>
                <div className=''>
                  <p className='font-semibold'><span className='hover:underline cursor-pointer hover:text-blue-600' onClick={(e)=>{e.stopPropagation(); navigate(val.tweetedBy._id == user._id ? '/user': `/profile/${val.tweetedBy._id}`)}}>@{val.tweetedBy.username}</span> - <span className='text-gray-500'>{new Date(val.createdAt).toDateString()}</span>
                    {val.tweetedBy._id == user._id ?
                      <span className='absolute sm:right-5 right-0 cursor-pointer'><i className='fa fa-trash' onClick={(e)=>{e.stopPropagation(); deleteTweet(val)}}></i></span>
                      : ""
                    }
                  </p>
                  <p>{val.content}</p>
                  <img src={val.image ? `/tweets/${val.image}` : ""} alt="" />
                </div>
                <div className='flex flex-row items-center justify-start mt-1'>
                  {/* like retweet and comment buttons */}
                  <div onClick={(e) =>{e.stopPropagation(); like_dislike(val._id)}} className='mr-2 hover:bg-blue-300 cursor-pointer px-2 py-1 flex flex-row items-center'>
                    {likeExists.length !== 0 ?
                      <i className='fa-solid text-rose-500 fa-heart m-1'></i> :
                      <i className='fa-regular text-rose-500 fa-heart m-1'></i>
                    }
                    <p>{val.likes.length}</p>
                  </div>
                  <div onClick={(e)=>{e.stopPropagation()}} className='mr-2 hover:bg-blue-300 cursor-pointer px-2 py-1 flex flex-row items-center'>
                    <CommentModal val={val} title="Comment"/>
                  </div>
                  <div className='mr-2 hover:bg-blue-300 cursor-pointer px-2 py-1 flex flex-row items-center' onClick={(e) => {e.stopPropagation(); retweet(val._id) }}>
                    <i className='fa-solid text-green-500 fa-retweet m-1'></i>
                    <p>{val.retweetBy.length}</p>
                  </div>
                </div>
              </div>
            </div>
            </div>
          )
        })}
      </div>

    )
  
}

export default Home