import React from 'react'
import { IoNotifications } from "react-icons/io5";
export default function HeaderNav() {
  return (
        <nav className="col-span-3 max-h-12 bg-primary text-secondary flex justify-between px-2 py-3">
        <div>
            <p className="font-bold">MOTORENT</p>
        </div>
        <div className='text-2xl'>
            <IoNotifications />
        </div>
    </nav>
  )
}
