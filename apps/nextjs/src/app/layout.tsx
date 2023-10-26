import { BottomBar } from "~/components/bottom-bar";
import { PageWithPinkElements } from "~/components/page-with-pink-elements";

import "./globals.css";

import { type Metadata } from "next";

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
      <body>
        <PageWithPinkElements>
          {children}
          <BottomBar />
        </PageWithPinkElements>
      </body>
    </html>
  );
}
