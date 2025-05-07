import {TypeRoleUser} from "@/entities/user/model/types/user";

export const role: Record<NonNullable<TypeRoleUser>, string> = {
  ADMIN: 'Администратор',
  MANAGER: 'Менеджер',
  WORKER: 'Работник'
} as const;


// export const priority: Record<NonNullable<TypePriorityTask>, string> = {
//   HIGH: "Срочный",
//   AVERAGE: "Умеренный",
//   LOW: "Минимальный",
// } as const;
