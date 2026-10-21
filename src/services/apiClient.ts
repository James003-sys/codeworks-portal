/**
 * Codeworks Kenya - API Service Client
 * Centralized HTTP configuration and network response wrappers.
 */

export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || '/api/v1',
  IS_MOCK_MODE: true,
  SIMULATED_DELAY_MS: 120,
};

export async function simulateDelay<T>(data: T, delayMs: number = API_CONFIG.SIMULATED_DELAY_MS): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delayMs);
  });
}

export interface ApiResponse<T> {
  data: T;
  status: 'success' | 'error';
  message?: string;
  timestamp: string;
}

export function wrapResponse<T>(data: T, message?: string): ApiResponse<T> {
  return {
    data,
    status: 'success',
    message,
    timestamp: new Date().toISOString(),
  };
}
