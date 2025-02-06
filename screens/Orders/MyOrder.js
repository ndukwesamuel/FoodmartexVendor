import React, { useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { Get_an_order } from "../../Redux/OrderSlice";
import OrderItems from "../../components/OrderItem";

export default function MyOrder({ route }) {
  const item = route.params.item;
  const dispatch = useDispatch();
  const { Get_an_order_data } = useSelector((state) => state?.OrderSlice);
  console.log({ id: Get_an_order_data });
  useEffect(() => {
    dispatch(Get_an_order(item));
    return () => {};
  }, [dispatch]);
  return (
    <AppScreen>
      <ScrollView style={styles.container}>
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
            <Text style={styles.status}>{Get_an_order_data?.data?.status}</Text>
            <Text style={styles.orderId}>
              Order ID: {Get_an_order_data?.data?.id}
            </Text>
            <Text style={styles.dateTime}>24-01-2024 | 12:30PM</Text>
          </View>

          {/* <ScrollView> */}
          <View style={styles.restaurantSection}>
            <Text style={styles.restaurantTitle}>
              {Get_an_order_data?.data?.vendor?.name}
            </Text>
            <OrderItems orderItems={Get_an_order_data?.data?.order_items} />

            <View style={styles.cutlerySection}>
              <Image
                source={require("../../assets/Foodmart/Vector4.png")} // Replace with your cutlery image path
                style={styles.cutleryIcon}
              />
              <Text style={styles.cutleryText}>Cutlery Included</Text>
            </View>

            <View style={styles.deliverySection}>
              <Text style={styles.sectionTitle}>Delivery Details</Text>
              <Text style={styles.textInput}>
                {Get_an_order_data?.data?.customer?.mobile_number}
              </Text>
              <Text style={styles.textInput}>
                {Get_an_order_data?.data?.customer_address}
              </Text>
            </View>

            <View style={styles.summarySection}>
              <Text style={styles.sectionTitle}>Summary</Text>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Sub Total</Text>
                <Text style={styles.summaryValue}>
                  {Get_an_order_data?.data?.sub_total}
                </Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Delivery Fee</Text>
                <Text style={styles.summaryValue}>
                  {Get_an_order_data?.data?.delivery_fee}
                </Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Service</Text>
                <Text style={styles.summaryValue}>
                  {Get_an_order_data?.data?.service_charge}
                </Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>
                  {Get_an_order_data?.data?.total_amount}
                </Text>
              </View>
            </View>
          </View>
          {/* </ScrollView> */}
        </View>
        <View style={styles.container}></View>
      </ScrollView>
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
