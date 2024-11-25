import {
  FlatList,
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
import { ReusableTitle } from "../../components/shared/Reuseablecomponent";
import { maincolors } from "../../utills/Themes";
import { Formbutton } from "../../components/shared/InputForm";

export default function DeliveredOrders() {
  const navigation = useNavigation();
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  const navigateFunc = () => {
    navigation.navigate("MyOrder");
  };

  return (
    <AppScreen>
      <View style={styles.container}>
        <ReusableBackButton
          style={{ position: "absolute", top: 15, zIndex: 1, left: 20 }}
        />
        <ReusableTitle data="Delivered Orders" />
      </View>

      <DeliveredOrdersComponent action={navigateFunc} />
    </AppScreen>
  );
}

export const DeliveredOrdersComponent = ({ action }) => {
  return (
    <View
      style={{
        paddingHorizontal: 30,
        marginVertical: 20,
      }}
    >
      <FlatList
        data={[1, 2]}
        renderItem={({ item }) => (
          <>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                // paddingHorizontal: 0,
              }}
            >
              <View
                style={{
                  marginBottom: 20,
                }}
              >
                <Text
                  style={{
                    fontWeight: "400",
                    fontSize: 18,
                    color: maincolors.primary,
                  }}
                >
                  Store 1
                </Text>

                <Text
                  style={{
                    // fontFamily:
                    fontWeight: "300",
                    fontSize: 16,
                  }}
                >
                  x2 Special Rice
                </Text>

                <Text
                  style={{
                    // fontFamily:
                    fontWeight: "300",
                    fontSize: 16,
                  }}
                >
                  5000
                </Text>

                <View>
                  <Formbutton
                    buttonStyle={{
                      backgroundColor: maincolors.primary, // "#4CAF50",
                      paddingVertical: 6,
                      paddingHorizontal: 45,
                      borderRadius: 8,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    textStyle={{
                      color: "#fff",
                      fontSize: 16,
                      fontWeight: "600",
                    }}
                    icon={
                      <Image
                        source={require("../../assets/Foodmart/Vector3.png")}
                      />
                    }
                    data="Reorder"
                    onPress={action} //() => console.log("MyOrder")}
                  />
                </View>
              </View>
              <Image
                source={require("../../assets/Foodmart/food.png")}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 6,
                }}
              />
            </View>
            <View
              style={{
                borderWidth: 0.5,
                borderColor: maincolors.lightgray, //"#C4C4C4",
                marginBottom: 10,
              }}
            />
          </>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", paddingTop: 20 },
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
