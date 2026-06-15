"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  GraduationCap, 
  LogOut,
  Target,
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
    <aside className="fixed left-0 top-0 h-screen w-[256px] bg-sidebar flex flex-col p-4 border-r border-indigo-100">
      <div className="px-4 py-8">
        <h1 className="text-3xl font-extrabold text-primary tracking-tight">LexiFlow</h1>
      </div>
      
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href === "/lessons" && pathname?.startsWith("/lesson"));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-4 px-4 py-3 rounded-xl transition-all font-medium text-sm",
                isActive 
                  ? "bg-accent text-white" 
                  : "text-slate hover:bg-indigo-50"
              )}
            >
              <item.icon size={20} />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
