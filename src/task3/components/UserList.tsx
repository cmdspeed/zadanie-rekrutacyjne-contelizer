import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://gorest.co.in/public/v2/users";

interface User {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
}

export default function UserList({
  onEditUser,
}: Readonly<{
  onEditUser: (user: User) => void;
}>) {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get(API_URL).then((res) => setUsers(res.data));
  }, []);

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Szukaj po imieniu lub e-mailu..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />

      <table className="w-full border border-gray-300 text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Imię</th>
            <th className="p-2">Email</th>
            <th className="p-2">Status</th>
            <th className="p-2">Akcje</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.status}</td>
              <td className="p-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  onClick={() => onEditUser(user)}
                >
                  Edytuj
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
