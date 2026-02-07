"use client";

import Loading from "@/app/components/Loading";
import { getRequest } from "@/app/lib/fetchRequest";
import { useQuery } from "@tanstack/react-query";
import { ActivityLog } from "@/generated/prisma";

const LogPage = () => {
  const {
    data: logData,
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["logsActivity"],
    queryFn: () => getRequest({ url: "/api/logs" }),
  });

  if (isLoading) return <Loading />;

  if (isError) {
    return (
      <div className="w-full min-h-[300px] flex justify-center items-center flex-col gap-4">
        <h1 className="font-semibold text-red-500">
          Something went wrong while loading logs
        </h1>
        <button
          onClick={() => refetch()}
          className="bg-red-900/70 hover:bg-red-900 text-white px-4 py-2 rounded-md transition"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="w-full px-6 py-8 flex flex-col gap-6">
      <h1 className="font-bold text-2xl text-white">Activity Logs</h1>

      <div className="w-full max-w-3/4 mx-auto bg-[#111]/60 border border-white/5 shadow-lg rounded-lg p-4 max-h-[500px] overflow-y-auto">
        {!logData?.data?.length ? (
          <div className="text-center text-gray-400 py-12">
            No activity logs yet
          </div>
        ) : (
          <ul className="flex flex-col gap-3 h-[450px]">
            {logData.data.map((log: ActivityLog) => (
              <li
                key={log.id}
                className="bg-[#1a1a1a] border border-red-950/50 rounded-md px-4 py-3 hover:bg-[#222] transition"
              >
                <p className="text-sm text-white">
                  {log.metadata?.desc ?? "Activity recorded"}
                </p>

                {log.createdAt && (
                  <span className="text-xs text-gray-500 mt-1 block">
                    {new Date(log.createdAt).toLocaleString()}
                  </span>
                )}
              </li>
            ))}
            </ul>
        )}
      </div>
      <button onClick={() => refetch()} className="self-center font-bold px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-700 transition-all cursor-pointer w-[200px]">{isLoading ? <Loading/> : "Refetch"}</button>
    </div>
  );
};

export default LogPage;
