import Link from "next/link";

export default function Signup() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-[430px]">
        <h1 className="text-[24px] font-semibold">Sign Up</h1>
        <p className="mt-2 text-[#999EA1] text-[14px]">
          
        </p>
        <Link className="mt-6 inline-block text-[#46C2DE] hover:underline" href="/login">
          Back to Login
        </Link>
      </div>
    </main>
  );
}
