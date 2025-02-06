import React from "react";
import { FlatList, View, Text, Image, StyleSheet } from "react-native";

const OrderItems = ({ orderItems }) => {
  const renderItem = ({ item }) => (
    <View style={styles.itemRow}>
      {/* Item Details */}
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>
          x{item.quantity} {item.menu_item.name}
        </Text>

        {/* Display Extras (if available) */}
        {item.extras.length > 0 && (
          <View style={styles.extrasContainer}>
            {item.extras.map((extra, i) => (
              <Text key={i} style={styles.itemOptions}>
                x{extra.quantity} {extra.extra_option.name}
              </Text>
            ))}
          </View>
        )}
      </View>

      {/* Price */}
      <Text style={styles.itemPrice}>
        ₦{(item.unit_price_with_extras * item.quantity).toLocaleString()}
      </Text>
    </View>
  );

  return (
    <FlatList
      data={orderItems}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

// Styles for the component
const styles = StyleSheet.create({
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#444",
  },
  extrasContainer: {
    marginTop: 3,
  },
  itemOptions: {
    fontSize: 14,
    color: "#666",
    marginLeft: 20,
  },
  itemPrice: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#000",
  },
});

export default OrderItems;
