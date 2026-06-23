export function useStaticAuth() {
  return {
    user: { name: "演示用户", email: "demo@example.com", role: "admin" },
    loading: false,
    error: null,
    isAuthenticated: true,
    refresh: async () => undefined,
    logout: async () => undefined,
  };
}
