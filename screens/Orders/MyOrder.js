import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import { ReusableBackButton } from "../../components/shared/SharedButton_Icon";
import { ReusableTitle } from "../../components/shared/Reuseablecomponent";
import AppScreen from "../../components/shared/AppScreen";

export default function MyOrder() {
  return (
    <AppScreen>
      <View style={styles.container}>
        <ReusableBackButton
          style={{ position: "absolute", top: 15, zIndex: 1, left: 20 }}
        />
        <ReusableTitle data="My Orders" />
        <View
          style={{
            paddingHorizontal: 30,
            marginVertical: 20,
          }}
        >
          <View style={styles.statusSection}>
            <Text style={styles.status}>Delivered</Text>
            <Text style={styles.orderId}>Order ID: E8F99P</Text>
            <Text style={styles.dateTime}>24-01-2024 | 12:30PM</Text>
          </View>

          <ScrollView>
            <View style={styles.restaurantSection}>
              <Text style={styles.restaurantTitle}>Restaurant 1</Text>
              <View style={styles.itemRow}>
                <Text style={styles.itemQuantity}>x1</Text>
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>Special Rice</Text>
                  <Text style={styles.itemOptions}>
                    x1 Option 1 {"\n"}x1 Option 3
                  </Text>
                </View>
                <Text style={styles.itemPrice}>₦15,000</Text>
              </View>

              <View style={styles.itemRow}>
                <Text style={styles.itemQuantity}>x3</Text>
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>Special Rice</Text>
                  <Text style={styles.itemOptions}>
                    x1 Option 2 {"\n"}x1 Option 3
                  </Text>
                </View>
                <Text style={styles.itemPrice}>₦25,000</Text>
              </View>

              <View style={styles.cutlerySection}>
                <Image
                  source={require("../../assets/Foodmart/Vector4.png")} // Replace with your cutlery image path
                  style={styles.cutleryIcon}
                />
                <Text style={styles.cutleryText}>Cutlery Included</Text>
              </View>

              <View style={styles.deliverySection}>
                <Text style={styles.sectionTitle}>Delivery Details</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Address lorem dolor officia..."
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Address lorem dolor officia..."
                />
              </View>

              <View style={styles.summarySection}>
                <Text style={styles.sectionTitle}>Summary</Text>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Sub Total</Text>
                  <Text style={styles.summaryValue}>₦40,500</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Delivery Fee</Text>
                  <Text style={styles.summaryValue}>₦2,000</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Service</Text>
                  <Text style={styles.summaryValue}>₦500</Text>
                </View>
                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>Total</Text>
                  <Text style={styles.totalValue}>₦42,500</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={styles.container}></View>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", paddingTop: 20 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backArrow: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  statusSection: {
    marginBottom: 20,
  },
  status: {
    color: "green",
    fontSize: 16,
    fontWeight: "bold",
  },
  orderId: {
    fontSize: 14,
    color: "#333",
    marginTop: 5,
  },
  dateTime: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  restaurantSection: {
    marginBottom: 20,
  },
  restaurantTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  itemQuantity: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  itemOptions: {
    fontSize: 12,
    color: "#555",
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: "bold",
  },
  cutlerySection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  cutleryIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  cutleryText: {
    fontSize: 14,
  },
  deliverySection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  summarySection: {
    marginBottom: 20,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#555",
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: "bold",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "green",
  },
});
