import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function ProfilePictureScreen({ onSetAuth2, onSetAuth }) {
  const [image, setImage] = useState(null);

  console.log({
    gg: image,
  });

  const pickImage = async () => {
    // Ask for permission to access the media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert("Permission to access camera roll is required!");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Upload A Profile Picture</Text>
      <TouchableOpacity onPress={pickImage}>
        <Image
          source={
            image
              ? { uri: image }
              : require("../../assets/Foodmart/profile_imagte.png")
          }
          style={styles.profileImage}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.createButton}>
        <Text style={styles.createButtonText}>Create</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.skipButton}
        onPress={() => onSetAuth2("security")}
      >
        <Text style={styles.skipButtonText}>Skip for now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2C2C2C",
    marginBottom: 20,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
    backgroundColor: "#d3d3d3",
  },
  createButton: {
    backgroundColor: "#FFA500",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginBottom: 10,
    width: "90%",
  },
  createButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  skipButton: {
    borderWidth: 1,
    borderColor: "#FFA500",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    width: "90%",
  },
  skipButtonText: {
    color: "#FFA500",
    fontSize: 16,
    textAlign: "center",
  },
});
