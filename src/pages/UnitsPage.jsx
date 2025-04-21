import React, { useState } from "react";
import HeaderNav from "../components/HeaderNav";
import HomeSideNav from "../components/HomeSideNav";

import { FaImage } from "react-icons/fa";
import AddNewUnitSection from "../components/AddNewUnitSection";
import AllUnitSection from "../components/AllUnitSection";

export default function UnitsPage() {
  return (
    <main className="grid grid-cols-[auto,1fr,1fr] grid-rows-[auto,1fr] gap-4 h-svh bg-secondary font-poppins text-primary">
      <HeaderNav />
      <HomeSideNav />
      <div className="col-span-2 flex flex-col gap-6 pr-2">
        <AllUnitSection />
        <AddNewUnitSection />
      </div>
    </main>
  );
}
