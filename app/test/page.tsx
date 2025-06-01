import { Button, Card } from "@/shared/ui";

export default function Page() {
  return (
    <div className="w-screen">
      <div className="relative w-62 h-50 overflow-hidden mx-auto">
        <Button className="peer/left absolute left-0 h-full w-10 top-0 bottom-0 rounded-r-none z-50 opacity-70 hover:opacity-100 ">
          123
        </Button>

        <Button className="peer/right absolute right-0 h-full top-0 bottom-0 w-10 rounded-l-none z-50 peer-hover/left:z-20 peer-hover/left:opacity-0">
          peer right
        </Button>

        <Card className="shadow-lg h-full rounded-lg flex items-center justify-center z-60">
          Card Content
        </Card>
      </div>
    </div>
  );
}
