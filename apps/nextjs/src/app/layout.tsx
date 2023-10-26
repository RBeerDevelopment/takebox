import { BottomBar } from "~/components/bottom-bar";
import { PageWithPinkElements } from "~/components/page-with-pink-elements";

import "./globals.css";

import { type Metadata } from "next";
import { cn } from "@/lib/utils";

import { fontSans } from "~/utils/font-sans";

export const metadata: Metadata = {
  title: "Flavoury App",
  description: "Flavoury App Landing Page",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "bg-background min-h-screen font-sans antialiased",
          fontSans.variable,
        )}
      >
        <PageWithPinkElements>
          {children}
          <BottomBar />
        </PageWithPinkElements>
      </body>
    </html>
  );
}
