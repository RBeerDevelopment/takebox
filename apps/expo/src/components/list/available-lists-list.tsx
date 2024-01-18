import React from "react";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FlashList } from "@shopify/flash-list";

import { api } from "~/utils/api";
import { secInMs } from "~/utils/time-formatting/sec-in-ms";
import { ThemeableText } from "../themeable/themable-text";

interface Props {
  restaurantId: string;
  query: string;
}

export function AvailableListsList(props: Props): React.ReactElement {
  const { restaurantId, query } = props;

  const { mutateAsync: createList } = api.list.create.useMutation();
  const { mutate: addRestaurantToList } = api.list.addRestaurant.useMutation();

  const { data: ownLists } = api.list.getOwn.useQuery(undefined, {
    staleTime: secInMs(60),
    cacheTime: secInMs(60),
  });

  const filteredLists = ownLists?.filter((list) =>
    list.name.toLowerCase().includes(query),
  );

  async function addToNewList(listName: string) {
    const newListId = await createList({ name: listName });
    addRestaurantToList({ restaurantId, listId: newListId });
  }

  return (
    <View className="h-full px-1">
      <FlashList
        data={filteredLists}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="py-4"
            onPress={() =>
              addRestaurantToList({ restaurantId, listId: item.id })
            }
          >
            <View className="flex flex-row justify-between">
              <ThemeableText className="text-base">{item.name}</ThemeableText>
              <ThemeableText className="text-base">
                {item.nrOfRestaurants}
              </ThemeableText>
            </View>
          </TouchableOpacity>
        )}
        ListHeaderComponent={
          query.trim().length > 0 ? (
            <TouchableOpacity
              onPress={() => void addToNewList(query)}
              className="py-4"
            >
              <View className="mt-2 flex flex-row">
                <ThemeableText className="text-base">
                  Create new list{" "}
                </ThemeableText>
                <ThemeableText className="text-base italic">
                  {query}
                </ThemeableText>
              </View>
            </TouchableOpacity>
          ) : null
        }
        estimatedItemSize={5}
      />
    </View>
  );
}
