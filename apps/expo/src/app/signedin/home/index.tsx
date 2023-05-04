import React from "react";

import { Text, View } from "react-native";
import { useRouter } from "expo-router";
import { SearchInput } from "../../../components/search-input";

export default function HomeScreen() {
  const [searchQuery, setSearch] = React.useState("");

  const router = useRouter();

  return (
    <View className="h-full w-full items-center bg-gray-50">
      <SearchInput
        placeholder="Search..."
        value={searchQuery}
        handleOnChange={setSearch}
        handleOnSubmit={() => {
          router.push(`/signedin/search/${searchQuery}`);
        }}
      />
      <Text>Something else will be here in the future</Text>
    </View>
  );
}
