import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Food Nutrient Scanner" }} />
      <Stack.Screen name="about" options={{ title: "About" }} />
    </Stack>
  );
}
