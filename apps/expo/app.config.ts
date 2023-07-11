import { type ExpoConfig } from "@expo/config";

const CLERK_PUBLISHABLE_KEY =
  "pk_test_c3VidGxlLWZseS05OC5jbGVyay5hY2NvdW50cy5kZXYk";

process.env.EXPO_ROUTER_APP_ROOT = __dirname + "/src/app";

const defineConfig = (): ExpoConfig => ({
  name: "TakeBox",
  slug: "TakeBox",
  version: "1.0.0",
  scheme: "beer.robin.takebox",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/icon.png",
    resizeMode: "contain",
    backgroundColor: "#2e026d",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: false,
    bundleIdentifier: "beer.robin.takebox",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/icon.png",
      backgroundColor: "#2e026d",
    },
  },
  extra: {
    eas: {
      // projectId: "your-project-id",
    },
    CLERK_PUBLISHABLE_KEY,
  },
  plugins: [
    "./expo-plugins/with-modify-gradle.js",
    [
      "expo-location",
      {
        locationAlwaysAndWhenInUsePermission: `Allow TakeBox to use your location, to show you restaurants near you.`,
      },
    ],
  ],
});

export default defineConfig;
