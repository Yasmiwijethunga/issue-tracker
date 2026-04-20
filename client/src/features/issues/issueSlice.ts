import { createSlice } from "@reduxjs/toolkit";
import type { Issue } from "../../types/issue";

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

const issueSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {},
});

export default issueSlice.reducer;