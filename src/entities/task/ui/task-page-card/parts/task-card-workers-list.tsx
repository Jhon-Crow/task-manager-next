import { TypeTaskWorker } from "@/entities/task/model/types/task";
import { TaskCardWorker } from "./task-card-worker";
import { Ellipsis } from "lucide-react";

export const TaskCardWorkersList = ({
  workers,
}: {
  workers?: TypeTaskWorker[];
}) =>
  workers ? (
    <div className="flex items-center justify-end flex-row-reverse">
      {workers.slice(0, 3).map((worker, index, array) => (
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
      {workers.length > 3 && <Ellipsis />}
    </div>
  ) : (
    <p>Нет Работников</p>
  );
