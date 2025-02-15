import { ApiResponse, Task } from "@/types";
import clientAxios from "../app/config/api/axiosClientInterceptor";
import apiUrl from "./api";

export async function getTasksClientSide(): Promise<ApiResponse<Task[]>> {
  try {
    const response = await clientAxios.get(apiUrl.taskUrl);
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
