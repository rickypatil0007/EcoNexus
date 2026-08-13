/**
 * API Response Types — EcoNexus
 *
 * Shared TypeScript interfaces for all API responses and Server Actions.
 * Ensures consistent response shapes across the entire application.
 *
 * Reference: 10-api.md, 02-structure.md
 */

// ── Success Response ──────────────────────────────────────────────────────────
/**
 * Standard success response wrapper.
 * All Server Actions and API routes should return this shape on success.
 */
export interface ApiSuccess<T> {
  readonly success: true;
  readonly data: T;
  readonly message?: string;
}

// ── Error Response ────────────────────────────────────────────────────────────
/**
 * Standard error response wrapper.
 * All Server Actions and API routes should return this shape on failure.
 */
export interface ApiError {
  readonly success: false;
  readonly error: string;
  readonly code?: string;
  readonly field?: string; // For form validation errors
}

/**
 * Union type for all Server Action return values.
 *
 * @example
 * async function myAction(): Promise<ApiResponse<User>> {
 *   try {
 *     const user = await getUser()
 *     return { success: true, data: user }
 *   } catch {
 *     return { success: false, error: "Failed to fetch user" }
 *   }
 * }
 */
export type ApiResponse<T> = ApiSuccess<T> | ApiError;

// ── Pagination ────────────────────────────────────────────────────────────────
export interface PaginatedResponse<T> {
  readonly data: T[];
  readonly total: number;
  readonly page: number;
  readonly pageSize: number;
  readonly hasMore: boolean;
}

// ── Form State ────────────────────────────────────────────────────────────────
/**
 * Standard form state for Server Action-backed forms.
 * Compatible with React's useFormState hook.
 */
export interface FormState {
  readonly success: boolean;
  readonly message: string;
  readonly errors?: Record<string, string[]>;
}
