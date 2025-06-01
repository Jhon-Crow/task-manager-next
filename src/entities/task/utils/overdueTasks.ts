"server only";

import { TypeTask } from "../model/types/task";

export const overdueTasks = (...tasks: TypeTask[]) => {
  console.log(tasks);
};
