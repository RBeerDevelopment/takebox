import React from "react";
import { Text } from "react-native";
import { useNavigation } from "expo-router";
import { Tabs } from "expo-router/tabs";

import { colors } from "~/utils/colors";
import { IconComponent } from "~/components/icon-button/icon-component";
import { cn } from "~/utils";

export default function TabLayout() {
  const router = useNavigation();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: "#020617" },
        unmountOnBlur: false,
      }}
    >
      <Tabs.Screen
        name="(main)"
        options={{
          // This tab will no longer show up in the tab bar.

          title: "Home",
          tabBarLabel: ({ focused }) => (
            <Text
              className={cn(
                "text-[10px]",
                focused ? "text-primary" : "text-white",
              )}
            >
              Main
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <IconComponent
              iconFont="material"
              iconName="home"
              iconColor={focused ? colors.primary : "white"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarLabel: ({ focused }) => (
            <Text
              className={cn(
                "text-[10px]",
                focused ? "text-primary" : "text-white",
              )}
            >
              Profile
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <IconComponent
              iconFont="material"
              iconName="person"
              iconColor={focused ? colors.primary : "white"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
