// Map.jsx
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function Map({ vehicles }) {
  return (
    <MapContainer center={[0, 0]} zoom={2} style={{ height: "400px" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {vehicles.map((v) => {
        // Only render marker if lat/lng are valid numbers
        if (typeof v.lat === "number" && typeof v.lng === "number") {
          return (
            <Marker key={v._id} position={[v.lat, v.lng]}>
              <Popup>
                {v.name} <br />
                Status: {v.status}
              </Popup>
            </Marker>
          );
        }
        return null; // skip invalid coordinates
      })}
    </MapContainer>
  );
}

// import { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// import L from "leaflet";

// // Fix default icon issue in Next.js / React
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: "/marker-icon-2x.png",
//   iconUrl: "/marker-icon.png",
//   shadowUrl: "/marker-shadow.png",
// });

// function ResizeMap() {
//   const map = useMap();
//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       map.invalidateSize();
//     }, 500);
//     return () => clearTimeout(timeout);
//   }, [map]);
//   return null;
// }

// export default function Map({ vehicles = [] }) {
//   return (
//     <MapContainer
//       center={[40.7128, -74.0060]}
//       zoom={10}
//       style={{ width: "100%", height: "400px" }}
//     >
//       <ResizeMap />
//       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//       {vehicles.map((v) => (
//         <Marker key={v._id} position={[v.lat, v.lng]}>
//           <Popup>
//             {v.name} <br /> {v.status} <br /> Speed: {v.speed} km/h
//           </Popup>
//         </Marker>
//       ))}
//     </MapContainer>
//   );
// }
