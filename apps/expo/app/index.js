import React from "react";

import { Text, TextInput, View } from "react-native";
import { Layout } from "../components/layout";
import { trpc } from "../utils/trpc";
import { useGeneralStore } from "../state";
import { FlashList } from "@shopify/flash-list";
import { Stack } from "expo-router";
import { SearchInput } from "../components/search-input";

export function HomeScreen() {
  const location = useGeneralStore((state) => state.location);
  // const { data: restaurants, refetch } =
  //   trpc.restaurant.nearbyRestaurantsByQuery.useQuery(
  //     {
  //       query: "Indian",
  //       lat: 52.51247375561962,
  //       lng: 13.471466397574297,
  //     },
  //     {
  //       enabled: !!location?.coords?.latitude && !!location?.coords?.longitude,
  //     },
  //   );

  const [search, setSearch] = React.useState("");

  console.log({ search });

  return (
    <Layout>
      <Stack.Screen name="Home" />
      <View className="h-full w-full items-center bg-gray-50">
        <SearchInput
          placeholder="Search..."
          value={search}
          handleOnChange={setSearch}
          handleOnSubmit={() => {
            /* Search */
          }}
        />
        <Text>Something else will be here in the future</Text>
      </View>
    </Layout>
  );
}
