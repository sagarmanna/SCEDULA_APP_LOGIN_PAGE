"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState("");

  useEffect(() => {
    const logged = localStorage.getItem("schedula_logged_in");
    if (logged !== "1") router.replace("/login");

    setUser(localStorage.getItem("schedula_user") || "");
  }, [router]);

  const logout = () => {
    localStorage.removeItem("schedula_logged_in");
    router.push("/login");
  };

  return (
    <main className="min-h-screen bg-[#F3F3F3] flex items-center justify-center p-4">
      <div className="w-full max-w-[430px] bg-white rounded-[18px] p-6">
        <h1 className="text-[22px] font-semibold text-black">Dashboard</h1>
        <p className="mt-2 text-[14px] text-[#666]">Logged in as: {user}</p>
        <button
          onClick={logout}
          className="mt-6 w-full h-[51px] rounded-[12px] bg-[#46C2DE] text-white text-[18px] font-medium"
        >
          Logout
        </button>
      </div>
    </main>
  );
}
