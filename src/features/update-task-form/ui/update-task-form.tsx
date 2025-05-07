import { TaskForm } from "@/entities/task";
import { updateTask } from "@/entities/task/model/service/updateTask/updateTask";
import { TypeTaskForm } from "@/entities/task/public-types";
import { useNewTaskContext } from "@/shared/hooks/useNewTaskContext";
import { useTaskContext } from "@/shared/hooks/useTaskContext";
import { calucateDaysDiff } from "@/shared/lib/utils/calculateDays/calculateDats";
import { useMemo } from "react";

export default function UpdateTaskForm() {
  const { task } = useTaskContext();
  const { setNewTask: setTask } = useNewTaskContext();
  const deadline = calucateDaysDiff(task.deadline, task.createdAt);
  const handleSetTask = (values: Partial<TypeTaskForm>) => {
    setTask({ ...values });
  };

  const defaultValues = useMemo(
    () => ({
      deadline,
      title: task.title,
      description: task.description || "",
      difficulty: task.difficulty || undefined,
      priority: task.priority || undefined,
    }),
    [deadline, task.description, task.difficulty, task.priority, task.title]
  );
  return (
    <TaskForm
      defaultValues={defaultValues}
      submit={(values: TypeTaskForm) => updateTask(task.id, values)}
      sideEffect={handleSetTask}
    />
  );
}
