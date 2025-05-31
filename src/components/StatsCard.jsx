export default function StatsCard({ title, value, icon, color }) {
  return (
    <div className={`${color} p-4 rounded-lg shadow`}>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
        <span className="text-3xl">{icon}</span>
      </div>
    </div>
  );
}
