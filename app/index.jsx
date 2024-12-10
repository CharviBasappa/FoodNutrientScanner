import React, { useState } from "react";
import { View, Text, StyleSheet, Button, Image, ActivityIndicator } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const mockApiResponse = {
  calories: "200 kcal",
  protein: "10 g",
  fat: "5 g",
  carbohydrates: "30 g",
};

export default function Index() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [nutrientDetails, setNutrientDetails] = useState(null);
  const router = useRouter();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      analyzeImage(result.assets[0].uri);
    }
  };

  const analyzeImage = async (imageUri) => {
    setLoading(true);
    setTimeout(() => {
      setNutrientDetails(mockApiResponse);
      setLoading(false);
    }, 2000);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Nutrient Analyzer</Text>
        <View style={styles.content}>
          <Button title="Upload Image" onPress={pickImage} />
          {image && <Image source={{ uri: image }} style={styles.image} />}
          {loading && <ActivityIndicator size="large" color="#0000ff" />}
          {nutrientDetails && (
            <View style={styles.details}>
              <Text style={styles.detailText}>Calories: {nutrientDetails.calories}</Text>
              <Text style={styles.detailText}>Protein: {nutrientDetails.protein}</Text>
              <Text style={styles.detailText}>Fat: {nutrientDetails.fat}</Text>
              <Text style={styles.detailText}>Carbohydrates: {nutrientDetails.carbohydrates}</Text>
            </View>
          )}
          <View style={styles.navButton}>
            <Button title="About" onPress={() => router.push("/about")} />
                <Button title="Settings" onPress={() => router.push("/settings")} />
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    margin: 20,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
  details: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 5,
  },
  navButton: {
    marginTop: 30,
  },
});
