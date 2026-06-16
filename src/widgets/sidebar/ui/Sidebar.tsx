"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  GraduationCap, 
  BookOpen
} from "lucide-react";
import { cn } from "@/shared/lib/utils";

const navItems = [
  { name: "Dictionary", href: "/dictionary", icon: BookOpen },
  { name: "Lessons", href: "/lessons", icon: GraduationCap },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed bottom-0 left-0 right-0 h-[64px] w-full bg-sidebar flex flex-row items-center justify-around px-4 border-t border-indigo-100 z-50 md:top-0 md:bottom-auto md:h-screen md:w-[256px] md:flex-col md:justify-start md:p-4 md:border-r md:border-t-0">
      <div className="px-4 py-8 hidden md:block">
        <h1 className="text-3xl font-extrabold text-primary tracking-tight">Tung Sahur</h1>
      </div>
      
      <nav className="flex flex-row justify-around items-center w-full md:flex-col md:space-y-1 md:w-full">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href === "/lessons" && pathname?.startsWith("/lesson"));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col md:flex-row items-center gap-1 md:gap-4 px-4 py-1.5 md:px-4 md:py-3 rounded-xl transition-all font-semibold text-[10px] md:text-sm text-center md:text-left w-24 md:w-full justify-center md:justify-start",
                isActive 
                  ? "bg-accent text-white" 
                  : "text-slate hover:bg-indigo-50"
              )}
            >
              <item.icon size={20} className="shrink-0" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
