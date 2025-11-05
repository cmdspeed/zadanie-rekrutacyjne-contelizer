import { useState } from "react";
import UserList from "./components/UserList";
import UserEditForm from "./components/UserEditForm";

interface User {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
}
export const Task3 = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <div className="p-6 max-w-4xl mx-auto font-sans bg-neutral-50">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Zadanie 3 - Użytkownicy:
      </h1>

      {selectedUser ? (
        <UserEditForm
          user={selectedUser}
          onCancel={() => setSelectedUser(null)}
        />
      ) : (
        <UserList onEditUser={(user: User) => setSelectedUser(user)} />
      )}
    </div>
  );
};
