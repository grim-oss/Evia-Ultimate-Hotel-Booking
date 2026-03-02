import { NavLink } from 'react-router-dom';
import {
  HomeIcon,
  BuildingOfficeIcon,
  KeyIcon,
  CalendarIcon,
  CreditCardIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', to: '/dashboard', icon: HomeIcon },
  { name: 'Hotels', to: '/hotels', icon: BuildingOfficeIcon },
  { name: 'Rooms', to: '/rooms', icon: KeyIcon },
  { name: 'Bookings', to: '/bookings', icon: CalendarIcon },
  { name: 'Payments', to: '/payments', icon: CreditCardIcon },
  { name: 'Users', to: '/users', icon: UsersIcon },
];

export default function Sidebar() {
  return (
    <aside className="admin-sidebar">
      <div className="text-xl font-bold text-primary mb-8 px-2">Evia Admin</div>
      <nav className="space-y-1">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center px-4 py-2 text-sm rounded-md transition-colors ${
                isActive
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}