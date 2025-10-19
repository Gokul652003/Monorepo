import { useAuth } from '@/lib/auth';
import UserDetails from '../components/UserDetails';
import UserList from '../components/UserList';

export const DashboardRoute = () => {
  const { logout, loading } = useAuth();

  if (loading) return <div className="text-center mt-10">Loading ...</div>;

  const dummyUser = {
    userId: '12345',
    email: 'john.doe@example.com',
    role: 'admin',
    permissions: ['create'],
    isBlocked: undefined,
  };

  const dummyUsers = [
    {
      userId: '1',
      email: 'admin@example.com',
      role: 'admin',
      permissions: ['create', 'read', 'update'],
      isBlocked: false,
    },
    {
      userId: '2',
      email: 'owner@example.com',
      role: 'owner',
      permissions: ['read', 'update'],
      isBlocked: true,
    },
    {
      userId: '3',
      email: 'user@example.com',
      role: 'user',
      permissions: ['read'],
      isBlocked: false,
    },
  ];

  const blockUser = (userId: string) => {
    console.log(`User ${userId} blocked`);
  };

  const unblockUser = (userId: string) => {
    console.log(`User ${userId} unblocked`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col gap-6">
      {/* Header */}
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </header>

      {/* Current user details */}
      <div className="max-w-md mx-auto">
        <UserDetails user={dummyUser} />
      </div>

      {/* Users list (only for admin) */}
      {dummyUser.role === 'admin' && (
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Users Management
          </h2>
          <UserList
            users={dummyUsers}
            blockUser={blockUser}
            unblockUser={unblockUser}
          />
        </section>
      )}
    </div>
  );
};
