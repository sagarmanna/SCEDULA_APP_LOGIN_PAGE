import { cookies } from "next/headers";
import Link from "next/link";

const BRAND = "#46C2DE";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session_id")?.value;

  const identifier = session
    ? Buffer.from(session, "base64").toString("utf8")
    : "";

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-sky-50 flex items-center justify-center px-4">
      <section className="w-full max-w-[600px] bg-white shadow-xl rounded-2xl p-10 border border-gray-100">
        
        <h1 className="text-3xl font-semibold text-gray-900">
          Dashboard
        </h1>

        <p className="mt-6 text-gray-600 text-lg">
          Logged in as:
        </p>

        <p className="mt-1 text-xl font-semibold text-gray-900 break-all">
          {identifier || "Guest"}
        </p>

        <form
          action={async () => {
            "use server";
            const cookieStore = await cookies();
            cookieStore.set("session_id", "", {
              path: "/",
              maxAge: 0,
            });
          }}
          className="mt-8"
        >
          <button
            type="submit"
            className="w-full h-[51px] rounded-xl text-white text-lg font-medium transition hover:brightness-95 active:scale-[0.98]"
            style={{ backgroundColor: BRAND }}
          >
            Logout
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="text-sky-600 hover:underline font-medium"
          >
            Back to Login
          </Link>
        </div>
      </section>
    </main>
  );
}
