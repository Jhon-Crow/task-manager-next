import type { TypeTask } from "../../model/types/task";
import {
  TaskCardDeadline,
  TaskCardCreatedAt,
  TaskCardDatesWrapper,
  TaskCardDescription,
  TaskCardDifficulty,
  TaskCardFooterWrapper,
  TaskCardHeaderWrapper,
  TaskCardIconsWrapper,
  TaskCardInfoWrapper,
  TaskCardPriority,
  TaskCardTitle,
  TaskCardWorkersList,
  TaskCardWrapper,
  TaskPageAuthorField,
} from "./parts";

export function TaskPageCard({
  task,
  className,
}: {
  task: TypeTask;
  className?: string;
}) {
  return (
    <TaskCardWrapper className={className}>
      <TaskCardInfoWrapper>
        <TaskCardHeaderWrapper>
          <TaskCardTitle title={task.title} />
          <TaskPageAuthorField author={task.author} />
        </TaskCardHeaderWrapper>
        {task.description && (
          <TaskCardDescription description={task.description} />
        )}
        <TaskCardFooterWrapper>
          <TaskCardWorkersList workers={task.workers} />
          <TaskCardIconsWrapper>
            <TaskCardPriority priority={task.priority} />
            <TaskCardDifficulty difficulty={task.difficulty} />
          </TaskCardIconsWrapper>
        </TaskCardFooterWrapper>
      </TaskCardInfoWrapper>
      <TaskCardDatesWrapper>
        <TaskCardDeadline deadline={task.deadline} createdAt={task.createdAt} />
        <TaskCardCreatedAt createdAt={task.createdAt} />
      </TaskCardDatesWrapper>
    </TaskCardWrapper>
  );
}
