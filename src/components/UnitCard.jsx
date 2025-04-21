import React from "react";

export default function UnitCards({ units, onCardClick }) {
  return (
    <div className="flex gap-4 font-outfit overflow-x-auto pb-4">
      {units.map((unit) => (
        <div
          key={unit.id}
          className="flex-shrink-0 flex min-w-60 items-center gap-6 px-6 p-2 text-secondary bg-accent-light rounded-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105"
          onClick={() => onCardClick(unit)} // Handle card click
        >
          <div>
            <p className="font-semibold text-xl">{unit.name}</p>
            <div>
              <p className="text-sm">{unit.status}</p>
              <p className="text-sm">{unit.hourly_rate} PHP Hourly Rate</p>
            </div>
          </div>
          <img
            src={unit.image_url}
            alt="Unit"
            className="w-16 h-16 rounded-lg object-cover"
          />
        </div>
      ))}
    </div>
  );
}
