import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../api/client';
import toast from 'react-hot-toast';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface HotelFormData {
  name: string;
  location: string;
}

interface Props {
  hotel?: { id: string; name: string; location: string } | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function HotelForm({ hotel, onClose, onSuccess }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<HotelFormData>({
    defaultValues: hotel || { name: '', location: '' },
  });
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: HotelFormData) =>
      hotel
        ? apiClient.put(`/admin/hotels/${hotel.id}`, data)
        : apiClient.post('/admin/hotels', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hotels'] });
      toast.success(hotel ? 'Hotel updated' : 'Hotel created');
      onSuccess();
    },
    onError: () => toast.error('Operation failed'),
  });

  const onSubmit = (data: HotelFormData) => mutation.mutate(data);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">{hotel ? 'Edit Hotel' : 'New Hotel'}</h3>
          <button onClick={onClose}><XMarkIcon className="w-5 h-5" /></button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              {...register('name', { required: 'Name is required' })}
              className="input-field"
            />
            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <input
              {...register('location', { required: 'Location is required' })}
              className="input-field"
            />
            {errors.location && <p className="text-red-600 text-sm mt-1">{errors.location.message}</p>}
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={onClose} className="btn-outline">Cancel</button>
            <button type="submit" className="btn-primary" disabled={mutation.isPending}>
              {mutation.isPending ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}