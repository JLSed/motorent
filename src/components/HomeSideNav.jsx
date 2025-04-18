import React from 'react'


import { RiDashboardFill, RiToolsFill } from "react-icons/ri";
import { MdArticle } from "react-icons/md";
import { FaMotorcycle } from "react-icons/fa";
import { MdOutlinePayments, MdDirectionsBike } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { useNavigate } from 'react-router-dom'

export default function HomeSideNav() {
    const navigate = useNavigate() 

  return (
    <aside className="ml-2 mb-2 bg-accent-gray text-secondary rounded-xl">
        <div className="flex flex-col p-4 gap-4">
            <button onClick={() => navigate('/home')} className="flex items-center gap-2">
                <RiDashboardFill />
                <p className="select-none">Dashboard</p>
            </button>
            <button onClick={() => navigate('/rental-log')} className="flex items-center gap-2">
                <MdArticle />
                <p className="select-none">Rental Log</p>
            </button>
            <button onClick={() => navigate('/units')} className="flex items-center gap-2">
                <FaMotorcycle />
                <p className="select-none">Units</p>
            </button>
            <button onClick={() => navigate('/earnings')} className="flex items-center gap-2">
                <MdOutlinePayments />
                <p className="select-none">Earnings</p>
            </button>
            <button onClick={() => navigate('/settings')} className="flex items-center gap-2">
                <IoIosSettings />
                <p className="select-none">Settings</p>
            </button>
        </div>
    </aside>
  )
}
