import Link from "next/link";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/feed", label: "Feed" },
  { href: "/artists/kim-sujin", label: "Artists" },
  { href: "/my/subscriptions", label: "Subscriptions" },
  { href: "/cart", label: "Cart" },
  { href: "/orders", label: "Orders" },
] as const;

export function GlobalNav({ className }: { className?: string }) {
  return (
    <nav
      className={cn(
        "fixed top-0 left-1/2 z-50 -translate-x-1/2 w-[1440px] bg-cyan-50/60 border-b border-cyan-100/80 shadow-sm backdrop-blur-sm",
        className
      )}
    >
      <div className="max-w-[1440px] mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/feed" className="text-cyan-900 font-semibold text-lg font-atkinson">
          printtie
        </Link>
        <div className="flex space-x-6">
          {navItems.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className="text-cyan-700 hover:text-cyan-900 font-atkinson text-[14px]"
            >
              {it.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
