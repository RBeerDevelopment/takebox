import { ThemeableView } from "./themeable/themable-view";

interface Props {
  children: React.ReactNode;
}

export function CentralItem(props: Props): React.ReactElement {
  const { children } = props;

  return (
    <ThemeableView className="flex h-full w-full flex-col items-center p-2">
      {children}
    </ThemeableView>
  );
}
