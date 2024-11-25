import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SignupSelectionScreen = () => {
  const navigation = useNavigation();

  // Function to handle navigation based on the selected signup type
  const navigateToSignup = (type) => {
    navigation.navigate("SignUp", { signupType: type });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Signup Type</Text>

      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => navigateToSignup("user")}
      >
        <Text style={styles.optionText}>Sign Up as User</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => navigateToSignup("vendor")}
      >
        <Text style={styles.optionText}>Sign Up as Vendor</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => navigateToSignup("rider")}
      >
        <Text style={styles.optionText}>Sign Up as Rider</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  optionButton: {
    width: "80%",
    padding: 15,
    backgroundColor: "#FFA500",
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  optionText: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "600",
  },
});

export default SignupSelectionScreen;
