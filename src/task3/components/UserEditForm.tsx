import { useState } from "react";
import axios from "axios";

const API_URL = "https://gorest.co.in/public/v2/users";
const TOKEN = import.meta.env.VITE_GOREST_TOKEN;

interface User {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
}

export default function UserEditForm({
  user,
  onCancel,
}: Readonly<{
  user: User;
  onCancel: () => void;
}>) {
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    status: user.status,
  });
  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.patch(`${API_URL}/${user.id}`, form, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      setMessage("✅ Zaktualizowano pomyślnie!");
    } catch (err) {
      console.error("❌ Błąd aktualizacji użytkownika:", err);
      setMessage("❌ Błąd podczas aktualizacji.");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Edytuj użytkownika</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          placeholder="Imię"
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          placeholder="Email"
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        >
          <option value="active">active</option>
          <option value="inactive">inactive</option>
        </select>

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Zapisz
          </button>
          <button
            type="button"
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            onClick={onCancel}
          >
            Anuluj
          </button>
        </div>
      </form>

      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}
