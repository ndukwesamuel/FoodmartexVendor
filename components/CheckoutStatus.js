import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

const OrderPlacingScreen = ({ action }) => {
  const [progress, setProgress] = useState(0); // Initial progress at 0%

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval); // Stop the interval when progress reaches 100%
          return prev; // Return the current progress to avoid exceeding 100%
        }
        return prev + 25; // Increment by 25%
      });
    }, 5000); // 5000ms = 5 seconds

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      {/* Progress Indicator */}
      <View style={styles.progressContainer}>
        <View
          style={[
            styles.progressCircle,
            {
              borderTopColor: "#70B944",
              borderRightColor: progress >= 50 ? "#70B944" : "#e9ecef",
              borderBottomColor: progress >= 75 ? "#70B944" : "#e9ecef",
              borderLeftColor: progress === 100 ? "#70B944" : "#e9ecef",
            },
          ]}
        >
          <Image
            source={{
              uri: "https://s3-alpha-sig.figma.com/img/3edd/83b8/095b722630773159a38f70daf4a23bdc?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PlS1hkqzbdFkYkplwE-zam-Tm98K2bSlhMaE-Y31Pb-~taK1J9sejWMKRxPHnZSw0Qn6HusfiKLbWDLt9R9mlF4PTUozbckk2XWLkaqO-A9XvnVgTn7~uFyrHjz~T1utFx8rkj204TJvOfeNJw8O6~eXWolbDN3UzEs6vYF9-2ROUjhd8uhaacv6ZOxllmPmCKpnnuhP2l7u7xRL8GqXBaI8kphPDB354uZSHAXpmdl3Fz0RF-cfyu1Kj-twldiDo2s58xIKr37a9~AzuwsH9BoRPhUIN-pDWi9Z~X4BQx6iZcpFKB5GUvtXFNxE29fC0gEYLF0gGmc-z-k1kBGrAg__",
            }}
            style={styles.progressImage}
          />
        </View>
        <Text style={styles.progressText}>{progress}%</Text>
      </View>

      {/* Header */}
      <Text style={styles.headerText}>Placing your order</Text>

      {/* Delivery Address Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Feather name="map-pin" size={20} color="#0f5132" />
          <Text style={styles.sectionTitle}>Delivery Address</Text>
        </View>
        <Text style={styles.sectionDescription}>
          Address lorem dolor officia...
        </Text>
      </View>

      {/* Order Summary Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons
            name="file-document-outline"
            size={20}
            color="#0f5132"
          />
          <Text style={styles.sectionTitle}>Order Summary</Text>
        </View>
        <View style={styles.orderItem}>
          <Text style={styles.itemText}>x1 Special Rice</Text>
          <Text style={styles.itemOptions}>x1 Option 1</Text>
          <Text style={styles.itemOptions}>x1 Option 3</Text>
        </View>
        <View style={styles.orderItem}>
          <Text style={styles.itemText}>x3 Special Rice</Text>
          <Text style={styles.itemOptions}>x1 Option 2</Text>
          <Text style={styles.itemOptions}>x1 Option 3</Text>
        </View>
      </View>

      {/* Cancel Order Button */}
      <TouchableOpacity style={styles.cancelButton} onPress={action}>
        <Text style={styles.cancelButtonText}>Cancel Order</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  progressContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  progressCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 10,
    borderColor: "#e9ecef",
    borderTopColor: "#0f5132",
    justifyContent: "center",
    alignItems: "center",
  },
  progressImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  progressText: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    // textAlign: "center",
    marginVertical: 10,
  },
  section: {
    marginVertical: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0f5132",
    marginLeft: 5,
  },
  sectionDescription: {
    fontSize: 14,
    color: "#6c757d",
    marginLeft: 25,
  },
  orderItem: {
    marginLeft: 25,
    marginTop: 10,
  },
  itemText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#0f5132",
  },
  itemOptions: {
    fontSize: 12,
    color: "#6c757d",
  },
  cancelButton: {
    marginTop: 20,
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderWidth: 1,
    borderColor: "#ffa500",
    borderRadius: 5,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#ffa500",
  },
});

export default OrderPlacingScreen;
