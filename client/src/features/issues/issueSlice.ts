import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import issueService from "./issueService";
import type { Issue } from "../../types/issue";
import type { RootState } from "../../app/store";

interface FetchIssuesParams {
  search?: string;
  status?: string;
  priority?: string;
  page?: number;
  limit?: number;
}

interface IssueState {
  issues: Issue[];
  issue: Issue | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}

const initialState: IssueState = {
  issues: [],
  issue: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const fetchIssues = createAsyncThunk<
  Issue[],
  FetchIssuesParams | undefined,
  { rejectValue: string }
>("issues/fetchAll", async (params, thunkAPI) => {
  try {
    const response = await issueService.getIssues(params);
    // Extract issues array from paginated response
    return response.issues;
  } catch (error: any) {
    const message =
      error?.response?.data?.message || error?.message || "Failed to fetch issues";
    return thunkAPI.rejectWithValue(message);
  }
});

export const fetchIssueById = createAsyncThunk<
  Issue,
  string,
  { rejectValue: string }
>("issues/fetchById", async (id, thunkAPI) => {
  try {
    return await issueService.getIssueById(id);
  } catch (error: any) {
    const message =
      error?.response?.data?.message || error?.message || "Failed to fetch issue";
    return thunkAPI.rejectWithValue(message);
  }
});

export const createNewIssue = createAsyncThunk<
  Issue,
  Partial<Issue>,
  { rejectValue: string }
>("issues/create", async (issueData, thunkAPI) => {
  try {
    return await issueService.createIssue(issueData);
  } catch (error: any) {
    const message =
      error?.response?.data?.message || error?.message || "Failed to create issue";
    return thunkAPI.rejectWithValue(message);
  }
});

export const updateExistingIssue = createAsyncThunk<
  Issue,
  { id: string; issueData: Partial<Issue> },
  { rejectValue: string }
>("issues/update", async ({ id, issueData }, thunkAPI) => {
  try {
    return await issueService.updateIssue({ id, issueData });
  } catch (error: any) {
    const message =
      error?.response?.data?.message || error?.message || "Failed to update issue";
    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteExistingIssue = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("issues/delete", async (id, thunkAPI) => {
  try {
    await issueService.deleteIssue(id);
    return id;
  } catch (error: any) {
    const message =
      error?.response?.data?.message || error?.message || "Failed to delete issue";
    return thunkAPI.rejectWithValue(message);
  }
});

const issueSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {
    resetIssueState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIssues.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchIssues.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.issues = action.payload;
      })
      .addCase(fetchIssues.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to fetch issues";
      })

      .addCase(fetchIssueById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchIssueById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.issue = action.payload;
      })
      .addCase(fetchIssueById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to fetch issue";
      })

      .addCase(createNewIssue.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewIssue.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.issues.unshift(action.payload);
      })
      .addCase(createNewIssue.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to create issue";
      })

      .addCase(updateExistingIssue.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateExistingIssue.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.issues = state.issues.map((issue) =>
          issue._id === action.payload._id ? action.payload : issue
        );
        state.issue = action.payload;
      })
      .addCase(updateExistingIssue.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to update issue";
      })

      .addCase(deleteExistingIssue.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteExistingIssue.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.issues = state.issues.filter((issue) => issue._id !== action.payload);
      })
      .addCase(deleteExistingIssue.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to delete issue";
      });
  },
});

export const { resetIssueState } = issueSlice.actions;
export const selectIssues = (state: RootState) => state.issues;

export default issueSlice.reducer;