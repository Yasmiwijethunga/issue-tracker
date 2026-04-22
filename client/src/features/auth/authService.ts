import axios from "axios";

// const API_URL = "http://localhost:5000/api/auth/";
const API_URL = `${import.meta.env.VITE_API_URL}/auth/`;
export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  _id: string;
  name: string;
  email: string;
  token: string;
}

const register = async (userData: RegisterPayload): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(`${API_URL}register`, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const login = async (userData: LoginPayload): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(`${API_URL}login`, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const logout = (): void => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;