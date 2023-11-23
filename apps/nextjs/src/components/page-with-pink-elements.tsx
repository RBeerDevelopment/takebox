import React from "react";

interface Props {
  children: React.ReactNode;
}
export function PageWithPinkElements(props: Props): React.ReactElement {
  const { children } = props;
  return (
    <main className="relative flex h-screen w-screen flex-col px-8 py-4">
      <div className="bg-pink/40 absolute -left-12 top-20 -z-20 h-40 w-40 rounded-3xl" />
      <div className="bg-pink/50 absolute -right-12 -top-12 -z-20 h-40 w-40 rounded-3xl" />
      <div className="bg-pink/60 absolute -right-12 top-[700px] -z-20 h-20 w-80 rounded-3xl" />
      {children}
    </main>
  );
}
