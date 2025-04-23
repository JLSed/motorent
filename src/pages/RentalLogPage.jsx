import React, { useEffect, useState } from "react";
import HeaderNav from "../components/HeaderNav";
import HomeSideNav from "../components/HomeSideNav";
import { getRequests, confirmRequest, declineRequest } from "../lib/supabase";

export default function RentalLogPage() {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchRequests = async () => {
    try {
      const data = await getRequests();
      setRequests(data);
    } catch (err) {
      console.error("Error fetching requests:", err.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

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

  return (
    <main className="grid grid-cols-[auto,1fr,1fr] grid-rows-[auto,1fr] gap-4 h-svh bg-secondary font-poppins text-primary">
      <HeaderNav />
      <HomeSideNav />
      <main className="p-4">
        <h1 className="text-2xl font-semibold mb-4">Rental Log</h1>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Customer Info</th>
              <th className="border border-gray-300 p-2">Unit Name</th>
              <th className="border border-gray-300 p-2">Total Cost</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Duration</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr
                key={request.request_id}
                className="cursor-pointer hover:bg-gray-200"
                onClick={() => handleRowClick(request)}
              >
                <td className="border border-gray-300 p-2">
                  {request.first_name} {request.last_name}
                  <br />
                  {request.user_email}
                  <br />
                  {request.contact_num}
                </td>
                <td className="border border-gray-300 p-2">
                  {request.UNITS?.name}
                </td>
                <td className="border border-gray-300 p-2">
                  {request.total_cost} PHP
                </td>
                <td className="border border-gray-300 p-2">{request.status}</td>
                <td className="border border-gray-300 p-2">
                  {request.duration_day} days
                  <br />
                  {request.start_date} - {request.end_date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isModalOpen && selectedRequest && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Request Details</h2>
              <p>
                <strong>Request ID:</strong> {selectedRequest.request_id}
              </p>
              <p>
                <strong>User:</strong> {selectedRequest.first_name}{" "}
                {selectedRequest.last_name}
              </p>
              <p>
                <strong>Email:</strong> {selectedRequest.user_email}
              </p>
              <p>
                <strong>Contact:</strong> {selectedRequest.contact_num}
              </p>
              <p>
                <strong>Start Date:</strong> {selectedRequest.start_date}
              </p>
              <p>
                <strong>End Date:</strong> {selectedRequest.end_date}
              </p>
              <p>
                <strong>Payment Method:</strong>{" "}
                {selectedRequest.payment_method}
              </p>
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
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </main>
  );
}
