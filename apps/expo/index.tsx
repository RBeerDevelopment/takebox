import { registerRootComponent } from "expo";
import { ExpoRoot } from "expo-router";

import "react-native-console-time-polyfill";

// Must be exported or Fast Refresh won't update the context
export function App() {
  const ctx = require.context("./src/app");
  return <ExpoRoot context={ctx} />;
}

registerRootComponent(App);
