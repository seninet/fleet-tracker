let drivers = [
  { _id: "1", name: "John Doe", license: "ABC-123", vehicle: "Truck 1" },
  { _id: "2", name: "Jane Smith", license: "XYZ-789", vehicle: "Van 2" },
];

export default function handler(req, res) {
  const { id } = req.query;

  if (req.method === "PUT") {
    const index = drivers.findIndex((d) => d._id === id);
    if (index === -1) return res.status(404).json({ message: "Driver not found" });
    drivers[index] = { ...drivers[index], ...req.body };
    res.status(200).json(drivers[index]);
  } else if (req.method === "DELETE") {
    drivers = drivers.filter((d) => d._id !== id);
    res.status(200).json({ message: "Deleted" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
