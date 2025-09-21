import http, { setTokens, clearTokens } from "./http";

export async function login(email, password) {
  const { data } = await http.post("/auth/login", { email, password });
  setTokens({ access: data.accessToken, refresh: data.refreshToken });
  return data;
}

export async function register(payload) {
  const { data } = await http.post("/auth/register", payload);
  setTokens({ access: data.accessToken, refresh: data.refreshToken });
  return data;
}

export async function logout(refreshToken) {
  try {
    await http.post("/auth/logout", { refreshToken });
  } catch {}
  clearTokens();
}

export const getMe = () => http.get("/me").then((r) => r.data);

export const changePassword = (payload) =>
  http.post("/me/change-password", payload).then((r) => r.data);
