"use client";

import React from "react";
import { useAtomValue } from "jotai";
import { errorAtom } from "../base/atoms";
import { formatErrorForUser, getErrorDetails } from "../err/error";

interface ErrorMessageProps {
  className?: string;
  onDismiss?: () => void;
}

export default function ErrorMessage({
  className = "",
  onDismiss,
}: ErrorMessageProps) {
  const error = useAtomValue(errorAtom);

  if (!error) return null;

  const { message, details, status } = getErrorDetails(error);

  return (
    <div
      className={`bg-red-50 border-r-4 border-red-500 text-red-700 p-4 rounded-lg ${className}`}
      role="alert"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start">
          <svg
            className="w-5 h-5 ml-3 mt-0.5 shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          <div className="flex-1">
            <h3 className="font-semibold mb-1">خطا</h3>
            <p className="text-sm">{message}</p>
            {details && typeof details === "object" && (
              <ul className="mt-2 list-disc list-inside text-xs space-y-1">
                {Object.entries(details).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key}:</strong> {String(value)}
                  </li>
                ))}
              </ul>
            )}
            {status && status > 0 && (
              <p className="text-xs mt-2 opacity-75">کد خطا: {status}</p>
            )}
          </div>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-red-700 hover:text-red-900 ml-4"
            aria-label="بستن"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

