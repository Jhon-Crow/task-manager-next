import { TypeUser } from "@/entities/user/types";
import {} from "next-auth";

declare module "next-auth" {
  interface User {
    id: TypeUser["id"];
    email: TypeUser["email"];
    role: TypeUser["role"];
    image?: TypeUser["imageUrl"];
  }
  interface Session {
    user: User & {
      id: string;
      email: string;
    };
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    userId: TypeUser["id"];
    email: TypeUser["email"];
    role: TypeUser["role"];
  }
}
