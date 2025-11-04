import React, { useState } from "react";

export const Task2 = () => {
  const [pesel, setPesel] = useState("");
  const [message, setMessage] = useState("");

  const validatePesel = (pesel: string) => {
    if (!/^\d{11}$/.test(pesel)) return false;

    const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
    const digits = pesel.split("").map(Number);

    const sum = weights.reduce((acc, w, i) => acc + w * digits[i], 0);
    const control = (10 - (sum % 10)) % 10;

    return control === digits[10];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(
      validatePesel(pesel)
        ? "✅ Numer PESEL jest poprawny"
        : "❌ Nieprawidłowy numer PESEL"
    );
  };

  return (
    <div className="m-3 p-6 max-w-md mx-auto bg-white rounded-2xl shadow">
      <h2 className="text-xl font-bold mb-4">Walidacja numeru PESEL</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          value={pesel}
          onChange={(e) => setPesel(e.target.value)}
          placeholder="Wpisz numer PESEL"
          maxLength={11}
          minLength={11}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-green-950 text-white py-2 rounded hover:bg-green-900 transition"
        >
          Sprawdź PESEL
        </button>
      </form>
      {message && <p className="mt-4 text-center font-medium">{message}</p>}
    </div>
  );
};
