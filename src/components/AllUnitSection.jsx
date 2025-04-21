import React, { useEffect, useState } from "react";
import { FiFilter } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { getMotorUnits } from "../lib/supabase";
import UnitCards from "./UnitCard";
import { CgSortAz } from "react-icons/cg";
import UnitModal from "./UnitModal"; // Import the modal component

export default function AllUnitSection() {
  const [allUnits, setAllUnits] = useState([]);
  const [filteredUnits, setFilteredUnits] = useState([]); // State for filtered units
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false); // State for sort menu
  const [selectedStatus, setSelectedStatus] = useState("Status");
  const [selectedSort, setSelectedSort] = useState("Sort by");
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [selectedUnit, setSelectedUnit] = useState(null); // State for the selected unit

  const fetchUnitData = async () => {
    try {
      const data = await getMotorUnits();
      setAllUnits(data);
      setFilteredUnits(data); // Initialize filtered units with all units
      console.log(data);
    } catch (error) {
      console.error("Error fetching unit data:", error);
    }
  };

  useEffect(() => {
    fetchUnitData();
  }, []);

  const toggleSubmenu = () => {
    setIsSubmenuOpen(!isSubmenuOpen);
  };

  const toggleSortMenu = () => {
    setIsSortMenuOpen(!isSortMenuOpen);
  };

  const handleStatusSelect = (status) => {
    setSelectedStatus(status);
    setIsSubmenuOpen(false);

    // Filter units based on the selected status
    if (status === "Status") {
      setFilteredUnits(allUnits); // Show all units if "Status" is selected
    } else {
      const filtered = allUnits.filter((unit) => unit.status === status);
      setFilteredUnits(filtered);
    }
  };

  const handleSortSelect = (sortOption) => {
    setSelectedSort(sortOption);
    setIsSortMenuOpen(false);

    let sortedUnits = [...filteredUnits];
    switch (sortOption) {
      case "Name (A-Z)":
        sortedUnits.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Name (Z-A)":
        sortedUnits.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "Purchased Date (Ascending)":
        sortedUnits.sort(
          (a, b) => new Date(a.purchased_date) - new Date(b.purchased_date)
        );
        break;
      case "Purchased Date (Descending)":
        sortedUnits.sort(
          (a, b) => new Date(b.purchased_date) - new Date(a.purchased_date)
        );
        break;
      case "Created At (Ascending)":
        sortedUnits.sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at)
        );
        break;
      case "Created At (Descending)":
        sortedUnits.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        break;
      default:
        break;
    }
    setFilteredUnits(sortedUnits);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter units based on the search query
    const filtered = allUnits.filter((unit) =>
      unit.name.toLowerCase().includes(query)
    );
    setFilteredUnits(filtered);
  };

  const handleCardClick = (unit) => {
    setSelectedUnit(unit); // Set the selected unit
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedUnit(null); // Clear the selected unit
  };

  return (
    <div className="bg-white rounded-lg text-primary p-4 w-auto shadow-lg">
      <p className="text-2xl font-semibold mb-4">UNIT DETAILS</p>
      <div className="flex gap-4 items-center mb-4">
        <input
          type="text"
          placeholder="Search by Name"
          className="border border-gray-300 rounded-lg p-2"
          value={searchQuery}
          onChange={handleSearch} // Attach the search handler
        />
        <div className="flex gap-4 items-center text-lg text-gray-500 cursor-pointer">
          <div className="flex" onClick={toggleSubmenu}>
            <FiFilter className="text-3xl" />
            <p>Filter by</p>
          </div>
          <div className="relative">
            <div
              className="flex items-center gap-1 border border-gray-400 rounded-lg p-2 cursor-pointer select-none"
              onClick={toggleSubmenu}
            >
              <p>{selectedStatus}</p>
              <IoIosArrowDown />
            </div>
            {isSubmenuOpen && (
              <div className="absolute bg-white border border-gray-300 rounded-lg shadow-lg mt-1 select-none">
                <p
                  className="p-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleStatusSelect("AVAILABLE")}
                >
                  AVAILABLE
                </p>
                <p
                  className="p-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleStatusSelect("MAINTENANCE")}
                >
                  MAINTENANCE
                </p>
                <p
                  className="p-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleStatusSelect("OCCUPIED")}
                >
                  OCCUPIED
                </p>
                <p
                  className="p-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleStatusSelect("Status")}
                >
                  ALL
                </p>
              </div>
            )}
          </div>
          <div className="flex items-center " onClick={toggleSortMenu}>
            <CgSortAz className="text-4xl" />
            <p>Sort by</p>
          </div>
          <div className="relative">
            <div
              className="flex items-center gap-1 border border-gray-400 rounded-lg p-2 cursor-pointer select-none"
              onClick={toggleSortMenu}
            >
              <p>{selectedSort}</p>
              <IoIosArrowDown />
            </div>
            {isSortMenuOpen && (
              <div className="flex absolute bg-white border border-gray-300 rounded-lg shadow-lg mt-1 select-none">
                <div>
                  <p
                    className="p-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSortSelect("Name (A-Z)")}
                  >
                    Name (A-Z)
                  </p>
                  <p
                    className="p-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSortSelect("Name (Z-A)")}
                  >
                    Name (Z-A)
                  </p>
                </div>
                <div>
                  <p
                    className="p-2 cursor-pointer hover:bg-gray-100"
                    onClick={() =>
                      handleSortSelect("Purchased Date (Ascending)")
                    }
                  >
                    Purchased Date (Ascending)
                  </p>
                  <p
                    className="p-2 cursor-pointer hover:bg-gray-100"
                    onClick={() =>
                      handleSortSelect("Purchased Date (Descending)")
                    }
                  >
                    Purchased Date (Descending)
                  </p>
                </div>
                <div>
                  <p
                    className="p-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSortSelect("Created At (Ascending)")}
                  >
                    Created At (Ascending)
                  </p>
                  <p
                    className="p-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSortSelect("Created At (Descending)")}
                  >
                    Created At (Descending)
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Use the UnitCards component */}
      <UnitCards units={filteredUnits} onCardClick={handleCardClick} />

      {/* Modal */}
      {isModalOpen && (
        <UnitModal
          unit={selectedUnit}
          onClose={closeModal}
          refetchUnits={fetchUnitData} // Pass refetch function
        />
      )}
    </div>
  );
}
