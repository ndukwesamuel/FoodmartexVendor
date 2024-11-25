import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
} from "react-native";
import AppScreen from "../../components/shared/AppScreen";
import { ReusableBackButton } from "../../components/shared/SharedButton_Icon";
import { useNavigation } from "@react-navigation/native";

const RestaurantMenuScreen = () => {
  const [activeTab, setActiveTab] = useState("All");
  const navigation = useNavigation();

  // Sample menu data
  const menuData = [
    {
      id: "1",
      category: "Special Meals",
      title: "Special Rice",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: "5,500",
      image: "https://via.placeholder.com/100",
    },
    {
      id: "2",
      category: "Main Meals",
      title: "Special Rice",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: "5,500",
      image: "https://via.placeholder.com/100",
    },
    {
      id: "3",
      category: "Drinks",
      title: "Special Juice",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: "5,500",
      image: "https://via.placeholder.com/100",
    },
    // Add more items for testing
  ];

  // Filter menu based on active tab
  const filteredMenu =
    activeTab === "All"
      ? menuData
      : menuData.filter((item) => item.category === activeTab);

  return (
    <AppScreen>
      <ScrollView style={styles.container}>
        {/* Image Header */}
        <Image
          source={{
            uri: "https://s3-alpha-sig.figma.com/img/d1d3/e77b/bc3cbdbceb823813881db3d60cc27d10?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZWXRtETGfIKWq6COC1~Bhpqo3TbUVmPuUklAeBNNUY1cJgdTPI49WQfMQ9ThtJ49km16mgJe4Ce~IGQ8dBS7hEdLRdCpsf2qpTvnQy8z0qKuevLo0o~l2A8emasaMPPxKnNjlZXUBzzYUdDbF4UVunrKOZkL5teYvFUanEv6LCsk2~JWwZm~Jty68HOOeFXlBvDfjxWvHThz3QRBEgfy6H94JJzhHpOe5tWWajIJ3DP~IaKJXkEMUfbB5F6FCVLrVWZxwzGEh8CFuZFPPOliLfC39eIDxq0bUZjhB5KHj8G5C9R4T7UpniDi6lAb4PmfD1cspMFA-agBKoPa8PL7UA__",
          }} // Replace with real image
          style={styles.headerImage}
        />

        <ReusableBackButton
          style={{ position: "absolute", top: 15, zIndex: 1, left: 20 }}
        />

        {/* Restaurant Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.restaurantName}>Restaurant 6 ememe</Text>
          <View style={styles.row}>
            <Text style={styles.rating}>⭐ 4.0</Text>
            <Text style={styles.reviews}>(515)</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.infoText}>Preparation Time: 25 - 35 min</Text>
            <Text style={styles.infoText}>
              Available Delivery Time: Instant Delivery
            </Text>
          </View>
        </View>

        {/* Search Bar */}
        <TextInput style={styles.searchBar} placeholder="Search menu items" />

        {/* Tab Buttons */}
        <View style={styles.tabs}>
          {["All", "Special Meals", "Main Meals", "Drinks"].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tabButton,
                activeTab === tab && styles.activeTabButton,
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[
                  styles.tabButtonText,
                  activeTab === tab && styles.activeTabText,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Menu List */}
        {["Special Meals", "Main Meals", "Drinks"].map((category) => (
          <View key={category}>
            {filteredMenu.some((item) => item.category === category) && (
              <>
                <Text style={styles.sectionTitle}>
                  {category.toUpperCase()}
                </Text>
                {filteredMenu
                  .filter((item) => item.category === category)
                  .map((item) => (
                    <View key={item.id} style={styles.menuItem}>
                      <View style={styles.menuDetails}>
                        <Text style={styles.menuTitle}>{item.title}</Text>
                        <Text style={styles.menuDescription}>
                          {item.description}
                        </Text>
                        <Text style={styles.menuPrice}>{item.price}</Text>
                      </View>
                      <Image
                        source={{ uri: item.image }}
                        style={styles.menuImage}
                      />
                      <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => navigation.navigate("FoodDetails")}
                      >
                        <Text style={styles.addButtonText}>+</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
              </>
            )}
          </View>
        ))}
      </ScrollView>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerImage: {
    width: "100%",
    height: 200,
  },
  infoContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#e0e0e0",
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  rating: {
    fontSize: 14,
    color: "#f39c12",
  },
  reviews: {
    fontSize: 12,
    color: "#999",
    marginLeft: 8,
  },
  infoText: {
    fontSize: 12,
    color: "#333",
    marginRight: 16,
  },
  searchBar: {
    margin: 16,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    backgroundColor: "#f8f8f8",
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  tabButton: {
    padding: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "#f8f8f8",
  },
  activeTabButton: {
    backgroundColor: "#007bff",
  },
  tabButtonText: {
    fontSize: 12,
    color: "#333",
  },
  activeTabText: {
    color: "#fff",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  menuDetails: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  menuDescription: {
    fontSize: 12,
    color: "#999",
    marginBottom: 4,
  },
  menuPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  menuImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  addButton: {
    backgroundColor: "#007bff",
    borderRadius: 8,
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default RestaurantMenuScreen;
