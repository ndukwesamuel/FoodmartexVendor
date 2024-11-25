import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

export const PrimaryButton = ({ buttonText, action }) => {
  return (
    <TouchableOpacity style={styles.PrimaryButton} onPress={action}>
      <Text style={styles.PrimaryButtonText}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  PrimaryButton: {
    backgroundColor: "#F79B2C",
    borderRadius: 6,
    paddingVertical: 14,
  },
  PrimaryButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "white",
    textAlign: "center",
  },
});
