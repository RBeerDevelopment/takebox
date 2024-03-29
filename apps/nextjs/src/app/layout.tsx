import { BottomBar } from "~/components/bottom-bar";
import { PageWithPinkElements } from "~/components/page-with-pink-elements";

import "./globals.css";

import { type Metadata } from "next";

import { fontSans } from "~/utils/font-sans";
import { cn } from "~/utils/shadcn";

export const metadata: Metadata = {
  title: "Flavoury App",
  description: "Flavoury App Landing Page",
  itunes: {
    appId: "6451152785",
  },
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
