import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
export default function Menu() {
  const navigation = useNavigation();
  const [menuItems, setMenuItems] = useState([
    {
      id: "1",
      name: "Special Rice",
      description: "Delicious rice with special spices",
      price: "5,500",
      image: "https://via.placeholder.com/150",
    },
    {
      id: "2",
      name: "Special Rice",
      description: "Aromatic rice with flavors of the world",
      price: "5,500",
      image: "https://via.placeholder.com/150",
    },
    {
      id: "3",
      name: "Special Rice",
      description: "Tasty rice served with vegetables",
      price: "5,500",
      image: "https://via.placeholder.com/150",
    },
  ]);

  const handleEdit = (id) => {
    // Handle editing logic
    console.log("Edit item:", id);
  };

  const handleDelete = (id) => {
    // Handle delete logic
    setMenuItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("MenuDetails")}
    >
      <View style={{ flex: 1, gap: 8 }}>
        <Text style={styles.foodName}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.price}>{item.price}</Text>
          <View style={styles.actionIcons}>
            <TouchableOpacity
              onPress={() => navigation.navigate("MenuDetails")}
            >
              <Icon name="create-outline" size={24} color="#FFA500" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("MenuDetails")}
            >
              <Icon name="trash-outline" size={24} color="red" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Image source={{ uri: item.image }} style={styles.foodImage} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Icon
          name="arrow-back-outline"
          size={24}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.title}>Menu</Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity style={styles.newFoodButton}>
          <Text style={styles.newFoodText}>New Food Item</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.newFoodButton}>
          <Text style={styles.newFoodText}>New Food Item</Text>
        </TouchableOpacity>
      </View>

      {/* Food List */}
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20, gap: 16, marginTop: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-between",
    marginVertical: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  newFoodButton: {
    backgroundColor: "#FFA500",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  newFoodText: {
    color: "#fff",
    fontWeight: "bold",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 10,
    // borderRadius: 10,
    elevation: 2,
    gap: 20,
  },
  foodName: {
    fontSize: 18,
    fontWeight: "400",
    color: "#F79B2C",
  },
  description: {
    fontSize: 12,
    color: "#686868",
    fontWeight: "300",
    // marginVertical: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  foodImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    // marginLeft: 10,
  },
  actionIcons: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-around",
    // marginLeft: 10,
    justifyContent: "flex-end",
  },
});
