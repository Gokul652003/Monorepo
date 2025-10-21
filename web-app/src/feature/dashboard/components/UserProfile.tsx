import React from 'react';
import type { UserDetails } from '../type/user-details';

const UserProfile: React.FC<{ user: UserDetails }> = ({ user }) => {
  return (
    <div className="p-6 border rounded-xl shadow-md bg-white">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">User Details</h2>
      <div className="space-y-2">
        <p><strong>User ID:</strong> {user.userId}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        {/* <p><strong>Permissions:</strong> {user.permissions}</p> */}
        {user.isBlocked && (
          <p className="text-red-600 font-semibold mt-2">
            Account locked by admin
          </p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
