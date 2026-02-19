import { cookies } from "next/headers";
import Link from "next/link";

const BRAND = "#46C2DE";

export default function DashboardPage() {
  const session = cookies().get("session_id")?.value;
  const identifier = session ? Buffer.from(session, "base64").toString("utf8") : "";

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-[800px] px-6 py-16">
        <h1 className="text-3xl font-semibold">Dashboard</h1>

        <p className="mt-4 text-gray-700">
          Logged in as: <span className="font-medium">{identifier || "Guest"}</span>
        </p>

        <form
          action={async () => {
            "use server";
            cookies().set("session_id", "", { path: "/", maxAge: 0 });
          }}
        >
          <button
            type="submit"
            style={{
              marginTop: 20,
              width: "100%",
              maxWidth: 560,
              height: 51,
              borderRadius: 12,
              background: BRAND,
              color: "#fff",
              fontWeight: 500,
              fontSize: 18,
              border: "none",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </form>

        <div className="mt-6">
          <Link className="text-sky-600 underline" href="/login">
            Back to Login
          </Link>
        </div>
      </div>
    </main>
  );
}
