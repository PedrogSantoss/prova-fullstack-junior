import { useEffect, useState } from 'react';
import api from '../services/api';
import VehicleModal from '../components/VehicleModal';
import VehicleTable from '../components/VehicleTable';

export default function Dashboard() {
  const [vehicles, setVehicles] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editVehicle, setEditVehicle] = useState(null);

  const fetchVehicles = async () => {
    try {
      const res = await api.get('/vehicles');
      setVehicles(res.data);
    } catch (err) {
      console.error('Erro ao buscar veículos:', err);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const total = vehicles.length;
  const ativos = vehicles.filter(v => v.status === 'ativo').length;
  const inativos = vehicles.filter(v => v.status === 'inativo').length;

  const openModal = (vehicle = null) => {
    setEditVehicle(vehicle);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <button
          onClick={() => openModal()}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md font-semibold"
        >
          + Novo Veículo
        </button>
      </div>

      {/* Cards de resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card title="Total de Veículos" value={total} />
        <Card title="Ativos" value={ativos} />
        <Card title="Inativos" value={inativos} />
      </div>

      {/* Tabela de veículos */}
      <VehicleTable
        vehicles={vehicles}
        onRefresh={fetchVehicles}
        onEdit={openModal}
      />

      {/* Modal de cadastro/edição */}
      {modalOpen && (
        <VehicleModal
          onClose={() => setModalOpen(false)}
          onRefresh={fetchVehicles}
          vehicle={editVehicle}
        />
      )}
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white shadow rounded-xl p-4 text-center">
      <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
      <p className="text-3xl font-bold text-orange-600">{value}</p>
    </div>
  );
}