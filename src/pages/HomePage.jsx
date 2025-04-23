import React, { useState } from "react";
import HeaderNav from "../components/HeaderNav";
import HomeSideNav from "../components/HomeSideNav";
import UnitDashboard from "../components/UnitDashboard";
import MonitoringSection from "../components/MonitoringSection";

export default function HomePage() {
  const [refreshDashboard, setRefreshDashboard] = useState(false);

  const handleRefreshDashboard = () => {
    setRefreshDashboard((prev) => !prev); // Toggle the state to trigger a refresh
  };

  return (
    <main className="grid grid-cols-[auto,1fr,1fr] grid-rows-[auto,1fr] gap-4 h-svh bg-secondary font-poppins text-primary">
      <HeaderNav />
      <HomeSideNav />

      <div className="col-span-2 flex flex-col gap-4">
        <UnitDashboard refresh={refreshDashboard} />

        <div className="flex gap-4 pr-4 mt-4">
          <MonitoringSection onUnitReturned={handleRefreshDashboard} />
        </div>
      </div>
    </main>
  );
}
