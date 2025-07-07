import { useEffect, useState } from 'react';
import api from '../services/api';

export default function VehicleModal({ onClose, onRefresh, vehicle }) {
  const isEdit = !!vehicle;
  const [name, setName] = useState('');
  const [plate, setPlate] = useState('');
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (isEdit) {
      setName(vehicle.name);
      setPlate(vehicle.plate);
    }
  }, [vehicle]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    try {
      if (isEdit) {
        await api.put(`/vehicles/${vehicle.id}`, { name, plate });
      } else {
        await api.post('/vehicles', { name, plate });
      }
      onRefresh();
      onClose();
    } catch (err) {
      setErro('Erro ao salvar veículo. Verifique os dados.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
        >
          ×
        </button>

        <h2 className="text-xl font-bold mb-4 text-gray-800">
          {isEdit ? 'Editar Veículo' : 'Cadastrar Novo Veículo'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome do Veículo</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Placa</label>
            <input
              type="text"
              required
              value={plate}
              onChange={(e) => setPlate(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>

          {erro && <p className="text-red-500 text-sm">{erro}</p>}

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-md"
            >
              {isEdit ? 'Salvar Alterações' : 'Cadastrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}