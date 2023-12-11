import { cn } from "~/utils";
import { ThemeableView } from "./themeable/themable-view";

type Props = {
  className?: string;
  children: React.ReactNode;
};

export function ScreenWrapper(props: Props) {
  const { children, className } = props;
  return (
    <ThemeableView className={cn("bg-background h-full w-full", className)}>
      {children}
    </ThemeableView>
  );
}
