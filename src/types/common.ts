export interface APIResponse {
  success: boolean;
  message: string;
  data?: unknown;
  error?: unknown;
  token?: string;
}
