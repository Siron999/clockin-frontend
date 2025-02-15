"use client";

import { useQuery } from "@tanstack/react-query";
import { getTasksClientSide } from "../lib/client-api";

export const useTasks = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: getTasksClientSide,
  });
};
