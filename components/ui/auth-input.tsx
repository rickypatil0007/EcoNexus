/**
 * AuthInput — EcoNexus Shared UI Component
 *
 * Styled input field for auth forms.
 * Supports: label, icon, error state, password toggle.
 *
 * Reference: 04-design.md (Input System)
 */

"use client";

import { forwardRef, useState, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, AlertCircle } from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  readonly label: string;
  readonly error?: string;
  readonly icon?: React.ReactNode;
}

// ── Component ─────────────────────────────────────────────────────────────────

const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ label, error, icon, type, className, id, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const inputType  = isPassword && showPassword ? "text" : type;

    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={id}
          className="text-sm font-medium"
          style={{ color: "#B7BDC6" }}
        >
          {label}
        </label>

        <div className="relative">
          {/* Left icon */}
          {icon && (
            <span
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: "#7C8794" }}
              aria-hidden="true"
            >
              {icon}
            </span>
          )}

          <input
            ref={ref}
            id={id}
            type={inputType}
            className={cn(
              "w-full rounded-xl py-3 text-sm text-white outline-none transition-all duration-200",
              "placeholder:text-[#4A5568]",
              "focus:ring-2",
              icon  ? "pl-10 pr-4"         : "px-4",
              isPassword ? "pr-10" : "",
              error
                ? "focus:ring-red-500/40"
                : "focus:ring-[#2ED47A]/30",
              className,
            )}
            style={{
              background:   error
                ? "rgba(255, 93, 115, 0.06)"
                : "rgba(255, 255, 255, 0.05)",
              border: error
                ? "1px solid rgba(255, 93, 115, 0.35)"
                : "1px solid rgba(255, 255, 255, 0.10)",
            }}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
            {...props}
          />

          {/* Password toggle */}
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors hover:text-white"
              style={{ color: "#7C8794" }}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          )}
        </div>

        {/* Error message */}
        {error && (
          <p
            id={`${id}-error`}
            className="flex items-center gap-1 text-xs"
            style={{ color: "#FF5D73" }}
            role="alert"
          >
            <AlertCircle size={14} aria-hidden="true" />
            {error}
          </p>
        )}
      </div>
    );
  },
);

AuthInput.displayName = "AuthInput";

export { AuthInput };
export type { AuthInputProps };
