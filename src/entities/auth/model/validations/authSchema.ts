import { z } from "zod";

export const authSchema = z.object({
  email: z.string().email("ТЫ ДЕБИЛ НАДО ЕМАЙЛ ВВОДИТЬ").max(100),
  password: z.string().max(100),
});
