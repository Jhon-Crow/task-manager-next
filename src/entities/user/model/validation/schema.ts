import { z } from "zod";
import { Role } from "@/shared/lib/db/generated";

export const userFormSchemaBase = z.object({
  firstname: z.string().max(25).min(4),
  lastname: z.string().max(25).min(0).optional(),
  imageUrl: z.string().max(200).optional(),
  email: z.string().max(25).min(4).email("Некорректный email"), //todo need better detalization
  role: z.nativeEnum(Role),
});

export const userUpdateFormSchema = userFormSchemaBase;

export const userCreateFormServerSchema = userFormSchemaBase.extend({
  password: z.string().max(40).min(8),
});

export const userCreateFormClientSchema = userCreateFormServerSchema
  .extend({
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароль не совпадает",
    path: ["confirmPassword"],
  })
  .transform((data) => {
    const { confirmPassword: _confirmPassword, ...rest } = data;
    return rest;
  });
