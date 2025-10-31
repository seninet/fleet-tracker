import { useState, useEffect } from "react";

export default function DriverForm({ onSave, editingDriver, existingDrivers }) {
  const [form, setForm] = useState({ name: "", license: "", phone: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingDriver) setForm(editingDriver);
    else setForm({ name: "", license: "", phone: "" });
    setError("");
  }, [editingDriver]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check duplicates
    const duplicate = existingDrivers.find(
      (d) =>
        (!editingDriver || d._id !== editingDriver._id) &&
        (d.license === form.license || d.phone === form.phone)
    );
    if (duplicate) {
      setError("License or phone already exists!");
      return;
    }

    onSave(form);
    setForm({ name: "", license: "", phone: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 border p-4 rounded shadow">
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <input
        name="name"
        placeholder="Driver name"
        value={form.name}
        onChange={handleChange}
        className="border p-2 rounded w-full mb-2"
        required
      />
      <input
        name="license"
        placeholder="License number"
        value={form.license}
        onChange={handleChange}
        className="border p-2 rounded w-full mb-2"
        required
      />
      <input
        name="phone"
        placeholder="Phone number"
        value={form.phone}
        onChange={handleChange}
        className="border p-2 rounded w-full mb-2"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {editingDriver ? "Update" : "Save"}
      </button>
    </form>
  );
}

