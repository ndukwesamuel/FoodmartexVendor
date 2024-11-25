import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function HomeComponentModal() {
  const navigation = useNavigation(); // `navigation` object

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        marginTop: 230,
      }}
    >
      {/* Use `navigation.navigate` here */}
      <TouchableOpacity onPress={() => navigation.navigate("DeliveredOrders")}>
        <Text> kkk </Text>
      </TouchableOpacity>

      <Text>HomeComponentModal</Text>
    </View>
  );
}
