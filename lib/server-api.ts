import { ApiResponse, Task } from "@/types";
import serverAxios from "../app/config/api/axiosServerInterceptor";
import apiUrl from "./api";

export async function getTasks(): Promise<ApiResponse<Task[]>> {
  try {
    const response = await serverAxios.get(apiUrl.taskUrl);
    return response.data;
  } catch (error) {
    console.error("Error getting tasks", error);
    return {
      status: 500,
      message: "Error getting tasks",
      data: [],
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

export async function createTask(task: Task): Promise<ApiResponse<Task>> {
  const response = await serverAxios.post(apiUrl.taskUrl, task);
  return response.data;
}
