// components/VehicleCard.jsx
import { useState } from "react";
import VehicleForm from "./VehicleForm";

export default function VehicleCard({ vehicle, onSave, onDelete }) {
  const [editing, setEditing] = useState(false);

  const handleEdit = () => setEditing(true);
  const handleCancel = () => setEditing(false);
  const handleSave = (updatedVehicle) => {
    updatedVehicle._id = vehicle._id; // keep id for updates
    onSave(updatedVehicle);
    setEditing(false);
  };

  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition">
      {editing ? (
        <>
          <VehicleForm vehicle={vehicle} onSave={handleSave} />
          <button
            onClick={handleCancel}
            className="bg-gray-500 text-white p-2 rounded w-full mt-2"
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <h2 className="text-xl font-bold">{vehicle.name}</h2>
          <p>Status: {vehicle.status}</p>
          <p>Speed: {vehicle.speed} km/h</p>
          <p>
            Location: {vehicle.lat.toFixed(4)}, {vehicle.lng.toFixed(4)}
          </p>
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleEdit}
              className="bg-blue-500 text-white p-2 rounded flex-1"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(vehicle)}
              className="bg-red-500 text-white p-2 rounded flex-1"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
