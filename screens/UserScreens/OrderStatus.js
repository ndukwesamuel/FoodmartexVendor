import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function OrderStatus() {
  const orderSteps = [
    {
      step: "Restaurant has accepted your order",
      time: "2:30 PM",
      active: false,
    },
    {
      step: "Restaurant is packaging your order",
      time: "2:30 PM",
      active: true,
    },
    { step: "Locating your rider", time: "2:30 PM", active: false },
    {
      step: "Rider is at the Restaurant to pick up order",
      time: "2:30 PM",
      active: false,
    },
    {
      step: "Rider is on his way to meet you now",
      time: "2:30 PM",
      active: false,
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={{ backgroundColor: "#FFF8EF", paddingTop: 50 }}>
        <View style={styles.header}>
          <TouchableOpacity>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Order Status</Text>
          <TouchableOpacity style={styles.helpButton}>
            <Text style={styles.helpText}>Help</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.etaContainer}>
          <Text style={styles.etaText}>Estimated Time of Arrival</Text>
          <Text style={styles.timeText}>12:50 PM - 11:20 PM</Text>
        </View>
      </View>
      {/* Estimated Time */}

      <View style={{ padding: 20 }}>
        <View style={styles.codeContainer}>
          <Text style={styles.codeText}>Share this code with your rider</Text>
          <View style={styles.codeBox}>
            <Text style={styles.code}>7</Text>
            <Text style={styles.code}>7</Text>
            <Text style={styles.code}>7</Text>
            <Text style={styles.code}>7</Text>
          </View>
        </View>
      </View>
      <View style={styles.divider} />
      {/* Order Progress */}
      <FlatList
        data={orderSteps}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.stepContainer}>
            <View style={[styles.circle, item.active && styles.activeCircle]} />
            <View style={styles.line} />
            <View style={styles.stepDetails}>
              <Text
                style={[styles.stepText, item.active && styles.activeStepText]}
              >
                {item.step}
              </Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    // borderBottomWidth: 1,
    // backgroundColor: "#FFF8EF",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  helpButton: {
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  helpText: {
    fontSize: 14,
    color: "#007bff",
  },
  etaContainer: {
    padding: 16,
    // backgroundColor: "#f9f9f9",
    alignItems: "center",
  },
  etaText: {
    fontSize: 16,
    color: "#000000",
  },
  timeText: {
    fontSize: 24,
    fontWeight: "400",
    marginVertical: 8,
  },
  codeContainer: {
    marginTop: 16,
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#686868",
    flexDirection: "row",
    gap: 21,
    padding: 20,
    borderRadius: 8,
  },
  codeText: {
    fontSize: 14,
    color: "#023526",
    marginBottom: 8,
    width: "25%",
  },
  codeBox: {
    // backgroundColor: "#eee",
    paddingVertical: 8,
    paddingHorizontal: 32,
    borderRadius: 4,
    flexDirection: "row",
    gap: 8,
  },
  code: {
    fontSize: 20,
    fontWeight: "600",
    backgroundColor: "#eee",
    paddingVertical: 5,
    paddingHorizontal: 14,
  },
  listContainer: {
    paddingHorizontal: 42,
    paddingVertical: 8,
    margin: "auto",
  },
  stepContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 10,
  },
  circle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#ddd",
    marginRight: 8,
  },
  activeCircle: {
    borderColor: "#F79B2C",
    backgroundColor: "#F79B2C",
  },
  line: {
    height: 40,
    width: 2,
    backgroundColor: "#ddd",
    position: "absolute",
    left: 6,
    top: 12,
    zIndex: -1,
  },
  stepDetails: {
    // flex: 1,
  },
  stepText: {
    fontSize: 16,
    color: "#686868",
  },
  activeStepText: {
    color: "#F79B2C",
    fontWeight: "bold",
  },
  time: {
    fontSize: 10,
    color: "#023526",
    textAlign: "right",
  },
  divider: {
    height: 2,
    backgroundColor: "#ccc",
    marginVertical: 20,
    // marginVertical: 20,
  },
});
