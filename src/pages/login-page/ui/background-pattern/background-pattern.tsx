"use client";

import { cn } from "@/shared/lib/utils";
import { Card } from "@/shared/ui";
import { useBackgroundContext } from "../../hook/useBackgroundContext";

function GlassCard({ className }: { className?: string }) {
  const { isFocused } = useBackgroundContext();
  return (
    <Card
      className={cn(
        "absolute p-0 backdrop-blur-[8.3px] [-webkit-backdrop-filter:blur(8.3px)] bg-card/10 overflow-hidden transition-transform",
        {
          ["blur-sm scale-105"]: isFocused && isFocused !== "submit",
          ["blur-md scale-100"]: isFocused === "submit",
        },
        className
      )}
    >
      <div
        className={cn("w-full h-full bg-accent-foreground/10 transition-all", {
          ["blur-sm"]: isFocused,
        })}
      />
    </Card>
  );
}

export function BackgroundPatter() {
  const { isFocused } = useBackgroundContext();
  return (
    <div
      className={cn(
        "absolute w-screen h-screen -z-10 bg-sidebar transition-transform duration-500",
        {
          ["scale-101"]: isFocused,
          ["translate-y-2"]: isFocused === "email",
          ["translate-y-4"]: isFocused === "password",
        }
      )}
    >
      <GlassCard className="absolute top-[20%] left-[65%] w-[30rem] h-[6rem] rotate-[5deg]" />
      <GlassCard className="absolute top-[1%] left-[2%] w-[15rem] h-[12rem] rotate-[5deg]" />
      <GlassCard className="absolute top-[20%] left-[30%] w-[25rem] h-[15rem] rotate-[-12deg]" />
      <GlassCard className="absolute top-[15%] left-[35%] w-[5rem] h-[12rem] rotate-[32deg]" />

      <GlassCard className="absolute top-[50%] left-[10%] w-[6rem] h-[6rem] rotate-[5deg]" />
      <GlassCard className="absolute top-[50%] left-[90%] w-[2rem] h-[2rem] rotate-[45deg]" />
      <GlassCard className="absolute top-[60%] left-[62%] w-[5rem] h-[5rem] rotate-[5deg]" />

      <GlassCard className="absolute top-[62%] left-[30%] w-[8rem] h-[6rem] rotate-[-5deg]" />
      <GlassCard className="absolute top-[55%] left-[75%] w-[4rem] h-[3.5rem] rotate-[25deg]" />

      <GlassCard className="absolute top-[75%] left-[90%] w-[4rem] h-[10rem] rotate-[20deg]" />
    </div>
  );
}
