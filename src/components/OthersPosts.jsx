import React, { useEffect, useState } from 'react';
import { AiOutlineHeart, AiFillHeart, AiOutlineComment } from 'react-icons/ai';
import { FiShare } from 'react-icons/fi';
import { BiCategory } from 'react-icons/bi';
import { MdDateRange } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Copy } from "lucide-react"
 
import { Button } from "../components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { useUser } from '@clerk/clerk-react';

function OthersPosts() {

  const navigate = useNavigate();

    const [post, setPost] =  useState(null);
    const { user } = useUser();
    const { postId } = useParams();
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {
      const fetchPost = async () => {
        try {
          // Fetch the post data from the backend
          const response = await axios.get(`http://localhost:3000/api/post/${postId}`);
          setPost(response.data); // Store the post data in state
        } catch (err) {
          setError('Error fetching post data'); // Handle errors
        } finally {
          setLoading(false); // Set loading to false
        }
      };
  
      fetchPost();
    }, [postId]);

      // Loading state
  if (loading) {
    return(
      <div className='min-h-screen w-full flex justify-center items-center'>
        <p className='text-white text-6xl'>Loading...</p>
      </div>
    )
  }

  // Error state
  if (error) {
    return <div className="flex justify-center items-center min-h-screen">{error}</div>;
  }

  // Destructure post data for easy access
  const {
    postTitle,
    postDescription,
    postDate,
    postCategory,
    postImage,
    adminImg,
    adminUsername,
    _id,
    adminName,
  } = post;

  return (
    <div className="flex justify-center items-center min-h-screen singlePost p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-2xl w-full">
        {/* Header Section */}
        <div className="flex items-center justify-between p-4 bg-slate-900 border-b">
         <div className='flex gap-5'>
         {adminImg?  <img
            src={adminImg}
            alt={adminUsername}
            className="w-12 h-12 rounded-full border-2 border-gray-200 mr-3"
          /> : <img
          src="/user.png"
          alt={adminUsername}
          className="w-12 h-12 rounded-full border-2 border-gray-200 mr-3"
        />}
          <div>
            {adminUsername ? <h2 className="text-lg text-gray-200">@{adminUsername}</h2> 
            : <h2 className="text-lg text-gray-200">@selmonBhai</h2> }
            <p className="text-sm text-gray-200">{new Date(postDate).toLocaleDateString()}</p>
          </div>
         </div>
         {user.id === adminName ? <button className='px-4 py-2 rounded-xl text-white bg-green-600' onClick={() => navigate(`/profile/${adminName}`)}>My Profile</button> : <Button>Follow</Button>}
        </div>

        {/* Image Section */}
        {postImage && (
          <div className="w-full h-full">
            <img
              src={postImage}
              alt={postTitle}
              className="w-full h-auto"
            />
          </div>
        )}

        {/* Content Section */}
        <div className="p-4 bg-slate-900 border-t">
          <h1 className="text-2xl font-bold text-gray-100 mb-2">{postTitle}</h1>
          <p className="text-gray-300 mb-4">{postDescription}</p>
          <div className="flex items-center mb-4">
            <BiCategory className="text-purple-400 mr-2" size={24} />
            <span className="text-sm text-gray-200 font-medium">
              {postCategory}
            </span>
          </div>
          <div className="flex items-center">
            <MdDateRange className="text-purple-400 mr-2" size={24} />
            <span className="text-sm text-gray-200 font-medium">
              {new Date(postDate).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Footer Section */}
        <div className="flex justify-between items-center p-4 bg-gray-100 border-t">
          <div className="flex items-center justify-evenly w-full">
            <button className="flex items-center text-gray-600 hover:text-red-500 transition duration-200">
              <AiOutlineHeart size={24} className="mr-1" />
              <span>Like</span>
            </button>
            <button className="flex items-center text-gray-600 hover:text-blue-500 ml-4 transition duration-200">
              <AiOutlineComment size={24} className="mr-1" />
              <span>Comment</span>
            </button>
            <Dialog>
              <DialogTrigger asChild>
              <button className="flex items-center text-gray-600 hover:text-green-500 transition duration-200">
                <FiShare size={24} className="mr-1" />
                <span>Share</span>
              </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle><h1 className='text-2xl text-gray-100 font-bold'>Share link</h1></DialogTitle>
                  <DialogDescription>
                    Anyone who has this link will be able to view this.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                  <div className="grid flex-1 gap-2">
                    <Label htmlFor="link" className="sr-only">
                      Link
                    </Label>
                    <Input
                      id="link"
                      defaultValue={`http://localhost:5173/profile/${adminName}/post/${_id}`}
                      readOnly
                    />
                  </div>
                  <Button type="submit" size="sm" className="px-3">
                    <span className="sr-only">Copy</span>
                    <Copy className="h-4 w-4" onClick={() => {navigator.clipboard.writeText(textToCopy)}}/>
                  </Button>
                </div>
                <DialogFooter className="sm:justify-start">
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Close
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OthersPosts;