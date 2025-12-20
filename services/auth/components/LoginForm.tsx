/**
 * Example Component: Login Form
 * Demonstrates authentication with API
 */

"use client";

import { useState, FormEvent } from "react";
import { useAtom } from "jotai";
import {
  isAuthenticatedAtom,
  currentUserAtom,
  authLoadingAtom,
  authErrorAtom,
} from "@/services/atoms/baseAtoms";
import { login, type LoginResponse } from "../api/login";
import { getCurrentUser } from "../../app/users/api/getCurrentUser";
import { XHRError } from "@/services/api/xhr";

export default function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
  const [loading, setLoading] = useAtom(authLoadingAtom);
  const [error, setError] = useAtom(authErrorAtom);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response: LoginResponse = await login({
        email,
        password,
      });

      // If login successful, fetch user profile
      if (response.token || response.access) {
        setIsAuthenticated(true);
        try {
          const userData = await getCurrentUser();
          setCurrentUser(userData);
        } catch (err) {
          console.error("Failed to fetch user data:", err);
        }
      }
    } catch (err: unknown) {
      const errorObj = err as XHRError;
      setError({
        message:
          errorObj.details?.message ||
          errorObj.details?.detail ||
          errorObj.message ||
          "خطا در ورود به سیستم",
        status: errorObj.status || 0,
        details: errorObj.details,
        raw: errorObj.raw,
      });
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="text-green-800 font-semibold">ورود موفق</div>
        {currentUser && (
          <div className="text-green-600 mt-2">
            خوش آمدید، {currentUser.name || currentUser.email}
          </div>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">ورود به حساب کاربری</h2>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <div className="text-red-800 text-sm">{error.message}</div>
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">ایمیل</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="example@email.com"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">رمز عبور</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "در حال ورود..." : "ورود"}
        </button>
      </div>
    </form>
  );
}

