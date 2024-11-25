import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Forminput, Forminput_Icon } from "../components/shared/InputForm";

export default function Notification() {
  const notifications = [
    {
      id: "1",
      title: "Canceled Request",
      description: "Lorem ipsum dolor sit amet consectetur adig...",
      icon: "package-variant",
    },
    {
      id: "2",
      title: "Money Received",
      description: "Lorem ipsum dolor sit amet consectetur adig...",
      icon: "currency-usd",
    },
    {
      id: "3",
      title: "You've arrived at your destination",
      description: "Lorem ipsum dolor sit amet consectetur adig...",
      icon: "map-marker",
    },
    {
      id: "4",
      title: "Canceled Request",
      description: "Lorem ipsum dolor sit amet consectetur adig...",
      icon: "package-variant",
    },
    {
      id: "5",
      title: "Money Received",
      description: "Lorem ipsum dolor sit amet consectetur adig...",
      icon: "currency-usd",
    },
    {
      id: "6",
      title: "You've arrived at your destination",
      description: "Lorem ipsum dolor sit amet consectetur adig...",
      icon: "map-marker",
    },
  ];
  const [search, setSearch] = useState("");
  const renderNotification = ({ item }) => (
    <View>
      <View style={styles.notificationItem}>
        <Image
          source={
            item.icon === "package-variant"
              ? require("../assets/Foodmart/cancelled.png")
              : item.icon === "currency-usd"
              ? require("../assets/Foodmart/coins.png")
              : require("../assets/Foodmart/location.png")
          }
          style={styles.notificationIcon}
        />
        <View style={styles.notificationText}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          <Text style={styles.notificationDescription}>{item.description}</Text>
        </View>
      </View>
      <View style={styles.divider} />
    </View>
  );
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: "https://i.pravatar.cc/300" }}
          style={styles.profileImage}
        />
        <Forminput_Icon
          containerstyle={styles.searchInput}
          placeholder="Search"
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity style={styles.headerIcon}>
          <Ionicons name="cart-outline" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerIcon}>
          <Ionicons name="person-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Notifications Header */}
      <Text style={styles.notificationsHeader}>Notifications</Text>

      {/* Notifications List */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderNotification}
        contentContainerStyle={styles.notificationsList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#686868",
    height: 36,
  },
  headerIcon: {
    marginLeft: 10,
  },
  notificationsHeader: {
    fontSize: 24,
    fontWeight: "500",
    marginBottom: 10,
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  notificationIcon: {
    marginRight: 15,
  },
  notificationText: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#023526",
  },
  notificationDescription: {
    fontSize: 12,
    color: "#9B9B9B",
    marginTop: 5,
  },
  notificationsList: {
    // paddingBottom: 20,
    gap: 24,
  },
  divider: {
    height: 1,
    backgroundColor: "#ccc",
    // marginVertical: 20,
  },
});
