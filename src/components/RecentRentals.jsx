export default function RecentRentals({ rentals }) {
  return (
    <div className="space-y-4">
      {rentals.map((rental) => (
        <div
          key={rental.id}
          className="border-b pb-3 last:border-b-0 last:pb-0"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium text-gray-800">{rental.userName}</p>
              <p className="text-sm text-gray-600">
                Kamar {rental.roomNumber} - {rental.kosName}
              </p>
            </div>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
              Aktif
            </span>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Mulai: {rental.startDate}</span>
            <span>Selesai: {rental.endDate}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
