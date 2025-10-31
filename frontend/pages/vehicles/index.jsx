import { useEffect, useState } from "react";
import VehicleCard from "../../components/VehicleCard";
import VehicleForm from "../../components/VehicleForm";
import SpeedChart from "../../components/SpeedChart";
import dynamic from "next/dynamic";
import { io } from "socket.io-client";

const Map = dynamic(() => import("../../components/Map"), { ssr: false });

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchVehicles = async () => {
    try {
      const res = await fetch("http://localhost:5000/vehicles");
      const data = await res.json();
      setVehicles(data);
    } catch (err) {
      console.error("Error fetching vehicles:", err);
    }
  };

  useEffect(() => {
    fetchVehicles();
    const socket = io("http://localhost:5000");
    socket.on("vehiclesUpdated", fetchVehicles);

    return () => socket.disconnect();
  }, []);

  const handleSaveVehicle = async (vehicle) => {
    try {
      const method = vehicle._id ? "PUT" : "POST";
      const url = vehicle._id
        ? `http://localhost:5000/vehicles/${vehicle._id}`
        : "http://localhost:5000/vehicles";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(vehicle),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save vehicle");

      fetchVehicles();
    } catch (err) {
      console.error("Error saving vehicle:", err);
      alert(err.message);
    }
  };

  const handleDeleteVehicle = async (vehicle) => {
    try {
      await fetch(`http://localhost:5000/vehicles/${vehicle._id}`, {
        method: "DELETE",
      });
      fetchVehicles();
    } catch (err) {
      console.error("Error deleting vehicle:", err);
    }
  };

  const filteredVehicles = vehicles.filter((v) =>
    v.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Vehicles Management</h1>

      <VehicleForm onSave={handleSaveVehicle} />

      <input
        type="text"
        placeholder="Search vehicles by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 rounded mb-4 w-full"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Map vehicles={filteredVehicles} />
        <SpeedChart vehicles={filteredVehicles} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredVehicles.map((v) => (
          <VehicleCard
            key={v._id}
            vehicle={v}
            onSave={handleSaveVehicle}
            onDelete={handleDeleteVehicle}
          />
        ))}
      </div>
    </div>
  );
}
