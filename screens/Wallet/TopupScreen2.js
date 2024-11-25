import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Checkbox from "expo-checkbox";
import { Forminput, FormLabel } from "../../components/shared/InputForm";
import { useNavigation } from "@react-navigation/native";
import { PrimaryButton } from "../../components/shared/Button";

export default function TopupScreen2() {
  const navigation = useNavigation();
  const [selectedCard, setSelectedCard] = useState(false); // Checkbox for the saved card
  const [cardHolderName, setCardHolderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [saveCard, setSaveCard] = useState(false);
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={{ paddingVertical: 10 }}>
        <Text style={styles.pageTitle}>Top up</Text>
        <Pressable
          style={{ position: "absolute" }}
          onPress={() => navigation.goBack()}
        >
          <Image source={require("../../assets/Foodmart/backArrow.png")} />
        </Pressable>
      </View>

      {/* Saved Card Section */}
      <View style={styles.savedCardContainer}>
        <Checkbox value={selectedCard} onValueChange={setSelectedCard} />
        <Text style={styles.savedCardText}>Visa **** **** **** 9876 11/28</Text>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Use Another Card Section */}
      <Text style={styles.sectionHeader}>Use Another Card</Text>
      <View style={{ gap: 24 }}>
        <View>
          <FormLabel data={"Card Holder's Name"} />
          <Forminput
            style={styles.textInput}
            value={cardHolderName}
            onChangeText={setCardHolderName}
            editable={!selectedCard}
          />
        </View>
        <View>
          <FormLabel data={"Card Number"} />
          <Forminput
            style={styles.textInput}
            keyboardType="numeric"
            value={cardNumber}
            onChangeText={setCardNumber}
            editable={!selectedCard}
          />
        </View>
        <View style={styles.row}>
          <View>
            <FormLabel data={"Expiry Date"} />
            <Forminput
              style={styles.halfInput}
              keyboardType="numeric"
              value={expiryDate}
              onChangeText={setExpiryDate}
              editable={!selectedCard}
            />
          </View>
          <View>
            <FormLabel data={"CVV"} />
            <Forminput
              //   style={[styles.textInput, styles.halfInput]}
              style={styles.halfInput}
              keyboardType="numeric"
              value={cvv}
              onChangeText={setCvv}
              editable={!selectedCard}
            />
          </View>
        </View>
      </View>

      {/* Save Card Information */}
      <View style={styles.saveCardContainer}>
        <Checkbox
          value={saveCard}
          onValueChange={setSaveCard}
          disabled={selectedCard}
        />
        <Text style={styles.saveCardText}>Save Card Information</Text>
      </View>

      {/* Top Up Button */}
      <PrimaryButton buttonText={"Top Up"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 40,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "500",
    textAlign: "center",
  },
  textInput: {
    backgroundColor: "#D9D9D9",
    borderColor: "#68686880",
    borderWidth: 0.68,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  savedCardContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  savedCardText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#686868",
  },
  divider: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 20,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 20,
    color: "#023526",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  row: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",

    // flex:1
  },
  halfInput: {
    width: "100%",
    backgroundColor: "#D9D9D9",
    borderColor: "#68686880",
    borderWidth: 0.68,
    marginBottom: 20,
  },
  halfInput2: {
    width: "100%",
    backgroundColor: "#D9D9D9",
    borderColor: "#68686880",
    borderWidth: 0.68,
    flex: 1,
  },
  saveCardContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  saveCardText: {
    fontSize: 14,
    marginLeft: 10,
    color: "#858383",
  },
  button: {
    backgroundColor: "#FFA500",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
