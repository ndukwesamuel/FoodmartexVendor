// import { View, Text, Switch, StyleSheet } from 'react-native';
// import React, { useState } from 'react';
// export default function MenuDetails() {
//   const [isEnabled, setIsEnabled] = useState(false);

//   const toggleSwitch = () => setIsEnabled(previousState => !previousState);

//   return (
//     <View style={styles.container}>
//       <View style={styles.toggleContainer}>
//         <Text style={styles.toggleText}>
//           {isEnabled ? 'Available' : 'Unavailable'}
//         </Text>
//         <Switch
//           trackColor={{ false: "#767577", true: "#81b0ff" }}
//           thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
//           ios_backgroundColor="#3e3e3e"
//           onValueChange={toggleSwitch}
//           value={isEnabled}
//           style={{ marginLeft: 10 }} // Add some margin to separate text and switch
//         />
//       </View>
//       <View style={[styles.statusContainer, { backgroundColor: isEnabled ? 'green' : 'silver' }]}>
//         <Text style={styles.statusText}>
//           {isEnabled ? 'Available' : 'Unavailable'}
//         </Text>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   toggleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   statusContainer: {
//     padding: 20,
//     borderRadius: 20,
//     marginTop: 20,
//   },
//   statusText: {
//     color: 'white',
//     fontSize: 16,
//   },
// });

import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { PrimaryButton } from "../../components/shared/Button";
import { useNavigation } from "@react-navigation/native";
import { ReusableBackButton } from "../../components/shared/SharedButton_Icon";
import AppScreen from "../../components/shared/AppScreen";

export default function MenuDetails() {
  const navigation = useNavigation();
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  const navigateFunc = () => {
    navigation.navigate("GetEverything");
  };

  return (
    <AppScreen>
      <View>
        <Image source={require("../../assets/Foodmart/food.png")} />

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
                  Special Rice
                </Text>
                <Text style={{ fontSize: 16, fontWeight: "300" }}>5,500</Text>
              </View>

              <Text
                style={{ color: "#686868", fontSize: 12, fontWeight: "300" }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et sed dolore magna.
              </Text>
            </View>
            <View>
              <Pressable>
                <Image
                  source={require("../../assets/Foodmart/likeButton.png")}
                />
              </Pressable>
            </View>
          </View>

          <View style={{ gap: 16 }}>
            <Text style={styles.secondaryText}>Protein</Text>
            <View style={{ paddingHorizontal: 10, gap: 16 }}>
              <Text>Chicken</Text>
              <Text>Fish</Text>
              <Text>turkey</Text>
            </View>
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
              }}
            >
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
              }}
            >
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
  line: {
    borderColor: "#9B9B9B4D",
    borderWidth: 1,
  },
  secondaryText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#023526",
  },
  option: { fontSize: 16, fontWeight: "300" },
  container2: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    position: "relative",
  },
  button: {
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  countContainer: {
    backgroundColor: "#003d32",
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  count: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
