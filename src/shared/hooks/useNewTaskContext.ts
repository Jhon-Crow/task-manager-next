import { useContext } from "react";
import { NewTaskContext } from "../contexts/TaskContext/NewTaskContext";

export const useNewTaskContext = () => {
  const newTask = useContext(NewTaskContext);
  if (!newTask) {
    throw new Error(
      "useNewTaskContext должен быть использован внутри NewTaskProvider"
    );
  }
  return newTask;
};
