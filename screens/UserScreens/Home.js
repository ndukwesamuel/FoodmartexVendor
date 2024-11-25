import React from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
} from "react-native";

const HomeScreen = () => {
  // Dummy data for restaurants and categories
  const featuredRestaurants = [
    {
      id: "1",
      name: "Restaurant 1",
      image: "https://via.placeholder.com/150",
      rating: 4.0,
    },
    {
      id: "2",
      name: "Restaurant 2",
      image: "https://via.placeholder.com/150",
      rating: 4.0,
    },
    {
      id: "3",
      name: "Restaurant 3",
      image: "https://via.placeholder.com/150",
      rating: 4.0,
    },
    {
      id: "4",
      name: "Restaurant 4",
      image: "https://via.placeholder.com/150",
      rating: 4.0,
    },
    {
      id: "5",
      name: "Restaurant 5",
      image: "https://via.placeholder.com/150",
      rating: 4.0,
    },
    {
      id: "6",
      name: "Restaurant 6",
      image: "https://via.placeholder.com/150",
      rating: 4.0,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: "https://via.placeholder.com/40" }} // Replace with profile picture
          style={styles.profileImage}
        />
        <TextInput placeholder="Search" style={styles.searchInput} />
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Image
              source={{ uri: "https://via.placeholder.com/24" }}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={{ uri: "https://via.placeholder.com/24" }}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Greeting Section */}
      <Text style={styles.greeting}>What are you ordering today Pelumi?</Text>

      {/* Featured Section */}
      <View style={styles.featuredContainer}>
        <Image
          source={{ uri: "https://via.placeholder.com/300" }} // Replace with featured image
          style={styles.featuredImage}
        />
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>Get up to 20% Discount</Text>
        </View>
      </View>

      {/* Categories */}
      <Text style={styles.sectionTitle}>Categories</Text>
      <View style={styles.categoriesContainer}>
        <TouchableOpacity style={styles.categoryButton}>
          <Text style={styles.categoryText}>Discounts</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.categoryButton, styles.inactiveCategory]}
        >
          <Text style={styles.inactiveCategoryText}>Scheduled</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.categoryButton, styles.inactiveCategory]}
        >
          <Text style={styles.inactiveCategoryText}>Deliver Now</Text>
        </TouchableOpacity>
      </View>

      {/* Restaurants */}
      <FlatList
        data={featuredRestaurants}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.restaurantCard}>
            <Image
              source={{ uri: item.image }}
              style={styles.restaurantImage}
            />
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
            <Text style={styles.restaurantName}>{item.name}</Text>
            <Text style={styles.restaurantTime}>9:00AM - 9:00PM</Text>
          </View>
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
  },
  headerIcons: {
    flexDirection: "row",
    marginLeft: 8,
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 16,
  },
  greeting: {
    fontSize: 16,
    color: "#333",
    marginBottom: 16,
  },
  featuredContainer: {
    marginBottom: 16,
    position: "relative",
  },
  featuredImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  discountBadge: {
    position: "absolute",
    bottom: 16,
    left: 16,
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  discountText: {
    fontSize: 12,
    color: "#ff5a5f",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  categoriesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  categoryButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#007bff",
    alignItems: "center",
    marginHorizontal: 4,
  },
  categoryText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  inactiveCategory: {
    backgroundColor: "#f2f2f2",
  },
  inactiveCategoryText: {
    color: "#333",
  },
  restaurantCard: {
    flex: 1,
    margin: 8,
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: "hidden",
  },
  restaurantImage: {
    width: "100%",
    height: 100,
  },
  ratingBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "#ffcc00",
    borderRadius: 4,
    padding: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
  },
  restaurantName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginTop: 8,
    marginHorizontal: 8,
  },
  restaurantTime: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
    marginHorizontal: 8,
  },
});

export default HomeScreen;
