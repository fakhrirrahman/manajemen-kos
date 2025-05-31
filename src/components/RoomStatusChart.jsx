import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

const COLORS = ["#10B981", "#3B82F6", "#F59E0B"];

export default function RoomStatusChart({ kosData }) {
  // Hitung total status kamar dari semua kos
  const roomStatusData = kosData.reduce((acc, kos) => {
    kos.rooms.forEach((room) => {
      if (!acc[room.status]) {
        acc[room.status] = 0;
      }
      acc[room.status]++;
    });
    return acc;
  }, {});

  const data = [
    { name: "Tersedia", value: roomStatusData.AVAILABLE || 0 },
    { name: "Terisi", value: roomStatusData.OCCUPIED || 0 },
    { name: "Perbaikan", value: roomStatusData.MAINTENANCE || 0 },
  ];

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
