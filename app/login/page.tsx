"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

function GoogleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.611 20.083H42V20H24v8h11.303C33.542 32.658 29.127 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.047 6.053 29.277 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
      />
      <path
        fill="#FF3D00"
        d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.047 6.053 29.277 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.166 0 9.86-1.977 13.409-5.197l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.107 0-9.509-3.317-11.297-7.946l-6.52 5.02C9.49 39.556 16.227 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.611 20.083H42V20H24v8h11.303c-.849 2.38-2.5 4.402-4.684 5.565l.003-.002 6.19 5.238C36.373 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
      />
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement | null>(null);

  const [mounted, setMounted] = useState(false);

  const [email, setEmail] = useState("");
  const [remember, setRemember] = useState(false);

  // Logo upload (no localStorage persistence)
  const [logoUrl, setLogoUrl] = useState<string>("");

  useEffect(() => {
    setMounted(true);
    // Only load remember toggle; DO NOT autofill email (as per your request)
    const rm = typeof window !== "undefined" && localStorage.getItem("rememberMe") === "true";
    setRemember(!!rm);
  }, []);

  const emailIsValid = useMemo(() => {
    if (!email) return true; // allow empty until submit
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }, [email]);

  function onPickLogo() {
    fileRef.current?.click();
  }

  function onLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // cleanup previous URL
    if (logoUrl) URL.revokeObjectURL(logoUrl);

    const url = URL.createObjectURL(file);
    setLogoUrl(url);
  }

  function removeLogo() {
    if (logoUrl) URL.revokeObjectURL(logoUrl);
    setLogoUrl("");
    if (fileRef.current) fileRef.current.value = "";
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email) return;
    if (!emailIsValid) return;

    if (remember) {
      localStorage.setItem("rememberMe", "true");
      localStorage.setItem("rememberEmail", email);
    } else {
      localStorage.removeItem("rememberMe");
      localStorage.removeItem("rememberEmail");
    }

    router.push("/dashboard");
  }
  if (!mounted) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center px-4 py-10">
        <section className="w-full max-w-[430px]" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4 py-10">
      <section className="w-full max-w-[430px]">
        {/* Logo */}
        <div className="flex justify-center mb-10 sm:mb-12">
          <div className="relative w-[216px] h-[152px] rounded-[50px] bg-[#F3F3F3] flex items-center justify-center overflow-hidden">
            {!logoUrl ? (
              <button
                type="button"
                onClick={onPickLogo}
                className="text-[24px] leading-[24px] font-semibold text-black focus:outline-none"
                aria-label="Upload logo"
                title="Click to upload logo"
              >
                Your Logo
              </button>
            ) : (
              <>
                <Image src={logoUrl} alt="Uploaded logo" fill className="object-cover" priority />
                <button
                  type="button"
                  onClick={removeLogo}
                  className="absolute right-3 top-3 rounded-full bg-white/90 border border-[#D6D6DB] px-3 py-1 text-xs font-medium"
                >
                  Remove
                </button>
              </>
            )}

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onLogoChange}
            />
          </div>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="w-full">
          <h1 className="text-[24px] leading-[24px] font-semibold text-black mb-4">
            Login
          </h1>

          <label className="block text-[14px] leading-[14px] font-medium text-black mb-3">
            Mobile /Email
          </label>

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="login with Mobile or Email"
            className={[
              "w-full h-[51px] rounded-[12px] border px-4 text-[15px] font-medium outline-none",
              "border-[#D6D6DB] focus:border-[#46C2DE] focus:ring-2 focus:ring-[#46C2DE]/25",
              !emailIsValid ? "border-red-400 focus:border-red-400 focus:ring-red-200" : "",
            ].join(" ")}
            autoComplete="off"
          />
          <div className="flex items-center justify-between mt-4">
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="sr-only"
              />
              <span
                className="w-[20px] h-[20px] rounded-[5px] border flex items-center justify-center border-[#CDD1E0] bg-white"
                aria-hidden="true"
              >
                {remember ? (
                  <svg width="12" height="9" viewBox="0 0 12 9" aria-hidden="true">
                    <path
                      d="M1 4.5L4.5 8L11 1.5"
                      fill="none"
                      stroke="#000C14"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : null}
              </span>

              <span className="text-[14px] font-medium text-[#999EA1]">
                Remember Me
              </span>
            </label>

            <Link
              href="/forgot-password"
              className="text-[14px] font-medium text-[#FF4D6D] hover:underline"
            >
              Forgot Password
            </Link>
          </div>
          <div className="h-4" />

          {/* Login button  */}
          <button
            type="submit"
            disabled={!email || !emailIsValid}
            className={[
              "w-full h-[51px] rounded-[12px] bg-[#46C2DE]",
              "text-white text-[18px] font-medium leading-[18px]",
              "flex items-center justify-center",
              "shadow-[0_2px_6px_rgba(70,194,222,0.25)]",
              "transition active:scale-[0.98]",
              (!email || !emailIsValid)
                ? "opacity-60 cursor-not-allowed"
                : "hover:bg-[#3DB4CF]",
            ].join(" ")}
          >
            Login
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mt-6">
            <div className="h-px flex-1 bg-[#D6D6DB]" />
            <p className="text-[14px] font-medium text-[#999EA1]">Or login With</p>
            <div className="h-px flex-1 bg-[#D6D6DB]" />
          </div>

          {/* Google button */}
          <button
            type="button"
            onClick={() => router.push("/auth/google")}
            className={[
              "mt-5 w-full h-[50px] rounded-[12px] border border-[#D6D6DB] bg-white",
              "flex items-center justify-center gap-3",
              "transition hover:bg-[#F7F7F7] active:scale-[0.98]",
            ].join(" ")}
          >
            <GoogleIcon />
            <span className="text-[15px] font-medium text-black">Continue with Google</span>
          </button>

          {/* Bottom text */}
          <div className="mt-10 flex items-center justify-center gap-2 text-[14px] font-medium text-[#999EA1]">
            <span>Don’t have an account ?</span>
            <Link href="/signup" className="text-[#46C2DE] hover:underline">
              Sign Up
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}
