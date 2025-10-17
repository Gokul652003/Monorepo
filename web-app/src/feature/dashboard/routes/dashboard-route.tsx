import { useAuth } from "@/lib/auth";

export const DashboardRoute = () => {

  const { logout, loading } = useAuth()
  
  if (loading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="h-screen bg-red-100 p-4 flex justify-between">
      <h1>Dashboard</h1>
      <div>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};
