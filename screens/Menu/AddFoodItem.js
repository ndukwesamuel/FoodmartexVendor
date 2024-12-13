import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Switch,
  ScrollView,
  FlatList,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { ReusableBackButton } from "../../components/shared/SharedButton_Icon";
import { Forminput, FormLabel } from "../../components/shared/InputForm";
import { PrimaryButton } from "../../components/shared/Button";
import { useDispatch, useSelector } from "react-redux";
import { categories_Fun } from "../../Redux/categoriesSlice";
import { maincolors } from "../../utills/Themes";
import AppScreen from "../../components/shared/AppScreen";
import AntDesign from "@expo/vector-icons/AntDesign";
import axios from "axios";
import Toast from "react-native-toast-message";
import { useMutation } from "react-query";
const API_BASEURL = process.env.EXPO_PUBLIC_API_URL;

export default function AddFoodItem() {
  const { categories_data, categories_isLoading } = useSelector(
    (state) => state.categoriesSlice
  );

  console.log({
    kkk: categories_data,
  });

  const { user_data } = useSelector((state) => state.Auth);

  const dispatch = useDispatch();
  const [category, setCategory] = useState("");
  const [category_id, setCategory_id] = useState("");
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [preparationTime, setPreparationTime] = useState("");
  const [isExtraPortionAvailable, setIsExtraPortionAvailable] = useState(false);
  const [image, setImage] = useState(null);
  const [sections, setSections] = useState([]); // To store all sections
  const [modalVisible, setModalVisible] = useState(false);
  const [sectionName, setSectionName] = useState("");
  const [isRequired, setIsRequired] = useState(false);
  const [options, setOptions] = useState([{ id: 1, name: "", price: "" }]);
  // setImage(null);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  // Function to handle time change

  const selectCategories = (item) => {
    console.log({
      what: item,
    });

    setCategory(item?.name);
    setCategory_id(item?.id);
  };

  const [isStateModalVisible, setStateModalVisible] = useState(false);

  const [city_date, setcity_date] = useState(null);
  const [iscategoryModalVisible, setcategoryModalVisible] = useState(false);

  const openStateModal = () => {
    setcategoryModalVisible(true);
  };

  const handleImageUpload = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  console.log({
    kk: isExtraPortionAvailable,
  });
  // setImage(null);
  const handleUpload = () => {
    if (!productName || !price || !category) {
      Alert.alert("Error", "Please fill all required fields.");
      return;
    }
    console.log("Form Data:", {
      category,
      productName,
      description,
      price,
      preparationTime,
      isExtraPortionAvailable,
      image,
    });

    const formData = new FormData();

    formData.append("name", productName);
    // formData.append("photo", description);
    formData.append("category_id", category_id);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("preparation_time", preparationTime);
    formData.append("has_extra_portion", isExtraPortionAvailable);

    if (image) {
      const uri = image;
      const type = "image/jpeg"; // Adjust the type based on the file type
      const name = "photo.jpg"; // Adjust the name as needed
      formData.append("images[0]", { uri, type, name });
    }

    if (image) {
      const uri = image;
      const type = "image/jpeg"; // Adjust the type based on the file type
      const name = "photo.jpg"; // Adjust the name as needed
      formData.append("images[1]", { uri, type, name });
    }

    Orders_Mutation.mutate(formData);
  };

  console.log({
    aaa: user_data?.data?.token,
  });

  const Orders_Mutation = useMutation(
    (data_info) => {
      let url = `${API_BASEURL}v1/vendor/menu-items`;

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user_data?.data?.token}`,
        },
      };

      return axios.post(url, data_info, config);
    },
    {
      onSuccess: (success) => {
        console.log({
          success,
        });
        Toast.show({
          type: "success",
          text1: "User Profile Updated successfully!",
        });
        // dispatch(UserProfile_data_Fun());
      },

      onError: (error) => {
        console.log({
          lll: error?.response?.data,
        });
        Toast.show({
          type: "error",
          text1: `${error?.response?.data?.message}`,
        });
      },
    }
  );
  const addOption = () => {
    setOptions([...options, { id: options.length + 1, name: "", price: "" }]);
  };

  // Handle input changes for each option
  const handleOptionChange = (id, field, value) => {
    const updatedOptions = options.map((option) =>
      option.id === id ? { ...option, [field]: value } : option
    );
    setOptions(updatedOptions);
  };

  // Save section to the main form and close modal
  const saveSection = () => {
    const newSection = { sectionName, isRequired, options };
    setSections([...sections, newSection]); // Add to main form data
    setModalVisible(false); // Close modal
    resetModal(); // Clear modal fields
  };

  // Reset modal fields
  const resetModal = () => {
    setSectionName("");
    setIsRequired(false);
    setOptions([{ id: 1, name: "", price: "" }]);
  };

  useEffect(() => {
    dispatch(categories_Fun());

    return () => {};
  }, []);

  return (
    <AppScreen>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>My Orders </Text>
            <ReusableBackButton style={{ position: "absolute", left: 10 }} />
          </View>
        </View>
        <View style={{ gap: 16 }}>
          <View
            style={{
              gap: 5,
            }}
          >
            <FormLabel data={"Category"} />

            <Pressable
              onPress={openStateModal}
              style={[
                styles.textInput.backgroundColor,
                {
                  borderWidth: 1,
                  borderColor: maincolors.inputcolor,
                  backgroundColor: "#F4F4F4",
                  borderRadius: 5,
                  padding: 10,
                },
              ]}
            >
              <Text style={{ color: category ? "black" : "gray" }}>
                {category || "Category"}
              </Text>
            </Pressable>
          </View>

          {/* Product Name */}
          <View>
            <FormLabel data={"Product Name"} />
            <Forminput
              style={styles.textInput}
              value={productName}
              onChangeText={setProductName}
            />
          </View>

          {/* Product Description */}
          <View>
            <FormLabel data={"Product Description"} />
            <Forminput
              style={styles.textInput}
              value={description}
              onChangeText={setDescription}
            />
          </View>
          {/* Price */}
          <View>
            <FormLabel data={"Price"} />
            <Forminput
              style={styles.textInput}
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
            />
          </View>

          {/* Preparation Time */}
          <View>
            <FormLabel data={"Preparation Time"} />

            <Forminput
              placeholder="Time in Min"
              style={styles.textInput}
              value={preparationTime}
              onChangeText={setPreparationTime}
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* Extra Portion */}
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Extra Portion available?</Text>
          <Switch
            value={isExtraPortionAvailable}
            onValueChange={setIsExtraPortionAvailable}
          />
        </View>
        <View style={styles.divider} />

        {/* Upload Image */}
        <View style={{ padding: 25 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ color: "#023526", fontSize: 16 }}>
              Upload Product Image
            </Text>

            <TouchableOpacity onPress={() => setImage(null)}>
              <AntDesign name="delete" size={24} color="red" />
            </TouchableOpacity>
          </View>

          <View style={styles.uploadContainer}>
            {image ? (
              //    <Image
              //    source={{ uri: profileImage }}
              //    style={{ width: 100, height: 100, borderRadius: 50 }}
              //  />

              <Image source={{ uri: image }} style={styles.uploadedImage} />
            ) : (
              <TouchableOpacity
                style={styles.uploadBox}
                onPress={handleImageUpload}
              >
                <Icon name="cloud-upload-outline" size={32} color="#666" />
                <View>
                  <Text style={styles.uploadText}>Upload Document</Text>
                  <Text style={{ textAlign: "center", color: "#686868" }}>
                    Or
                  </Text>
                  <Text style={{ textAlign: "center", color: "#F79B2C" }}>
                    Browse
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={styles.divider} />
        {/* <Modal visible={modalVisible} animationType="slide" transparent={true}> */}
        {modalVisible && (
          <View>
            <View style={styles.modalContainer}>
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 10,
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <FormLabel data={"Section Name"} />
                    <Text
                      style={{
                        color: "#C4C4C4",
                        fontSize: 14,
                        fontWeight: "400",
                      }}
                    >
                      {" "}
                      eg sauces, soups, etc...
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Image
                      source={require("../../assets/Foodmart/delete.png")}
                    />
                  </TouchableOpacity>
                </View>
                <Forminput
                  style={styles.textInput}
                  value={sectionName}
                  onChangeText={setSectionName}
                />
              </View>
              <TouchableOpacity
                onPress={() => setIsRequired(!isRequired)}
                style={styles.checkboxContainer}
              >
                <View
                  style={[
                    styles.checkbox,
                    isRequired && styles.checkboxChecked,
                  ]}
                />
                <Text>Required?</Text>
              </TouchableOpacity>

              <View
                style={{
                  borderColor: "#C4C4C4",
                  borderWidth: 1,
                  borderStyle: "dashed",
                  padding: 16,
                  gap: 16,
                  marginHorizontal: 10,
                }}
              >
                <FlatList
                  data={options}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <View style={styles.optionRow}>
                      <View>
                        <FormLabel data={"Option"} />
                        <Forminput
                          style={styles.halfInput}
                          value={item.name}
                          onChangeText={(value) =>
                            handleOptionChange(item.id, "name", value)
                          }
                        />
                      </View>
                      <View>
                        <FormLabel data={"Price"} />
                        <Forminput
                          style={styles.halfInput}
                          value={item.price}
                          onChangeText={(value) =>
                            handleOptionChange(item.id, "price", value)
                          }
                        />
                      </View>
                    </View>
                  )}
                />
                <TouchableOpacity
                  onPress={addOption}
                  style={styles.addOptionButton}
                >
                  <Image source={require("../../assets/Foodmart/add.png")} />
                  <Text style={styles.addOptionText}> Add Option</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.divider} />
          </View>
        )}
        {/* </Modal> */}

        {/* Add a Section */}
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.addSectionButton}
        >
          <Image source={require("../../assets/Foodmart/add.png")} />
          <Text style={styles.addSectionText}> Add a Section</Text>
        </TouchableOpacity>

        {/* Submit Button */}
        <View style={{ marginBottom: 40 }}>
          {Orders_Mutation.isLoading ? (
            <ActivityIndicator size="large" color="green" />
          ) : (
            <PrimaryButton buttonText={"Upload"} action={handleUpload} />
          )}
        </View>

        <Modal
          transparent={true}
          visible={iscategoryModalVisible}
          onRequestClose={() => setcategoryModalVisible(false)}
        >
          <TouchableWithoutFeedback
            onPress={() => setcategoryModalVisible(false)}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }}
            >
              <TouchableWithoutFeedback>
                <View
                  style={{
                    width: "80%",
                    backgroundColor: "white",
                    borderRadius: 10,
                    padding: 20,
                    height: "60%",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "600",
                      marginBottom: 15,
                      textAlign: "center",
                    }}
                  >
                    Categories
                  </Text>

                  {categories_isLoading && (
                    <ActivityIndicator size="large" color="green" />
                  )}

                  {/* {categories_data.l} */}
                  <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    {categories_data?.map((item) => (
                      <Pressable
                        key={item?.id}
                        onPress={() => {
                          // selectGender(option);
                          selectCategories(item);
                          setcategoryModalVisible(false); // Close modal on selection
                        }}
                        style={{
                          paddingVertical: 10,
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 16,
                          }}
                        >
                          {console.log({
                            mb: item,
                          })}
                          {item?.name}
                        </Text>
                      </Pressable>
                    ))}
                  </ScrollView>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  divider: {
    color: "#C4C4C4",
    borderWidth: 0.5,
    padding: 0,
    marginTop: 20,
  },
  header: {
    justifyContent: "center",
    marginVertical: 16,
  },
  backButton: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
    textAlign: "center",
  },

  textInput: {
    backgroundColor: "#F4F4F4",
    borderColor: "#68686880",
    borderWidth: 0.68,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  switchLabel: {
    fontSize: 16,
    marginRight: 8,
  },
  uploadContainer: {
    marginVertical: 16,
    alignItems: "center",
  },
  uploadBox: {
    borderWidth: 1,
    borderColor: "#686868",
    borderRadius: 8,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 175,
    borderStyle: "dashed",
  },
  uploadedImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    resizeMode: "cover",
  },
  uploadText: {
    marginTop: 8,
    color: "#666",
    textAlign: "center",
  },
  addSectionButton: {
    marginVertical: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  addSectionText: {
    color: "#023526",
    fontWeight: "400",
    fontSize: 16,
    textAlign: "center",
  },
  sectionItem: {
    marginVertical: 8,
    padding: 12,
    backgroundColor: "#e9ecef",
    borderRadius: 8,
  },
  modalContainer: {
    flex: 1,
    marginTop: 20,
    borderRadius: 8,
    gap: 16,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#F79B2C",
    marginRight: 8,
  },
  checkboxChecked: { backgroundColor: "#F79B2C" },
  optionRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginVertical: 8,
    flex: 1,
  },
  halfInput: {
    width: "100%",
    backgroundColor: "#D9D9D9",
    borderColor: "#68686880",
    borderWidth: 0.68,
    fle: 1,
  },

  addOptionButton: {
    marginVertical: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  addOptionText: { color: "#023526", fontWeight: "400", fontSize: 16 },

  saveButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: "#f94144",
    borderRadius: 8,
  },
  saveButtonText: { color: "#fff", fontWeight: "bold", textAlign: "center" },

  uploadButton: {
    backgroundColor: "#FFA500",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  uploadButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
