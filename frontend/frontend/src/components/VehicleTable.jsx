import api from '../services/api';

export default function VehicleTable({ vehicles, onRefresh, onEdit }) {
  const handleArchiveToggle = async (vehicle) => {
    const route = vehicle.status === 'ativo'
      ? `/vehicles/${vehicle.id}/archive`
      : `/vehicles/${vehicle.id}/unarchive`;

    try {
      await api.patch(route);
      onRefresh();
    } catch (err) {
      console.error('Erro ao alterar status:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Tem certeza que deseja excluir este veículo?')) return;
    try {
      await api.delete(`/vehicles/${id}`);
      onRefresh();
    } catch (err) {
      console.error('Erro ao deletar veículo:', err);
    }
  };

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-xl p-4">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase">
            <th className="p-2">Nome</th>
            <th className="p-2">Placa</th>
            <th className="p-2">Status</th>
            <th className="p-2 text-right">Ações</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map(vehicle => (
            <tr key={vehicle.id} className="border-b text-sm text-gray-700">
              <td className="p-2">{vehicle.name}</td>
              <td className="p-2">{vehicle.plate}</td>
              <td className="p-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  vehicle.status === 'ativo'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {vehicle.status}
                </span>
              </td>
              <td className="p-2 text-right space-x-2">
                <button
                  onClick={() => onEdit(vehicle)}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleArchiveToggle(vehicle)}
                  className="text-yellow-600 hover:underline text-sm"
                >
                  {vehicle.status === 'ativo' ? 'Arquivar' : 'Ativar'}
                </button>
                <button
                  onClick={() => handleDelete(vehicle.id)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {vehicles.length === 0 && (
        <p className="text-center text-gray-500 py-4">Nenhum veículo encontrado.</p>
      )}
    </div>
  );
}