import axios from "axios";
import type { Issue } from "../../types/issue";

// const API_URL = "http://localhost:5000/api/issues/";
const API_URL = `${import.meta.env.VITE_API_URL}/issues/`;
interface FetchIssuesParams {
  search?: string;
  status?: string;
  priority?: string;
}

const getToken = (): string => {
  const user = localStorage.getItem("user");

  if (!user) {
    throw new Error("User not found in localStorage");
  }

  const parsedUser = JSON.parse(user);
  return parsedUser.token;
};

const createIssue = async (issueData: Partial<Issue>): Promise<Issue> => {
  const token = getToken();

  const response = await axios.post<Issue>(API_URL, issueData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const getIssues = async (params?: FetchIssuesParams): Promise<Issue[]> => {
  const token = getToken();

  const queryParams = new URLSearchParams();

  if (params?.search) queryParams.append("search", params.search);
  if (params?.status && params.status !== "All Statuses") {
    queryParams.append("status", params.status);
  }
  if (params?.priority && params.priority !== "All Priorities") {
    queryParams.append("priority", params.priority);
  }

  const url = `${API_URL}${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;

  const response = await axios.get<Issue[]>(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const getIssueById = async (id: string): Promise<Issue> => {
  const token = getToken();

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
  const token = getToken();

  const response = await axios.put<Issue>(`${API_URL}${id}`, issueData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const deleteIssue = async (id: string): Promise<{ message: string }> => {
  const token = getToken();

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