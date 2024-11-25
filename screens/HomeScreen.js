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
const HomeScreen = () => {
  const navigation = useNavigation();

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
            <TouchableOpacity onPress={cart_state}>
              <MaterialCommunityIcons
                name="cart-outline"
                size={24}
                color="black"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
              <Ionicons name="notifications-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        {notification === "home" && (
          <>
            {/* Address Section */}
            <View style={styles.addressContainer}>
              <Text style={styles.addressText}>
                Address lorem dolor officia...
              </Text>
            </View>

            {/* Cashback Promo Section */}
            <View style={styles.promoContainer}>
              <View>
                <Text style={styles.promoText}>
                  Get 20% cashback this weekend!
                </Text>
                <Text style={styles.promoCode}>Using promo code</Text>
                <Text style={styles.boldText}>#HURRAY31</Text>
              </View>

              <View>
                <Image
                  source={{
                    uri: "https://s3-alpha-sig.figma.com/img/de2c/d1c7/c1ef1b8e0645087980b220d0e63f6b27?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SJOxr~6YjLibtCxH-8C6~5grlETFghSEWB4v84pxPP2VZ-fOE8pfuMJYVL5wKc2ejeZw4Zr~FH2mrX-kPB~clRkH-49Mz2t7MfkCjat8f68hdUgUW8qJTs9K5ZjF5mWiKbf7guUSc~c52hwFxVsg2oukM4Oz2ZRdlHpgmXHN3SHvEAjCP8gm4Uf0JM5XRoGBolsBv6F4nIJLXkRN~aWIUUXjKxqAyD1MClvm19v8pIHbicWYQ24A-hw-aek6gZDRmI0-~RkFFxNe8~U~JLWj16QFQ-8T4yugdzTSMOpby2PBb9ibwhSFm0W0bh2kBa-5RpjPrcfiAU0zJ0F9WE0ePg__",
                  }}
                  style={{
                    width: 100,
                    height: 100,
                  }}
                />
              </View>
            </View>

            {/* Greeting Section */}
            <View>
              <Text style={styles.greetingText}>Hello User,</Text>
              <Text style={styles.subText}>Go through;</Text>
            </View>

            {/* Discounts & Restaurants Sections */}
            <View
              style={{
                // borderWidth: 1,
                flex: 1,
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "#FDEAFF",
                  paddingVertical: 20,
                  borderRadius: 10,
                  marginBottom: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    alignSelf: "center",
                  }}
                >
                  <Image
                    source={{
                      uri: "https://s3-alpha-sig.figma.com/img/de83/e010/9d7f0465473f1920b8ac765eb8ea253e?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=H8KeCnjbciX2hDWR5klMUwplX4tnHM6om9SZ8K~RjkNZFypw0lhS7~OQOVr2uVtCiUEUfmG6EcVHEbBE32a4zRckgS48mrMySRV2tsgzdyKL9CJrd8aPvXYjYhOaTTnZYIAYW8i1AOyBSKtpnVMrBhneaUpbxbKNi5Q54qpjUCEkdQGe1mYVDjTF43eam~5Wn91rcHX5CAP5siMjDNCB0Bu8X1j0HvDsZVeBwZypMfBzdqrsDZIQIC3n9LLGsfn4R2Sdw4l841vj57VYCaUiUpCb0RzpT7jdvngOI3lbfvx1oj8ZHfd2xeS2sQhsD5adLdDg92PERvaK7VyG-NYj-g__",
                    }} // Replace with discount image URL
                    style={styles.optionIcon}
                  />
                  <Text style={styles.optionText}>Discounts</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "#FFEAEA",
                  paddingVertical: 20,
                  borderRadius: 10,
                  marginBottom: 10,
                }}
                onPress={() => navigation.navigate("MainHomescreen")}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    alignSelf: "center",
                  }}
                >
                  <Image
                    source={{
                      uri: "https://s3-alpha-sig.figma.com/img/ee77/dadf/2ce413b72e9acde68de20afc7bef46ff?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FQNR0mEF-9~OKcypt4SJczM6UBieekdKI3M4GDVhPcoWyD14USHrNFaoEo0l5Yxge1XtN036UYzwsyAj~E1UZ1dEVkm9qhvO7rDAuLIHP67uV7FnAisM8nqeLjQA~X484LeCoE630-0h6J4tNAEDswc1csY3EI2e3ho8fT78Zuwmen9ACIALHeGm8F~JDJ9-KV2wqktWnf6bh2Ow5f7duAo4BpDUNRsq59VVHXLnUtcqYoEl8QuIwFKZ4t4lEcYOl4fE0VG0a~CHJJxgAlWGEyFLeiv~DI~o7uiVs7-v9YOB6GScjTethgdMwoXjY7aIn~3qmryOWqathk0naytOmQ__",
                    }} // Replace with restaurant image URL
                    style={styles.optionIcon}
                  />
                  <Text style={styles.optionText}>Restaurants</Text>
                </View>
              </TouchableOpacity>
            </View>
          </>
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
    backgroundColor: "#eaf7ff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
    flexDirection: "row",
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
    width: 80,
    height: 80,
    marginBottom: 8,
  },
  optionText: {
    fontWeight: "bold",
    color: "#333",
  },
});

export default HomeScreen;
