export default function AdminPage() {
  return (
    <main className="container grid">
      <h1>Admin Panel</h1>
      <div className="card">
        <h3>System Usage</h3>
        <p>Total users, active users, and logs available from /api/admin/stats.</p>
      </div>
      <div className="card">
        <h3>User Management</h3>
        <p>Admin can block/edit users in users table (role = ADMIN).</p>
      </div>
    </main>
  );
}
