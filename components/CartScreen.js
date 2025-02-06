import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ReusableBackButton } from "./shared/SharedButton_Icon";
import { ReusableTitle } from "./shared/Reuseablecomponent";
import { useDispatch, useSelector } from "react-redux";
import { Get_All_Vendor_Order_Fun } from "../Redux/OrderSlice";
// import { ReusableBackButton } from "../../components/shared/SharedButton_Icon";
// import { ReusableTitle } from "../../components/shared/Reuseablecomponent";

const orders = Array(10).fill({
  id: "#E8F99P",
  deliveryCode: "8809",
  date: "24-01-2024",
  time: "12:30PM",
});

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("Pending");
  const { vendor_order_data } = useSelector((state) => state.OrderSlice);
  const tabs = ["Pending", "Preparing", "Delivered"];

  useEffect(() => {
    dispatch(Get_All_Vendor_Order_Fun());
    return () => {};
  }, [dispatch]);

  const filteredOrders = vendor_order_data.filter(
    (order) => order.status === activeTab.toLowerCase()
  );
  console.log({ filteredOrders: filteredOrders });

  return (
    <View style={styles.container}>
      <ReusableBackButton
        style={{ position: "absolute", top: 15, zIndex: 1, left: 20 }}
      />
      <ReusableTitle data="All Orders" />
      <View style={styles.searchContainer}>
        <Ionicons
          name="filter"
          size={20}
          color="green"
          style={styles.filterIcon}
        />
        <TextInput style={styles.searchInput} placeholder="Search orders" />
      </View>
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={activeTab === tab ? styles.activeTab : styles.tab}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={activeTab === tab ? styles.activeTabText : styles.tabText}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>Order ID</Text>
        <Text style={styles.headerText}>Tracking Number</Text>
        <Text style={styles.headerText}>Order Date & Time</Text>
      </View>
      <FlatList
        data={filteredOrders}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.row}
            onPress={() => navigation.navigate("MyOrder", item?.id)}
          >
            <Text style={styles.cell}>{item.id}</Text>
            <Text style={styles.cell}>{item.tracking_number}</Text>
            <Text style={styles.cell}>
              {item.date} | {item.time}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 30 }}>
            No Orders in this category
          </Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: "",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#000000",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginTop: 15,
    paddingHorizontal: 10,
    marginHorizontal: 20,
  },
  filterIcon: {
    marginRight: 5,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  tabContainer: {
    flexDirection: "row",
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    justifyContent: "space-between",
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  activeTab: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 2,
    borderBottomColor: "#023526",
  },
  tabText: {
    color: "#686868",
    fontSize: 20,
  },
  activeTabText: {
    color: "#023526",
    fontWeight: "bold",
    fontSize: 20,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFF1E0",
    padding: 10,
    marginTop: 10,
  },
  headerText: {
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  cell: {
    flex: 1,
    textAlign: "center",
  },
});

export default CartScreen;
