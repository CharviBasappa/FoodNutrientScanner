import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

export default function About() {
  const router = useRouter();

  return (
    <SafeAreaProvider>
      <LinearGradient colors={["#FFDAB9", "#FFB347"]} style={styles.container}>
        <SafeAreaView style={styles.content}>
          <Text style={styles.title}>Nutrient Scanner</Text>
          <Text style={styles.description}>
            The Nutrient Analyzer app allows you to upload images of food items,
            analyzes them, and provides detailed nutritional information.
          </Text>
          <TouchableOpacity style={styles.button} onPress={() => router.push("/")}>
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </LinearGradient>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000", // Matches the gradient for readability
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#000", // Matches the gradient for readability
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 24,
  },
  button: {
    backgroundColor: "#FF7F50", // Matches the button style from the home screen
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
