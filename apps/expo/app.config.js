const CLERK_PUBLISHABLE_KEY =
  process.env.CLERK_PUBLISHABLE_KEY ||
  "pk_test_c3VidGxlLWZseS05OC5jbGVyay5hY2NvdW50cy5kZXYk";

process.env.EXPO_ROUTER_APP_ROOT = __dirname + "/src/app";

const defineConfig = () => ({
  name: "Flavoury",
  slug: "TakeBox",
  version: "0.4.0",
  scheme: "beer.robin.takebox",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/icon.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: false,
    bundleIdentifier: "beer.robin.takebox",
    buildNumber: "11",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/icon.png",
      backgroundColor: "#2e026d",
    },
  },
  extra: {
    eas: {
      projectId: "50e70c62-232a-40f3-8d5f-9c92eae92580",
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
    "expo-localization",
    "expo-router",
  ],
});

export default defineConfig;
