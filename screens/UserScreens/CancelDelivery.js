import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function CancelDelivery() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/Foodmart/Traced Image.png")}
        style={styles.image}
      />
      <View style={{ marginTop: 50 }}>
        <Text style={{ textAlign: "center", fontSize: 16, fontWeight: "500" }}>
          Whew! Just in time
        </Text>
        <Text style={{ textAlign: "center", fontSize: 16, fontWeight: "500" }}>
          Restaurant has not accepted your order yet
        </Text>
      </View>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.backButtonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  image: {
    alignSelf: "center",
    marginTop: 100,
  },
  backButton: {
    borderWidth: 1,
    borderColor: "#F79B2C",
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 80,
  },
  backButtonText: {
    fontSize: 16,
    color: "#F79B2C",
    fontWeight: "bold",
  },
});
