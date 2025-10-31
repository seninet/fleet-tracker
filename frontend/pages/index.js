import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { io } from "socket.io-client";
import { useRouter } from "next/router";
import StatCard from "../components/StatCard";
import SpeedChart from "../components/SpeedChart";

// Dynamic import to prevent SSR errors
const Map = dynamic(() => import("../components/Map"), { ssr: false });

export default function Dashboard() {
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const router = useRouter();

  // Fetch vehicles
  const fetchVehicles = async () => {
    try {
      const res = await fetch("http://localhost:5000/vehicles");
      const data = await res.json();
      setVehicles(data);
    } catch (err) {
      console.error("Error fetching vehicles:", err);
    }
  };

  // Fetch drivers
  const fetchDrivers = async () => {
    try {
      const res = await fetch("http://localhost:5000/drivers");
      const data = await res.json();
      setDrivers(data);
    } catch (err) {
      console.error("Error fetching drivers:", err);
      setDrivers([]);
    }
  };

  useEffect(() => {
    const socket = io("http://localhost:5000");

    fetchVehicles();
    fetchDrivers();

    socket.on("vehiclesUpdated", fetchVehicles);
    socket.on("driversUpdated", fetchDrivers);

    return () => socket.disconnect();
  }, []);

  // Vehicle stats
  const totalVehicles = vehicles.length;
  const onRouteVehicles = vehicles.filter((v) => v.status === "on route").length;
  const idleVehicles = vehicles.filter((v) => v.status === "idle").length;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Fleet Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Total Vehicles"
          value={totalVehicles}
          color="bg-blue-500"
          onClick={() => router.push("/vehicles")}
        />
        <StatCard
          title="On route"
          value={onRouteVehicles}
          color="bg-green-500"
          onClick={() => router.push("/vehicles")}
        />
        <StatCard
          title="Idle"
          value={idleVehicles}
          color="bg-yellow-500"
          onClick={() => router.push("/vehicles")}
        />
        <StatCard
          title="Drivers"
          value={drivers.length}
          color="bg-purple-500"
          onClick={() => router.push("/drivers")}
        />
      </div>

      {/* Map and Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="rounded-lg border shadow-md p-4">
          <h2 className="text-xl font-semibold mb-2">Live Map</h2>
          <Map vehicles={vehicles} />
        </div>

        <div className="rounded-lg border shadow-md p-4">
          <h2 className="text-xl font-semibold mb-2">Speed Overview</h2>
          <SpeedChart vehicles={vehicles} />
        </div>
      </div>
    </div>
  );
}

// import { useEffect, useState } from "react";
// import dynamic from "next/dynamic";
// import { io } from "socket.io-client";
// import { useRouter } from "next/router";
// import StatCard from "../components/StatCard";
// import SpeedChart from "../components/SpeedChart";

// // Dynamic import to prevent SSR errors
// const Map = dynamic(() => import("../components/Map"), { ssr: false });

// export default function Dashboard() {
//   const [vehicles, setVehicles] = useState([]);
//   const [drivers, setDrivers] = useState([]);
//   const router = useRouter();

//   // Fetch vehicles from backend
//   const fetchVehicles = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/vehicles");
//       const data = await res.json();
//       setVehicles(data);
//     } catch (err) {
//       console.error("Error fetching vehicles:", err);
//     }
//   };

//   // Fetch drivers from backend (or simulate for now)
//   const fetchDrivers = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/drivers");
//       if (!res.ok) throw new Error("Drivers API not available");
//       const data = await res.json();
//       setDrivers(data);
//     } catch (err) {
//       console.warn("Simulating drivers as backend not ready");
//       // Simulate drivers if API not ready
//       setDrivers([
//         { _id: "1", name: "John Doe" },
//         { _id: "2", name: "Jane Smith" },
//       ]);
//     }
//   };

//   useEffect(() => {
//     const socket = io("http://localhost:5000");

//     fetchVehicles();
//     fetchDrivers();

//     socket.on("vehiclesUpdated", fetchVehicles);
//     socket.on("driversUpdated", fetchDrivers);

//     return () => socket.disconnect();
//   }, []);

//   // Vehicle stats
//   const totalVehicles = vehicles.length;
//   const onRouteVehicles = vehicles.filter((v) => v.status === "on route").length;
//   const idleVehicles = vehicles.filter((v) => v.status === "idle").length;

//   return (
//     <div className="p-6 space-y-6">
//       <h1 className="text-3xl font-bold mb-6 text-gray-800">Fleet Dashboard</h1>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         <StatCard
//           title="Total Vehicles"
//           value={totalVehicles}
//           color="bg-blue-500"
//           onClick={() => router.push("/vehicles")}
//         />
//         <StatCard
//           title="On route"
//           value={onRouteVehicles}
//           color="bg-green-500"
//           onClick={() => router.push("/vehicles")}
//         />
//         <StatCard
//           title="Idle"
//           value={idleVehicles}
//           color="bg-yellow-500"
//           onClick={() => router.push("/vehicles")}
//         />
//         <StatCard
//           title="Drivers"
//           value={drivers.length}
//           color="bg-purple-500"
//           onClick={() => router.push("/drivers")}
//         />
//       </div>

//       {/* Map and Chart */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
//         <div className="rounded-lg border shadow-md p-4">
//           <h2 className="text-xl font-semibold mb-2">Live Map</h2>
//           <Map vehicles={vehicles} />
//         </div>

//         <div className="rounded-lg border shadow-md p-4">
//           <h2 className="text-xl font-semibold mb-2">Speed Overview</h2>
//           <SpeedChart vehicles={vehicles} />
//         </div>
//       </div>
//     </div>
//   );
// }



// import { useState } from "react";
// import { useRouter } from "next/router";

// export default function LoginPage() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const res = await fetch("http://localhost:5000/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });
//       const data = await res.json();

//       if (res.ok) {
//         localStorage.setItem("token", data.token);
//         router.push("/dashboard");
//       } else setError(data.message || "Login failed");
//     } catch {
//       setError("Server error");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
//         <h2 className="text-2xl font-bold mb-6 text-center">Fleet Tracker Login</h2>
//         {error && <p className="text-red-500 mb-4">{error}</p>}
//         <label>Email</label>
//         <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-2 mb-4 border rounded" required/>
//         <label>Password</label>
//         <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-2 mb-4 border rounded" required/>
//         <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Login</button>
//       </form>
//     </div>
//   );
// }
