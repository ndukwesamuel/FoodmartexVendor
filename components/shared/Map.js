import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for icons
import React, { useEffect, useState } from "react";
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps";
import {
  StyleSheet,
  View,
  Alert,
  Image,
  ActivityIndicator,
  Pressable,
  Dimensions,
  StatusBar,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import { useDispatch, useSelector } from "react-redux";
import { UserProfile_Fun } from "../../Redux/AuthSlice";
import AppScreen from "../../components/shared/AppScreen";
const marker = require("../../assets/greenmarker.png");
const arrowLeft = require("../../assets/arrow-left.png");

const { width, height } = Dimensions.get("window");

const Map = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [locationName, setLocationName] = useState(null);
  const { user_profile_data } = useSelector((state) => state?.Auth);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);

      // Obtain the location name using reverse geocoding with OSM Nominatim
      try {
        const { latitude, longitude } = location.coords;
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        );
        const data = await response.json();
        setLocationName(data.display_name);
      } catch (error) {
        console.error("Error fetching location name:", error);
        setLocationName("Unknown Location");
      }
    })();

    dispatch(UserProfile_Fun());
  }, []);

  return (
    <View>
      <Text>Map</Text>
    </View>
  );
};

export default Map;
