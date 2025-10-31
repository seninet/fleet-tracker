// components/SpeedChart.jsx
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function SpeedChart({ vehicles }) {
  const data = {
    labels: vehicles.map((v) => v.name),
    datasets: [
      {
        label: "Speed (km/h)",
        data: vehicles.map((v) => v.speed),
        backgroundColor: "rgba(59, 130, 246, 0.7)"
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: { legend: { display: false } }
  };

  return <div className="bg-white p-4 rounded shadow"><Bar data={data} options={options} /></div>;
}



// import { useEffect, useState } from "react";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// export default function SpeedChart({ vehicles = [] }) {
//   const [chartData, setChartData] = useState({ labels: [], datasets: [] });

//   // Update chart whenever vehicles prop changes
//   useEffect(() => {
//     if (!vehicles.length) return;

//     const labels = vehicles.map(v => v.name);
//     const speeds = vehicles.map(v => v.speed);

//     setChartData({
//       labels,
//       datasets: [
//         {
//           label: "Speed (km/h)",
//           data: speeds,
//           backgroundColor: "rgba(59, 130, 246, 0.5)",
//           borderColor: "rgba(59, 130, 246, 1)",
//           borderWidth: 2,
//           tension: 0.4
//         }
//       ]
//     });
//   }, [vehicles]);

//   return (
//     <div className="bg-white p-4 rounded-lg shadow">
//       <h2 className="text-xl font-bold mb-2">Speed Chart</h2>
//       {vehicles.length ? (
//         <Line
//           data={chartData}
//           options={{
//             responsive: true,
//             animation: {
//               duration: 500,
//               easing: "linear"
//             },
//             scales: {
//               y: { beginAtZero: true }
//             }
//           }}
//         />
//       ) : (
//         <p>No vehicle data yet</p>
//       )}
//     </div>
//   );
// }

