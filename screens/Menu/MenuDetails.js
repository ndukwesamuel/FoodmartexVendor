import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Switch,
} from "react-native";
import { PrimaryButton } from "../../components/shared/Button";
import { useNavigation } from "@react-navigation/native";
import { ReusableBackButton } from "../../components/shared/SharedButton_Icon";
import AppScreen from "../../components/shared/AppScreen";
import { Ionicons } from "react-native-vector-icons";
import { useApiRequest } from "../../hooks/Mutate";
import { useSelector } from "react-redux";
const API_BASEURL = "https://foodmart-backend.gigtech.site/api/"; // process.env.EXPO_PUBLIC_API_URL;

export default function MenuDetails({ route }) {
  let { routedata } = route.params;
  const navigation = useNavigation();
  const [isAvailable, setIsAvailable] = useState(
    routedata?.isAvailable || false
  );
  const [menudetailsinfo, setmenudetailsInfo] = useState(null);

  console.log({
    kfkfk: menudetailsinfo?.data,
  });

  const { user_isLoading, user_data, user_message } = useSelector(
    (state) => state?.Auth
  );

  const { mutate: menudetails_Data, isLoading: isLoadingmenudetails } =
    useApiRequest({
      url: `${API_BASEURL}v1/vendor/menu-items/${routedata?.id}`,
      method: "GET",
      token: user_data?.data?.token || "",
      onSuccess: (response) => {
        // dispatch(checkOtp(true));
        // setlga(response?.data?.data);
        console.log({
          xxx: response?.data,
        });
        setmenudetailsInfo(response?.data);
      },
      onError: (error) => {
        console.error("Registration failed:", error?.response?.data);

        Toast.show({
          type: "error",
          text1: `${error?.response?.data?.message || "Request failed."}`,
        });
      },
    });

  const toggleSwitch = () => setIsAvailable((previousState) => !previousState);

  useEffect(() => {
    menudetails_Data();
    return () => {};
  }, []);

  return (
    <AppScreen>
      <View>
        <Image
          source={{ uri: menudetailsinfo?.data?.images?.original_url }}
          style={{ width: "100%", height: 200 }}
        />
        <ReusableBackButton
          style={{ position: "absolute", top: 15, zIndex: 1, left: 20 }}
        />
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.textArea}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ width: "60%", gap: 3 }}>
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                }}
              >
                <Text style={{ fontSize: 18, color: "#F79B2C" }}>
                  {menudetailsinfo?.data?.name}
                </Text>
                <Text style={{ fontSize: 16, fontWeight: "300" }}>
                  {menudetailsinfo?.data?.price}{" "}
                </Text>
              </View>
              <Text
                style={{ color: "#686868", fontSize: 12, fontWeight: "300" }}
              >
                {`(${menudetailsinfo?.data?.description})`}
              </Text>
            </View>
            <View style={styles.toggleContainer}>
              <Text style={{ marginRight: 8, color: "#686868" }}>
                {isAvailable ? "Available" : "Not Available"}
              </Text>

              <Switch
                trackColor={{ false: "#767577", true: "#f4f3f4" }} // White background for active and inactive states
                thumbColor={isAvailable ? "#F79B2C" : "#f4f3f4"} // Orange thumb for active, default thumb for inactive
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isAvailable}
              />
            </View>
          </View>

          <View style={{ paddingHorizontal: 10, gap: 16 }}>
            <Text>
              Preparation time: {menudetailsinfo?.data?.preparation_time}mint
            </Text>
            <Text>Chicken james</Text>
            <Text>Fish</Text>
            <Text>Turkey</Text>
          </View>
          <View style={{ gap: 16 }}>
            <Text style={styles.secondaryText}>Protein</Text>
            {routedata?.ingredients ? (
              <Text>Add ingredients data</Text>
            ) : (
              <View style={{ paddingHorizontal: 10, gap: 16 }}>
                <Text>No ingredients available</Text>
                <Text>Chicken james</Text>
                <Text>Fish</Text>
                <Text>Turkey</Text>
              </View>
            )}
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 16,
            }}
          >
            <Pressable
              style={{
                flex: 1,
                backgroundColor: "#FFA500",
                paddingVertical: 12,
                borderRadius: 4,
                marginRight: 8,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Ionicons name="create-outline" size={24} color="white" />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "#fff",
                }}
              >
                Accept
              </Text>
            </Pressable>
            <Pressable
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: "#FFA500",
                paddingVertical: 12,
                borderRadius: 4,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Ionicons name="trash-outline" size={24} color="red" />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "#FFA500",
                }}
              >
                Reject
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  textArea: {
    backgroundColor: "white",
    paddingTop: 32,
    paddingBottom: 24,
    gap: 16,
    paddingHorizontal: 20,
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  secondaryText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#023526",
  },
});
