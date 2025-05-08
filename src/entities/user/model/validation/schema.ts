import {z} from "zod";
import {Role} from "@/shared/lib/db/generated";

export const userFormSchema = z.object({
  firstname: z.string().max(25).min(4),
  // lastname: z.string().max(25).min(4).optional(),
  // imageUrl: z.string().max(100).optional(),
  password: z.string().max(40).min(8),
  // confirmPassword: z.string(),
  email: z.string().max(25).min(4), //todo need better detalization
  role: z.nativeEnum(Role)
})
//         .superRefine(({ confirmPassword, password }, ctx) => {
//   if (confirmPassword !== password) {
//     ctx.addIssue({
//       code: z.ZodIssueCode.custom,
//       message: "Пароль не совпал",
//       path: ['confirmPassword'],
//       fatal: true
//     });
//     return z.NEVER;
//   }
// })
    // .transform(data => {
    //   const {confirmPassword, ...rest} = data;
    //   return rest;
    // })
;
