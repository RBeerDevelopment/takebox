process.env.EXPO_ROUTER_APP_ROOT = __dirname + "/src/app";

module.exports = function (api) {
  api.cache(true);
  return {
    plugins: [
      ["module:react-native-dotenv"],
      require.resolve("expo-router/babel"),
      "nativewind/babel",
      [
        "module-resolver",
        {
          alias: {
            "@components": "./components/",
            "@hooks": "./hooks/",
            "@state": "./state/",
            "@utils": "./utils/",
          },
        },
      ],
    ],
    presets: ["babel-preset-expo"],
  };
};
