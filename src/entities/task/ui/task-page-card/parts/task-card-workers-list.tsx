import { TypeTaskWorker } from "@/entities/task/model/types/task";
import { TaskCardWorker } from "./task-card-worker";
import { Ellipsis } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui";
import Link from "next/link";
import { Routes } from "@/shared/routes/paths";

export const TaskCardWorkersList = ({
  workers,
}: {
  workers?: TypeTaskWorker[];
}) => {
  if (!(workers?.length && workers.length > 0)) return <p>Нет Работников</p>;
  let workersInTooltip: TypeTaskWorker[] | undefined;

  if (workers.length > 3) {
    workersInTooltip = workers.slice(3, workers.length);
    workers = workers.slice(0, 3);
  }

  return (
    <div className="flex gap-x-6">
      <div className="flex items-center justify-end flex-row-reverse">
        {workers.map((worker, index, array) => (
          <TaskCardWorker
            worker={worker}
            key={worker.id}
            position={
              index === 0
                ? "first"
                : index === array.length - 1
                ? "last"
                : "center"
            }
          />
        ))}
      </div>
      {workersInTooltip && workersInTooltip.length > 0 && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Ellipsis className="size-8 border border-accent-foreground bg-muted rounded-full hover:p-0.5 hover:scale-115 duration-750 transition-[padding,transform]" />
          </TooltipTrigger>
          <TooltipContent>
            <ol>
              {workersInTooltip.map((worker, index) => (
                <li key={index}>
                  <Link
                    className="hover:underline"
                    href={Routes.USER(worker.id)}
                  >
                    {index + 4}. {worker.firstname} {worker.lastname}
                  </Link>
                </li>
              ))}
            </ol>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
};
