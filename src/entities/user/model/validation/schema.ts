import {z} from "zod";
import {Role} from "@/shared/lib/db/generated";

export const userFormSchema = z.object({
  firstname: z.string().max(25).min(4),
  lastname: z.string().max(25).min(0).nullable().optional(),
  imageUrl: z.string().max(200).nullable().optional(),
  password: z.string().max(40).min(8),
  confirmPassword: z.string(),
  email: z.string().max(25).min(4).email('Некорректный email'),
  role: z.nativeEnum(Role)
})
    .refine((data) => data.password === data.confirmPassword, {
      message: "Пароль не совпадает",
      path: ["confirmPassword"],
    })
    .transform(data => {
      const { confirmPassword, ...rest } = data;
      return rest;
    });

export const userFormServerSchema = z.object({
    firstname: z.string().max(25).min(4),
    lastname: z.string().max(25).min(0).nullable().optional(),
    imageUrl: z.string().max(200).nullable().optional(),
    password: z.string().max(40).min(8),
    email: z.string().max(25).min(4).email('Некорректный email'), 
    role: z.nativeEnum(Role)
})

export const userFormUpdateSchema = z.object({
  firstname: z.string().max(25).min(4),
  lastname: z.string().max(25).min(0).nullable().optional(),
  imageUrl: z.string().max(200).nullable().optional(),
  email: z.string().max(25).min(4).email('Некорректный email'), //todo need better detalization
  role: z.nativeEnum(Role)
})
    // .refine((data) => data.password === data.confirmPassword, {
    //   message: "Пароль не совпадает",
    //   path: ["confirmPassword"],
    // })
    // .transform(data => {
    //   const { confirmPassword, ...rest } = data;
    //   return rest;
    // });

export const userFormUpdateServerSchema = z.object({
    firstname: z.string().max(25).min(4),
    lastname: z.string().max(25).min(0).nullable().optional(),
    imageUrl: z.string().max(200).nullable().optional(),
    email: z.string().max(25).min(4).email('Некорректный email'), //todo need better detalization
    role: z.nativeEnum(Role)
})