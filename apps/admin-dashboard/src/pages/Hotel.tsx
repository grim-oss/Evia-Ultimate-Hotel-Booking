import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../api/client';
import toast from 'react-hot-toast';
import HotelForm from '../components/HotelForm';
import DataTable from '../components/DataTable';

interface Hotel {
  id: string;
  name: string;
  location: string;
  createdAt: string;
}

export default function Hotels() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingHotel, setEditingHotel] = useState<Hotel | null>(null);
  const queryClient = useQueryClient();

  const { data: hotels, isLoading } = useQuery<Hotel[]>({
    queryKey: ['hotels'],
    queryFn: async () => {
      const res = await apiClient.get('/admin/hotels');
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiClient.delete(`/admin/hotels/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hotels'] });
      toast.success('Hotel deleted');
    },
    onError: () => toast.error('Failed to delete'),
  });

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Location', accessor: 'location' },
    {
      header: 'Created',
      accessor: (row: Hotel) => new Date(row.createdAt).toLocaleDateString(),
    },
    {
      header: 'Actions',
      accessor: (row: Hotel) => (
        <div className="flex space-x-2">
          <button
            onClick={() => { setEditingHotel(row); setIsFormOpen(true); }}
            className="text-blue-600 hover:text-blue-800"
          >
            Edit
          </button>
          <button
            onClick={() => deleteMutation.mutate(row.id)}
            className="text-red-600 hover:text-red-800"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Hotels</h2>
        <button
          onClick={() => { setEditingHotel(null); setIsFormOpen(true); }}
          className="btn-primary"
        >
          Add Hotel
        </button>
      </div>

      {isFormOpen && (
        <HotelForm
          hotel={editingHotel}
          onClose={() => setIsFormOpen(false)}
          onSuccess={() => {
            queryClient.invalidateQueries({ queryKey: ['hotels'] });
            setIsFormOpen(false);
          }}
        />
      )}

      <DataTable
        columns={columns}
        data={hotels || []}
        isLoading={isLoading}
      />
    </div>
  );
}