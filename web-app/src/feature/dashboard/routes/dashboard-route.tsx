import { useAuth } from '@/lib/auth';
import UserList from '../components/UserList';
import UserProfile from '../components/UserProfile';
import { useProfile } from '../hooks/useProfile';
import { useUsersList } from '../hooks/useUsers';

export const DashboardRoute = () => {
  const { logout, loading } = useAuth();
  const { data: userDetails, isLoading: loadingUserDetails } = useProfile();

  if (loading) return <div className="text-center mt-10">Loading ...</div>;

  const { data: usersList, isLoading: loadingUsersList } = useUsersList({
    enabled: userDetails?.role === 'admin',
  });

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
      {loadingUserDetails && <div className="text-center mt-10">Loading User Details...</div>}
      {/* Current user details */}
      {userDetails && (
        <div className="max-w-md mx-auto">
          <UserProfile user={userDetails} />
        </div>
      )}

      {/* Users list (only for admin) */}
      {userDetails?.role === 'admin' &&
        (loadingUsersList ? (
          <div>Loading Users List</div>
        ) : (
          usersList &&
          (usersList.length > 0 ? (
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Users Management</h2>
              <UserList users={usersList}/>
            </section>
          ) : (
            <div>No users</div>
          ))
        ))}
    </div>
  );
};
