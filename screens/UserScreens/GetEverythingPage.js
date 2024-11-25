import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { PrimaryButton } from "../../components/shared/Button";
import { useNavigation } from "@react-navigation/native";
import AppScreen from "../../components/shared/AppScreen";
import { ReusableBackButton } from "../../components/shared/SharedButton_Icon";
import { maincolors } from "../../utills/Themes";

export default function GetEverythingPage() {
  const navigation = useNavigation();
  const navigationFunc = () => {
    navigation.navigate("CheckoutPage");
  };
  return (
    <AppScreen>
      <View
        style={{
          flex: 1,
          backgroundColor: maincolors.white,
        }}
      >
        <View>
          <Image source={require("../../assets/Foodmart/food.png")} />
          <ReusableBackButton
            style={{ position: "absolute", top: 15, zIndex: 1, left: 20 }}
          />
        </View>

        <ScrollView
          style={{
            flex: 1,
            backgroundColor: "white",
          }}
        >
          <View style={styles.textArea}>
            <Text style={{ fontSize: 20 }}>Did you Get Everything?</Text>
            <View style={{ gap: 18 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={styles.card}>
                  <Image source={require("../../assets/Foodmart/food1.png")} />
                  <Text style={styles.cardTitle}>Rice</Text>
                  <View>
                    <Text style={styles.cardPrice}>5,500</Text>
                  </View>
                </View>
                <View style={styles.card}>
                  <Image source={require("../../assets/Foodmart/food2.png")} />
                  <Text style={styles.cardTitle}>Rice</Text>
                  <View>
                    <Text style={styles.cardPrice}>5,500</Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={styles.card}>
                  <Image source={require("../../assets/Foodmart/food1.png")} />
                  <Text style={styles.cardTitle}>Rice</Text>
                  <View>
                    <Text style={styles.cardPrice}>5,500</Text>
                  </View>
                </View>
                <View style={styles.card}>
                  <Image source={require("../../assets/Foodmart/food2.png")} />
                  <Text style={styles.cardTitle}>Rice</Text>
                  <View>
                    <Text style={styles.cardPrice}>5,500</Text>
                  </View>
                </View>
              </View>
            </View>
            <PrimaryButton
              buttonText={"Go to Checkout"}
              action={navigationFunc}
            />
          </View>
        </ScrollView>
      </View>
    </AppScreen>
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
  card: {
    gap: 6,
  },
  cardTitle: {
    color: "#F79B2C",
    fontSize: 19,
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: "300",
  },
});
