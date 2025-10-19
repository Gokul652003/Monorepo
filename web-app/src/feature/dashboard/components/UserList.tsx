import React from "react";

interface User {
  userId: string;
  email: string;
  role: string;
  permissions: string[];
  isBlocked: boolean;
}

interface UserListProps {
  users: User[];
  blockUser: (userId: string) => void;
  unblockUser: (userId: string) => void;
}

const UserList: React.FC<UserListProps> = ({ users, blockUser, unblockUser }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {users.map((user) => (
        <div
          key={user.userId}
          className="p-4 border rounded-xl shadow-md bg-white hover:shadow-lg transition-shadow flex flex-col justify-between"
        >
          <div>
            <p className="text-lg font-semibold text-gray-800">{user.email}</p>
            <p className="text-sm text-gray-500 capitalize mb-2">Role: {user.role}</p>

            <p className="text-sm font-medium text-gray-700">Permissions:</p>
            <ul className="list-disc list-inside text-sm text-gray-600 mb-3">
              {user.permissions.map((perm) => (
                <li key={perm}>{perm}</li>
              ))}
            </ul>
          </div>

          <button
            onClick={() =>
              user.isBlocked ? unblockUser(user.userId) : blockUser(user.userId)
            }
            className={`w-full py-2 rounded-lg font-medium transition ${
              user.isBlocked
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-red-500 text-white hover:bg-red-600"
            }`}
          >
            {user.isBlocked ? "Unblock" : "Block"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default UserList;
