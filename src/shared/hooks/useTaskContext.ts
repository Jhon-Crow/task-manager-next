import { useContext } from "react";
import { TaskContext } from "../contexts";

export const useTaskContext = () => {
  const task = useContext(TaskContext);
  if (!task) {
    throw new Error(
      "useTaskContext должен быть использован внутри TaskProvider"
    );
  }
  return task;
};
