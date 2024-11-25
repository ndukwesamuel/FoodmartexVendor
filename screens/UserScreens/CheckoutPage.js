import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { PrimaryButton } from "../../components/shared/Button";
import { CustomCheckbox, Forminput } from "../../components/shared/InputForm";
import Checkbox from "expo-checkbox";
import AppScreen from "../../components/shared/AppScreen";
import { ReusableBackButton } from "../../components/shared/SharedButton_Icon";
import { ReusableTitle } from "../../components/shared/Reuseablecomponent";
import OrderPlacingScreen from "../../components/CheckoutStatus";
import { useNavigation } from "@react-navigation/native";

export default function CheckoutPage() {
  const [checkout, setcheckout] = useState(true);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setcheckout(false);
  //   }, 10000);
  //   return () => {};
  // }, []);

  return (
    <AppScreen>
      {checkout ? (
        <View style={{ flex: 1, backgroundColor: "white", paddingTop: 20 }}>
          <ReusableBackButton
            style={{ position: "absolute", top: 15, zIndex: 1, left: 20 }}
          />
          <ReusableTitle data="Checkout" />

          <ScrollView
            style={styles.container}
            contentContainerStyle={{ paddingHorizontal: 20, gap: 20 }}
          >
            <View style={{ gap: 8 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.sectionTitle}>Restaurant 1</Text>
                <Text style={{ color: "#CB0505", fontSize: 14 }}>
                  Delete All
                </Text>
              </View>
              <View style={styles.line}></View>
              <View style={{ gap: 16 }}>
                <View style={{ flexDirection: "row", gap: 16 }}>
                  <Text style={{ color: "#F79B2C", fontSize: 16 }}>X1</Text>
                  <View style={{ gap: 8 }}>
                    <View
                      style={{
                        width: "100%",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingRight: 20,
                      }}
                    >
                      <Text style={styles.secondaryText}>Special Rice</Text>
                      <Text style={styles.secondaryText}>15,000</Text>
                    </View>
                    <View style={{ gap: 3 }}>
                      <Text style={styles.optionText}>Option 1</Text>
                      <Text style={styles.optionText}>Option 3</Text>
                    </View>
                  </View>
                </View>
                <View style={{ flexDirection: "row", gap: 16 }}>
                  <Text style={{ color: "#F79B2C", fontSize: 16 }}>X1</Text>
                  <View style={{ gap: 8 }}>
                    <View
                      style={{
                        width: "100%",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingRight: 20,
                      }}
                    >
                      <Text style={styles.secondaryText}>Special Rice</Text>
                      <Text style={styles.secondaryText}>15,000</Text>
                    </View>
                    <View style={{ gap: 3 }}>
                      <Text style={styles.optionText}>Option 1</Text>
                      <Text style={styles.optionText}>Option 3</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ flexDirection: "row", gap: 11 }}>
                <Image source={require("../../assets/Foodmart/cutlery.png")} />
                <View style={{ gap: 8 }}>
                  <Text>Need Cutlery</Text>
                  <Text>Help us reduce waste, only ask if needed</Text>
                </View>
              </View>
              <View>
                <Image />
              </View>
            </View>
            <View style={{ marginTop: 10 }}>
              <Text>Use Promo Code </Text>
              <Forminput style={styles.input} placeholder={"#HURRAY31"} />
            </View>
            <View style={{ gap: 8 }}>
              <Text style={styles.sectionTitle}>Delivery Details</Text>
              <View style={styles.line}></View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderColor: "#C4C4C4",
                  borderWidth: 1,
                  padding: 10,
                  gap: 99,
                  borderRadius: 6,
                }}
              >
                <View style={{ flexDirection: "row", gap: 12 }}>
                  <Image
                    source={require("../../assets/Foodmart/phoneIcon.png")}
                  />
                  <Text style={styles.optionText}>0816 432 8897</Text>
                </View>
                <Image />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderColor: "#C4C4C4",
                  borderWidth: 1,
                  padding: 10,
                  gap: 99,
                  borderRadius: 6,
                }}
              >
                <View style={{ flexDirection: "row", gap: 12 }}>
                  <Image
                    source={require("../../assets/Foodmart/carbon_location.png")}
                  />
                  <Text style={styles.optionText}>
                    Lorem ipsumm lorem ipsum
                  </Text>
                </View>
                <Image />
              </View>
            </View>
            <View style={{ gap: 8 }}>
              <Text style={styles.sectionTitle}>Payment Method</Text>
              <View style={styles.line}></View>
              <View style={{ gap: 22 }}>
                <CustomCheckbox
                  label={"Visa"}
                  containerView={styles.checkbox}
                  TextStyle={styles.optionText}
                />
                <CustomCheckbox
                  label={"Wallet"}
                  containerView={styles.checkbox}
                  TextStyle={styles.optionText}
                />
                <CustomCheckbox
                  label={"Another Card"}
                  containerView={styles.checkbox}
                  TextStyle={styles.optionText}
                />
              </View>
            </View>
            <View style={{ gap: 10, marginBottom: 20 }}>
              <View style={{ gap: 8 }}>
                <Text style={styles.sectionTitle}>Summary</Text>
                <View style={styles.line}></View>
                <View style={{ gap: 16 }}>
                  <View style={{ gap: 10 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={styles.optionText}>Sub Total</Text>
                      <Text style={styles.optionText}>40,500</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={styles.optionText}>Delivery Fee</Text>
                      <Text style={styles.optionText}>42,500</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={styles.optionText}>Service</Text>
                      <Text style={styles.optionText}>42,500</Text>
                    </View>
                  </View>
                  <View style={styles.line}></View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text>Total</Text>
                    <Text>42,500</Text>
                  </View>
                </View>
              </View>
              <PrimaryButton
                buttonText={"Confirm Order"}
                action={() => setcheckout(false)}
              />
            </View>
          </ScrollView>
        </View>
      ) : (
        <OrderPlacingScreen action={() => setcheckout(true)} />
      )}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "500",
    textAlign: "center",
  },
  line: {
    borderColor: "#9B9B9B4D",
    borderWidth: 1,
  },
  input: {
    borderRadius: 6,
    borderWidth: 0.68,
    borderColor: "#68686880",
    height: 50,
  },
  checkbox: {
    flexDirection: "row",
    gap: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "500",
  },
  optionText: {
    fontSize: 14,
    color: "#686868",
  },
  secondaryText: {
    color: "#023526",
    fontSize: 16,
    fontWeight: "500",
  },
});
