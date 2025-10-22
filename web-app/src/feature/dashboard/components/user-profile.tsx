import React from 'react';
import type { UserDetails } from '@/feature/dashboard/type/user-details';

export const UserProfile: React.FC<{ user: UserDetails }> = ({ user }) => {
  const initials = user.email.split('@')[0].slice(0, 2).toUpperCase();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <div className="relative h-48 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
          </div>

          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>

          <div className="absolute top-6 right-6 z-10">
            {user.isBlocked ? (
              <div className="backdrop-blur-md bg-white/20 border border-white/30 rounded-2xl px-4 py-2 shadow-lg">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                  <span className="text-white font-bold text-sm">Account Blocked</span>
                </div>
              </div>
            ) : (
              user.role !== 'admin' && (
                <div className="backdrop-blur-md bg-white/20 border border-white/30 rounded-2xl px-4 py-2 shadow-lg">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
                    </span>
                    <span className="text-white font-bold text-sm">Active</span>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        <div className="relative px-8 pb-8">
          <div className="flex flex-col items-center -mt-20 mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-3xl blur-lg opacity-50"></div>
              <div
                className={`relative w-32 h-32 rounded-3xl flex items-center justify-center text-white text-4xl font-bold shadow-2xl border-4 border-white ${
                  user.isBlocked
                    ? 'bg-gradient-to-br from-gray-500 to-gray-700'
                    : user.role === 'admin'
                      ? 'bg-gradient-to-br from-purple-500 to-indigo-600'
                      : 'bg-gradient-to-br from-blue-500 to-cyan-600'
                }`}
              >
                {initials}
              </div>

              {user.role === 'admin' && (
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl px-4 py-1.5 shadow-lg border-2 border-white">
                    <div className="flex items-center gap-1.5">
                      <span className="text-base">👑</span>
                      <span className="text-xs font-bold text-white uppercase tracking-wider">
                        Admin
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-1">{user.email}</h2>
            <p className="text-sm text-gray-500 capitalize px-4 py-1 bg-gray-100 rounded-lg font-medium">
              {user.role} Account
            </p>
          </div>

          <div className="space-y-4">
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 p-5 transition-all duration-300 hover:shadow-lg">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full filter blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
                    <svg
                      className="w-6 h-6 text-white"
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
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                      User ID
                    </h3>
                    <div className="h-px flex-1 bg-gradient-to-r from-blue-200 to-transparent"></div>
                  </div>
                  <p className="font-mono text-sm text-gray-700 break-all bg-white/50 rounded-lg px-3 py-2 border border-blue-100">
                    {user.userId}
                  </p>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 p-5 transition-all duration-300 hover:shadow-lg">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-200 rounded-full filter blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-md">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xs font-bold text-purple-900 uppercase tracking-wider">
                      Email Address
                    </h3>
                    <div className="h-px flex-1 bg-gradient-to-r from-purple-200 to-transparent"></div>
                  </div>
                  <p className="text-sm text-gray-700 break-all bg-white/50 rounded-lg px-3 py-2 border border-purple-100">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 p-5 transition-all duration-300 hover:shadow-lg">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200 rounded-full filter blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md text-xl">
                    {user.role === 'admin' ? '👑' : '👤'}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                      Account Role
                    </h3>
                    <div className="h-px flex-1 bg-gradient-to-r from-emerald-200 to-transparent"></div>
                  </div>
                  <p className="text-sm font-semibold text-gray-700 capitalize bg-white/50 rounded-lg px-3 py-2 border border-emerald-100 inline-block">
                    {user.role}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {user.isBlocked && (
            <div className="mt-6 relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-200 p-6">
              <div className="absolute top-0 right-0 w-40 h-40 bg-red-200 rounded-full filter blur-3xl opacity-20"></div>
              <div className="relative flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-lg">
                    <svg
                      className="w-7 h-7 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-red-900 mb-2 flex items-center gap-2">
                    Account Suspended
                    <span className="inline-flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                  </h3>
                  <p className="text-sm text-red-700 leading-relaxed">
                    This account has been blocked by an administrator. Access to all services is
                    currently restricted. Please contact support for more information.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

