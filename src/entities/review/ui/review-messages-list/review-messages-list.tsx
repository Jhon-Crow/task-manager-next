import { TypeReview } from "@/entities/task/model/types/task";
import { Card, CardContent, CardFooter, CardHeader } from "@/shared/ui";
import { generateColors } from "../../utils/generateColors";
import { formatTimeToRuShort } from "@/shared/lib/format/formatDayToRuShort";
import { UserAvatar } from "@/entities/user";
import { Session } from "next-auth";
import { cn } from "@/shared/lib/utils";

export async function ReviewMessagesList({
  reviews,
  sessionUser,
}: {
  reviews: TypeReview[];
  sessionUser: Session["user"];
}) {
  if (!reviews.length) return null;
  return (
    <Card className="max-w-165">
      {reviews.map((review) => {
        const { author, createdAt, text } = review;
        const { firstname, lastname, role, imageUrl } = author;
        const style = generateColors(firstname, role, lastname);
        const thisUser = sessionUser.id === author.id;

        return (
          <Card
            key={review.id}
            className={thisUser ? "ml-auto" : "mr-auto"}
            style={style}
          >
            <CardHeader
              className={cn("flex min-w-30 items-center", {
                "justify-end": thisUser,
              })}
            >
              {imageUrl ? <UserAvatar user={author} /> : null}
              {firstname + (lastname ? " " + lastname : "")}
            </CardHeader>
            <CardContent>{text}</CardContent>
            <CardFooter>{formatTimeToRuShort(createdAt, true)}</CardFooter>
          </Card>
        );
      })}
    </Card>
  );
}
