import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import axios from "axios";

export default function Index() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [nutrientDetails, setNutrientDetails] = useState(null);
  const router = useRouter();
  const [showMacronutrients, setShowMacronutrients] = useState(false);
  const [showMicronutrients, setShowMicronutrients] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const analyzeImage = async () => {
    if (!image) {
      Alert.alert("Error", "Please upload an image before analyzing!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", {
      uri: image,
      name: "image.jpg",
      type: "image/jpeg",
    });

    try {
      const response = await axios.post(
        "https://flask-backend-tdpp.onrender.com/analyze",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setNutrientDetails(response.data.nutrition_data);
    } catch (error) {
      Alert.alert(
        "Error",
        "An error occurred while analyzing the image. Please try again!"
      );
      console.error("Error analyzing image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaProvider>
      <LinearGradient colors={["#FFDAB9", "#FFB347"]} style={styles.container}>
        <View style={styles.content}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.customButton} onPress={pickImage}>
              <Text style={styles.buttonText}>Upload Image</Text>
            </TouchableOpacity>
          </View>

          {image && <Image source={{ uri: image }} style={styles.image} />}

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.customButton}
              onPress={analyzeImage}
            >
              <Text style={styles.buttonText}>Analyze</Text>
            </TouchableOpacity>
          </View>

          {loading && <ActivityIndicator size="large" color="#ffffff" />}

{nutrientDetails && (
  <ScrollView style={styles.scrollContainer}>
    <View style={styles.details}>
      {/* Product Details */}
      <Text style={styles.detailText}>
        <Text style={styles.boldText}>Product Name:</Text> {nutrientDetails.product_name}
      </Text>
      <Text style={styles.detailText}>
        <Text style={styles.boldText}>Serving Size:</Text> {nutrientDetails.serving_size}
      </Text>
      <Text style={styles.detailText}>
        <Text style={styles.boldText}>Calories:</Text> {nutrientDetails.calories}
      </Text>

      {/* Ingredients */}
      <Text style={styles.detailText}>
        <Text style={styles.boldText}>Ingredients:</Text>
      </Text>
      {nutrientDetails.ingredients.map((ingredient, index) => (
        <Text key={index} style={styles.detailText}>- {ingredient}</Text>
      ))}

      <TouchableOpacity
        onPress={() => setShowMacronutrients(!showMacronutrients)}
        style={styles.sectionHeader}
      >
        <Text style={styles.sectionHeaderText}>
          Macronutrients {showMacronutrients ? "▲" : "▼"}
        </Text>
      </TouchableOpacity>
      {showMacronutrients && (
        <View style={styles.sectionContent}>
          <Text style={styles.detailText}>Fat: {nutrientDetails.macronutrients.fat}</Text>
          <Text style={styles.detailText}>
            Saturated Fat: {nutrientDetails.macronutrients.saturated_fat}
          </Text>
          <Text style={styles.detailText}>
            Cholesterol: {nutrientDetails.macronutrients.cholesterol}
          </Text>
        </View>
      )}

      <TouchableOpacity
        onPress={() => setShowMicronutrients(!showMicronutrients)}
        style={styles.sectionHeader}
      >
        <Text style={styles.sectionHeaderText}>
          Micronutrients {showMicronutrients ? "▲" : "▼"}
        </Text>
      </TouchableOpacity>
      {showMicronutrients && (
        <View style={styles.sectionContent}>
          {Object.entries(nutrientDetails.micronutrients).map(([key, value], index) => (
            <Text key={index} style={styles.detailText}>
              {key}: {value}
            </Text>
          ))}
        </View>
      )}
    </View>
  </ScrollView>
)}


          <View style={styles.navButton}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.customButton}
                onPress={() => router.push("/about")}
              >
                <Text style={styles.buttonText}>About</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    marginVertical: 10,
    width: "80%",
    alignSelf: "center",
  },
  customButton: {
    backgroundColor: "#FF7F50",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    width: "60%",
    alignSelf: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  scrollContainer: {
    width: "90%",
    marginTop: 20,
  },
  details: {
    padding: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    marginBottom: 20,
  },
  detailText: {
      fontSize: 16,
      marginBottom: 5,
    },
    boldText: {
      fontWeight: "bold",
    },
  navButton: {
    marginTop: 30,
    alignItems: "center",
    width: "90%",
  },
sectionHeader: {
    backgroundColor: "#FFB347",
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginTop: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    width: "50%",
  },
  sectionHeaderText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

});
