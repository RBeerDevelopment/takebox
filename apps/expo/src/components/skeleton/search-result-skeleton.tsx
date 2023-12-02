import { ThemeableView } from "../themeable/themable-view";
import { Skeleton } from "./skeleton";

interface Props {
  count?: number;
}
export function SearchResultsSkeleton(props: Props) {
  return new Array(props.count ?? 5).fill("").map((_, idx) => (
    <ThemeableView key={idx} className="flex w-full flex-col p-4">
      <Skeleton mods="h-6 w-40 mb-2" />
      <Skeleton mods="h-4 w-64" />
    </ThemeableView>
  ));
}
