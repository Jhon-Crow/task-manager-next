import { Button } from "@/shared/ui";
import { ChevronDown } from "lucide-react";

export default async function RootPage() {
  return (
    <>
      Работаю{" "}
      <Button className="text-lg">
        <ChevronDown />
      </Button>
    </>
  );
}
