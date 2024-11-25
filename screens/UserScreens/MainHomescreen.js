import React, { useState } from "react";
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
import {
  MaterialCommunityIcons,
  Ionicons,
  AntDesign,
} from "@expo/vector-icons";
import AppScreen from "../../components/shared/AppScreen";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Account from "../../components/Auth/Account";
import CartScreen from "../../components/CartScreen";

const MainHomescreen = () => {
  const { user_data } = useSelector((state) => state.Auth);
  const navigation = useNavigation();

  const [showaccount, setShowaccount] = useState(false);

  console.log({
    ksks: user_data?.data?.user?.name,
  });

  const [notification, setnotification] = useState("home");

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

  const cart_state = () => {
    if (notification === "cart") {
      setnotification("home");
    } else {
      setnotification("cart");
    }
    console.log("this is working ");
  };
  return (
    <AppScreen>
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          paddingTop: 20,
          paddingHorizontal: 20,
        }}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setnotification("account")}>
            {/* <TouchableOpacity onPress={() => setShowaccount(true)}> */}
            <Image
              source={{
                uri: "https://s3-alpha-sig.figma.com/img/9265/f6e3/e22a4d011fdf9bee1bc447fd54300962?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=frC5B-Z2NhGFgmYjZ7O0ExewGy2ZjbMA5TANJZKdox689M0O-rBcTykS5g2slmFVlViF4SUIvCt2ks5LKcLolm5iJX63JcLEaHE6aw4~rkvMUyn5znE~UBF~7UYDUz-8Skn18O8lOQRSRZYnh84j9k8nW58AR7f3lsQ23wWBPv1GAUAkHbNboCMDA4p4lz1LtA6Ape6MA0Anu0X4MJvZ1x5H4djNdqpZbOioRsifMI-7HSujIWt30-JcUG24g6yBVz1cyB0nTUbQKHX3BJbJdBFMCp4H-gWGRNq0RPfdATZf4H~UlL~uahR7W0t6fECapBmo42FwUortllMJE82taQ__",
              }} // Replace with profile picture URL
              style={styles.profileImage}
            />
          </TouchableOpacity>

          <View
            style={[
              styles.searchInput,
              {
                flexDirection: "row",
                // justifyConten
                alignItems: "center",
              },
            ]}
          >
            <AntDesign name="search1" size={24} color="black" />
            <TextInput placeholder="search" style={styles.searchInput} />
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity
              onPress={() => {
                console.log("kdkd");
                cart_state();
              }}
            >
              <MaterialCommunityIcons
                name="cart-outline"
                size={24}
                color="black"
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="notifications-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        {notification === "home" && (
          <ScrollView style={styles.container}>
            {/* Greeting Section */}
            <Text style={styles.greeting}>
              What are you ordering today {user_data?.data?.user?.name}?
            </Text>

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
                <TouchableOpacity
                  style={styles.restaurantCard}
                  onPress={() => navigation.navigate("RestaurantMenuScreen")}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={styles.restaurantImage}
                  />
                  <View style={styles.ratingBadge}>
                    <Text style={styles.ratingText}>{item.rating}</Text>
                  </View>
                  <Text style={styles.restaurantName}>{item.name}</Text>
                  <Text style={styles.restaurantTime}>9:00AM - 9:00PM</Text>
                </TouchableOpacity>
              )}
            />
          </ScrollView>
        )}

        {notification === "cart" && <CartScreen />}
        {notification === "account" && (
          <Account onCLose={() => setnotification("home")} />
        )}
      </View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  iconContainer: {
    flexDirection: "row",
    marginLeft: 8,
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

export default MainHomescreen;
