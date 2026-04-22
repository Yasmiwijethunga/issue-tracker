import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService, {
  type RegisterPayload,
  type LoginPayload,
  type AuthResponse,
  type RegisterResponse,
} from "./authService";

interface AuthState {
  user: AuthResponse | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const storedUser = localStorage.getItem("user");

const initialState: AuthState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const register = createAsyncThunk<
  RegisterResponse,
  RegisterPayload,
  { rejectValue: string }
>("auth/register", async (user, thunkAPI) => {
  try {
    return await authService.register(user);
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || "Registration failed";
    return thunkAPI.rejectWithValue(message);
  }
});

export const login = createAsyncThunk<
  AuthResponse,
  LoginPayload,
  { rejectValue: string }
>("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || "Login failed";
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
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
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
        state.user = state.user;
        state.message = action.payload.message;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Registration failed";
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = "Login successful";
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Login failed";
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isSuccess = false;
        state.isError = false;
        state.isLoading = false;
        state.message = "";
      });
  },
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;