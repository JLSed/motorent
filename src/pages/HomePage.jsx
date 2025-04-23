import React, { useEffect, useState } from "react";
import HeaderNav from "../components/HeaderNav";
import HomeSideNav from "../components/HomeSideNav";
import UnitDashboard from "../components/UnitDashboard";
import { getInUseRequests } from "../lib/supabase";

export default function HomePage() {
  const [inUseRequests, setInUseRequests] = useState([]);

  useEffect(() => {
    const fetchInUseRequests = async () => {
      try {
        const data = await getInUseRequests();
        setInUseRequests(data);
      } catch (err) {
        console.error("Error fetching 'IN-USED' requests:", err.message);
      }
    };

    fetchInUseRequests();
  }, []);

  const calculateRemainingTime = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    const diff = end - now;

    if (diff <= 0) return "Expired";

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours} Hr, ${minutes} Min`;
  };

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
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left p-2">Name</th>
                  <th className="text-left p-2">Unit</th>
                  <th className="text-left p-2">Remaining Time</th>
                </tr>
              </thead>
              <tbody className="text-center text-secondary">
                {inUseRequests.map((request, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="p-2">
                      {request.first_name} {request.last_name}
                    </td>
                    <td className="p-2">{request.UNITS.name}</td>
                    <td className="p-2">
                      {calculateRemainingTime(request.end_date)}
                    </td>
                  </tr>
                ))}
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
