import getQueryClient from "@/lib/get-query-client";
import { getTasks } from "@/lib/server-api";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import TaskList from "../components/TaskList";

export const dynamic = "force-dynamic";
export const runtime = "edge";

export default async function Tasks() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <>
      <div className="w-full flex flex-col items-center">
        <div className="header-height"></div>
        <div className="container flex flex-col items-start justify-center px-4 text-black w-full">
          <h1 className="text-left my-4 text-white font-bold text-2xl">
            Tasks
          </h1>
          <hr className="w-full border-white opacity-20 mb-4" />

          <HydrationBoundary state={dehydratedState}>
            <TaskList />
          </HydrationBoundary>
        </div>
      </div>
    </>
  );
}
