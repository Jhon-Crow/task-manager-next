import { buildSelectors } from "@/shared/lib/store";
import { tasksListAdapter } from "../slices/tasksListSlice";

const { selectAll, selectTotal } = tasksListAdapter.getSelectors();

export const [useSelectAllTasks, selectAllTasks] = buildSelectors((state) =>
  state.tasksListSlice ? selectAll(state.tasksListSlice) : []
);
export const [useSelectTotalTasks, selectTotalTasks] = buildSelectors((state) =>
  state.tasksListSlice ? selectTotal(state.tasksListSlice) : 0
);
