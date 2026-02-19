import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-white">
      <div className="w-full max-w-[430px] text-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          Dashboard
        </h1>

        <p className="mt-4 text-gray-500 text-sm">
          Welcome to Dashboard
        </p>

        <Link
          href="/login"
          className="mt-6 inline-block text-[#46C2DE] hover:underline font-medium"
        >
          Back to Login
        </Link>
      </div>
    </main>
  );
}
