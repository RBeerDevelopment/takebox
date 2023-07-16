import { View } from "react-native";

import { cn } from "../../utils";

interface Props {
  mods?: string;
}
export function Skeleton(props: Props) {
  const { mods } = props;
  return (
    <View
      className={cn("w-full animate-pulse rounded-md bg-[#dadada]", mods || "")}
    />
  );
}
