import React from "react";
import { View } from "react-native";
import * as WebBrowser from "expo-web-browser";

import { DetailRow } from "./detail-row";
import { OpenClosedRow } from "./open-closed-row";
import { ThemeableText } from "./themeable/themable-text";

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
      <ThemeableText className="mb-4 text-lg font-bold ">Details</ThemeableText>
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
          onPress={() =>
            void WebBrowser.openBrowserAsync(restaurant?.url || "")
          }
        />
      )}

      {restaurant?.website && (
        <DetailRow
          iconName="web"
          text="Website"
          onPress={() =>
            void WebBrowser.openBrowserAsync(restaurant?.website || "")
          }
        />
      )}
    </View>
  );
}
