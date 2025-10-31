export default function StatCard({ title, value, color, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`${color} text-white p-6 rounded-lg shadow-lg cursor-pointer hover:opacity-90 transition`}
    >
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}

