import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { maincolors } from "../../utills/Themes";

const AuthOnboarding = ({ setStart }) => {
  return (
    <ImageBackground
      source={require("../../assets/Foodmart/Rectangle13.png")}
      style={styles.background}
      resizeMode="stretch"
    >
      <View style={styles.overlay}>
        <View style={styles.contentContainer}>
          <Text style={styles.subtitle}>
            Welcome to a world where every craving meets its match. Dive into a
            culinary adventure where your favorite flavors are just a tap away,
            let us bring your cravings straight to your door!"
          </Text>

          <View style={{ justifyContent: "center", marginLeft: 25 }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setStart(true); // Toggle start state to true
                // navigation.navigate("Login");
              }}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.signupButton]}
              onPress={() => {
                setStart(true); // Toggle start state to true
                // navigation.navigate("Signup");
              }}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 20,
  },
  contentContainer: {
    position: "absolute",
    bottom: 50,
    width: "100%",
  },
  subtitle: {
    color: "#fff",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "500",
    // width: "80%",
    paddingLeft: 15,
  },
  button: {
    backgroundColor: maincolors.primary,
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
  },
  signupButton: {
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "transparent",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default AuthOnboarding;
