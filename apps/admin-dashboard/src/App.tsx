import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import AdminLayout from './components/layout/AdminLayout';
import Dashboard from './pages/Dashboard';
import Hotels from './pages/Hotels';
import Rooms from './pages/Rooms';
import Bookings from './pages/Bookings';
import Payments from './pages/Payments';
import Users from './pages/Users';
import Login from './pages/Login'; // optional

// Lazy load if needed
// const Hotels = lazy(() => import('./pages/Hotels'));

function App() {
  // Simple auth check – replace with real logic
  const isAuthenticated = localStorage.getItem('adminToken');

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <BrowserRouter>
      <AdminLayout>
        <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/users" element={<Users />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Suspense>
      </AdminLayout>
    </BrowserRouter>
  );
}

export default App;