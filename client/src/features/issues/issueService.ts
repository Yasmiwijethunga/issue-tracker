import axios from "axios";
import type { Issue } from "../../types/issue";

// const API_URL = "http://localhost:5000/api/issues/";
const API_URL = `${import.meta.env.VITE_API_URL}/issues/`;

export interface PaginationData {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface FetchIssuesResponse {
  issues: Issue[];
  pagination: PaginationData;
}

interface FetchIssuesParams {
  search?: string;
  status?: string;
  priority?: string;
  page?: number;
  limit?: number;
}

const getToken = (): string | null => {
  const user = localStorage.getItem("user");

  if (!user) {
    return null;
  }

  const parsedUser = JSON.parse(user);
  return parsedUser.token ?? null;
};

const requireToken = (): string => {
  const token = getToken();

  if (!token) {
    throw new Error("Please login first");
  }

  return token;
};

// Setup axios interceptor for 401 responses
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

const createIssue = async (issueData: Partial<Issue>): Promise<Issue> => {
  const token = requireToken();

  const response = await axios.post<Issue>(API_URL, issueData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const getIssues = async (params?: FetchIssuesParams): Promise<FetchIssuesResponse> => {
  const token = getToken();

  const queryParams = new URLSearchParams();

  if (params?.search) queryParams.append("search", params.search);
  if (params?.status && params.status !== "All Statuses") {
    queryParams.append("status", params.status);
  }
  if (params?.priority && params.priority !== "All Priorities") {
    queryParams.append("priority", params.priority);
  }
  if (params?.page) queryParams.append("page", params.page.toString());
  if (params?.limit) queryParams.append("limit", params.limit.toString());

  const url = `${API_URL}${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;

  const response = await axios.get<FetchIssuesResponse>(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  return response.data;
};

const getIssueById = async (id: string): Promise<Issue> => {
  const token = requireToken();

  const response = await axios.get<Issue>(`${API_URL}${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const updateIssue = async ({
  id,
  issueData,
}: {
  id: string;
  issueData: Partial<Issue>;
}): Promise<Issue> => {
  const token = requireToken();

  const response = await axios.put<Issue>(`${API_URL}${id}`, issueData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const deleteIssue = async (id: string): Promise<{ message: string }> => {
  const token = requireToken();

  const response = await axios.delete<{ message: string }>(`${API_URL}${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
const issueService = {
  createIssue,
  getIssues,
  getIssueById,
  updateIssue,
  deleteIssue,
};

export default issueService;
