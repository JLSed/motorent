import React, { useState } from "react";
import { updateMotorUnit } from "../lib/supabase";

export default function UnitModal({ unit, onClose, refetchUnits }) {
  const [name, setName] = useState(unit.name);
  const [status, setStatus] = useState(unit.status);
  const [hourlyRate, setHourlyRate] = useState(unit.hourly_rate);

  const handleSave = async () => {
    try {
      // Prepare updated data
      const updatedData = {
        name,
        status,
        hourly_rate: hourlyRate,
      };

      // Call the API to update the unit
      await updateMotorUnit(unit.unit_id, updatedData);

      // Refetch all units to update the frontend
      await refetchUnits();

      // Close the modal
      onClose();
    } catch (err) {
      console.error("Error saving unit:", err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          Edit <span className="text-red-500">{unit.name}</span>{" "}
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
          >
            <option value="AVAILABLE">Available</option>
            <option value="MAINTENANCE">Maintenance</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Hourly Rate</label>
          <input
            type="number"
            value={hourlyRate}
            onChange={(e) => setHourlyRate(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-primary text-white rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
