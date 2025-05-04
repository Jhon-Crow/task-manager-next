import { prisma } from "@/shared/lib/db/prisma";
import { Button } from "@/shared/ui";
import { ChevronDown } from "lucide-react";
import { UserCard } from "@/entities/user/ui/usercard";

export default async function RootPage() {
  const data = await prisma.user.findMany();
  return (
    <>
      Работаю{" "}
      <Button className="text-lg">
        <ChevronDown />
      </Button>
      <div>
        {data.length > 0
          ? data.map((user) => (
              <UserCard key={user.id} userdata={user} />
              //         <div key={user.id}>
              //           <h1>
              //             {user.firstname} {user.lastname}
              //           </h1>
              //           <p>
              //             {user.email} {user.role}
              //           </p>
              //         </div>
            ))
          : null}
      </div>
      {/*<UserCard userdata={user}/>*/}
    </>
  );
}
