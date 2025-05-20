import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Skeleton,
} from "@/shared/ui";

export default function Loading() {
  return (
    <Card>
      <CardHeader>
        <CardTitle> Загрузка...</CardTitle>
      </CardHeader>
      <CardContent>
        <Skeleton className="w-full h-24" />
      </CardContent>
    </Card>
  );
}
