import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import { useClerk, useUser } from '@clerk/clerk-react';
import { IoHomeOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { MdTravelExplore } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { Dialog, DialogContent, DialogTrigger, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Card, CardHeader, CardFooter, CardContent } from "@/components/ui/card";
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { BiComment, BiLike, BiShare } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { AiOutlineComment, AiOutlineHeart } from 'react-icons/ai';
import { FiShare } from 'react-icons/fi';
import Explore from './Explore';

function Profile() {

  const itemCount = 10;

  const items = [];

  for(let i=0; i < itemCount; i++){
      items.push(
          <div className='bg-gray-200 w-[200xp] h-[200px] rounded-lg'></div>
      )
  }


    const [posts, setPosts] =  useState([]);
    const { user } = useUser();
    const { signOut } = useClerk();
    const [postTitle, setPostTitle] = useState('');
    const [postDescription, setPostDescription] = useState('');
    const [postCategory, setPostCategory] = useState('');
    const [postImage, setPostImage] = useState('');
    const [postVideo, setPostVideo] = useState('');


    const navigate = useNavigate();

    const singlePostHandler = (id) => {
        navigate(`post/${id}`);
    }
    
    const handleCreatePost = async () => {

        try {
            await axios.post('http://localhost:3000/api/createPost', {
                postTitle: postTitle,
                postDescription: postDescription,
                postCategory: postCategory,
                postVideo: postVideo,
                postImage: postImage,
                adminName: user?.id,
                adminImg: user?.imageUrl,
                adminUsername: user?.firstName,
            });
            // Reset form after successful post creation
            alert("Post added to database");
            setPostTitle('');
            setPostDescription('');
            setPostCategory('');
            setPostImage();
            setPostVideo();
             window.location.reload();
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    const getAllPosts = async () => {
      try {
          const res = await axios.get("http://localhost:3000/api/getPosts", {
              headers: { adminName: user.id }
          });
          setPosts(res.data);
      } catch (error) {
          console.error('Error fetching posts:', error);
      }
  };

  useEffect(() => {
      if (user) {
          getAllPosts();
      }
  }, [user]);

    if (!user) {
        return(
            <div className='min-h-screen w-full flex justify-center items-center'>
                <div className='loader'></div>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen w-full profile">
            {/* Sidebar for large devices */}
            <div className="hidden fixed lg:flex bg-black bg-opacity-40 flex-col justify-center items-center space-y-10 w-[20%] h-full border-r-2 border-gray-400">
                {/* Sidebar content goes here */}
                <button className='flex justify-center items-center gap-3 text-xl text-gray-200 hover:text-gray-300 duration-300'><IoHomeOutline size={20} />Home</button>
                <button className='flex justify-center items-center gap-3 text-xl text-gray-200 hover:text-gray-300 duration-300' onClick={() => navigate('/explore')}><MdTravelExplore size={20} />Explore</button>
                <Dialog className="dark">
                    <DialogTrigger>
                        <button className='flex justify-center items-center gap-3 text-xl text-gray-200 hover:text-gray-300 duration-300'><FaPlus size={20} />Create</button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="text-white">Create Post</DialogTitle>
                        </DialogHeader>
                        <div className='space-y-6'>
                            <Input
                                className="text-white"
                                placeholder="Throw a title"
                                value={postTitle}
                                onChange={(e) => setPostTitle(e.target.value)}
                            />
                            <Textarea
                                className="text-white"
                                placeholder="What's on your mind..."
                                value={postDescription}
                                onChange={(e) => setPostDescription(e.target.value)}
                            />
                            <Input
                                className="text-white"
                                placeholder="Category"
                                value={postCategory}
                                onChange={(e) => setPostCategory(e.target.value)}
                            />
                            <Input
                                className="text-white"
                                type="file"
                                onChange={(e) => {
                                  setPostImage(e.target.files[0])
                                  const file = e.target.files[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                      setPostImage(reader.result);
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                            />
                            
                        </div>
                        <div className="flex justify-between">
                            <Button variant="secondary">Cancel</Button>
                            <Button onClick={handleCreatePost}>Post</Button>
                        </div>
                    </DialogContent>
                </Dialog>
                <button className='flex justify-center items-center gap-3 text-xl text-gray-200 hover:text-gray-300 duration-300'>
                    <Avatar alt={user.firstName} src={user.imageUrl} className='border-2 border-gray-200 rounded-full' sx={{ width: 24, height: 24 }} />Profile
                </button>
                <button className='flex justify-center items-center gap-3 text-xl text-gray-200 hover:text-gray-300 duration-300' onClick={() => signOut({ redirectUrl: '/' })}><IoIosLogOut size={20} />Logout</button>
            </div>

            {/* Main content */}
            <div className="flex-1 p-8">
                <div className="flex flex-col w-full md:w-[80%] relative md:left-[20%] items-center">
                    <Avatar alt={user.firstName} src={user.imageUrl} />
                    <h2 className="text-xl text-gray-100 font-semibold">{user.firstName}</h2>
                    <p className="text-gray-300">@{user.firstName.toLowerCase()}</p>
                    {/* Additional profile details go here */}
                    <div className='flex gap-7 mt-10'>
                        <p className='text-lg text-gray-200 block md:flex'>10 <span className='text-gray-300 text-sm md:text-lg ml-1'>Posts</span></p>
                        <p className='text-lg text-gray-200 block md:flex'>90 <span className='text-gray-300 text-sm md:text-lg ml-1'>Followers</span></p>
                        <p className='text-lg text-gray-200 block md:flex'>30 <span className='text-gray-300 text-sm md:text-lg ml-1'>Following</span></p>
                    </div>

                   {posts ?  <div className='mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:px-10 md:py-5 w-full min-h-screen'>
                        {posts.map((p) => (
                          <div key={p._id}>
                            <Card>
                                <div onClick={() => singlePostHandler(p._id)}>
                            <div className="card-header flex justify-between items-center px-2 py-3 border-b">
                                <h2 className="text-lg font-semibold">{p.postTitle}</h2>
                                <p className="text-gray-500 text-sm">{p.postDate}</p>
                            </div>
                            <div className="card-content flex flex-col items-center">
                                {p.postImage && (
                                <div className="image-container w-full h-64 overflow-hidden">
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
            </div>
                              

            {/* Footer for mobile devices */}
            <div className="lg:hidden fixed flex justify-evenly bg-black bg-opacity-90 px-3 bottom-0 left-0 w-full h-16 border-t-2 border-gray-400">
                {/* Footer content goes here */}
                <button className='flex justify-center items-center gap-1 text-lg hover:text-gray-300 duration-300 text-gray-200'><IoHomeOutline size={20} /></button>
                <button className='flex justify-center items-center gap-1 text-lg hover:text-gray-300 duration-300 text-gray-200'><MdTravelExplore size={20} /></button>
                <Dialog className="dark">
                    <DialogTrigger>
                        <button className='flex justify-center items-center gap-3 text-xl text-gray-200 hover:text-gray-300 duration-300'><FaPlus size={30} /></button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="text-white">Create Post</DialogTitle>
                        </DialogHeader>
                        <div className='space-y-6'>
                            <Input
                                className="text-white"
                                placeholder="Throw a title"
                                value={postTitle}
                                onChange={(e) => setPostTitle(e.target.value)}
                            />
                            <Textarea
                                className="text-white"
                                placeholder="What's on your mind..."
                                value={postDescription}
                                onChange={(e) => setPostDescription(e.target.value)}
                            />
                            <Input
                                className="text-white"
                                placeholder="Category"
                                value={postCategory}
                                onChange={(e) => setPostCategory(e.target.value)}
                            />
                            <Input
                                className="text-white"
                                type="file"
                                onChange={(e) => {
                                  setPostImage(e.target.files[0])
                                  const file = e.target.files[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                      setPostImage(reader.result);
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                            />
                            
                        </div>
                        <div className="flex justify-between">
                            <Button variant="secondary">Cancel</Button>
                            <Button onClick={handleCreatePost}>Post</Button>
                        </div>
                    </DialogContent>
                </Dialog>
                <button className='flex justify-center items-center gap-3 text-xl text-gray-200 hover:text-gray-300 duration-300'><Avatar alt={user.firstName} src={user.imageUrl} className='border-2 border-gray-200 rounded-full' sx={{ width: 24, height: 24 }} /></button>
                <button className='flex justify-center items-center gap-1 text-lg hover:text-gray-300 duration-300 text-gray-200' onClick={() => signOut({ redirectUrl: '/' })}><IoIosLogOut size={20} /></button>
            </div>
        </div>
    );
}

export default Profile;
