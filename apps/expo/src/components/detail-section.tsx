import React from "react";
import { View } from "react-native";
import * as WebBrowser from "expo-web-browser";

import { DetailRow } from "./detail-row";
import { ThemeableText } from "./themeable/themable-text";
import { type Restaurant } from ".prisma/client";

interface Props {
  restaurant?: Restaurant;
}

export function DetailSection(props: Props): React.ReactElement {
  const { restaurant } = props;

  if (!restaurant) return <></>;

  return (
    <View className="mx-6 my-4 flex flex-col">
      <ThemeableText className="mb-4 text-lg font-bold ">Details</ThemeableText>
      <DetailRow iconName="map" text={restaurant?.address} allowCopy />
      {/* <OpenClosedRow
        isOpen={Boolean(restaurant?.current_opening_hours?.open_now)}
      /> */}
      {restaurant?.googleUrl && (
        <DetailRow
          iconName="google-maps"
          text="Google Maps"
          onPress={() =>
            void WebBrowser.openBrowserAsync(restaurant?.googleUrl || "")
          }
        />
      )}

      {restaurant?.websiteUrl && (
        <DetailRow
          iconName="web"
          text="Website"
          onPress={() =>
            void WebBrowser.openBrowserAsync(restaurant?.websiteUrl || "")
          }
        />
      )}
    </View>
  );
}
