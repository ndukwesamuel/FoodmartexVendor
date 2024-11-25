import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { ReusableBackButton } from "../../components/shared/SharedButton_Icon";
import { ReusableTitle } from "../../components/shared/Reuseablecomponent";
import { Forminput, FormLabel } from "../../components/shared/InputForm";
import { PrimaryButton } from "../../components/shared/Button";
import { useNavigation } from "@react-navigation/native";

export default function WithdrawalScreen() {
    const navigation = useNavigation()
  const [amount, setAmount] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View style={styles.container}>
      <View style={{ paddingVertical: 10 }}>
        <Text style={styles.pageTitle}>Withdraw</Text>
        <Pressable style={{ position: "absolute" }} onPress={() => navigation.goBack()}>
          <Image source={require("../../assets/Foodmart/backArrow.png")} />
        </Pressable>
      </View>
      <View style={styles.formArea}>
        <View>
          <FormLabel data={"Amount"} />
          <Forminput style={styles.textInput} />
        </View>
        <View style={{ gap: 5 }}>
          <FormLabel data={"Bank Details"} />
          <View style={{ gap: 16 }}>
            <Forminput style={styles.textInput} placeholder={"Account Name"} />
            <Forminput
              style={styles.textInput}
              placeholder={"Account Number"}
            />
            <Forminput style={styles.textInput} placeholder={"Bank Name"} />
          </View>
        </View>
        <View>
          <FormLabel data={"Enter Password"} />
          <Forminput style={styles.textInput} />
        </View>
      </View>
      <View style={{paddingHorizontal:20}}>
        <PrimaryButton buttonText={"Withdraw"}/>
      </View>
    </View>
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
  textInput: {
    backgroundColor: "#D9D9D9",
    borderColor: "#68686880",
    borderWidth: 0.68,
  },
  formArea: {
    paddingHorizontal: 20,
    gap: 16,
    marginTop:50
  },
});
