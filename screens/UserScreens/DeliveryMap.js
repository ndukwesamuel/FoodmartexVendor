import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { CustomTextArea } from "../../components/shared/InputForm";
import { useNavigation } from "@react-navigation/native";

export default function DeliveryMap() {
  const navigation = useNavigation();
  return (
    // <SafeAreaView>
    <ScrollView style={styles.container}>
      <View>
        <Image source={require("../../assets/Foodmart/Placemark Map.png")} />
        <Pressable
          style={{ position: "absolute", marginTop: 40, paddingHorizontal: 10 }}
        >
          <Image source={require("../../assets/Foodmart/backArrow.png")} />
        </Pressable>
      </View>
      <View style={styles.textArea}>
        <View>
          <Pressable
            onPress={() => navigation.navigate("RatingPage")}
            style={{
              width: 50,
              borderColor: "#C4C4C4",
              borderWidth: 1,
              flexDirection: "row",
              justifyContent: "center",
              margin: "auto",
            }}
          >
            <Text>Move</Text>
          </Pressable>
        </View>
        <View style={{ gap: 10 }}>
          <Text style={{ fontSize: 16 }}> Estimated Time of Arrival</Text>
          <Text style={{ fontSize: 16, color: "#F79B2C" }}>20 mins away</Text>
          <Text style={{ fontSize: 20 }}>!2:50PM - 11:40PM</Text>
        </View>
        <View style={styles.line}></View>
        <Text style={{ fontSize: 18, fontWeight: "500", color: "#000000" }}>
          Driver's Information
        </Text>
        <View style={{ flexDirection: "row", gap: 14 }}>
          <Image source={require("../../assets/Foodmart/profileImage.png")} />
          <View>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              Jonny Doormane
            </Text>
            <Text style={{ fontSize: 16 }}>4.0</Text>
            <View style={{ flexDirection: "row", gap: 37 }}>
              <Pressable>
                <Image
                  source={require("../../assets/Foodmart/phoneIcon.png")}
                />
              </Pressable>
              <Pressable>
                <Image
                  source={require("../../assets/Foodmart/messageIcon.png")}
                />
              </Pressable>
            </View>
          </View>
        </View>
        <View style={styles.line}></View>
        <View style={{ flexDirection: "column", gap: 5 }}>
          <Text style={{ color: "#023526" }}>
            Leave an Information for the rider if necessary
          </Text>
          <CustomTextArea inputStyle={styles.textInput} />
        </View>
      </View>
    </ScrollView>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textArea: {
    backgroundColor: "white",
    paddingTop: 32,
    paddingBottom: 24,
    gap: 16,
    paddingHorizontal: 20,
  },
  textInput: {
    backgroundColor: "#F4F4F4",
    borderColor: "#68686880",
    borderWidth: 0.68,
    borderRadius: 5,
  },
  line: {
    borderColor: "#9B9B9B4D",
    borderWidth: 1,
  },
});
