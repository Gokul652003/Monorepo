import React from 'react';
import type { UserDetails } from '@/feature/dashboard/type/user-details';

interface UserCardProps {
  user: UserDetails;
  initials: string;
  blockUser: (userId: string) => void;
  unBlockUser: (userId: string) => void;
  isProcessing: boolean;
}

export const UserCard: React.FC<UserCardProps> = ({
  user,
  initials,
  blockUser,
  unBlockUser,
  isProcessing,
}) => {
  return (
    <div
      key={user.userId}
      className="group relative bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"></div>
      </div>

      <div className="relative">
        <div className="relative px-6 pt-6 pb-4">
          <div className="flex items-start justify-between mb-4">
            <div className="relative">
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg transition-transform duration-300 group-hover:scale-110 ${
                  user.isBlocked
                    ? 'bg-gradient-to-br from-gray-400 to-gray-600'
                    : user.role === 'admin'
                      ? 'bg-gradient-to-br from-purple-500 to-indigo-600'
                      : 'bg-gradient-to-br from-blue-500 to-cyan-600'
                }`}
              >
                {initials}
              </div>
              {user.role === 'admin' && (
                <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center shadow-md border-2 border-white">
                  <span className="text-xs">👑</span>
                </div>
              )}
            </div>

            <div
              className={`relative px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm ${
                user.isBlocked ? 'bg-red-500 text-white' : 'bg-emerald-500 text-white'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  user.isBlocked ? 'bg-red-200 animate-pulse' : 'bg-emerald-200'
                }`}
              ></span>
              {user.isBlocked ? 'BLOCKED' : 'ACTIVE'}
            </div>
          </div>

          <div className="mb-2">
            <h3
              className="text-lg font-bold text-gray-900 truncate mb-1 group-hover:text-blue-600 transition-colors"
              title={user.email}
            >
              {user.email.split('@')[0]}
            </h3>
            <p className="text-xs text-gray-400 truncate" title={user.email}>
              {user.email}
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-700 capitalize">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
            {user.role}
          </div>
        </div>

        <div className="px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
        </div>

        <div className="px-6 py-4">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-3 border border-gray-200">
            <div className="flex items-center gap-2 mb-1">
              <svg
                className="w-3.5 h-3.5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                User ID
              </span>
            </div>
            <p className="text-xs font-mono text-gray-700 truncate pl-5" title={user.userId}>
              {user.userId}
            </p>
          </div>
        </div>

        <div className="px-6 pb-6">
          <button
            onClick={() => (user.isBlocked ? unBlockUser(user.userId) : blockUser(user.userId))}
            disabled={isProcessing}
            className={`w-full relative overflow-hidden rounded-xl py-3 px-4 font-semibold text-sm transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:transform-none ${
              user.isBlocked
                ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:from-emerald-600 hover:to-green-700'
                : 'bg-gradient-to-r from-red-500 to-rose-600 text-white hover:from-red-600 hover:to-rose-700'
            }`}
          >
            <span className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity duration-300"></span>

            {isProcessing ? (
              <span className="relative flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </span>
            ) : (
              <span className="relative flex items-center justify-center gap-2">
                {user.isBlocked ? (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Unblock User
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                      />
                    </svg>
                    Block User
                  </>
                )}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-200 transition-colors duration-500 pointer-events-none"></div>
    </div>
  );
};
