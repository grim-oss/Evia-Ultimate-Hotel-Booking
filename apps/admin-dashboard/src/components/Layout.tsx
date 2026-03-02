// apps/admin-dashboard/src/components/Layout.tsx
export default function AdminLayout({ children }) {
  return (
    <div className="admin-theme admin-layout">
      <aside className="admin-sidebar">
        {/* Sidebar content */}
      </aside>
      <main className="admin-main">
        {children}
      </main>
    </div>
  );
}