// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
//   StyleSheet,
// } from "react-native";
// import { ReusableBackButton } from "../../components/shared/SharedButton_Icon";
// import { Get_All_Menu_Fun } from "../../Redux/MenuSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { useApiRequest } from "../../hooks/Mutate";
// const API_BASEURL = process.env.EXPO_PUBLIC_API_URL;

// export default function NewCategory() {
//   const dispatch = useDispatch();

//   const { menu_data, menu_isLoading, menu_isError, menu_message } = useSelector(
//     (state) => state.MenuSlice
//   );

//   const [text, settext] = useState("");

//   const { user_data } = useSelector((state) => state.Auth);
//   const [selectedItems, setSelectedItems] = useState([]);

//   const foodItems = [
//     { id: "1", name: "Spaghetti", price: 5000 },
//     { id: "2", name: "Jollof Rice", price: 3500 },
//     { id: "3", name: "Special Rice", price: 4000 },
//     { id: "4", name: "Jollof Rice", price: 3500 },
//     { id: "5", name: "Spaghetti", price: 5000 },
//   ];

//   const { mutate: postcreatecategory, isLoading: isLoadingpostcreatecategory } =
//     useApiRequest({
//       url: `${API_BASEURL}v1/vendor/onboarding/delivery-details`,
//       method: "POST",
//       token: user_data?.data?.token || "",
//       onSuccess: (response) => {
//         lllfff({
//           kfkf: response.data,
//         });
//         // dispatch(checkOtp(true));
//         // setlga(response?.data?.data);
//       },
//       onError: (error) => {
//         // console.error("Registration failed:", error?.response?.data);

//         Toast.show({
//           type: "error",
//           text1: `${error?.response?.data?.message || "Request failed."}`,
//         });
//       },
//     });

//   const handleSelectItem = (id) => {
//     if (selectedItems.includes(id)) {
//       setSelectedItems(selectedItems.filter((item) => item !== id));
//     } else {
//       setSelectedItems([...selectedItems, id]);
//     }
//   };

//   const renderFoodItem = ({ item }) => (
//     <View style={styles.itemContainer}>
//       <Text style={styles.itemText}>
//         {item.name} ({item.price.toLocaleString()})
//       </Text>
//       <TouchableOpacity onPress={() => handleSelectItem(item.id)}>
//         <Text
//           style={
//             selectedItems.includes(item.id) ? styles.checkMark : styles.plusMark
//           }
//         >
//           {selectedItems.includes(item.id) ? "✓" : "+"}
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );

//   useEffect(() => {
//     dispatch(Get_All_Menu_Fun());

//     return () => {};
//   }, []);

//   const handleSubmit = () => {
//     console.log({
//       selectedItems,
//       text,
//     });

//     postcreatecategory({
//       category_name: text,
//       food_items: selectedItems,
//     });
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <View>
//           <Text style={styles.title}>New Category </Text>
//           <ReusableBackButton style={{ position: "absolute", left: 10 }} />
//         </View>
//       </View>
//       <TextInput
//         placeholder="Category Name"
//         style={styles.input}
//         placeholderTextColor="#000000"
//         value={text}
//         onChangeText={settext}
//       />
//       <Text style={styles.subHeader}>Select Food items for this category</Text>
//       <FlatList
//         data={menu_data}
//         keyExtractor={(item) => item.id}
//         renderItem={renderFoodItem}
//         contentContainerStyle={styles.listContainer}
//       />
//       <TouchableOpacity style={styles.uploadButton} onPress={handleSubmit}>
//         <Text style={styles.uploadText}>Upload</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     padding: 20,
//   },
//   header: {
//     justifyContent: "center",
//     marginVertical: 16,
//   },
//   backButton: {
//     marginBottom: 16,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "500",
//     textAlign: "center",
//   },
//   input: {
//     borderBottomWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 40,
//   },
//   subHeader: {
//     fontSize: 16,
//     marginBottom: 20,
//     color: "#686868",
//   },
//   listContainer: {
//     paddingBottom: 20,
//     gap: 24,
//   },
//   itemContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//   },
//   itemText: {
//     fontSize: 16,
//   },
//   checkMark: {
//     fontSize: 20,
//     color: "green",
//     backgroundColor: "#023526",
//     padding: 3,
//     paddingHorizontal: 8,
//     borderRadius: 50,
//   },
//   plusMark: {
//     fontSize: 20,
//     color: "gray",
//     padding: 3,
//     paddingHorizontal: 8,
//     borderRadius: 50,
//     backgroundColor: "#C4C4C4",
//   },
//   uploadButton: {
//     backgroundColor: "#ffa500",
//     padding: 15,
//     borderRadius: 5,
//     alignItems: "center",
//   },
//   uploadText: {
//     fontSize: 16,
//     color: "#fff",
//     fontWeight: "bold",
//   },
// });

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { ReusableBackButton } from "../../components/shared/SharedButton_Icon";
import { Get_All_Menu_Fun } from "../../Redux/MenuSlice";
import { useDispatch, useSelector } from "react-redux";
import { useApiRequest } from "../../hooks/Mutate";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
const API_BASEURL = process.env.EXPO_PUBLIC_API_URL;

export default function NewCategory() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { menu_data, menu_isLoading, menu_isError, menu_message } = useSelector(
    (state) => state.MenuSlice
  );

  const [text, setText] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  const { user_data, user_profile_data } = useSelector((state) => state.Auth);
  console.log({
    kakakak: user_profile_data?.data,
  });
  const { mutate: postCreateCategory, isLoading: isLoadingPostCreateCategory } =
    useApiRequest({
      url: `${API_BASEURL}v1/vendor/categories`,
      method: "POST",
      token: user_data?.data?.token || "",
      onSuccess: (response) => {
        Toast.show({
          type: "success",
          text1: `${response?.data?.message}`,
        });
        navigation.goBack();
        // console.log("Category created successfully:", response.data);
      },

      onError: (error) => {
        Toast.show({
          type: "error",
          text1: `${error?.response?.data?.message}`,
        });
        console.error("Category creation failed:", error?.response?.data);
      },
    });

  const handleSelectItem = (id) => {
    setSelectedItems(
      (prevSelected) =>
        prevSelected.includes(id)
          ? prevSelected.filter((item) => item !== id) // Remove if already selected
          : [...prevSelected, id] // Add if not already selected
    );
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

  useEffect(() => {
    dispatch(Get_All_Menu_Fun());
  }, [dispatch]);

  const handleSubmit = () => {
    console.log("Submitting category:", {
      category_name: text,
      food_items: selectedItems,
    });

    postCreateCategory({
      name: text,
      description: "",
      menu_item_ids: selectedItems,
      // food_items: selectedItems,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>New Category </Text>
          <ReusableBackButton style={{ position: "absolute", left: 10 }} />
        </View>
      </View>
      <TextInput
        placeholder="Category Name"
        style={styles.input}
        placeholderTextColor="#000000"
        value={text}
        onChangeText={setText}
      />
      <Text style={styles.subHeader}>Select Food items for this category</Text>
      <FlatList
        data={menu_data}
        keyExtractor={(item) => item.id}
        renderItem={renderFoodItem}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity
        style={styles.uploadButton}
        onPress={handleSubmit}
        disabled={
          isLoadingPostCreateCategory || !text
          // || selectedItems.length === 0
        }
      >
        <Text style={styles.uploadText}>
          {isLoadingPostCreateCategory ? "Uploading..." : "Upload"}
        </Text>
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
