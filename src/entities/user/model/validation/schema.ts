import { z } from "zod";
import {Difficulty, Priority, Role} from "@/shared/lib/db/generated";

export const userFormSchema = z.object({
  firstname: z.string().max(25).min(4),
  password: z.string().max(40).min(8),
  email: z.string().max(25).min(4), //todo need better detalization
  // deadline: z.coerce.number().min(1).int(),
  // description: z.string().max(300).optional(),
  role: z.nativeEnum(Role)
  // priority: z.nativeEnum(Priority).optional(),
});
