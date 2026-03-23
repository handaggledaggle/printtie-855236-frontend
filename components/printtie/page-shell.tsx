import { cn } from "@/lib/utils";

export function PageShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("w-[1440px] mx-auto flex flex-col", className)}>{children}</div>;
}
