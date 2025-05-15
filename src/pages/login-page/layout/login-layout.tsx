import { ReactNode } from "react";
import { BackgroundPatter } from "../ui/background-pattern/background-pattern";
import { BackgroundProvider } from "../provider/BackgroundProvider";

export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-screen flex items-center justify-center min-h-screen overflow-hidden">
      <BackgroundProvider>
        {children}
        <BackgroundPatter />
      </BackgroundProvider>
    </div>
  );
}
