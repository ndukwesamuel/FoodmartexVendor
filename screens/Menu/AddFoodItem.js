import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Switch,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { ReusableBackButton } from "../../components/shared/SharedButton_Icon";
import { Forminput, FormLabel } from "../../components/shared/InputForm";
import { PrimaryButton } from "../../components/shared/Button";

export default function AddFoodItem() {
  const [category, setCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [preparationTime, setPreparationTime] = useState("");
  const [isExtraPortionAvailable, setIsExtraPortionAvailable] = useState(false);
  const [image, setImage] = useState(null);

  const handleImageUpload = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "You need to allow access to the media library."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); // Set the URI of the selected image
    } else {
      Alert.alert("Error", "Image selection canceled.");
    }
  };

  const handleSubmit = () => {
    if (!productName || !price || !category) {
      Alert.alert("Error", "Please fill all required fields.");
      return;
    }
    console.log("Form Data:", {
      category,
      productName,
      description,
      price,
      preparationTime,
      isExtraPortionAvailable,
      image,
    });
    Alert.alert("Success", "Product uploaded successfully!");
  };
  

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>My Orders</Text>
          <ReusableBackButton style={{ position: "absolute", left: 10 }} />
        </View>
      </View>
      <View style={{ gap: 16 }}>
        {/* Category Input */}
        <View>
          <FormLabel data={"Category"} />
          <Forminput
            style={styles.textInput}
            value={category}
            onChangeText={setCategory}
          />
        </View>
        {/* Product Name */}
        <View>
          <FormLabel data={"Product Name"} />
          <Forminput
            style={styles.textInput}
            value={productName}
            onChangeText={setProductName}
          />
        </View>

        {/* Product Description */}
        <View>
          <FormLabel data={"Product Description"} />
          <Forminput
            style={styles.textInput}
            value={description}
            onChangeText={setDescription}
          />
        </View>
        {/* Price */}
        <View>
          <FormLabel data={"Price"} />
          <Forminput
            style={styles.textInput}
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
          />
        </View>

        {/* Preparation Time */}
        <View>
          <FormLabel data={"Preparation Time"} />
          <Forminput
            style={styles.textInput}
            value={preparationTime}
            onChangeText={setPreparationTime}
          />
        </View>
      </View>

      {/* Extra Portion */}
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Extra Portion available?</Text>
        <Switch
          value={isExtraPortionAvailable}
          onValueChange={setIsExtraPortionAvailable}
        />
      </View>

      {/* Upload Image */}
      <View style={styles.uploadContainer}>
        {image ? (
          <Image source={{ uri: image.uri }} style={styles.uploadedImage} />
        ) : (
          <TouchableOpacity
            style={styles.uploadBox}
            onPress={handleImageUpload}
          >
            <Icon name="cloud-upload-outline" size={32} color="#666" />
            <Text style={styles.uploadText}>Upload Document or Browse</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Add a Section */}
      <TouchableOpacity style={styles.addSectionButton}>
        <Text style={styles.addSectionText}>+ Add a section</Text>
      </TouchableOpacity>

      {/* Submit Button */}
      <View style={{marginBottom:40}}>
        <PrimaryButton buttonText={"Upload"} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    justifyContent: "center",
    marginVertical: 16,
  },
  backButton: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
    textAlign: "center",
  },

  textInput: {
    backgroundColor: "#D9D9D9",
    borderColor: "#68686880",
    borderWidth: 0.68,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  switchLabel: {
    fontSize: 16,
    marginRight: 8,
  },
  uploadContainer: {
    marginVertical: 16,
    alignItems: "center",
  },
  uploadBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 150,
    borderStyle: "dashed",
  },
  uploadedImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    resizeMode: "cover",
  },
  uploadText: {
    marginTop: 8,
    color: "#666",
    textAlign: "center",
  },
  addSectionButton: {
    marginBottom: 16,
    alignItems: "center",
  },
  addSectionText: {
    color: "#FFA500",
    fontWeight: "bold",
    fontSize: 16,
  },
  uploadButton: {
    backgroundColor: "#FFA500",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  uploadButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
