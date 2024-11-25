import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { CustomTextArea, Forminput } from "../../components/shared/InputForm";
import { PrimaryButton } from "../../components/shared/Button";
import { useNavigation } from "@react-navigation/native";

export default function RatingPage() {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
      <View>
        <Pressable
          onPress={() => navigation.goBack()}
          style={{ position: "absolute", marginTop: 40, paddingHorizontal: 10 }}
        >
          <Image source={require("../../assets/Foodmart/backArrow.png")} />
        </Pressable>
        <Text
          style={{
            textAlign: "center",
            marginTop: 30,
            fontSize: 24,
            fontWeight: "500",
            marginBottom: 24,
          }}
        >
          Rate your rider
        </Text>
      </View>
      <View style={{ gap: 24, flexDirection: "column", alignItems: "center" }}>
        <View style={{ gap: 14 }}>
          <Image source={require("../../assets/Foodmart/profileImage.png")} />
          <Text style={{ fontSize: 16, fontWeight: "500" }}>
            Johnny Doormane <Text>4.0</Text>
          </Text>
        </View>
        <View>
          <Text style={{ fontSize: 24, textAlign: "center" }}>
            How was your trip with
          </Text>
          <Text style={{ fontSize: 24, textAlign: "center" }}>
            Johnny Doormane
          </Text>
        </View>
      </View>
      <View style={{ gap: 16, marginVertical: 30 }}>
        <Text style={{ fontSize: 16, fontWeight: "500" }}>Tell us why:</Text>
        <View style={{ gap: 16 }}>
          <View
            style={{ flexDirection: "row", gap: 10, justifyContent: "center" }}
          >
            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>Delivered with care</Text>
            </Pressable>
            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>Polite</Text>
            </Pressable>
            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>On time</Text>
            </Pressable>
          </View>
          <View
            style={{ flexDirection: "row", gap: 10, justifyContent: "center" }}
          >
            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>Great handoff</Text>
            </Pressable>
            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>Friendly</Text>
            </Pressable>
          </View>
        </View>
      </View>
      <View style={{ gap: 8 }}>
        <Text style={{ fontSize: 16 }}>
          Any other information you'd like us to know
        </Text>
        <CustomTextArea inputStyle={styles.textInput} />
      </View>
      <View style={{ marginTop: 20 }}>
        <Forminput
          style={styles.formInput}
          placeholder={"Enter amount you wish to tip"}
        />
      </View>
      <View style={{ marginTop: 20 }}>
        <PrimaryButton buttonText={"Rate Driver"} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  textInput: {
    backgroundColor: "#F4F4F4",
    borderColor: "#68686880",
    borderWidth: 0.68,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "black",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 6,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 12,
  },
  formInput: {
    borderColor: "#68686880",
    borderWidth: 0.68,
    color: "#858383",
  },
});
