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

export default function NewCategory() {
  const [selectedItems, setSelectedItems] = useState([]);

  const foodItems = [
    { id: "1", name: "Spaghetti", price: 5000 },
    { id: "2", name: "Jollof Rice", price: 3500 },
    { id: "3", name: "Special Rice", price: 4000 },
    { id: "4", name: "Jollof Rice", price: 3500 },
    { id: "5", name: "Spaghetti", price: 5000 },
  ];

  const handleSelectItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const renderFoodItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>
        {item.name} ({item.price.toLocaleString()})
      </Text>
      <TouchableOpacity onPress={() => handleSelectItem(item.id)}>
        <Text
          style={
            selectedItems.includes(item.id) ? styles.checkMark : styles.plusMark
          }
        >
          {selectedItems.includes(item.id) ? "✓" : "+"}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>New Category</Text>
          <ReusableBackButton style={{ position: "absolute", left: 10 }} />
        </View>
      </View>
      <TextInput
        placeholder="Category Name"
        style={styles.input}
        placeholderTextColor="#000000"
      />
      <Text style={styles.subHeader}>Select Food items for this category</Text>
      <FlatList
        data={foodItems}
        keyExtractor={(item) => item.id}
        renderItem={renderFoodItem}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity style={styles.uploadButton}>
        <Text style={styles.uploadText}>Upload</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
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
  input: {
    borderBottomWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginBottom: 40,
  },
  subHeader: {
    fontSize: 16,
    marginBottom: 20,
    color: "#686868",
  },
  listContainer: {
    paddingBottom: 20,
    gap: 24,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemText: {
    fontSize: 16,
  },
  checkMark: {
    fontSize: 20,
    color: "green",
    backgroundColor: "#023526",
    padding: 3,
    paddingHorizontal: 8,
    borderRadius: 50,
  },
  plusMark: {
    fontSize: 20,
    color: "gray",
    padding: 3,
    paddingHorizontal: 8,
    borderRadius: 50,
    backgroundColor: "#C4C4C4",
  },
  uploadButton: {
    backgroundColor: "#ffa500",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  uploadText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});
