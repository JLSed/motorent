import React, { useState } from "react";
import { FaImage } from "react-icons/fa";

export default function AddNewUnit() {
  const [motorName, setMotorName] = useState("");
  const [motorSpecs, setMotorSpecs] = useState("");
  const [motorImage, setMotorImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [message, setMessage] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setMotorImage(file);

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  return (
    <div className="col-span-2 flex flex-col gap-6 pr-2">
      <div className="bg-accent-light rounded-lg text-secondary p-4 w-auto">
        <p className="text-lg font-semibold mb-4">ADD NEW UNIT</p>
        <form className="flex flex-col gap-3 ">
          <div className="flex justify-center items-center gap-2">
            <div className="flex flex-col justify-center items-center">
              <div className="w-40 h-40">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Motor Preview"
                    className="w-full h-full object-cover rounded-md border"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center border-dashed border-2 rounded-md bg-white text-gray-400">
                    <FaImage size={48} />
                  </div>
                )}
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="p-2"
              />
            </div>
            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Motor Name"
                value={motorName}
                onChange={(e) => setMotorName(e.target.value)}
                className="p-2 rounded border"
              />
              <div className="grid grid-rows-2 grid-cols-2 gap-y-1 gap-x-12">
                <div className="">
                  <label>Engine Displacement</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="Engine"
                      value={motorName}
                      onChange={(e) => setMotorName(e.target.value)}
                      className="p-2 rounded border w-full text-primary"
                    />
                    <p>CC</p>
                  </div>
                </div>
                <div>
                  <label htmlFor="motor_transmission">Transmission</label>
                  <select
                    name="motor_transmission"
                    id="motor_transmission"
                    className="w-full text-primary rounded px-1"
                  >
                    <option value="AT">Automatic</option>
                    <option value="M">Manual</option>
                  </select>
                </div>
                <div className="">
                  <label>Horsepower</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="Power"
                      value={motorName}
                      onChange={(e) => setMotorName(e.target.value)}
                      className="p-2 rounded border w-full text-primary"
                    />
                    <p>HP</p>
                  </div>
                </div>
                <div className="">
                  <label>Purchased Date</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="date"
                      placeholder="Power"
                      value={motorName}
                      onChange={(e) => setMotorName(e.target.value)}
                      className="p-2 rounded border w-full text-primary"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="bg-primary text-white rounded p-2 hover:bg-primary-dark"
          >
            Add Unit
          </button>

          {message && <p className="mt-2 text-sm text-secondary">{message}</p>}
        </form>
      </div>
    </div>
  );
}
