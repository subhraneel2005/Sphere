import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineHeart, AiOutlineComment } from 'react-icons/ai';
import { FiShare } from 'react-icons/fi';
import { Card, CardHeader, CardFooter, CardContent } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogTrigger, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from './ui/button';
import { useClerk, useUser } from '@clerk/clerk-react';

const Explore = () => {
  const [allPosts, setAllPosts] = useState([]);
  const navigate = useNavigate();
  const { user } = useUser();

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/getAllPosts');
      setAllPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  useEffect(() => {

    fetchPosts();
  }, []);

  const postHandler = (postId) => {
    navigate(`/explore/${postId}`);
  }

  if(!allPosts){
    return(
      <div className='min-h-screen w-full flex justify-center items-center'>
        <p className='text-white text-6xl'>Loading...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full min-h-screen items-center profile">
      {allPosts ?  <div className='mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:px-10 md:py-5 w-full min-h-screen'>
                        {allPosts.map((p) => (
                          <div key={p._id}>
                            <Card>
                                <div>
                            <div className="card-header flex flex-col items-center px-2 py-3 border-b">
                                <div className='flex gap-3 justify-between'>
                                  <Dialog>
                                    <DialogTrigger>
                                      <img src={p.adminImg} alt={p.adminUsername} className='w-8 h-8 rounded-full cursor-pointer' />
                                    </DialogTrigger>
                                    <DialogContent>
                                      <DialogTitle><h1 className='text-white font-bold'>{p.adminUsername}</h1></DialogTitle>
                                      <img src={p.adminImg} alt={p.adminUsername} className='w-8 h-8 rounded-full cursor-pointer' />
                                      {user.id === p.adminName ? <button className='w-full px-6 py-3 rounded-xl text-white bg-green-600' onClick={() => navigate(`/profile/${p.adminName}`)}>My Profile</button> : <Button>Follow</Button>}
                                    </DialogContent>
                                  </Dialog>
                                <p className='text-[15px] text-gray-500'>@{p.adminUsername}</p>
                                </div>
                                <div className='flex justify-between'>
                                <h2 className="text-lg font-semibold">{p.postTitle}</h2>
                                <p className="text-gray-500 text-sm">{p.postDate}</p>
                                </div>
                            </div>
                            <div className="card-content flex flex-col items-center">
                                {p.postImage && (
                                <div onClick={() => postHandler(p._id)} className="image-container cursor-pointer w-full h-64 overflow-hidden">
                                    <img
                                    src={p.postImage}
                                    alt="Post"
                                    className="w-full h-full object-cover"
                                    />
                                </div>
                                )}
                                {p.postVideo && (
                                <div className="video-container w-full h-64 overflow-hidden">
                                    <video
                                    src={p.postVideo}
                                    controls
                                    className="w-full h-full object-cover"
                                    />
                                </div>
                                )}
                                <div className="caption-container w-full p-4">
                                <p className="text-sm text-gray-500">{p.postDescription}</p>
                                </div>
                            </div>
                            </div>
                            <div className="flex justify-between bg-gray-300 rounded-b-xl items-center p-4 border-t">
                                <div className="flex items-center">
                                    <button className="flex items-center text-gray-600 hover:text-red-500 transition duration-200">
                                    <AiOutlineHeart size={24} className="mr-1" />
                                    <span>Like</span>
                                    </button>
                                    <button className="flex items-center text-gray-600 hover:text-blue-500 ml-4 transition duration-200">
                                    <AiOutlineComment size={24} className="mr-1" />
                                    <span>Comment</span>
                                    </button>
                                </div>
                                <button className="flex items-center text-gray-600 hover:text-green-500 transition duration-200">
                                    <FiShare size={24} className="mr-1" />
                                    <span>Share</span>
                                </button>
                                </div>
                            </Card>

                          </div>
                        ))}
                    </div> : <div className='loader'></div>}
    </div>
  );
};

export default Explore;
