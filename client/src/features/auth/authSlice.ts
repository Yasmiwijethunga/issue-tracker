import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService, {
  type RegisterPayload,
  type LoginPayload,
  type AuthResponse,
} from "./authService";
import type { RootState } from "../../app/store";

interface AuthState {
  user: AuthResponse | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}

const userFromStorage = localStorage.getItem("user");

const initialState: AuthState = {
  user: userFromStorage ? JSON.parse(userFromStorage) : null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const register = createAsyncThunk<
  AuthResponse,
  RegisterPayload,
  { rejectValue: string }
>("auth/register", async (userData, thunkAPI) => {
  try {
    return await authService.register(userData);
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Registration failed";

    return thunkAPI.rejectWithValue(message);
  }
});

export const login = createAsyncThunk<
  AuthResponse,
  LoginPayload,
  { rejectValue: string }
>("auth/login", async (userData, thunkAPI) => {
  try {
    return await authService.login(userData);
  } catch (error: any) {
    const message =
      error?.response?.data?.message || error?.message || "Login failed";

    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  authService.logout();
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Registration failed";
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Login failed";
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      });
  },
});

export const { resetAuthState } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;