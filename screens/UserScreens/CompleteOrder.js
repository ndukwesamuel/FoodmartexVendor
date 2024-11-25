import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function CompleteOrder() {
  const navigation = useNavigation()
  const orderSummary = [
    {
      id: "1",
      quantity: "x1",
      item: "Special Rice",
      options: ["Option 1", "Option 3"],
    },
    {
      id: "2",
      quantity: "x3",
      item: "Special Rice",
      options: ["Option 2", "Option 3"],
    },
  ];
  return (
    <View style={styles.container}>
      {/* Animated Image */}
      <Image
        source={require("../../assets/Foodmart/cartoon.png")}
        style={styles.image}
      />

      {/* Placing Order Text */}
      <Text style={styles.title}>Placing your order</Text>

      {/* Delivery Address Section */}
      <View style={styles.addressContainer}>
        <Text style={styles.sectionTitle}>Delivery Address</Text>
        <Text style={styles.sectionSubtitle}>
          Address lorem dolor officia...
        </Text>
      </View>

      {/* Order Summary */}
      <View style={styles.orderSummaryContainer}>
        <Text style={styles.sectionTitle}>Order Summary</Text>
        <FlatList
          data={orderSummary}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.orderItem}>
              <Text style={styles.orderQuantity}>{item.quantity}</Text>
              <View style={{ gap: 8 }}>
                <Text style={styles.orderItemName}>{item.item}</Text>
                {item.options.map((option, index) => (
                  <Text key={index} style={styles.orderOption}>
                    x1 {option}
                  </Text>
                ))}
              </View>
            </View>
          )}
          contentContainerStyle={{ gap: 16 }}
        />
      </View>

      {/* Cancel Order Button */}
      <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.navigate("CancelDelivery")}>
        <Text style={styles.cancelButtonText}>Cancel Order</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    paddingTop: 100,
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    // textAlign: "center",
    marginBottom: 20,
  },
  addressContainer: {
    marginBottom: 40,
    gap: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "500",
    color: "#023526",
    // marginBottom: 5,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: "#686868",
  },
  orderSummaryContainer: {
    marginBottom: 20,
    gap: 12,
  },
  orderItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 16,
    // marginBottom: 15,
  },
  orderQuantity: {
    fontSize: 16,
    fontWeight: "400",
    color: "#F79B2C",
    marginRight: 10,
  },
  orderItemName: {
    fontSize: 16,
    fontWeight: "400",
    // marginBottom: 5,
    color: "#023526",
  },
  orderOption: {
    fontSize: 12,
    color: "#757575",
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: "#F79B2C",
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 20,
  },
  cancelButtonText: {
    fontSize: 16,
    color: "#F79B2C",
    fontWeight: "bold",
  },
});
