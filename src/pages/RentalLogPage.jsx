import React, { useEffect, useState } from "react";
import HeaderNav from "../components/HeaderNav";
import HomeSideNav from "../components/HomeSideNav";
import { getRequests, confirmRequest, declineRequest } from "../lib/supabase";
import { RiContactsBook2Fill } from "react-icons/ri";
import { IoMdContact } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { LuArrowBigRightDash, LuArrowRightToLine } from "react-icons/lu";
import { FiFilter, FiSearch } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { CgSortAz } from "react-icons/cg";

export default function RentalLogPage() {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Status");
  const [selectedSort, setSelectedSort] = useState("Sort by");
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fetchRequests = async () => {
    try {
      const data = await getRequests();
      setRequests(data);
      setFilteredRequests(data); // Initialize filtered requests
    } catch (err) {
      console.error("Error fetching requests:", err.message);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter requests based on the search query
    const filtered = requests.filter((request) =>
      `${request.first_name} ${request.last_name}`.toLowerCase().includes(query)
    );
    setFilteredRequests(filtered);
  };

  const handleStatusSelect = (status) => {
    setSelectedStatus(status);
    setIsSubmenuOpen(false);

    // Filter requests based on the selected status
    if (status === "Status") {
      setFilteredRequests(requests); // Show all requests if "Status" is selected
    } else {
      const filtered = requests.filter((request) => request.status === status);
      setFilteredRequests(filtered);
    }
  };

  const handleSortSelect = (sortOption) => {
    setSelectedSort(sortOption);
    setIsSortMenuOpen(false);

    let sortedRequests = [...filteredRequests];
    switch (sortOption) {
      case "Name (A-Z)":
        sortedRequests.sort((a, b) =>
          `${a.first_name} ${a.last_name}`.localeCompare(
            `${b.first_name} ${b.last_name}`
          )
        );
        break;
      case "Name (Z-A)":
        sortedRequests.sort((a, b) =>
          `${b.first_name} ${b.last_name}`.localeCompare(
            `${a.first_name} ${a.last_name}`
          )
        );
        break;
      case "Duration (Ascending)":
        sortedRequests.sort((a, b) => a.duration_day - b.duration_day);
        break;
      case "Duration (Descending)":
        sortedRequests.sort((a, b) => b.duration_day - a.duration_day);
        break;
      case "Total Cost (Ascending)":
        sortedRequests.sort((a, b) => a.total_cost - b.total_cost);
        break;
      case "Total Cost (Descending)":
        sortedRequests.sort((a, b) => b.total_cost - a.total_cost);
        break;
      default:
        break;
    }
    setFilteredRequests(sortedRequests);
  };

  const toggleSubmenu = () => {
    setIsSubmenuOpen(!isSubmenuOpen);
  };

  const toggleSortMenu = () => {
    setIsSortMenuOpen(!isSortMenuOpen);
  };

  const handleRowClick = (request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    try {
      await confirmRequest(selectedRequest.request_id);
      await fetchRequests(); // Refetch requests to update the table
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error confirming request:", err.message);
    }
  };

  const handleDecline = async () => {
    try {
      await declineRequest(selectedRequest.request_id);
      await fetchRequests(); // Refetch requests to update the table
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error declining request:", err.message);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "REQUESTED":
        return "bg-orange-500 text-white";
      case "IN-USE":
        return "bg-blue-500 text-white";
      case "COMPLETED":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-300 text-black";
    }
  };

  return (
    <main className="grid grid-cols-[auto,1fr,1fr] grid-rows-[auto,1fr] gap-4 h-svh bg-secondary font-poppins text-primary">
      <HeaderNav />
      <HomeSideNav />
      <main className="col-span-2 flex flex-col gap-6 pr-2">
        <h1 className="text-2xl font-semibold mb-4">Rental Log</h1>
        <div className="flex gap-4 items-center mb-4">
          {/* Search Input */}
          <div className="relative flex items-center gap-2">
            <FiSearch className="absolute left-2 text-gray-500 text-2xl" />
            <input
              type="text"
              placeholder="Search by Name"
              className="border border-gray-300 rounded-lg p-2 pl-9"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>

          {/* Filter by Status */}
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
                    onClick={() => handleStatusSelect("REQUESTED")}
                  >
                    REQUESTED
                  </p>
                  <p
                    className="p-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleStatusSelect("IN-USE")}
                  >
                    IN-USE
                  </p>
                  <p
                    className="p-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleStatusSelect("COMPLETED")}
                  >
                    COMPLETED
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
          </div>

          {/* Sort by Options */}
          <div className="flex gap-4 items-center text-lg text-gray-500 cursor-pointer">
            <div className="flex" onClick={toggleSortMenu}>
              <CgSortAz className="text-3xl" />
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
                <div className="absolute bg-white border border-gray-300 rounded-lg shadow-lg mt-1 select-none">
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
                  <p
                    className="p-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSortSelect("Duration (Ascending)")}
                  >
                    Duration (Ascending)
                  </p>
                  <p
                    className="p-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSortSelect("Duration (Descending)")}
                  >
                    Duration (Descending)
                  </p>
                  <p
                    className="p-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSortSelect("Total Cost (Ascending)")}
                  >
                    Total Cost (Ascending)
                  </p>
                  <p
                    className="p-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSortSelect("Total Cost (Descending)")}
                  >
                    Total Cost (Descending)
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-full">
          {/* Header */}
          <div className="grid grid-cols-[2fr,1fr,1fr,1fr,2fr] justify-items-center bg-gray-100 font-semibold text-left p-2">
            <div>Customer Info</div>
            <div>Unit Name</div>
            <div>Total Cost</div>
            <div>Status</div>
            <div>Duration</div>
          </div>

          {/* Rows */}
          {filteredRequests.map((request) => (
            <div
              key={request.request_id}
              className="grid grid-cols-[2fr,1fr,1fr,1fr,2fr] shadow gap-2 mb-2 items-center p-2 border-b cursor-pointer hover:bg-accent-light hover:text-secondary bg-secondary transition-all rounded-xl"
              onClick={() => handleRowClick(request)}
            >
              {/* Customer Info */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1 text-lg">
                  <IoMdContact />
                  {request.first_name} {request.last_name}
                </div>
                <div className="flex items-center gap-1">
                  <MdEmail />
                  {request.user_email}
                </div>
                <div className="flex items-center gap-1">
                  <RiContactsBook2Fill />
                  {request.contact_num}
                </div>
              </div>

              {/* Unit Name */}
              <div className="text-center">{request.UNITS?.name}</div>

              {/* Total Cost */}
              <div className="text-center">{request.total_cost} PHP</div>

              {/* Status */}
              <div
                className={`p-1 rounded-full text-center ${getStatusClass(
                  request.status
                )}`}
              >
                {request.status}
              </div>

              {/* Duration */}
              <div className="text-right">
                <p className="text-2xl font-medium font-outfit">
                  {request.duration_day} days
                </p>
                {request.start_date} - {request.end_date}
              </div>
            </div>
          ))}
        </div>

        {isModalOpen && selectedRequest && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
              <h2 className="text-xl font-semibold mb-2">Request Details</h2>
              <div className="flex items-center gap-1 text-2xl">
                <IoMdContact />
                <div>
                  <p>
                    {selectedRequest.first_name} {selectedRequest.last_name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {selectedRequest.user_email}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 px-1 py-2">
                <RiContactsBook2Fill />
                <p> {selectedRequest.contact_num}</p>
              </div>
              <div className="flex items-center text-center gap-1 px-1 py-2">
                <p>
                  <strong>Start Date:</strong> {selectedRequest.start_date}
                </p>
                <LuArrowRightToLine className="text-4xl" />
                <p>
                  <strong>End Date:</strong> {selectedRequest.end_date}
                </p>
              </div>
              <div>
                <p className="text-2xl mt-2">
                  <strong>Amount to Pay:</strong> {selectedRequest.total_cost}{" "}
                  PHP
                </p>
              </div>
              <div className="flex justify-end gap-4 mt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDecline}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Decline
                </button>
                <button
                  onClick={handleConfirm}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Confirm Payment
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </main>
  );
}
