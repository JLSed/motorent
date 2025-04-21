import React, { useState } from "react";
import { FaImage } from "react-icons/fa";
import { addMotorUnit } from "../lib/supabase";

export default function AddNewUnitSection() {
  const [motorName, setMotorName] = useState("");
  const [motorCC, setMotorCC] = useState("");
  const [motorHP, setMotorHP] = useState("");
  const [purchasedDate, setPurchasedDate] = useState("");
  const [transmission, setTransmission] = useState("AT");
  const [hourlyPrice, setHourlyPrice] = useState("");
  const [motorImage, setMotorImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setMotorImage(file);

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleAddUnit = async (e) => {
    e.preventDefault();
    if (!motorImage) {
      alert("Please fill the motorcycle image.");
      return;
    }

    try {
      await addMotorUnit({
        name: motorName,
        purchased_date: purchasedDate,
        transmission: transmission,
        horsepower: motorHP,
        engine_displacement: motorCC,
        imageFile: motorImage,
        hourly_rate: hourlyPrice,
      });
      setMotorName("");
      setPurchasedDate("");
      setTransmission("AT");
      setMotorHP("");
      setMotorCC("");
      setHourlyPrice("");
      setImagePreview(null);
      setMotorImage(null);
      alert("Unit added successfully!");
    } catch (error) {
      alert(`Error: ${error}`);
    }
  };

  return (
    <div className="bg-white rounded-lg text-primary p-4 w-auto shadow-lg">
      <p className="text-2xl font-semibold mb-4">ADD NEW UNIT</p>
      <p className="text-lg mb-4">Motorcycle Details</p>
      <form
        onSubmit={handleAddUnit}
        className="flex flex-col gap-3 pt-4 border-t-2 border-accent-light"
      >
        <div className="flex justify-evenly items-center gap-2">
          <div className="">
            <div className="w-40 h-40 ">
              {imagePreview ? (
                <div className="w-full h-full">
                  <label className="flex flex-col w-full h-full items-center justify-center cursor-pointer border-2 rounded-md bg-white text-gray-400">
                    <img
                      src={imagePreview}
                      alt="Motor Preview"
                      className="w-full h-full object-cover rounded-md"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              ) : (
                <label className="flex flex-col w-full h-full items-center justify-center cursor-pointer border-dashed border-2 rounded-md bg-white text-gray-400">
                  <FaImage size={48} />
                  <p>Select </p>
                  <p>Motor Image</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="">
              <label>Motor Name</label>
              <div className="flex items-center gap-2">
                <input
                  required
                  type="text"
                  placeholder="Motor Name"
                  value={motorName}
                  onChange={(e) => setMotorName(e.target.value)}
                  className="p-2 rounded border w-full "
                />
              </div>
            </div>
            <div className="grid grid-rows-2 grid-cols-2 gap-y-1 gap-x-12">
              <div className="">
                <label>Engine Displacement</label>
                <div className="flex items-center gap-2">
                  <input
                    required
                    type="number"
                    placeholder="Engine"
                    value={motorCC}
                    onChange={(e) => setMotorCC(e.target.value)}
                    className="p-2 rounded border w-full "
                  />
                  <p className="font-bold">CC</p>
                </div>
              </div>
              <div>
                <label htmlFor="motor_transmission">Transmission</label>
                <select
                  name="motor_transmission"
                  id="motor_transmission"
                  className="w-full  rounded px-1"
                  value={transmission}
                  onChange={(e) => setTransmission(e.target.value)}
                >
                  <option value="AT">Automatic</option>
                  <option value="M">Manual</option>
                </select>
              </div>
              <div className="">
                <label>Horsepower</label>
                <div className="flex items-center gap-2">
                  <input
                    required
                    type="number"
                    placeholder="Power"
                    value={motorHP}
                    onChange={(e) => setMotorHP(e.target.value)}
                    className="p-2 rounded border w-full "
                  />
                  <p className="font-bold">HP</p>
                </div>
              </div>
              <div className="">
                <label>Purchased Date</label>
                <div className="flex items-center gap-2">
                  <input
                    required
                    type="date"
                    placeholder="Power"
                    value={purchasedDate}
                    onChange={(e) => setPurchasedDate(e.target.value)}
                    className="p-2 rounded border w-full "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="text-lg">Motorcycle Pricing Rate</p>
        <div className="flex gap-4 items-center justify-evenly border-t-2 border-accent-light pt-4">
          <div className="flex gap-2 items-center">
            <input
              required
              type="number"
              placeholder="Price"
              value={hourlyPrice}
              onChange={(e) => setHourlyPrice(e.target.value)}
              className="p-2 rounded border w-40"
            />
            <p className="text-xl font-semibold">PHP / Hour</p>
          </div>
          <p className="text-xl font-semibold">
            <span className="text-orange-400 underline border-l-2 p-4">
              {hourlyPrice ? hourlyPrice * 24 : 0} PHP
            </span>
            / Day
          </p>
          <p className="text-xl font-semibold">
            <span className="text-orange-400 underline border-l-2 p-4">
              {hourlyPrice ? hourlyPrice * (24 * 7) : 0} PHP
            </span>
            / Week
          </p>
        </div>
        <button
          type="submit"
          className="bg-accent-gray text-white rounded p-2 hover:bg-primary-dark"
        >
          Add Unit
        </button>
      </form>
    </div>
  );
}
