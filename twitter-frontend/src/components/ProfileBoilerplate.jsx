import React, { useEffect, useState } from 'react'
import UploadPFPModal from './UploadPFPModal'
import EditProfileModal from './EditProfileModal'
import CommentModal from './CommentModal'
import axios from 'axios'
import { useAuth } from '../context/useAuth'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'

const ProfileBoilerplate = (props) => {
  const [tweets, setTweets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {token, user} = useAuth();
  const [check, setCheck] = useState(false);  
  const navigate = useNavigate();
  const [followingExists, setFollowingExists] = useState([])
  const params = useParams();
  const fetchTweetDetails = async () => {
    await axios.get(`http://localhost:3003/api/user/${props.profile._id}/tweets`,).then((res) => {
        setTweets(res.data.tweets);
        setIsLoading(false);
    }).catch((err) => {
        console.log(err);
    })
}
  const like_dislike = async (id) => {
    try {
      await axios.post(`http://localhost:3003/api/tweet/${id}/like`, "", {
        headers: { "Authorization": `Bearer ${token}` }
      }).then((res) => {
        toast(`🦄${res.data.msg}`);
        console.log(res);
      }).catch(async (err) => {
        if (err.response.data.msg == "Cannot like already liked tweet") {
          await axios.post(`http://localhost:3003/api/tweet/${id}/dislike`, "", {
            headers: { "Authorization": `Bearer ${token}` }
          }).then((res)=>{
              toast(`🦄${res.data.msg}`);
              console.log(res);
          }).catch((err)=>{
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
      await axios.post(`http://localhost:3003/api/tweet/${id}/retweet`, {}, {
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
          await axios.delete(`http://localhost:3003/api/tweet/${tweet._id}`,{
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
  const follow_unFollow = async()=>{
    console.log(props.profile);
    try {
      await axios.post(`http://localhost:3003/api/user/${params.id}/follow`,'',{
        headers: {"Authorization":`Bearer ${token}`}
      }).then((res)=>{
          console.log(res.data);
          toast(res.data.msg);
      }).catch((err)=>{
        console.log(err);
        if(err.response.data.msg == "User already followed"){
          axios.post(`http://localhost:3003/api/user/${params.id}/unfollow`,'',{
            headers: {"Authorization":`Bearer ${token}`}
          }).then((res)=>{
              console.log(res.data);
              toast(res.data.msg);
          }).catch((err)=>{
            console.log(err);
          })
        }
      })
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(()=>{
    fetchTweetDetails();
    })
  useEffect(()=>{
    setFollowingExists(props.profile.followers.filter((val)=>{return val._id == user._id}))
  },[props.profile.followers])
  return (
    <div className='h-screen w-1/2 bg-white m-1 relative overflow-x-hidden p-6'>
      <header className='flex flex-row justify-between items-center'>
        <h1 className='text-lg font-semibold'>Profile</h1>
      </header>
      <div className='bg-blue-600 h-36 mt-2 '>
        <div className='w-max h-auto relative top-2/3 left-5 '>
          <img src={props.profile.profilePicture ? `/profilePics/${props.profile.profilePicture}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTalURue8uREswsyHXvJ9qmw4TSZqCxIEQNjg&usqp=CAU"} className='w-32 h-32 rounded-full' alt="" />
        </div>
      </div>
      <div className=' flex flex-row items-center justify-end'>
        {props.admin ?
          <>
            <UploadPFPModal id={props.profile._id}/>
            <EditProfileModal title="Edit Profile" user={props.profile} id={props.profile._id} />
          </>
          :
          <>
          {followingExists.length != 0 ? <button type='button' className='bg-black p-2 mt-3 text-white rounded-sm cursor-pointer' onClick={follow_unFollow}>Unfollow</button> 
: followingExists.length == 0 ? <button type='button' className='bg-black p-2 mt-3 text-white rounded-sm cursor-pointer' onClick={follow_unFollow}>Follow</button> 
: ""}
                    {/* <button type='button' className='bg-black p-2 mt-3 text-white rounded-sm cursor-pointer' onClick={follow_unFollow}>{followingExists == [] ? "Follow" : "Unfollow"}</button> 
            {check ? <button type='button' className='bg-black p-2 mt-3 text-white rounded-sm cursor-pointer' onClick={follow_unFollow}>unfollow</button> 
            : <button type='button' className='bg-black p-2 mt-3 text-white rounded-sm cursor-pointer' onClick={follow_unFollow}>Follow</button> } */}
            </>
        }
      </div>
      <div className='mt-10 ml-5'>
        <p className='font-bold'>{props.profile.name}</p>
        <p className='text-sm text-gray-600 font-semibold'>@{props.profile.username}</p>
      </div>
      <div className='ml-5 mt-3 grid grid-cols-2'>
      <div className='flex flex-row items-center'>
          <i className='fa fa-calendar mr-2'></i>
          <p>DOB: {props.profile.dob ? new Date(props.profile.dob).toDateString() : ""}</p>
        </div>
        <div className='flex flex-row items-center'>
          <i className='fa fa-location-pin mr-2'></i>
          <p>Location: {props.profile.location ? props.profile.location : "India"}</p>
        </div>
        <div className='flex flex-row items-center'>
          <i className='fa-regular fa-calendar mr-2'></i>
          <p>Joined: {new Date(props.profile.createdAt).toDateString()}</p>
        </div>
      </div>
      <div className='flex flex-row ml-5 mt-2 font-bold'>
        <p className="mr-2">{props.profile.followers.length} Followers</p>
        <p>{props.profile.following.length} Followings</p>
      </div>
      <div>
        <div>
          <h1 className='text-center font-bold my-2'>Tweets & Replies</h1>
          {tweets.map((val)=>{
            let likeExists = val.likes.filter((me) => { return me == user._id });
            return (
              <div onClick={()=>{navigate(`/tweet/${val._id}`)}} className='cursor-pointer hover:bg-blue-100 border rounded-sm p-3 relative overflow-y-auto flex flex-row'>
              <img src={val.tweetedBy.profilePicture ? `/profilePics/${val.tweetedBy.profilePicture}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTalURue8uREswsyHXvJ9qmw4TSZqCxIEQNjg&usqp=CAU"} alt="pfp" className='w-12 h-12 rounded-full mr-2' />
              <div className='flex flex-col items-start justify-start'>
                  <div className=''>
                      <p className='font-semibold'>@{val.tweetedBy.username} - <span className='text-gray-500'>{new Date(val.createdAt).toDateString()}</span>
                      {val.tweetedBy._id == user._id ?
                    <span className='absolute right-5 cursor-pointer'><i className='fa fa-trash' onClick={(e)=>{e.stopPropagation(); deleteTweet(val)}}></i></span>
                    : ""
                  }</p>
                      <p>{val.content}</p>
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
                <div className='mr-2 hover:bg-blue-300 cursor-pointer px-2 py-1 flex flex-row items-center'>
                  <CommentModal val={val} title="Comment"/>
                </div>
                      <div className='mr-2 hover:bg-blue-300 cursor-pointer px-2 py-1 flex flex-row items-center' onClick={(e) => {e.stopPropagation(); retweet(val._id) }}>
                          <i className='fa-solid text-green-500 fa-retweet m-1'></i>
                          <p>{val.retweetBy.length}</p>
                      </div>
                  </div>
              </div>
          </div>
            )
          })}
          
        </div>
      </div>
    </div>
  )
}

export default ProfileBoilerplate