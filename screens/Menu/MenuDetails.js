// import {
//   Image,
//   Pressable,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import React, { useState } from "react";
// import { PrimaryButton } from "../../components/shared/Button";
// import { useNavigation } from "@react-navigation/native";
// import { ReusableBackButton } from "../../components/shared/SharedButton_Icon";
// import AppScreen from "../../components/shared/AppScreen";
// import { Ionicons } from "react-native-vector-icons";

// export default function MenuDetails(
//   { route } // This is the route object that was passed from the previous screen
// ) {
//   let { routedata } = route.params;
//   console.log({
//     bbbb: routedata, //?.default_image?.original_url,
//   });
//   const navigation = useNavigation();
//   const [count, setCount] = useState(0);

//   const increment = () => setCount(count + 1);
//   const decrement = () => setCount(count - 1);

//   const navigateFunc = () => {
//     navigation.navigate("GetEverything");
//   };

//   return (
//     <AppScreen>
//       <View>
//         <Image
//           source={{ uri: routedata?.default_image?.original_url }}
//           style={{ width: "100%", height: 200 }}
//         />

//         <ReusableBackButton
//           style={{ position: "absolute", top: 15, zIndex: 1, left: 20 }}
//         />
//       </View>
//       <ScrollView style={styles.container}>
//         <View style={styles.textArea}>
//           <View
//             style={{ flexDirection: "row", justifyContent: "space-between" }}
//           >
//             <View style={{ width: "60%", gap: 3 }}>
//               <View
//                 style={{
//                   flexDirection: "row",
//                   gap: 10,
//                 }}
//               >
//                 <Text style={{ fontSize: 18, color: "#F79B2C" }}>
//                   {/* Special Rice */}
//                   {routedata?.name}
//                 </Text>
//                 <Text style={{ fontSize: 16, fontWeight: "300" }}>5,500</Text>
//               </View>

//               <Text
//                 style={{ color: "#686868", fontSize: 12, fontWeight: "300" }}
//               >
//                 {`(${routedata?.description})`}
//               </Text>
//             </View>
//             <View>
//               <Pressable>
//                 <Image
//                   source={require("../../assets/Foodmart/likeButton.png")}
//                 />
//               </Pressable>
//             </View>
//           </View>

//           <View style={{ gap: 16 }}>
//             <Text style={styles.secondaryText}>Protein</Text>
//             {routedata?.ingredients ? (
//               <Text>Add ingredients data</Text>
//             ) : (
//               <View style={{ paddingHorizontal: 10, gap: 16 }}>
//                 <Text>No ingreend availble</Text>
//                 <Text>Chicken</Text>
//                 <Text>Fish</Text>
//                 <Text>turkey</Text>
//               </View>
//             )}
//           </View>

//           <View
//             style={{
//               flexDirection: "row",
//               justifyContent: "space-between",
//               marginTop: 16,
//             }}
//           >
//             <Pressable
//               style={{
//                 flex: 1,
//                 backgroundColor: "#FFA500",
//                 paddingVertical: 12,
//                 borderRadius: 4,
//                 marginRight: 8,
//                 alignItems: "center",
//                 flexDirection: "row",
//                 justifyContent: "center",
//               }}
//             >
//               <Ionicons name="create-outline" size={24} color="white" />

//               <Text
//                 style={{
//                   fontSize: 16,
//                   fontWeight: "bold",
//                   color: "#fff",
//                 }}
//               >
//                 Accept
//               </Text>
//             </Pressable>
//             <Pressable
//               style={{
//                 flex: 1,
//                 borderWidth: 1,
//                 borderColor: "#FFA500",
//                 paddingVertical: 12,
//                 borderRadius: 4,
//                 alignItems: "center",
//                 flexDirection: "row",
//                 justifyContent: "center",
//               }}
//             >
//               <Ionicons name="trash-outline" size={24} color="red" />

//               <Text
//                 style={{
//                   fontSize: 16,
//                   fontWeight: "bold",
//                   color: "#FFA500",
//                 }}
//               >
//                 Reject
//               </Text>
//             </Pressable>
//           </View>
//         </View>
//       </ScrollView>
//     </AppScreen>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "white" },
//   textArea: {
//     backgroundColor: "white",
//     paddingTop: 32,
//     paddingBottom: 24,
//     gap: 16,
//     paddingHorizontal: 20,
//   },
//   line: {
//     borderColor: "#9B9B9B4D",
//     borderWidth: 1,
//   },
//   secondaryText: {
//     fontSize: 16,
//     fontWeight: "500",
//     color: "#023526",
//   },
//   option: { fontSize: 16, fontWeight: "300" },
//   container2: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: 20,
//     position: "relative",
//   },
//   button: {
//     backgroundColor: "#f0f0f0",
//     borderRadius: 20,
//     width: 40,
//     height: 40,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   buttonText: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   countContainer: {
//     backgroundColor: "#003d32",
//     borderRadius: 20,
//     width: 40,
//     height: 40,
//     alignItems: "center",
//     justifyContent: "center",
//     marginHorizontal: 10,
//   },
//   count: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
// });

import React, { useState } from "react";
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

export default function MenuDetails({ route }) {
  let { routedata } = route.params;
  const navigation = useNavigation();
  const [isAvailable, setIsAvailable] = useState(
    routedata?.isAvailable || false
  );

  const toggleSwitch = () => setIsAvailable((previousState) => !previousState);

  return (
    <AppScreen>
      <View>
        <Image
          source={{ uri: routedata?.default_image?.original_url }}
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
                  {routedata?.name}
                </Text>
                <Text style={{ fontSize: 16, fontWeight: "300" }}>5,500</Text>
              </View>
              <Text
                style={{ color: "#686868", fontSize: 12, fontWeight: "300" }}
              >
                {`(${routedata?.description})`}
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
          <View style={{ gap: 16 }}>
            <Text style={styles.secondaryText}>Protein</Text>
            {routedata?.ingredients ? (
              <Text>Add ingredients data</Text>
            ) : (
              <View style={{ paddingHorizontal: 10, gap: 16 }}>
                <Text>No ingredients available</Text>
                <Text>Chicken</Text>
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
