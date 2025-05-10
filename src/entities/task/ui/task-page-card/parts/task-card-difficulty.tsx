import { TypeDifficultTask } from "../../../model/types/task";
import { TaskDifficultyIcon } from "../../tasks-icons/difficulty-icon";

export const TaskCardDifficulty = ({
  difficulty,
}: {
  difficulty: TypeDifficultTask;
}) => <TaskDifficultyIcon difficult={difficulty} className="size-12" />;
