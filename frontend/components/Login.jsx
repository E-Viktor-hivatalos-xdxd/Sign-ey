import { useRouter } from "next/router";
import React, { useState } from "react";

const Bejelentkezes = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const Login = (email, password) => {
    fetch(`http://127.0.0.1:8080/api/auth/login`, {
      method: "POST",
      redirect: "follow",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then((res) => {
      switch (res.status) {
        case 200:
          alert("Sikeres bejelentkezés!");
          router.replace(router.asPath);
          break;

        default:
          alert("Hibás email vagy jelszó!");
          break;
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Login(username, password);
  };


  return (
    <div className="fixed inset-0 bg-gray-100 bg-opacity-50 flex items-center justify-center z-50">
      <title>Sign-ey / Bejelentkezés</title>
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg relative">


        <h2 className="text-2xl font-bold text-center mb-4">Sign-ey Menedzser</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Felhasználónév
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 block w-full rounded-md shadow-sm border-blue-500 border-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Jelszó
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full rounded-md shadow-sm border-blue-500 border-2"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 transition"
          >
            Bejelentkezés
          </button>
        </form>
      </div>
    </div>
  );
};

export default Bejelentkezes;