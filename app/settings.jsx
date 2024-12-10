import React, { useState } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Settings() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>App Settings</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Dark Mode</Text>
          <Switch
            value={darkMode}
            onValueChange={(value) => setDarkMode(value)}
          />
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Notifications</Text>
          <Switch
            value={notifications}
            onValueChange={(value) => setNotifications(value)}
          />
        </View>
        <Text
          style={styles.backButton}
          onPress={() => router.push("/")}
        >
          Back to Main Screen
        </Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    marginVertical: 10,
  },
  settingText: {
    fontSize: 18,
  },
  backButton: {
    marginTop: 30,
    color: "blue",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
