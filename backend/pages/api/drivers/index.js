let drivers = [
  { _id: "1", name: "John Doe", license: "ABC-123", vehicle: "Truck 1" },
  { _id: "2", name: "Jane Smith", license: "XYZ-789", vehicle: "Van 2" },
];

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(drivers);
  } else if (req.method === "POST") {
    const newDriver = { _id: Date.now().toString(), ...req.body };
    drivers.push(newDriver);
    res.status(201).json(newDriver);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
