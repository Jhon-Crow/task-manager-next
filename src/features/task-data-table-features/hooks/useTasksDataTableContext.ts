import { useContext } from "react";
import { TasksDataTableContext } from "../contexts/TasksDataTableContext";

export const useTasksDataTableContext = () => {
  const context = useContext(TasksDataTableContext);
  if (!context) {
    throw new Error(
      "Хук useTasksDataTableContext должен использоваться внутри провайдера TasksDataTableProvider"
    );
  }
  return context;
};
