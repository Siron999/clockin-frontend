"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { getTasksClientSide } from "@/lib/client-api";
import { ApiResponse, Task } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function TaskList() {
  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery<ApiResponse<Task[]>>({
    queryKey: ["tasks"],
    queryFn: getTasksClientSide,
  });

  if (isLoading) return <div>Loading tasks...</div>;
  if (error) return <div>Error loading tasks: {String(error)}</div>;
  const [hours, setHours] = useState("");

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
    });
  };

  const calculateHours = (clockedIn: string, clockedOut: string) => {
    const start = new Date(clockedIn);
    const end = new Date(clockedOut);
    const diff = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    return diff;
  };

  return (
    <div className="flex flex-col w-full space-y-4">
      {tasks?.data?.map((task) => {
        const totalLoggedHours =
          task.daily_logs?.reduce(
            (acc, log) => acc + calculateHours(log.clocked_in, log.clocked_out),
            0
          ) ?? 0;
        const progress =
          (totalLoggedHours / task.allocated_time_per_day_hours) * 100;

        return (
          <Card
            key={task.id}
            className="bg-[#191919] border-0 border-b border-white/20 rounded-none"
          >
            <CardHeader>
              <CardTitle>{task.title}</CardTitle>
              <CardDescription>
                Total Allocated: {task.allocated_time_per_day_hours}h | Logged:{" "}
                {totalLoggedHours}h | Remaining:{" "}
                {task.allocated_time_per_day_hours - totalLoggedHours}h
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="mr-4 w-[30vw]"
                >
                  <Progress value={progress} className="w-full mt-2 mb-4" />
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Input
                        type="number"
                        placeholder="Enter hours"
                        value={hours}
                        onChange={(e) => setHours(e.target.value)}
                      />
                    </div>
                    <Button type="submit">Log Time</Button>
                  </div>
                </form>

                <div className="flex gap-2">
                  {(task.daily_logs ?? []).map((log, index) => (
                    <div
                      key={index}
                      className={`p-2 rounded text-xs flex flex-col items-center min-w-[70px] ${
                        calculateHours(log.clocked_in, log.clocked_out) >=
                        task.allocated_time_per_day_hours
                          ? "bg-green-600/20 text-green-500"
                          : "bg-red-600/20 text-red-500"
                      }`}
                    >
                      <span className="font-medium">
                        {formatDate(new Date(log.clocked_in))}
                      </span>
                      <span>
                        {calculateHours(log.clocked_in, log.clocked_out)}h
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
