import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Eye icon for password visibility toggle
import AppscreenLogo from "../shared/AppscreenLogo";
import { Forminput, Forminputpassword } from "../shared/InputForm";
import { useDispatch, useSelector } from "react-redux";
import { Login_Fun } from "../../Redux/AuthSlice";
import { maincolors } from "../../utills/Themes";

const SignIn = ({ navigation, onSetAuth }) => {
  const user_dat = useSelector((state) => state.Auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const dispatch = useDispatch();
  return (
    <AppscreenLogo>
      <View
        style={{
          backgroundColor: "#FFFFFF",
          flex: 1,
          // justifyContent:"center"
          paddingHorizontal: 20,
        }}
      >
        {/* heading texts */}
        <View style={{ gap: 10, alignSelf: "center" }}>
          <Text
            style={{
              fontSize: 24,
              lineHeight: 36,
              fontWeight: "900",
              textAlign: "center",
            }}
          >
            Welcome!
          </Text>

          <Text style={{ fontSize: 12, lineHeight: 36, fontWeight: "400" }}>
            Sign into your account.
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>

          <Forminputpassword
            placeholder="Enter your password"
            onChangeText={setPassword}
            value={password}
            style={{
              // borderWidth: 1,
              borderRadius: 8,

              // borderColor: "#ccc",
            }}
            // onChangeText={(text) =>
            //   handlePasswordChange("confirmPassword", text)
            // }
            // value={passwords.confirmPassword}
          />
        </View>

        <TouchableOpacity
          style={styles.forgotPasswordButton}
          onPress={() => onSetAuth("forgot-password")}
        >
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        {user_dat?.user_isLoading ? (
          <ActivityIndicator size="small" color={maincolors.primary} />
        ) : (
          <TouchableOpacity
            style={styles.signInButton}
            onPress={() =>
              dispatch(
                Login_Fun({
                  email,
                  password,
                })
              )
            }
          >
            <Text style={styles.signInButtonText}>Sign In</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.signUpContainer}
          // onPress={() => navigation.navigate("Signup")}

          onPress={() => onSetAuth("sign-up")}
        >
          <Text style={styles.signUpText}>
            Don’t have an Account?{" "}
            <Text style={styles.signUpLink}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </AppscreenLogo>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff1e0",
    // paddingHorizontal: 20,
    // justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    // marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
  },
  brandName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFA500", // Orange color for "FoodMart"
  },
  ex: {
    color: "#34A853", // Green color for "Ex"
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "600",
    color: "#2F4F4F", // Dark green
    textAlign: "center",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#7A7A7A", // Light grey for subtitle
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: "#7A7A7A", // Label color
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: 10,
    paddingLeft: 15,
    fontSize: 16,
    color: "#333",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    // borderWidth: 1,
    backgroundColor: "#F5F5F5",
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
  },
  forgotPasswordButton: {
    alignItems: "flex-end",
    marginVertical: 10,
  },
  forgotPasswordText: {
    color: "#FFA500", // Orange color for "Forgot Password?"
    fontSize: 14,
  },
  signInButton: {
    backgroundColor: "#FFA500",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  signInButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  signUpContainer: {
    alignItems: "center",
  },
  signUpText: {
    color: "#333",
    fontSize: 14,
  },
  signUpLink: {
    color: "#FFA500", // Orange color for "Sign Up"
    fontWeight: "600",
  },
});

export default SignIn;
