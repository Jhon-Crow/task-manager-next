import { ReviewMessagesList } from "@/entities/review";
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
import { Session } from "next-auth";

export function TaskPageCard({
  task,
  className,
  sessionUser,
  withReview = true,
}: {
  task: TypeTask;
  className?: string;
  sessionUser: Session["user"];
  withReview?: boolean;
}) {
  return (
    <div className="space-y-5">
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
          <TaskCardDeadline
            deadline={task.deadline}
            createdAt={task.createdAt}
          />
          <TaskCardCreatedAt createdAt={task.createdAt} />
        </TaskCardDatesWrapper>
      </TaskCardWrapper>
      {withReview && (
        <ReviewMessagesList reviews={task.reviews} sessionUser={sessionUser} />
      )}
    </div>
  );
}
