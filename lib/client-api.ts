import { ApiResponse, Task } from "@/types";
import axios from "axios";
import apiUrl from "./api";

export async function getTasksClientSide(): Promise<ApiResponse<Task[]>> {
  try {
    const response = await axios.get(apiUrl.taskUrl);
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
