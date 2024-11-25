import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Forminput, FormLabel } from "../../components/shared/InputForm";
import { useNavigation } from "@react-navigation/native";

export default function TopupScreen() {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <View style={{ paddingVertical: 10 }}>
        <Text style={styles.pageTitle}>Top up</Text>
        <Pressable
          style={{ position: "absolute" }}
          onPress={() => navigation.goBack()}
        >
          <Image source={require("../../assets/Foodmart/backArrow.png")} />
        </Pressable>
      </View>
      <View style={styles.formArea}>
        <View>
          <FormLabel data={"Amount"} />
          <Forminput style={styles.textInput} />
        </View>
        <View>
          <FormLabel data={"Select an Option"} />
          <TouchableOpacity
          onPress={() => navigation.navigate("TopupScreen2")}
            style={[
              styles.textInput,
              {
                paddingHorizontal: 20,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 5,
                padding: 10,
              },
            ]}
          >
            <View>
              <Text style={{ color: "#858383", fontSize: 16 }}>
                Credit or Debit Card
              </Text>
              <Text style={{ color: "#858383" }}>Instant Top-up</Text>
            </View>
            <Image source={require("../../assets/Foodmart/forward.png")} />
          </TouchableOpacity>
        </View>
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
    marginTop: 50,
  },
});
