import React from 'react'
import HeaderNav from '../components/HeaderNav'


import { RiDashboardFill, RiToolsFill } from "react-icons/ri";
import { MdArticle } from "react-icons/md";
import { FaMotorcycle } from "react-icons/fa";
import { MdOutlinePayments, MdDirectionsBike } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import HomeSideNav from '../components/HomeSideNav';
export default function HomePage() {
  return (
    <main className="grid grid-cols-[auto,1fr,1fr] grid-rows-[auto,1fr] gap-4 h-svh bg-secondary font-poppins text-primary">
        <HeaderNav />
        <HomeSideNav />


        <div className="col-span-2 flex flex-col gap-4">
        <div className="">
            <p className="text-4xl">Unit Status</p>
            <div className="flex gap-4 font-outfit">
                <div className="flex items-center gap-6 px-6 p-2 text-secondary bg-accent-gray rounded-lg">
                    <div>
                        <p id="occupied_unit" className="font-semibold text-3xl">10</p>
                        <p id="occupied_unit" className="text-sm">Occupied</p>
                    </div>
                <MdDirectionsBike className='text-4xl' />
                </div>
                <div className="flex items-center gap-6 px-6 p-2 text-secondary bg-accent-gray rounded-lg">
                    <div>
                        <p id="occupied_unit" className="font-semibold text-3xl">20</p>
                        <p id="occupied_unit" className="text-sm">Available</p>
                    </div>
                <FaMotorcycle className='text-4xl' />
                </div>
                <div className="flex items-center gap-6 px-6 p-2 text-secondary bg-accent-gray rounded-lg">
                    <div>
                        <p id="occupied_unit" className="font-semibold text-3xl">10</p>
                        <p id="occupied_unit" className="text-sm">Under Maintenance</p>
                    </div>
                <RiToolsFill className='text-4xl' />
                </div>
                <div className="flex items-center gap-6 px-6 p-2 text-secondary bg-accent-gray rounded-lg">
                    <div>
                        <p id="occupied_unit" className="font-semibold text-3xl">PHP 1,230</p>
                        <p id="occupied_unit" className="text-sm">Earnings (Today)</p>
                    </div>
                <MdOutlinePayments className='text-4xl' />
                </div>
            </div>
        </div>

        <div className="flex gap-4 pr-4 mt-4">
            <div className="flex flex-col flex-1 bg-accent-light p-2 rounded-lg">
                <div className="flex justify-between">
                    <p className="font-bold text-secondary text-2xl">Monitoring</p>
                    <button href="" className="bg-accent-blue rounded-md text-secondary px-2 font-semibold">View All</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Unit</th>
                            <th>Remaining Time</th>
                        </tr>
                    </thead>
                    <tbody className="text-center text-secondary">
                        <tr>
                            <td>B.A Bogart</td>
                            <td>Honda Click V3</td>
                            <td>3 Hr, 32 Min</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="flex flex-col bg-accent-light p-2 rounded-lg min-w-72">
                <div className="flex justify-between">
                    <p className="font-bold text-secondary text-2xl">Customer</p>
                    <button href="" className="bg-accent-blue rounded-md text-secondary px-2 font-semibold">View All</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Rent Time</th>
                        </tr>
                    </thead>
                    <tbody className="text-center text-secondary">
                        <tr>
                            <td>B.A Bogart</td>
                            <td>4 Hr</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>


    </main>
  )
}
