import { TaskPageCardClient } from "@/entities/task";
import { TaskFormWidget } from "@/widgets/task-form-widget";

export default function TaskCreatePage() {
  return (
    <div className="flex gap-x-12 mx-auto max-w-[1200px] items-start mt-6">
      <div>
          <TaskPageCardClient />
          <div>
            /
          </div>
      </div>

      <TaskFormWidget type="create" />
    </div>
  );
}
