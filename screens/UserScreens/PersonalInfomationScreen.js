import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import {
  Feather,
  FontAwesome5,
  AntDesign,
  EvilIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AppScreen from "../../components/shared/AppScreen";
import { ReusableBackButton } from "../../components/shared/SharedButton_Icon";
import { ReusableTitle } from "../../components/shared/Reuseablecomponent";
import { maincolors } from "../../utills/Themes";

const PersonalInfomationScreen = ({ onClose }) => {
  const navigation = useNavigation();
  const menuItems = [
    {
      title: "My Details",
      icon: <Feather name="user" size={24} color="#FFA500" />,
      screen: "PersonalInfomationScreen",
    },
    {
      title: "Manage cards",
      icon: <Feather name="credit-card" size={24} color="#FFA500" />,
      screen: "WalletScreen",
    },
    {
      title: "Change Password",
      icon: <AntDesign name="lock1" size={24} color="#FFA500" />,
      screen: "ChangePassword",
    },

    {
      title: "Saved Addresses",

      icon: <EvilIcons name="location" size={24} color={maincolors.primary} />,
      screen: "SavedAddresses",
    },
  ];

  return (
    <AppScreen>
      <View style={styles.container}>
        {/* Header */}
        <ReusableTitle data="Personal Information" />

        <ReusableBackButton
          style={{ position: "absolute", top: 15, zIndex: 1, left: 20 }}
        />
        {/* <View style={styles.header}>
          <Text style={styles.headerText}>Personal Information</Text>
          <TouchableOpacity onPress={onClose}>
            <Feather name="x" size={28} color="#1F2937" />
          </TouchableOpacity>
        </View> */}

        {/* Menu List */}
        <ScrollView style={styles.menu}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate(item.screen)}
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
    </AppScreen>
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

export default PersonalInfomationScreen;
