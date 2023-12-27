import React from "react";
import { Text } from "react-native";
import { Tabs } from "expo-router/tabs";

import { colors } from "~/utils/colors";
import { IconComponent } from "~/components/icon-button/icon-component";
import { cn } from "~/utils";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: "#020617" },
      }}
    >
      <Tabs.Screen
        name="(main)"
        options={{
          // This tab will no longer show up in the tab bar.
          href: "/",
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
          href: "/profile",
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
      <Tabs.Screen
        // Name of the route to hide.
        name="settings/modal"
        options={{
          // This tab will no longer show up in the tab bar.
          href: null,
        }}
      />
      <Tabs.Screen
        // Name of the route to hide.
        name="username-setup/modal"
        options={{
          // This tab will no longer show up in the tab bar.
          href: null,
        }}
      />
    </Tabs>
  );
}
