import { store } from "@/lib";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { Provider } from "react-redux";

export default function RootLayout() {
  return (
    <>
      <Provider store={store}>
        <Stack screenOptions={{ headerShown: false }} />{" "}
        {/* ✅ this hides all headers */}
        <StatusBar style="auto" />
      </Provider>
    </>
  );
}
