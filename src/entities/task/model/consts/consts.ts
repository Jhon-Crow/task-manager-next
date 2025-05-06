import { TypeDifficultTask, TypePriorityTask } from "../types/task";

export const difficulty: Record<NonNullable<TypeDifficultTask>, string> = {
  HARD: "Тяжелая",
  MIDDLE: "Средняя",
  EASY: "Легкая",
} as const;

export const priority: Record<NonNullable<TypePriorityTask>, string> = {
  HIGH: "Срочный",
  AVERAGE: "Умеренный",
  LOW: "Минимальный",
} as const;
