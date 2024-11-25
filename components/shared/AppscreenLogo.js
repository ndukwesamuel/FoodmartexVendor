import React from "react";
import { StatusBar, SafeAreaView, StyleSheet, Image, View } from "react-native";

const AppscreenLogo = ({ children }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#001272" barStyle="light-content" />
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/Foodmart/logo.png")} // Add your logo here
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={{}}>
        <Image
          source={require("../../assets/Foodmart/Rectangle 1.png")} // Add your logo here
          // style={styles.logo}
          // resizeMode="contain"
        />
      </View>
      {children}
    </SafeAreaView>
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
    paddingVertical: 20,
  },
});

export default AppscreenLogo;
