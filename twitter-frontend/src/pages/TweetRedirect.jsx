import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useAuth } from '../context/useAuth';
import CommentModal from '../components/CommentModal';
import Loader from '../components/Loader';

const TweetRedirect = () => {
    const params = useParams();
    const { user, token } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [tweet, setTweet] = useState({
        content: "",
        image: "",
        tweetedBy: {},
        likes: [],
        retweetBy: [],
        replies: []
    });
    let likeExists = tweet.likes.filter((me) => { return me._id == user._id });
    const fetchTweetDetails = async () => {
        await axios.get(`http://192.168.1.111:3003/api/tweet/${params.id}`).then((res) => {
            setTweet(res.data.tweetDetails);
            setIsLoading(false);
        }).catch((err) => {
            console.log(err);
        })
    }
    const like_dislike = async (id) => {
        try {
          await axios.post(`http://192.168.1.111:3003/api/tweet/${id}/like`, "", {
            headers: { "Authorization": `Bearer ${token}` }
          }).then((res) => {
            toast(`🦄${res.data.msg}`);
            console.log(res);
          }).catch(async (err) => {
            if (err.response.data.msg == "Cannot like already liked tweet") {
              await axios.post(`http://192.168.1.111:3003/api/tweet/${id}/dislike`, "", {
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
          await axios.post(`http://192.168.1.111:3003/api/tweet/${id}/retweet`, {}, {
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
              await axios.delete(`http://192.168.1.111:3003/api/tweet/${tweet._id}`,{
                headers: {"Authorization": `Bearer ${token}`}
              }).then((res)=>{
                console.log(res);
                toast(res.data.msg);
                navigate('/'); 
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
        fetchTweetDetails();
    })
    return (
      isLoading ? <Loader/> : 
        <div className='h-screen w-5/6 sm:w-1/2 bg-white m-1 relative overflow-x-hidden'>
            <header className='flex flex-row justify-between items-center m-4'>
                <h1 className='text-lg font-semibold'>Tweet</h1>
            </header>
            <div className='hover:bg-blue-100 m-4 border rounded-sm p-3 relative overflow-y-auto flex flex-row'>
                <img src={tweet.tweetedBy.profilePicture ? `/profilePics/${tweet.tweetedBy.profilePicture}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTalURue8uREswsyHXvJ9qmw4TSZqCxIEQNjg&usqp=CAU"} alt="pfp" className='w-12 h-12 rounded-full mr-2' />
                <div className='flex flex-col items-start justify-start'>
                    <div className=''>
                        <p className='font-semibold'><span className='hover:underline cursor-pointer hover:text-blue-600' onClick={()=>{navigate(tweet.tweetedBy._id == user._id ? `/user` : `/profile/${tweet.tweetedBy._id}`)}}>@{tweet.tweetedBy.username}</span> - <span className='text-gray-500'>{new Date(tweet.createdAt).toDateString()}</span>
                        {tweet.tweetedBy._id == user._id ?
                      <span className='absolute sm:right-5 -right-1 cursor-pointer'><i className='fa fa-trash' onClick={(e)=>{e.stopPropagation(); deleteTweet(tweet)}}></i></span>
                      : ""
                    }</p>
                        <p>{tweet.content}</p>
                    </div>
                    <div className='flex flex-row items-center justify-start mt-1'>
                        {/* like retweet and comment buttons */}

                        <div onClick={(e) =>{e.stopPropagation(); like_dislike(tweet._id)}} className='mr-2 hover:bg-blue-300 cursor-pointer px-2 py-1 flex flex-row items-center'>
                    {likeExists.length !== 0 ?
                      <i className='fa-solid text-rose-500 fa-heart m-1'></i> :
                      <i className='fa-regular text-rose-500 fa-heart m-1'></i>
                    }
                    <p>{tweet.likes.length}</p>
                  </div>
                  <div className='mr-2 hover:bg-blue-300 cursor-pointer px-2 py-1 flex flex-row items-center'>
                    <CommentModal val={tweet} title="Comment"/>
                  </div>
                        <div className='mr-2 hover:bg-blue-300 cursor-pointer px-2 py-1 flex flex-row items-center' onClick={(e) => {e.stopPropagation(); retweet(tweet._id) }}>
                            <i className='fa-solid text-green-500 fa-retweet m-1'></i>
                            <p>{tweet.retweetBy.length}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='m-4 p-3'>
            <header className='flex flex-row justify-between items-center'>
                <h1 className='text-lg font-semibold'>Replies</h1>
            </header>
            {tweet.replies.map((val)=>{
              let commentLikeExists = val.likes.filter((me) => { return me == user._id });
            return(
            <div className='hover:bg-blue-100 border rounded-sm p-3 relative overflow-y-auto word-wrap flex flex-row'>
                <img src={val.tweetedBy.profilePicture ? `/profilePics/${val.tweetedBy.profilePicture}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTalURue8uREswsyHXvJ9qmw4TSZqCxIEQNjg&usqp=CAU"} alt="pfp" className='w-12 h-12 rounded-full mr-2' />
                <div className='flex flex-col items-start justify-start'>
                    <div className=''>
                        <p className='font-semibold'><span className='hover:underline cursor-pointer hover:text-blue-600' onClick={()=>{navigate(val.tweetedBy._id == user._id ? `/user` : `/profile/${val.tweetedBy._id}`)}}>@{val.tweetedBy.username}</span> - <span className='text-gray-500'>{new Date(val.createdAt).toDateString()}</span>
                        {val.tweetedBy._id == user._id ?
                      <span className='absolute sm:right-5 -right-7 cursor-pointer'><i className='fa fa-trash' onClick={(e)=>{e.stopPropagation(); deleteTweet(val)}}></i></span>
                      : ""
                    }</p>
                        <p>{val.content}</p>
                    </div>
                    <div className='flex flex-row items-center justify-start mt-1'>
                        {/* like retweet and comment buttons */}

                        <div onClick={(e) =>{e.stopPropagation(); like_dislike(val._id)}} className='mr-2 hover:bg-blue-300 cursor-pointer px-2 py-1 flex flex-row items-center'>
                    {commentLikeExists.length !== 0 ?
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
            </div>)
            })}
            </div>
        </div>
    )
}

export default TweetRedirect