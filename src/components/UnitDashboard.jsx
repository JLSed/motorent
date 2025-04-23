import React, { useState, useEffect } from "react";
import { RiToolsFill } from "react-icons/ri";
import { FaMotorcycle } from "react-icons/fa";
import { MdOutlinePayments, MdDirectionsBike } from "react-icons/md";
import { getMotorUnits, getTodayEarnings } from "../lib/supabase";

export default function UnitDashboard({ refresh }) {
  const [unitData, setUnitData] = useState({
    occupied: 0,
    available: 0,
    underMaintenance: 0,
    earnings: 0,
  });

  const fetchUnitData = async () => {
    try {
      const data = await getMotorUnits();
      const unitStatusCounts = data.reduce(
        (acc, { status }) => {
          switch (status) {
            case "AVAILABLE":
              acc.available++;
              break;
            case "OCCUPIED":
              acc.occupied++;
              break;
            case "MAINTENANCE":
              acc.underMaintenance++;
              break;
          }
          return acc;
        },
        { available: 0, occupied: 0, underMaintenance: 0 }
      );

      // Fetch today's earnings
      const earnings = await getTodayEarnings();

      setUnitData({ ...unitStatusCounts, earnings });
    } catch (error) {
      console.error("Error fetching unit data:", error);
    }
  };

  useEffect(() => {
    fetchUnitData();
  }, [refresh]); // Re-fetch data whenever the refresh prop changes

  return (
    <div className="font-poppins">
      <p className="text-4xl font-semibold">Unit Status</p>
      <div className="flex gap-4 font-outfit">
        <div className="flex items-center gap-6 px-6 p-2 text-secondary bg-accent-gray rounded-lg">
          <div>
            <p id="occupied_unit" className="font-semibold text-3xl">
              {unitData.occupied}
            </p>
            <p id="occupied_unit" className="text-sm">
              Occupied
            </p>
          </div>
          <MdDirectionsBike className="text-4xl" />
        </div>
        <div className="flex items-center gap-6 px-6 p-2 text-secondary bg-accent-gray rounded-lg">
          <div>
            <p id="available_unit" className="font-semibold text-3xl">
              {unitData.available}
            </p>
            <p id="available_unit" className="text-sm">
              Available
            </p>
          </div>
          <FaMotorcycle className="text-4xl" />
        </div>
        <div className="flex items-center gap-6 px-6 p-2 text-secondary bg-accent-gray rounded-lg">
          <div>
            <p id="maintenance_unit" className="font-semibold text-3xl">
              {unitData.underMaintenance}
            </p>
            <p id="maintenance_unit" className="text-sm">
              Under Maintenance
            </p>
          </div>
          <RiToolsFill className="text-4xl" />
        </div>
        <div className="flex items-center gap-6 px-6 p-2 text-secondary bg-accent-gray rounded-lg">
          <div>
            <p id="earnings_today" className="font-semibold text-3xl">
              {unitData.earnings} PHP
            </p>
            <p id="earnings_today" className="text-sm">
              Earnings (Today)
            </p>
          </div>
          <MdOutlinePayments className="text-4xl" />
        </div>
      </div>
    </div>
  );
}
