import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { ReusableBackButton } from "../../components/shared/SharedButton_Icon";
// import { Icon } from "react-native-elements";

export default function OrderHistory() {
  const [activeTab, setActiveTab] = useState("Pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [orders, setOrders] = useState([
    {
      id: "1",
      orderId: "#E8F99P",
      deliveryCode: "8809",
      date: "24-01-2024",
      time: "12:30PM",
      status: "Pending",
    },
    {
      id: "2",
      orderId: "#A7D88R",
      deliveryCode: "8810",
      date: "24-01-2024",
      time: "1:00PM",
      status: "Preparing",
    },
    {
      id: "3",
      orderId: "#B5C77Q",
      deliveryCode: "8811",
      date: "23-01-2024",
      time: "3:45PM",
      status: "Delivered",
    },
    // Add more sample orders as needed
  ]);

  const filteredOrders = orders.filter(
    (order) =>
      order.status === activeTab &&
      (order.orderId.includes(searchQuery) ||
        order.deliveryCode.includes(searchQuery))
  );

  const renderOrder = ({ item }) => (
    <View style={styles.orderRow}>
      <Text style={styles.orderText}>{item.orderId}</Text>
      <Text style={styles.orderText}>{item.deliveryCode}</Text>
      <Text style={styles.orderText}>{`${item.date}  |  ${item.time}`}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>New Category</Text>
          <ReusableBackButton style={{ position: "absolute", left: 10 }} />
        </View>
      </View>

      {/* Search and Filter */}
      <View style={styles.searchContainer}>
        {/* <Icon name="filter" type="ionicon" color="gray" size={24} /> */}
        <TextInput
          style={styles.searchInput}
          placeholder="search orders"
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {["Pending", "Preparing", "Delivered"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderText}>Order ID</Text>
        <Text style={styles.tableHeaderText}>Delivery Code</Text>
        <Text style={styles.tableHeaderText}>Order Date & Time</Text>
      </View>

      {/* Orders List */}
      <FlatList
        data={filteredOrders}
        keyExtractor={(item) => item.id}
        renderItem={renderOrder}
        contentContainerStyle={styles.ordersList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    justifyContent: "center",
    marginVertical: 16,
  },
  backButton: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
    textAlign: "center",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#333",
  },
  tabs: {
    flexDirection: "row",
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
    alignItems: "center",
  },
  activeTab: {
    borderBottomColor: "green",
  },
  tabText: {
    fontSize: 16,
    color: "#999",
  },
  activeTabText: {
    color: "green",
    fontWeight: "bold",
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fef7e0",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  tableHeaderText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  ordersList: {
    paddingBottom: 20,
  },
  orderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  orderText: {
    fontSize: 14,
    color: "#333",
  },
});
