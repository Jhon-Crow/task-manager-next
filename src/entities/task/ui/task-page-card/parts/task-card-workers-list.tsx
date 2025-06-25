import { TypeTaskWorker } from "@/entities/task/model/types/task";
import { TaskCardWorker } from "./task-card-worker";
import { TaskWorkersTooltip } from "./task-workers-tooltip";

export const TaskCardWorkersList = ({
  workers,
}: {
  workers?: TypeTaskWorker[];
}) => {
  if (!workers?.length) return <p>Нет Работников</p>;
  const workersInTooltip = workers.slice(3, workers.length);

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
      <TaskWorkersTooltip workers={workersInTooltip} />
    </div>
  );
};
