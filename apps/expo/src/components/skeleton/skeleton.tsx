import { View } from "react-native";
import { cn } from "../../utils";

interface Props {
  mods?: string;
}
export function Skeleton(props: Props) {
  return (
    <View className={cn("bg-[#dadada] animate-pulse rounded-md w-full", props.mods)} />
  );
}
