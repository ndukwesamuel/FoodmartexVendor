import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { maincolors } from "../utills/Themes";
import AppScreen from "../components/shared/AppScreen";
import {
  MaterialCommunityIcons,
  Ionicons,
  AntDesign,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Account from "../components/Auth/Account";
import CartScreen from "../components/CartScreen";
import { useSelector } from "react-redux";
const HomeScreen = () => {
  const navigation = useNavigation();
  const { user_data, user_isLoading, user_profile_data } = useSelector(
    (state) => state?.Auth
  );

  console.log({
    mxmxOne: user_profile_data?.data,
    // mxmxOne: user_profile_data,
  });
  const [showaccount, setShowaccount] = useState(false);

  const [notification, setnotification] = useState("home");

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
            <Image
              source={{
                uri:
                  user_profile_data?.data?.restaurant_picture ||
                  "https://s3-alpha-sig.figma.com/img/9265/f6e3/e22a4d011fdf9bee1bc447fd54300962?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DJstDRZyzM8SPgw~rxOWWk6UQQXvtjM73QA9SnQ34mdW-0RlWzwMhJJRdVdo0NI5YZXSp7Xe~jQxKExk7rLFTFhQev4IBH55Ok0vbC8ABCk7Kl9g-4axNOKc5p~qUUK9mvoODmjb8fTIP2jPPIUT4vLauhnrYkf6JzvPvapnZpxXdqBGZIoZOPpwtuph4ARUkYckYWGuNPBpAUQfvLSVNgkQNsaJc95ZKfnOwo4fic~un8FxAuNU76on51nhXSoI1fX2of-naJYGUovOpcBMZwMuQKr2sdipSMOTJcMmsmZihOT6vVmxd23epbBeLZ~tBedyUmphCKxfFHoLs7AOzA__",
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
            <TouchableOpacity onPress={cart_state}>
              <MaterialCommunityIcons
                name="cart-outline"
                size={24}
                color="black"
              />
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={() => navigation.navigate("Notification")}
            >
              <Ionicons name="notifications-outline" size={24} color="black" />
            </TouchableOpacity> */}
          </View>
        </View>
        {notification === "home" && (
          <View
            style={{
              flex: 1,
              marginTop: "30%",
            }}
          >
            {/* Cashback Promo Section */}

            {/* Greeting Section */}
            <View>
              <Text style={styles.greetingText}>
                Hello {user_profile_data?.data?.name},
              </Text>
            </View>

            <View style={styles.promoContainer}>
              <Image
                source={require("../assets/Foodmart/bell.png")}
                style={{
                  width: 56,
                  height: 56,
                }}
              />
              <Text
                style={{
                  fontSize: 32,
                  color: "#CC5600",
                }}
              >
                New Orders
              </Text>
            </View>

            {/* Discounts & Restaurants Sections */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("Menu")}
                style={{
                  backgroundColor: "#EAFFF0",
                  // paddingVertical: 20,
                  borderRadius: 10,
                  marginBottom: 10,
                  // borderWidth: 1,

                  // padding: 30,
                  width: "45%",
                  justifyContent: "center",
                  paddingVertical: 30,

                  // paddingHorizontal: 30,
                  // alignSelf: "center",
                }}
              >
                <Image
                  source={require("../assets/Foodmart/book.png")}
                  style={styles.optionIcon}
                />
                <Text style={styles.optionText}>Menu</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: "#EAF0FF",
                  borderRadius: 10,
                  marginBottom: 10,
                  paddingVertical: 30,

                  width: "45%",
                }}
                onPress={() => navigation.navigate("AllOrders")}
              >
                <Image
                  source={require("../assets/Foodmart/biro.png")}
                  style={styles.optionIcon}
                />
                <Text style={styles.optionText}>Orders</Text>
              </TouchableOpacity>
            </View>
          </View>
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
    padding: 16,
    backgroundColor: "#fff",
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
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
  },
  iconContainer: {
    flexDirection: "row",
    marginLeft: 8,
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 16,
  },
  addressContainer: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  addressText: {
    color: "#888",
  },
  promoContainer: {
    backgroundColor: "#FFEAEA",
    borderRadius: 8,
    padding: 16,
    paddingVertical: 30,
    marginBottom: 16,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  promoText: {
    color: "#333",
    fontWeight: "bold",
    marginBottom: 4,
  },
  promoCode: {
    color: "#555",
  },
  boldText: {
    fontWeight: "bold",
    color: maincolors.primary, // "#ff5a5f",
  },
  greetingText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2b2b2b",
    marginBottom: 4,
  },
  subText: {
    color: "#555",
    marginBottom: 16,
  },
  optionsContainer: {
    flex: 1,
    // flexDirection: "row",
    // justifyContent: "space-between",
  },
  optionBox: {
    // flex: 1,
    backgroundColor: "#ffeaf0",
    borderRadius: 8,
    alignItems: "center",
    // alignSelf: "center",
    // padding: 16,
    marginHorizontal: 8,
    flexDirection: "row",
    marginBottom: 10,
  },
  optionIcon: {
    width: 56,
    height: 56,
    alignSelf: "center",
    // marginBottom: 8,
  },
  optionText: {
    fontWeight: "400",
    color: "#CC5600",
    fontSize: 24,
    textAlign: "center",
  },
});

export default HomeScreen;
