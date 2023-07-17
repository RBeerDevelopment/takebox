import { ThemeableView } from "../themeable/themable-view";
import { Skeleton } from "./skeleton";

export function SearchResultsSkeleton() {
  return (
    <ThemeableView className="flex w-full flex-col p-4">
      <Skeleton mods="h-6 w-40 mb-2" />
      <Skeleton mods="h-4 w-64" />
    </ThemeableView>
  );
}
