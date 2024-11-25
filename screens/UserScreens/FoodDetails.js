import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { PrimaryButton } from "../../components/shared/Button";
import { useNavigation } from "@react-navigation/native";
import { ReusableBackButton } from "../../components/shared/SharedButton_Icon";
import AppScreen from "../../components/shared/AppScreen";

export default function FoodDetails() {
  const navigation = useNavigation();
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  const navigateFunc = () => {
    navigation.navigate("GetEverything");
  };

  return (
    <AppScreen>
      <View>
        <Image source={require("../../assets/Foodmart/food.png")} />

        <ReusableBackButton
          style={{ position: "absolute", top: 15, zIndex: 1, left: 20 }}
        />
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.textArea}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ width: "60%", gap: 3 }}>
              <Text style={{ fontSize: 18, color: "#F79B2C" }}>
                Special Rice
              </Text>
              <Text
                style={{ color: "#686868", fontSize: 12, fontWeight: "300" }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et sed dolore magna.
              </Text>
              <Text style={{ fontSize: 16, fontWeight: "300" }}>5,500</Text>
            </View>
            <View>
              <Pressable>
                <Image
                  source={require("../../assets/Foodmart/likeButton.png")}
                />
              </Pressable>
            </View>
          </View>
          <View style={styles.line}></View>
          <View style={{ gap: 16 }}>
            <Text style={styles.secondaryText}>Required *</Text>
            <View style={{ paddingHorizontal: 10 }}>
              <Text>Takeaway Pack (+500)</Text>
            </View>
          </View>
          <View style={styles.line}></View>
          <View style={{ gap: 16 }}>
            <Text style={styles.secondaryText}>
              How many portion would you like?
            </Text>
            <View style={{ paddingHorizontal: 10, gap: 16 }}>
              <Text>1 Portion</Text>
              <Text>2 Portion</Text>
              <Text>3 Portion</Text>
            </View>
          </View>
          <View style={styles.line}></View>
          <View style={{ gap: 16 }}>
            <Text style={styles.secondaryText}>Select a Protein</Text>
            <View style={{ paddingHorizontal: 10, gap: 16 }}>
              <Text>Chicken</Text>
              <Text>Fish</Text>
              <Text>turkey</Text>
            </View>
          </View>
          <View style={styles.line}></View>
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <Text>Add an Extra Plate</Text>
            <View style={styles.container2}>
              <TouchableOpacity style={styles.button} onPress={decrement}>
                <Text style={styles.buttonText}>-1</Text>
              </TouchableOpacity>
              <View style={styles.countContainer}>
                <Text style={styles.count}>{count}</Text>
              </View>
              <TouchableOpacity style={styles.button} onPress={increment}>
                <Text style={styles.buttonText}>+1</Text>
              </TouchableOpacity>
              <View style={styles.line} />
            </View>
          </View>
          <PrimaryButton buttonText={"Add for 10,000"} action={navigateFunc} />
        </View>
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  textArea: {
    backgroundColor: "white",
    paddingTop: 32,
    paddingBottom: 24,
    gap: 16,
    paddingHorizontal: 20,
  },
  line: {
    borderColor: "#9B9B9B4D",
    borderWidth: 1,
  },
  secondaryText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#023526",
  },
  option: { fontSize: 16, fontWeight: "300" },
  container2: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    position: "relative",
  },
  button: {
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  countContainer: {
    backgroundColor: "#003d32",
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  count: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
