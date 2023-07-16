import React from "react";
import { useRouter } from "expo-router";

import { LatestReviewSection } from "~/components/previous-review/latest-review-section";
import { ThemeableView } from "~/components/themeable/themable-view";
import { SearchInput } from "../../components/search-input";

export default function HomeScreen() {
  const [searchQuery, setSearch] = React.useState("");

  const router = useRouter();

  return (
    <ThemeableView className="flex h-full w-full flex-col items-center">
      <SearchInput
        placeholder="Search..."
        value={searchQuery}
        handleOnChange={setSearch}
        handleOnSubmit={() => {
          router.push(`/search/${searchQuery}`);
        }}
      />
      <LatestReviewSection />
    </ThemeableView>
  );
}
