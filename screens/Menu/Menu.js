import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { ReusableBackButton } from "../../components/shared/SharedButton_Icon";
import AppScreen from "../../components/shared/AppScreen";
import { useDispatch, useSelector } from "react-redux";
import { Get_All_Menu_Fun } from "../../Redux/MenuSlice";
export default function Menu() {
  const navigation = useNavigation();
  const [isOpen, setIsOpen] = useState(true);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("All Foods");
  const { menu_data } = useSelector((state) => state.MenuSlice);
  const options = ["All Foods", "All Categories"];
  const dispatch = useDispatch();

  console.log({
    lllfff: menu_data,
  });

  useEffect(() => {
    dispatch(Get_All_Menu_Fun());
    return () => {};
  }, []);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setDropdownVisible(false);
  };
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

  const [CategoriesItem, setCategoriesItem] = useState([
    {
      id: "1",
      MainTitle: "SPECIAL MEALS",
    },
    {
      id: "2",
      MainTitle: "MAIN MEALS",
    },
    {
      id: "3",
      MainTitle: "DRINKS",
    },
  ]);

  const SubDataRenderItemFunction = ({ item }) => {
    return (
      <TouchableOpacity style={styles.card(options)}>
        <View style={{ flex: 1, gap: 8 }}>
          <Text style={styles.foodName(selectedOption)}>{item.name}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.price}>{item.price}</Text>
          </View>
        </View>
        <Image source={{ uri: item.image }} style={styles.foodImage} />
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }) => (
    <>
      {selectedOption == "All Foods" ? (
        <TouchableOpacity
          style={styles.card(options)}
          onPress={() => navigation.navigate("MenuDetails")}
        >
          <View style={{ flex: 1, gap: 8 }}>
            <Text style={styles.foodName(selectedOption)}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
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
      ) : (
        <TouchableOpacity style={styles.card}>
          <View style={{ flex: 1 }}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={styles.foodName(selectedOption)}>
                {item.MainTitle}
              </Text>
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
            <FlatList
              data={menuItems}
              renderItem={(subData) => (
                <SubDataRenderItemFunction item={subData.item} />
              )}
            />
          </View>
        </TouchableOpacity>
      )}
    </>
  );

  return (
    <AppScreen>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Menu</Text>
            <ReusableBackButton style={{ position: "absolute", left: 10 }} />
          </View>
        </View>
        <View style={styles.dropdowncontainer}>
          {/* Dropdown */}
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setDropdownVisible(!isDropdownVisible)}
          >
            <Text style={styles.dropdownText}>{selectedOption}</Text>
            <Icon name="chevron-down-outline" size={18} color="#000" />
          </TouchableOpacity>

          {/* New Food Item Button */}
          {selectedOption == "All Foods" ? (
            <TouchableOpacity
              style={styles.newFoodButton}
              onPress={() => navigation.navigate("AddFoodItem")}
            >
              <Text style={styles.newFoodText}>New Food Item</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.newFoodButton}
              onPress={() => navigation.navigate("NewCategory")}
            >
              <Text style={styles.newFoodText}>New Category</Text>
            </TouchableOpacity>
          )}

          {/* Dropdown Modal */}
          <Modal visible={isDropdownVisible} transparent animationType="fade">
            <TouchableOpacity
              style={styles.modalOverlay}
              onPress={() => setDropdownVisible(false)}
            >
              <View style={styles.dropdownMenu}>
                <FlatList
                  data={options}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.dropdownItem}
                      onPress={() => handleSelect(item)}
                    >
                      <Text style={styles.dropdownItemText}>{item}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </TouchableOpacity>
          </Modal>
        </View>

        {/* Food List
        <FlatList
          data={selectedOption == "All Foods" ? menuItems : CategoriesItem}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20, gap: 16, marginTop: 20 }}
        
        
        
        /> */}

        <FlatList
          data={menu_data}
          // data={selectedOption == "All Foods" ? menuItems : CategoriesItem}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20, gap: 16, marginTop: 20 }}
          ListEmptyComponent={
            <View style={{ alignItems: "center", marginTop: 20 }}>
              <Text style={{ fontSize: 16, color: "#888" }}>
                No items available
              </Text>
            </View>
          }
        />
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  header: {
    justifyContent: "center",
    marginVertical: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
    textAlign: "center",
  },

  AllFoodsText: {
    color: "#000000",
    fontWeight: "500",
    fontSize: 16,
  },
  card: (option) => ({
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 10,
    elevation: option == "All Foods" ? 2 : 0,
    gap: 20,
  }),
  foodName: (data) => ({
    fontSize: 18,
    fontWeight: "400",
    color: data == "All Foods" ? "#F79B2C" : "#000",
    marginBottom: data == "All Foods" ? 0 : 4,
  }),
  description: {
    fontSize: 12,
    color: "#686868",
    fontWeight: "300",
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
  },
  actionIcons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  dropdowncontainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
  },
  dropdownText: {
    marginRight: 8,
    fontSize: 16,
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
  modalOverlay: {
    flex: 1,
    marginTop: 110,
    marginLeft: 20,
  },
  dropdownMenu: {
    backgroundColor: "#fff",
    width: 200,
    borderRadius: 8,
    elevation: 5,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  dropdownItemText: {
    fontSize: 16,
  },
});
