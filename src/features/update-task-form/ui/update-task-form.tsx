import { TaskForm } from "@/entities/task";
import { updateTask } from "@/entities/task/model/service/updateTask/updateTask";
import { TypeTaskForm } from "@/entities/task/public-types";
import { useNewTaskContext } from "@/shared/hooks/useNewTaskContext";
import { useTaskContext } from "@/shared/hooks/useTaskContext";
import { useMemo } from "react";

export default function UpdateTaskForm() {
  const { task } = useTaskContext();
  const { setNewTask: setTask } = useNewTaskContext();
  const handleSetTask = (values: Partial<TypeTaskForm>) => {
    setTask({ ...values });
  };

  const defaultValues = useMemo(
    () => ({
      deadline: task.deadline,
      title: task.title,
      description: task.description || "",
      difficulty: task.difficulty || undefined,
      priority: task.priority || undefined,
    }),
    [
      task.deadline,
      task.description,
      task.difficulty,
      task.priority,
      task.title,
    ]
  );
  return (
    <TaskForm
      defaultValues={defaultValues}
      id={task.id}
      submit={(values: TypeTaskForm) => updateTask(task.id, values)}
      sideEffect={handleSetTask}
    />
  );
}
