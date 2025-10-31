import { useState, useEffect } from "react";

export default function VehicleForm({ vehicle = {}, onSave, onCancel }) {
  const [form, setForm] = useState({
    name: "",
    status: "",
    speed: 0,
    lat: 0,
    lng: 0,
  });

  // Populate form if editing
  useEffect(() => {
    if (vehicle._id) {
      setForm({
        name: vehicle.name || "",
        status: vehicle.status || "",
        speed: vehicle.speed || 0,
        lat: vehicle.lat || 0,
        lng: vehicle.lng || 0,
      });
    }
  }, [vehicle]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === "speed" || name === "lat" || name === "lng" ? Number(value) : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    // Clear form if adding new
    if (!vehicle._id) {
      setForm({ name: "", status: "", speed: 0, lat: 0, lng: 0 });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded mb-4 shadow">
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        className="border p-2 rounded mb-2 w-full"
        required
      />
      <input
        name="status"
        placeholder="Status"
        value={form.status}
        onChange={handleChange}
        className="border p-2 rounded mb-2 w-full"
        required
      />
      <input
        name="speed"
        type="number"
        placeholder="Speed"
        value={form.speed}
        onChange={handleChange}
        className="border p-2 rounded mb-2 w-full"
      />
      <input
        name="lat"
        type="number"
        placeholder="Latitude"
        value={form.lat}
        onChange={handleChange}
        className="border p-2 rounded mb-2 w-full"
      />
      <input
        name="lng"
        type="number"
        placeholder="Longitude"
        value={form.lng}
        onChange={handleChange}
        className="border p-2 rounded mb-2 w-full"
      />

      <div className="flex gap-2">
        <button type="submit" className="bg-green-500 text-white p-2 rounded flex-1">
          Save
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="bg-gray-500 text-white p-2 rounded flex-1">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
