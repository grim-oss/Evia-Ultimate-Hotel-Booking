import { useQuery } from '@tanstack/react-query';
import apiClient from '../api/client';
import { BuildingOfficeIcon, CalendarIcon, CreditCardIcon, UsersIcon } from '@heroicons/react/24/outline';

interface Stats {
  totalHotels: number;
  totalBookings: number;
  totalRevenue: number;
  totalUsers: number;
}

export default function Dashboard() {
  const { data: stats, isLoading } = useQuery<Stats>({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const res = await apiClient.get('/admin/stats');
      return res.data;
    },
  });

  const cards = [
    { name: 'Hotels', value: stats?.totalHotels ?? 0, icon: BuildingOfficeIcon, bg: 'bg-blue-500' },
    { name: 'Bookings', value: stats?.totalBookings ?? 0, icon: CalendarIcon, bg: 'bg-green-500' },
    { name: 'Revenue', value: `ETB ${stats?.totalRevenue?.toLocaleString() ?? 0}`, icon: CreditCardIcon, bg: 'bg-yellow-500' },
    { name: 'Users', value: stats?.totalUsers ?? 0, icon: UsersIcon, bg: 'bg-purple-500' },
  ];

  if (isLoading) return <div className="p-8">Loading dashboard...</div>;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div key={card.name} className="card flex items-center">
            <div className={`${card.bg} p-3 rounded-full text-white mr-4`}>
              <card.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-muted">{card.name}</p>
              <p className="text-2xl font-semibold">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent bookings table (simplified) */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Recent Bookings</h3>
        <div className="bg-white rounded shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Hotel</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Guest</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr><td colSpan={4} className="px-6 py-4 text-center text-muted">No recent bookings</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}