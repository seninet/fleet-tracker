import { useState, useEffect } from "react";
import DriverForm from "../../components/DriverForm";
import DriverCard from "../../components/DriverCard";

export default function DriversPage() {
  const [drivers, setDrivers] = useState([]);
  const [editingDriver, setEditingDriver] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch drivers from backend
  const fetchDrivers = async () => {
    try {
      const res = await fetch("http://localhost:5000/drivers");
      const data = await res.json();
      setDrivers(data);
    } catch (err) {
      console.error("Error fetching drivers:", err);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  // Save driver (create or update)
  const handleSave = async (driverData) => {
    try {
      const method = driverData._id ? "PUT" : "POST";
      const url = driverData._id
        ? `http://localhost:5000/drivers/${driverData._id}`
        : "http://localhost:5000/drivers";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(driverData),
      });

      if (!res.ok) throw new Error("Failed to save driver");

      setEditingDriver(null);
      fetchDrivers();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  // Edit driver
  const handleEdit = (driver) => {
    setEditingDriver(driver);
  };

  // Delete driver
  const handleDelete = async (driver) => {
    try {
      await fetch(`http://localhost:5000/drivers/${driver._id}`, {
        method: "DELETE",
      });
      setDrivers((prev) => prev.filter((d) => d._id !== driver._id));
      if (editingDriver && editingDriver._id === driver._id) {
        setEditingDriver(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Filter drivers by search
  const filteredDrivers = drivers.filter(
    (d) =>
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.license.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Drivers Management</h1>

      <input
        type="text"
        placeholder="Search drivers by name, license, or phone..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 rounded mb-4 w-full"
      />

      <DriverForm
        onSave={handleSave}
        editingDriver={editingDriver}
        existingDrivers={drivers}
      />

      {filteredDrivers.length === 0 && <p>No drivers found.</p>}

      {filteredDrivers.map((driver) => (
        <DriverCard
          key={driver._id}
          driver={driver}
          onEdit={() => handleEdit(driver)}
          onDelete={() => handleDelete(driver)}
        />
      ))}
    </div>
  );
}
