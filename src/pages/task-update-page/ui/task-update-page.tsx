import { TaskPageCardClient } from "@/entities/task";
import { TypeTaskWorker } from "@/entities/task/public-types";
import { getAllWorkers } from "@/entities/user";
import { WorkersDataTableWithFeatures } from "@/features/user-data-table-features";
import { TaskFormWidget } from "@/widgets/task-form-widget";
import { toast } from "sonner";

export default async function TaskUpdatePage() {
  const data = await getAllWorkers();
  let workers: TypeTaskWorker[] = [];
  if (!data.success) {
    toast.error(data.error.message);
  } else {
    workers = data.data;
  }
  return (
    <div className="flex gap-x-12 mx-auto max-w-[1200px] mt-6">
      <div className="flex flex-col flex-1 min-h-full justify-between">
        <TaskPageCardClient />
        <WorkersDataTableWithFeatures className="mb-12" workers={workers} />
      </div>

      <TaskFormWidget type="update" />
    </div>
  );
}
