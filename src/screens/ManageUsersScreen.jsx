import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const API_URL = "https://firebase-admin-coffee.trungtqt.com"

function ManageUsersScreen() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    role: ""
  });

  // Get current user's role from Redux store
  const currentUser = useSelector(state => state.user.user);

  // Define available roles
  const roleOptions = ["customer", "waiter", "admin"];

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/list-users`, {
        headers: {
          "Authorization": `Bearer ${currentUser.token}`
        }
      });
      const data = await res.json();
      if (data.success) {
        setUsers(data.message);
      } else {
        setError("Failed to load users: " + data.message);
      }
    } catch (err) {
      setError("Error fetching users: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const canModifyUser = (targetUserRole) => {
    return currentUser.role === 'admin';
  };

  const handleEdit = (user) => {
    if (!canModifyUser(user.role)) {
      setError("You don't have permission to edit this user");
      return;
    }
    setSelectedUser(user);
    setFormData({
      displayName: user.displayName,
      email: user.email,
      role: user.role,
    });
    setShowModal(true);
  };

  const handleDelete = async (user) => {
    if (!canModifyUser(user.role)) {
      setError("You don't have permission to delete this user");
      return;
    }

    if (!window.confirm(`Delete user ${user.displayName}? This cannot be undone.`)) return;

    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/delete-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${currentUser.token}`
        },
        body: JSON.stringify({ uid: user.uid }),
      });
      const data = await res.json();
      if (data.success) {
        fetchUsers();
      } else {
        setError(data.message || "Failed to delete user");
      }
    } catch (err) {
      setError("Error deleting user: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
    setError(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!selectedUser) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/update-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${currentUser.token}`
        },
        body: JSON.stringify({
          uid: selectedUser.uid,
          ...formData
        }),
      });

      const data = await res.json();
      console.log("Update response:", data);
      if (data.success) {
        handleCloseModal();
        fetchUsers();
      } else {
        setError(data.message || "Failed to update user");
      }
    } catch (err) {
      setError("Error updating user: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Manage Users</h1>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg flex justify-between items-center">
          <span>{error}</span>
          <button
            onClick={() => setError(null)}
            className="text-red-700 hover:text-red-900"
          >
            ×
          </button>
        </div>
      )}

      {loading ? (
        <div className="text-center text-lg text-gray-600">Loading users...</div>
      ) : users.length === 0 ? (
        <div className="text-center text-lg text-red-500">No users found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white border border-gray-300 rounded-lg shadow-sm">
            <thead className="bg-gray-100">
              <tr className="text-gray-700 text-md">
                <th className="py-3 px-6 text-center">ID</th>
                <th className="py-3 px-6 text-center">Display Name</th>
                <th className="py-3 px-6 text-center">Email</th>
                <th className="py-3 px-6 text-center">Role</th>
                <th className="py-3 px-6 text-center">Created</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr
                  key={user.uid}
                  className={`${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition-colors duration-200`}
                >
                  <td className="py-3 px-6 text-center text-sm text-gray-800">{user.uid}</td>
                  <td className="py-3 px-6 text-center text-sm text-gray-800">{user.displayName}</td>
                  <td className="py-3 px-6 text-center text-sm text-gray-800">{user.email}</td>
                  <td className="py-3 px-6 text-center text-sm text-gray-800">{user.role}</td>
                  <td className="py-3 px-6 text-center text-sm text-gray-800">
                    {new Date(user.creationTime).toLocaleString()}
                  </td>
                  <td className="py-3 px-6 text-center">
                    {canModifyUser(user.role) && (
                      <div className="inline-flex gap-2">
                        <button
                          className="px-3 py-1 text-sm rounded-lg bg-green-500 text-white hover:bg-green-600 disabled:opacity-50"
                          onClick={() => handleEdit(user)}
                          disabled={isSubmitting}
                        >
                          Edit
                        </button>

                        <button
                          className="px-3 py-1 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600 disabled:opacity-50"
                          onClick={() => handleDelete(user)}
                          disabled={isSubmitting}
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 overflow-y-auto flex items-center justify-center">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="relative bg-white w-96 p-6 rounded-lg shadow-lg z-10">
            <h3 className="text-xl font-semibold mb-4">Edit User</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Display Name</label>
                <input
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                >
                  {roleOptions.map(role => (
                    <option key={role} value={role}>
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button
                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
                onClick={handleCloseModal}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
                onClick={handleSave}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageUsersScreen;
