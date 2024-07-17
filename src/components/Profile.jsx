import React from 'react';
import Avatar from '@mui/material/Avatar';
import { useClerk, useUser } from '@clerk/clerk-react';
import { IoHomeOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { MdTravelExplore } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";



function Profile() {

    const {user} = useUser();
    const {signOut} = useClerk();

    const itemCount = 10;

    const items = [];

    for(let i=0; i < itemCount; i++){
        items.push(
            <div className='bg-gray-200 w-[200xp] h-[200px] rounded-lg'></div>
        )
    }

    if(!user){
        return(
            <h1>Loading...</h1>
        )
    }

  return (
    <div className="flex min-h-screen w-full profile">
      {/* Sidebar for large devices */}
      <div className="hidden fixed lg:flex bg-black bg-opacity-40 flex-col justify-center items-center space-y-10 w-[20%] h-full border-r-2 border-gray-400">
        {/* Sidebar content goes here */}
        <button className='flex justify-center items-center gap-3 text-xl text-gray-200 hover:text-gray-300 duration-300'><IoHomeOutline size={20}/>Home</button>
        <button className='flex justify-center items-center gap-3 text-xl text-gray-200 hover:text-gray-300 duration-300'><MdTravelExplore size={20}/>Explore</button>
        <button className='flex justify-center items-center gap-3 text-xl text-gray-200 hover:text-gray-300 duration-300'><FaPlus size={20}/>Create</button>
        <button className='flex justify-center items-center gap-3 text-xl text-gray-200 hover:text-gray-300 duration-300'><Avatar alt={user.firstName} src={user.imageUrl} className='border-2 border-gray-200 rounded-full' sx={{ width: 24, height: 24 }} />Profile</button>
        <button className='flex justify-center items-center gap-3 text-xl text-gray-200 hover:text-gray-300 duration-300' onClick={() => signOut({ redirectUrl: '/' })}><IoIosLogOut size={20}/>Logout</button>
      </div>
      
      {/* Main content */}
      <div className="flex-1 p-8">
        <div className="flex flex-col w-[80%] relative left-[20%] items-center">
        <Avatar alt={user.firstName} src={user.imageUrl} />
          <h2 className="text-xl text-gray-100 font-semibold">{user.firstName}</h2>
          <p className="text-gray-300">@{user.firstName.toLowerCase()}</p>
          {/* Additional profile details go here */}
          <div className='flex gap-7 mt-10'>
            <p className='text-lg text-gray-200 block md:flex'>10 <span className='text-gray-300 text-sm md:text-lg ml-1'>Posts</span></p>
            <p className='text-lg text-gray-200 block md:flex'>90 <span className='text-gray-300 text-sm md:text-lg ml-1'>Followers</span></p>
            <p className='text-lg text-gray-200 block md:flex'>30 <span className='text-gray-300 text-sm md:text-lg ml-1'>Following</span></p>
          </div>

          <div className='mt-10 grid grid-cols-2 md:grid-cols-4 gap-1 w-full min-h-screen'>
          {items}
          </div>
        </div>
      </div>
      
      {/* Footer for mobile devices */}
      <div className="lg:hidden fixed flex justify-evenly bg-black bg-opacity-90 px-3 bottom-0 left-0 w-full h-16 border-t-2 border-gray-400">
        {/* Footer content goes here */}
        <button className='flex justify-center items-center gap-1 text-lg hover:text-gray-300 duration-300 text-gray-200'><IoHomeOutline size={20}/></button>
        <button className='flex justify-center items-center gap-1 text-lg hover:text-gray-300 duration-300 text-gray-200'> <MdTravelExplore size={20}/></button>
        <button className='flex justify-center items-center gap-1 text-lg hover:text-gray-300 duration-300 text-gray-200'><FaPlus size={30}/></button>
        <button className='flex justify-center items-center gap-3 text-xl text-gray-200 hover:text-gray-300 duration-300'><Avatar alt={user.firstName} src={user.imageUrl} className='border-2 border-gray-200 rounded-full' sx={{ width: 24, height: 24 }} /></button>
        <button className='flex justify-center items-center gap-1 text-lg hover:text-gray-300 duration-300 text-gray-200' onClick={() => signOut({ redirectUrl: '/' })}><IoIosLogOut size={20}/></button>
      </div>
    </div>
  );
}

export default Profile;
