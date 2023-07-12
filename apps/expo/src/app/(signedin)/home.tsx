import React from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";

import { PreviousReviewSection } from "~/components/previous-review/previous-review-section";
import { SearchInput } from "../../components/search-input";

export default function HomeScreen() {
    const [searchQuery, setSearch] = React.useState("");

    const router = useRouter();

    return (
        <View className="flex h-full w-full flex-col items-center bg-white">
            <SearchInput
                placeholder="Search..."
                value={searchQuery}
                handleOnChange={setSearch}
                handleOnSubmit={() => {
                    router.push(`/search/${searchQuery}`);
                }}
            />
            <PreviousReviewSection />
        </View>
    );
}
