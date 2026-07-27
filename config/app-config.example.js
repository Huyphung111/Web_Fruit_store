// Sao chép file này thành app-config.js khi kết nối Supabase.
// Không đưa secret/service_role key vào frontend.
export const SUPABASE_CONFIG = {
  url: '',
  publishableKey: '',
  syncIntervalMs: 3000
};
