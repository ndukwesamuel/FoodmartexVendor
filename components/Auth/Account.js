import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { maincolors } from "../../utills/Themes";
import { useDispatch } from "react-redux";
import { reset_login } from "../../Redux/AuthSlice";

const Account = ({ onCLose }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Example: Clear session data (e.g., AsyncStorage or SecureStore)
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Log Out",
          style: "destructive",
          onPress: async () => {
            dispatch(reset_login());
            // try {
            //   // Example: Clear user data
            //   // await AsyncStorage.clear();
            //   console.log("User logged out");
            //   navigation.reset({
            //     index: 0,
            //     routes: [{ name: "LoginScreen" }], // Redirect to Login or Welcome screen
            //   });
            // } catch (error) {
            //   console.error("Error during logout: ", error);
            // }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const menuItems = [
    {
      title: "Business Information",
      icon: <Feather name="user" size={24} color={maincolors.primary} />,
      screen: "PersonalInfomationScreen",
    },
    {
      title: "Orders",
      icon: <Feather name="shopping-bag" size={24} color="#FFA500" />,
      screen: "DeliveredOrders",
    },
    {
      title: "Menu",
      icon: <Feather name="heart" size={24} color={maincolors.primary} />,
      screen: "MyFavorite",
    },
    {
      title: "Wallet",
      icon: <Feather name="credit-card" size={24} color="#FFA500" />,
      screen: "Wallet",
    },
    {
      title: "Rewards/Points",
      icon: <FontAwesome5 name="coins" size={24} color="#FFA500" />,
      screen: "RewardsScreen",
    },
    {
      title: "F.A.Qs",
      icon: <Feather name="help-circle" size={24} color="#1F2937" />,
      screen: "FAQs",
    },
    {
      title: "Support",
      icon: <Feather name="headphones" size={24} color="#1F2937" />,
      screen: "Support",
    },
    {
      title: "Settings",
      icon: <Feather name="settings" size={24} color="#1F2937" />,
      screen: "SettingsScreen",
    },
    {
      title: "Log Out",
      icon: <Feather name="log-out" size={24} color="#FFA500" />,
      action: handleLogout, // Attach logout handler
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Account</Text>
        <TouchableOpacity onPress={onCLose}>
          <Feather name="x" size={28} color="#1F2937" />
        </TouchableOpacity>
      </View>

      {/* Menu List */}
      <ScrollView style={styles.menu}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              item.action
                ? item.action() // Call action for logout
                : navigation.navigate(item.screen)
            }
          >
            {/* Separator */}
            {index === 4 && <View style={styles.separator} />}
            <View style={styles.menuItem}>
              {item.icon}
              <Text style={styles.menuText}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFA500",
  },
  menu: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "#E5E7EB",
  },
  menuText: {
    fontSize: 16,
    marginLeft: 16,
    color: "#1F2937",
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    marginVertical: 12,
  },
});

export default Account;
