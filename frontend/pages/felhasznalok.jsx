import { Faders, IdentificationCard, User, UserCheck, UserCircle, UserPlus, UserSquare } from "@phosphor-icons/react/dist/ssr";
import React, { useState, useEffect } from "react";

const roles = ["Diák", "Tanár", "Admin", "Portás", "Igazgató"];

const generateClasses = () => {
  const classes = [];
  for (let i = 9; i <= 13; i++) {
    for (let letter of ["A", "B", "C", "D"]) {
      classes.push(`${i}${letter}`);
    }
  }
  return classes;
};

const classOptions = generateClasses();

const UserManagementPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", group: "", role: "", hasCard: false });
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [deletedUsers, setDeletedUsers] = useState([]); // Törölt felhasználók listája

  // Eltároljuk a felhasználókat a localStorage-ba
  const loadUsers = () => {
    const usersFromStorage = JSON.parse(localStorage.getItem("users"));
    const deletedFromStorage = JSON.parse(localStorage.getItem("deletedUsers"));
    if (usersFromStorage) {
      setFilteredUsers(usersFromStorage);
    }
    if (deletedFromStorage) {
      setDeletedUsers(deletedFromStorage);
    }
  };

  // Mentsük el a változtatásokat localStorage-ba
  const saveUsers = (updatedUsers) => {
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setFilteredUsers(updatedUsers);
  };

  useEffect(() => {
    loadUsers(); // Az oldal betöltésekor beolvassuk az adatokat
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreateUser = () => {
    if (newUser.name && newUser.role) {
      const updatedUsers = [
        ...filteredUsers,
        { id: Date.now(), ...newUser },
      ];
      saveUsers(updatedUsers.filter((user) => !deletedUsers.includes(user.id))); // Ne jelenjenek meg a törölt felhasználók
      setShowModal(false);
      setNewUser({ name: "", group: "", role: "", hasCard: false }); // Visszaállítja a formot
    } else {
      alert("Minden mezőt ki kell tölteni!");
    }
  };

  const handleFilter = () => {
    const filtered = filteredUsers.filter((user) => {
      const searchLower = search.toLowerCase();
      return (
        user.name.toLowerCase().includes(searchLower) ||
        user.group.toLowerCase().includes(searchLower) ||
        user.role.toLowerCase().includes(searchLower)
      );
    });
    setFilteredUsers(filtered);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleFilter();
    }
  };

  const handleRoleChange = (e) => {
    const { value } = e.target;
    setNewUser((prevState) => ({
      ...prevState,
      role: value,
      group: value === "Diák" ? newUser.group : "", // Ha Diák, akkor csoport választható, egyébként üres
    }));
  };

  const handleDeleteUser = (id) => {
    const confirmDelete = window.confirm("Biztosan törölni szeretnéd ezt a felhasználót?");
    if (confirmDelete) {
      const updatedUsers = filteredUsers.filter((user) => user.id !== id);
      setDeletedUsers((prevDeleted) => {
        const updatedDeleted = [...prevDeleted, id];
        localStorage.setItem("deletedUsers", JSON.stringify(updatedDeleted)); // Törölt felhasználók tárolása
        return updatedDeleted;
      });
      saveUsers(updatedUsers);
    }
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <nav className="bg-blue-500 m-10 p-5 rounded-4xl flex flex-col md:flex-row gap-y-10 items-center justify-between text-white text-xl font-medium italic">
        <div className="flex items-center">
          <img src="/logo.png" className="w-16 mr-2.5" />
          <a href="/" className="text-white">Sign-ey</a>
        </div>

        <a href="/" className="text-white">Kezdőlap</a>
        <a href="/naplo" className="hover:text-white/60 transition duration-150">Napló</a>
        <a href="/statisztika" className="hover:text-white/60 transition duration-150">Statisztika</a>
        <a href="/felhasznalok" className="hover:text-white/60 transition duration-150">Felhasználók</a>
        <UserSquare size={60} className="text-white" weight="bold" />
      </nav>

      <div className="max-w-5xl mx-auto mt-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
          <div className="flex w-full md:w-auto items-center gap-2">
            <input
              placeholder="Keresés név, csoport, szerepkör..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-64 border border-blue-600 p-2 rounded-lg"
            />
            
            <button
              onClick={handleFilter}
              className="gap-2 flex px-4 py-2 bg-blue-700 text-white rounded-2xl items-center"
            >
              Szűrés
              <Faders size={28} className="text-white" weight="bold" />
            </button>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="gap-2 flex px-4 py-2 bg-blue-700 text-white rounded-2xl items-center"
          >
            Új felhasználó létrehozása
            <UserPlus size={28} className="text-white" weight="bold" />
          </button>
        </div>

        <div>
          <div className="p-0">
            <div className="overflow-x-auto">
              <div className="overflow-y-auto max-h-96 border border-gray-300 rounded-lg">
                <table className="min-w-full table-auto">
                  <thead className="bg-blue-600 text-white">
                    <tr>
                      <th className="text-left px-4 py-2"> </th>
                      <th className="text-left px-4 py-2">Név</th>
                      <th className="text-left px-4 py-2">Csoport</th>
                      <th className="text-left px-4 py-2">Szerepkör</th>
                      <th className="text-left px-4 py-2">Kártya</th>
                      <th className="text-left px-4 py-2">Törlés</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="border-t hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3">
                          <UserCircle size={32} className="text-gray-800" weight="bold" />
                        </td>
                        <td className="px-4 py-3 text-gray-800">{user.name}</td>
                        <td className="px-4 py-3 text-gray-800">{user.group}</td>
                        <td className="px-4 py-3 text-gray-800">{user.role}</td>
                        <td className="px-4 py-3 text-gray-800">
                          {user.hasCard ? (
                            <span className="text-green-500">✔️</span>
                          ) : (
                            <span className="text-red-500">❌</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-red-600"
                          >
                            Törlés
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal a felhasználó létrehozásához */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-gray-200 rounded-2xl p-6 w-80 shadow-lg">
            <div className="bg-blue-600 text-white text-center py-2 rounded-t-2xl mb-4">
              Felhasználó létrehozása
            </div>

            <div className="mb-4">
              <label className="block bg-blue-600 text-white px-2 py-1">Név:</label>
              <input
                type="text"
                name="name"
                value={newUser.name}
                onChange={handleInputChange}
                className="w-full bg-gray-800 text-white p-2"
                placeholder="Név..."
              />
            </div>

            <div className="mb-4">
              <label className="block bg-blue-600 text-white px-2 py-1">Szerepkör:</label>
              <select
                name="role"
                value={newUser.role}
                onChange={handleRoleChange}
                className="w-full bg-gray-800 text-white p-2"
              >
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>

            {newUser.role === "Diák" && (
              <div className="mb-4">
                <label className="block bg-blue-600 text-white px-2 py-1">Csoport:</label>
                <input
                  type="text"
                  name="group"
                  value={newUser.group}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 text-white p-2"
                  placeholder="Pl. 12BD"
                />
              </div>
            )}

            <div className="mb-4">
              <label className="block bg-blue-600 text-white px-2 py-1">Kártya:</label>
              <select
                name="hasCard"
                value={newUser.hasCard}
                onChange={(e) => setNewUser((prevState) => ({ ...prevState, hasCard: e.target.value === 'true' }))}
                className="w-full bg-gray-800 text-white p-2"
              >
                <option value={false}>Nincs</option>
                <option value={true}>Van</option>
              </select>
            </div>

            <div className="text-center">
              <button
                onClick={handleCreateUser}
                className="bg-blue-600 text-white px-4 py-2 rounded-xl"
              >
                Létrehoz
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-red-600 text-white px-4 py-2 rounded-xl ml-2"
              >
                Mégse
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagementPage;
