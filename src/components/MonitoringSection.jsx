import React, { useEffect, useState } from "react";
import { getInUseRequests, markUnitAsAvailable } from "../lib/supabase";
import { FiSearch } from "react-icons/fi";

export default function MonitoringSection({ onUnitReturned }) {
  const [inUseRequests, setInUseRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchInUseRequests = async () => {
      try {
        const data = await getInUseRequests();
        setInUseRequests(data);
        setFilteredRequests(data); // Initialize filtered requests
      } catch (err) {
        console.error("Error fetching 'IN-USE' requests:", err.message);
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

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = inUseRequests.filter((request) =>
      `${request.first_name} ${request.last_name}`.toLowerCase().includes(query)
    );
    setFilteredRequests(filtered);
  };

  const handleRowClick = (request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const handleUnitReturned = async () => {
    try {
      await markUnitAsAvailable(
        selectedRequest.UNITS.unit_id,
        selectedRequest.request_id
      );
      setIsModalOpen(false);

      // Refresh the in-use requests
      const updatedRequests = await getInUseRequests();
      setInUseRequests(updatedRequests);
      setFilteredRequests(updatedRequests); // Update filtered requests

      // Trigger the UnitDashboard refresh
      onUnitReturned();
    } catch (err) {
      console.error(
        "Error marking unit as available and request as completed:",
        err.message
      );
    }
  };

  return (
    <div className="flex flex-col flex-1 bg-accent-light p-2 rounded-lg">
      <div className="flex gap-4 items-center">
        <p className="font-bold text-gray-300 text-2xl">Monitoring</p>
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
      </div>

      {/* Div-based table */}
      <div className="w-full mt-4 text-secondary">
        {/* Header */}
        <div className="grid grid-cols-[2fr,1fr,1fr] justify-items-center font-semibold text-left p-2">
          <div>Name</div>
          <div>Unit Used</div>
          <div>Remaining Time</div>
        </div>

        {/* Rows */}
        {filteredRequests.map((request, index) => (
          <div
            key={index}
            className="grid grid-cols-[2fr,1fr,1fr] justify-items-center items-center cursor-pointer hover:bg-gray-200 hover:text-primary rounded-lg transition-all"
            onClick={() => handleRowClick(request)}
          >
            {/* Name */}
            <div className="p-2">
              {request.first_name} {request.last_name}
            </div>

            {/* Unit */}
            <div className="p-2">{request.UNITS.name}</div>

            {/* Remaining Time */}
            <div className="p-2">
              {calculateRemainingTime(request.end_date)}
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Rental Information</h2>
            <div className="mb-4">
              <p className="text-2xl">{selectedRequest.UNITS.name}</p>
              <img
                src={selectedRequest.UNITS.image_url}
                alt="Unit"
                className="w-full h-40 object-cover rounded-lg mt-2"
              />
            </div>
            <div className="mb-4">
              <p>
                <strong>Customer Name:</strong> {selectedRequest.first_name}{" "}
                {selectedRequest.last_name}
              </p>
              <p>
                <strong>Contact Number:</strong> {selectedRequest.contact_num}
              </p>
              <p>
                <strong>Rented Date:</strong> {selectedRequest.start_date}
              </p>
              <p>
                <strong>Remaining Time:</strong>{" "}
                {calculateRemainingTime(selectedRequest.end_date)}
              </p>
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Close
              </button>
              <button
                onClick={handleUnitReturned}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Unit Returned
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
