import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/widgets/sidebar/ui/Sidebar";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "LexiFlow - Vocabulary Mastery",
  description: "Master your vocabulary with interactive lessons",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 pl-[256px]">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
