import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold cursor-pointer" onClick={() => router.push("/")}>
        Fleet Tracker
      </h1>
      <div className="flex gap-4">
        <button onClick={() => router.push("/")} className="hover:underline">
          Dashboard
        </button>
        <button onClick={() => router.push("/vehicles")} className="hover:underline">
          Vehicles
        </button>
        <button onClick={() => router.push("/drivers")} className="hover:underline">
          Drivers
        </button>
      </div>
    </nav>
  );
}
