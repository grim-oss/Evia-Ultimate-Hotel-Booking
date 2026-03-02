import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface Props {
  children: ReactNode;
}

export default function AdminLayout({ children }: Props) {
  return (
    <div className="admin-theme admin-layout">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="admin-main">
          {children}
        </main>
      </div>
    </div>
  );
}