import React, { useState } from 'react'
import { IoNotifications } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
import { logoutUser } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
export default function HeaderNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
      const navigate = useNavigate()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
  try {
      const { error } = await logoutUser();
      if (error) {
        console.error('Error logging out:', error.message);
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error('Unexpected error during logout:', err);
    }

  }


  return (
        <nav className="col-span-3 max-h-12 bg-primary text-secondary flex justify-between px-2 py-3">
        <div>
            <p className="font-bold">MOTORENT</p>
        </div>
        <div className='relative flex gap-4 text-2xl'>
            <IoNotifications className='cursor-pointer' />
            <IoMenu className='cursor-pointer' onClick={toggleMenu} />
          {isMenuOpen && (
          <div className="select-none absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-1 z-10">
            {/* Your submenu items */}
            <a href="#" className="block px-4 py-2 text-primary  text-sm hover:bg-gray-100">Menu</a>
            <button onClick={handleLogout} href="#" className="block px-4 py-2 text-red-500 font-bold text-sm hover:bg-gray-100 border-t-2 w-full">Log out</button>
          </div>
        )}
      </div>
    </nav>
  )
}
