import React from "react";
import HeaderNav from "../components/HeaderNav";

import { RiDashboardFill, RiToolsFill } from "react-icons/ri";
import { MdArticle } from "react-icons/md";
import { FaMotorcycle } from "react-icons/fa";
import { MdOutlinePayments, MdDirectionsBike } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import HomeSideNav from "../components/HomeSideNav";
import UnitDashboard from "../components/UnitDashboard";
export default function HomePage() {
  return (
    <main className="grid grid-cols-[auto,1fr,1fr] grid-rows-[auto,1fr] gap-4 h-svh bg-secondary font-poppins text-primary">
      <HeaderNav />
      <HomeSideNav />

      <div className="col-span-2 flex flex-col gap-4">
        <UnitDashboard />

        <div className="flex gap-4 pr-4 mt-4">
          <div className="flex flex-col flex-1 bg-accent-light p-2 rounded-lg">
            <div className="flex justify-between">
              <p className="font-bold text-secondary text-2xl">Monitoring</p>
              <button
                href=""
                className="bg-accent-blue rounded-md text-secondary px-2 font-semibold"
              >
                View All
              </button>
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
              <button
                href=""
                className="bg-accent-blue rounded-md text-secondary px-2 font-semibold"
              >
                View All
              </button>
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
  );
}
