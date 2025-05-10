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

export const TaskPageCardClient = ({ className }: { className?: string }) => {
  return (
    <TaskCardWrapper className={className}>
      <TaskCardInfoWrapper>
        <TaskCardHeaderWrapper>
          <TaskCardTitleClient />
          {/* TODO Author когда добавится сессия */}
        </TaskCardHeaderWrapper>
        <TaskCardDescriptionClient />
        <TaskCardFooterWrapper>
          {/* TODO Workers когда добавлю таблицы для изменения работников*/}
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
