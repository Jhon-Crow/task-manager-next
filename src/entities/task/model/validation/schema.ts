import { z } from "zod";
import { Difficulty, Priority } from "@/shared/lib/db/generated";

export const taskFormSchema = z.object({
  title: z.string().max(25).min(2),
  deadline: z.date(),
  description: z.string().max(300).optional(),
  difficulty: z.nativeEnum(Difficulty).optional(),
  priority: z.nativeEnum(Priority).optional(),
  authorId: z.string(),
  workersId: z.array(z.string()),
});
