import { View } from "react-native";
import { Skeleton } from "./skeleton";

export function SearchResultsSkeleton() {
   
    return (
        <View className="flex flex-col w-full p-4">
            <Skeleton mods="h-6 w-40 mb-2" />
            <Skeleton mods="h-4 w-64" />
        </ View>
    );
}