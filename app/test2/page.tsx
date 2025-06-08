import { Button, Card, CardContent } from "@/shared/ui";

export default function Page() {
  return (
    <div className="w-screen">
      <div className="flex mx-auto w-[250px] relative">
        <div className="group">
          <Button className="h-full block absolute">123</Button>
          <div></div>
        </div>
        <Card>
          <CardContent className="w-[150px] h-[200px]">123</CardContent>
        </Card>
        <div className="group">
          <Button>123</Button>
          <div></div>
        </div>
      </div>
    </div>
  );
}
