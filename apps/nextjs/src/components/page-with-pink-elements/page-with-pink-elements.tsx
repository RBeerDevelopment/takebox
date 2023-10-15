import React from "react";

interface Props {
  children: React.ReactNode;
}
export function PageWithPinkElements(props: Props): React.ReactElement {
  const { children } = props;
  return (
    <main className="flex min-h-screen w-screen flex-col px-8 py-4">
      <div className="absolute -left-12 top-20 -z-20 h-40 w-40 rounded-3xl bg-primary/20" />
      <div className="absolute -right-12 -top-12 -z-20 h-40 w-40 rounded-3xl bg-primary/40" />
      <div className="absolute -right-12 top-[700px] -z-20 h-20 w-80 rounded-3xl bg-primary/20" />
      {children}
    </main>
  );
}
