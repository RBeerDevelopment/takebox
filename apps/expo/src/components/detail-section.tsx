import React from "react";
import { View, Text } from "react-native";
import { DetailRow } from "./detail-row";
import { OpenClosedRow } from "./open-closed-row";

import * as WebBrowser from "expo-web-browser";

interface Props {
  restaurant?: {
    formatted_address?: string;
    current_opening_hours?: {
      open_now?: boolean;
    };
    url?: string;
    website?: string;
  };
}

export function DetailSection(props: Props): React.ReactElement {
  const { restaurant } = props;

  if (!restaurant) return <></>;
  return (
    <View className="mx-6 my-4 flex flex-col">
      <Text className="mb-4 text-lg font-bold">Details</Text>
      <DetailRow
        iconName="map"
        text={restaurant?.formatted_address}
        allowCopy
      />
      <OpenClosedRow
        isOpen={Boolean(restaurant?.current_opening_hours?.open_now)}
      />
      {restaurant?.url && (
        <DetailRow
          iconName="google-maps"
          text="Google Maps"
          onPress={() => WebBrowser.openBrowserAsync(restaurant?.url || "")}
        />
      )}

      {restaurant?.website && (
        <DetailRow
          iconName="web"
          text="Website"
          onPress={() => WebBrowser.openBrowserAsync(restaurant?.website || "")}
        />
      )}
    </View>
  );
}
