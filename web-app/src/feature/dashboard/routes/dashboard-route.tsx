import { useAuth } from '@/lib/auth';
import { UserProfile } from '@/feature/dashboard/components/user-profile';
import { useBlockUser, useUnblockUser, useUsersList } from '@/feature/dashboard/api/users';
import { useProfile } from '@/feature/dashboard/api/get-me';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/query-key';
import { UserCard } from '../components/user-lists';

export const DashboardRoute = () => {
  const { logout, loading } = useAuth();
  const { data: userDetails, isLoading: loadingUserDetails } = useProfile();
  const queryClient = useQueryClient();
  const { mutate: blockUserMutate, isPending: isBlocking } = useBlockUser({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.usersList] });
    },
  });
  const { mutate: unBlockUserMutate, isPending: isUnblocking } = useUnblockUser({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.usersList] });
    },
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600 mb-4"></div>
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  const { data: usersList, isLoading: loadingUsersList } = useUsersList({
    enabled: userDetails?.role === 'admin',
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Welcome back{userDetails?.email ? `, ${userDetails.email}` : ''}!
            </p>
          </div>
          <button
            onClick={logout}
            className="px-5 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium transform hover:scale-105"
          >
            <span className="flex items-center gap-2">
              <span>→</span>
              Logout
            </span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loadingUserDetails ? (
          <div className="bg-white rounded-xl shadow-md p-8 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          </div>
        ) : (
          userDetails && (
            <div className="mb-8">
              <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4">
                  <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                    <span className="text-2xl">👤</span>
                    Your Profile
                  </h2>
                </div>
                <div className="p-6">
                  <UserProfile user={userDetails} />
                </div>
              </div>
            </div>
          )
        )}

        {userDetails?.role === 'admin' && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <span className="text-2xl">👥</span>
                Users Management
              </h2>
            </div>
            <div className="p-6">
              {loadingUsersList ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse flex gap-4">
                      <div className="rounded-full bg-gray-200 h-12 w-12"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : usersList && usersList.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {usersList.map((user) => {
                    const isProcessing = isBlocking || isUnblocking;
                    return (
                      <UserCard
                        user={user}
                        blockUser={blockUserMutate}
                        unBlockUser={unBlockUserMutate}
                        isProcessing={isProcessing}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📭</div>
                  <p className="text-gray-500 font-medium text-lg">No users found</p>
                  <p className="text-gray-400 text-sm mt-2">
                    Users will appear here when they register
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {userDetails && userDetails.role !== 'admin' && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 text-center">
            <div className="text-4xl mb-3">✨</div>
            <p className="text-gray-700 font-medium">You're all set!</p>
            <p className="text-gray-500 text-sm mt-1">
              Your profile information is displayed above
            </p>
          </div>
        )}
      </main>
    </div>
  );
};
