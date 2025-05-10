import { TypeUser } from "@/entities/user/types";
import { TypeTask } from "../../model/types/task";
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
  author,
  className,
  users,
}: {
  task: TypeTask;
  author?: TypeUser;
  className?: string;
  users?: Pick<TypeUser, "id" | "firstname" | "lastname" | "imageUrl">[];
}) {
  return (
    <TaskCardWrapper className={className}>
      <TaskCardInfoWrapper>
        <TaskCardHeaderWrapper>
          <TaskCardTitle title={task.title} />
          {author && <TaskPageAuthorField author={author} />}
        </TaskCardHeaderWrapper>
        {task.description && (
          <TaskCardDescription description={task.description} />
        )}
        <TaskCardFooterWrapper>
          <TaskCardWorkersList workers={users} />
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
