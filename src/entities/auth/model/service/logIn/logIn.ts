"use server";

import { signIn } from "@/entities/auth";
import { AuthError } from "next-auth";

export async function logIn(prevState: unknown, formData: unknown) {
  if (!(formData instanceof FormData)) {
    return {
      message: "Invalid form data",
    };
  }

  try {
    await signIn("credentials", {
      ...Object.fromEntries(formData.entries()),
      redirectTo: "/tasks",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin": {
          return {
            message: "Неверный логин или пароль",
          };
        }
        default: {
          return {
            message: "Неизвестная ошибка",
          };
        }
      }
    }
    throw error;
  }
}
