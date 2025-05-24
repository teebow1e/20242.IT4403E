import { useEffect, useState } from "react";

function ManageUsersScreen() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    role: ""
  });

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:4000/list-users");
      // console.log("Response:", response);
      setLoading(false);
      const data = await response.json();
      console.log("Data:", data);
      if (data.success) {
        setUsers(data.message);
      } else {
        console.error("Error:", response.message);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching users:", error);
    }
  };

  const handleRowClick = (user) => {
    setSelectedUser(user);
    setFormData({
      displayName: user.displayName,
      email: user.email,
      role: user.role,
    });
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch ("http://localhost:4000/update-user", {
        method: "POST",
        displayName: formData.displayName,
        email: formData.email,
        password: selectedUser.password || "defaultPassword", // nếu không đổi pass thì cần pass hợp lệ
        role: formData.role,
      });

      if (response.success) {
        setShowModal(false);
        fetchUsers(); // reload list
      } else {
        alert("Failed to update user: " + response.message);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };


  // Fetch users from the database
  useEffect(() => {
    if (users.length === 0) {
      setLoading(true);
    }
    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">List of Users</h1>

      {loading ? (
        <div className="text-center text-lg text-gray-600">Loading users...</div>
      ) : users.length === 0 ? (
        <div className="text-center text-lg text-red-500">
          No users found. Something went wrong!
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white border border-gray-300 rounded-lg shadow-sm">
            <thead className="bg-gray-100">
              <tr className="text-gray-700 text-md">
                <th className="py-3 px-6 text-center">ID</th>
                <th className="py-3 px-6 text-center">Display Name</th>
                <th className="py-3 px-6 text-center">Email</th>
                <th className="py-3 px-6 text-center">Role</th>
                <th className="py-3 px-6 text-center">Creation Time</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr
                  key={user.uid}
                  className={`${
                    idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                  } hover:bg-gray-100 transition-colors duration-200 cursor-pointer`}
                  onClick={() => handleRowClick(user)}
                >
                  <td className="py-3 px-6 text-center text-sm text-gray-800">{user.uid}</td>
                  <td className="py-3 px-6 text-center text-sm text-gray-800">{user.displayName}</td>
                  <td className="py-3 px-6 text-center text-sm text-gray-800">{user.email}</td>
                  <td className="py-3 px-6 text-center text-sm text-gray-800">{user.role}</td>
                  <td className="py-3 px-6 text-center text-sm text-gray-800">{user.creationTime}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* modal on click */}
          {showModal && (
            <div className="fixed inset-0 overflow-y-auto flex items-center justify-center">
              <div className="modal-overlay fixed inset-0 bg-black opacity-80 "></div>
              <div className="modal-content relative bg-white w-96 pl-6 pb-6 pr-8 rounded-lg shadow-lg">
                <span
                  className="close cursor-pointer relative text-3xl top-[1px] left-full text-red-500"
                  onClick={handleCloseModal}
                >
                  &times;
                </span>
                <h3 className="text-xl relative inset-0 text-black font-bold font-semibold mb-4">
                  User Details
                </h3>
                {selectedUser && (
                  <div className="relative">
                    <p className="mb-2">
                      <span className="font-bold">Displayname:</span>{' '}
                      {selectedUser.username}
                    </p>
                    <p className="mb-2">
                      <span className="font-bold">Email:</span> {selectedUser.email}
                    </p>
                    <p className="mb-2">
                      <span className="font-bold">Phone:</span> {selectedUser.phone}
                    </p>
                    <button
                      className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-600"
                      onClick={handleGenerateReport}
                    >
                      Generate Report
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ManageUsersScreen;