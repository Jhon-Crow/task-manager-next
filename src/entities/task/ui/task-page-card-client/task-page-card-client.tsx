import {
  TaskCardCreatedAt,
  TaskCardDatesWrapper,
  TaskCardFooterWrapper,
  TaskCardHeaderWrapper,
  TaskCardIconsWrapper,
  TaskCardInfoWrapper,
  TaskCardWrapper,
} from "../task-page-card/parts";
import {
  TaskCardTitleClient,
  TaskCardDescriptionClient,
  TaskCardPriorityClient,
  TaskCardDifficultyClient,
  TaskCardDeadlineClient,
} from "./parts";
import { TaskCardAuthorClient } from "./parts/taks-card-author-client";
import { TaskCardWorkersListClient } from "./parts/task-card-workers-client";

export const TaskPageCardClient = ({ className }: { className?: string }) => {
  return (
    <TaskCardWrapper className={className}>
      <TaskCardInfoWrapper>
        <TaskCardHeaderWrapper>
          <TaskCardTitleClient />
          <TaskCardAuthorClient />
        </TaskCardHeaderWrapper>
        <TaskCardDescriptionClient />
        <TaskCardFooterWrapper>
          <TaskCardWorkersListClient />
          <TaskCardIconsWrapper>
            <TaskCardPriorityClient />
            <TaskCardDifficultyClient />
          </TaskCardIconsWrapper>
        </TaskCardFooterWrapper>
      </TaskCardInfoWrapper>
      <TaskCardDatesWrapper>
        <TaskCardDeadlineClient />
        <TaskCardCreatedAt createdAt={new Date()} />
      </TaskCardDatesWrapper>
    </TaskCardWrapper>
  );
};
