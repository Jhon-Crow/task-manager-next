import { TaskPageCardClient } from "@/entities/task";
import { TaskFormWidget } from "@/widgets/task-form-widget";
import { getAllWorkers } from "@/entities/user";
import { toast } from "sonner";
import { WorkersDataTableWithFeatures } from "@/features/user-data-table-features";
import { TypeTaskWorker } from "@/entities/task/public-types";

export default async function TaskCreatePage() {
  let workers: TypeTaskWorker[] = [];
  const data = await getAllWorkers();
  if (!data.success) {
    toast.error("Не удалось получить данные");
  } else {
    workers = data.data;
  }
  return (
    <div className="flex gap-x-12 mx-auto max-w-[1200px] items-start mt-6">
      <div>
        <TaskPageCardClient />
        <div>
          <WorkersDataTableWithFeatures workers={workers} />
        </div>
      </div>

      <TaskFormWidget type="create" />
    </div>
  );
}
