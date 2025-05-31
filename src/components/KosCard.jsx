export default function KosCard({ kos, onEdit, onDelete }) {
  const roomStatusCount = {
    AVAILABLE: kos.rooms.filter((room) => room.status === "AVAILABLE").length,
    OCCUPIED: kos.rooms.filter((room) => room.status === "OCCUPIED").length,
    MAINTENANCE: kos.rooms.filter((room) => room.status === "MAINTENANCE")
      .length,
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold text-gray-800">{kos.name}</h3>
            <p className="text-sm text-gray-600">{kos.address}</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={onEdit}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
            >
              Edit
            </button>
            <button
              onClick={onDelete}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
            >
              Hapus
            </button>
          </div>
        </div>

        {kos.description && (
          <p className="mt-2 text-gray-700 text-sm">{kos.description}</p>
        )}

        <div className="mt-4">
          <h4 className="font-medium text-gray-800 mb-2">Status Kamar:</h4>
          <div className="flex space-x-4 text-sm">
            <span className="flex items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-1"></span>
              Tersedia: {roomStatusCount.AVAILABLE}
            </span>
            <span className="flex items-center">
              <span className="w-3 h-3 bg-blue-500 rounded-full mr-1"></span>
              Terisi: {roomStatusCount.OCCUPIED}
            </span>
            <span className="flex items-center">
              <span className="w-3 h-3 bg-yellow-500 rounded-full mr-1"></span>
              Perbaikan: {roomStatusCount.MAINTENANCE}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
