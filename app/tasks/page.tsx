"use client";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import customAxios from "../config/api/axiosInterceptor";
// Mock data
const TASKS = [
  {
    id: 1,
    name: "Next Js APP UI",
    totalAllocatedHours: 40,
    dailyLogs: [
      { date: new Date("2024-03-20"), hours: 8, target: 8 },
      { date: new Date("2024-03-19"), hours: 7, target: 8 },
      { date: new Date("2024-03-18"), hours: 8, target: 8 },
      { date: new Date("2024-03-17"), hours: 6, target: 8 },
    ],
  },
  {
    id: 2,
    name: "Integrate Database",
    totalAllocatedHours: 20,
    dailyLogs: [
      { date: new Date("2024-03-20"), hours: 4, target: 4 },
      { date: new Date("2024-03-19"), hours: 5, target: 4 },
      { date: new Date("2024-03-18"), hours: 3, target: 4 },
      { date: new Date("2024-03-17"), hours: 4, target: 4 },
    ],
  },
  {
    id: 3,
    name: "Backend Integration",
    totalAllocatedHours: 30,
    dailyLogs: [
      { date: new Date("2024-03-20"), hours: 6, target: 6 },
      { date: new Date("2024-03-19"), hours: 4, target: 6 },
      { date: new Date("2024-03-18"), hours: 6, target: 6 },
      { date: new Date("2024-03-17"), hours: 5, target: 6 },
    ],
  },
];

export default function Tasks() {
  const [hours, setHours] = useState("");
  const { status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "authenticated") {
      const requestedPath = pathname === "/signin" ? "/tasks" : pathname;
      router.push(requestedPath);
    } else {
      router.push("/signin");
    }
  }, [status, pathname, router]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
    });
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await customAxios.get("/api/v1/tasks");
        const data = await response.data;
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch tasks", error);
      }
    };

    fetchTasks().then(() => console.log("Fetched tasks successfully"));
  }, []);

  return (
    <>
      <div className="w-full flex flex-col items-center">
        <div className="header-height"></div>
        <div className="container flex flex-col items-start justify-center px-4 text-black w-full">
          <h1 className="text-left my-4 text-white font-bold text-2xl">
            Tasks
          </h1>
          <hr className="w-full border-white opacity-20 mb-4" />

          <div className="flex flex-col w-full space-y-4">
            {TASKS.map((task) => {
              const totalLoggedHours = task.dailyLogs.reduce(
                (acc, log) => acc + log.hours,
                0
              );
              const progress =
                (totalLoggedHours / task.totalAllocatedHours) * 100;

              return (
                <Card
                  key={task.id}
                  className="bg-[#191919] border-0 border-b border-white/20 rounded-none"
                >
                  <CardHeader>
                    <CardTitle>{task.name}</CardTitle>
                    <CardDescription>
                      Total Allocated: {task.totalAllocatedHours}h | Logged:{" "}
                      {totalLoggedHours}h | Remaining:{" "}
                      {task.totalAllocatedHours - totalLoggedHours}h
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-4">
                      <form
                        onSubmit={(e) => e.preventDefault()}
                        className="mr-4 w-[30vw]"
                      >
                        <Progress
                          value={progress}
                          className="w-full mt-2 mb-4"
                        />
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
                        {task.dailyLogs.map((log, index) => (
                          <div
                            key={index}
                            className={`p-2 rounded text-xs flex flex-col items-center min-w-[70px] ${
                              log.hours >= log.target
                                ? "bg-green-600/20 text-green-500"
                                : "bg-red-600/20 text-red-500"
                            }`}
                          >
                            <span className="font-medium">
                              {formatDate(log.date)}
                            </span>
                            <span>
                              {log.hours}/{log.target}h
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
        </div>
      </div>
    </>
  );
}
