import {
  View,
  Text,
  Image,
  useWindowDimensions,
  StyleSheet,
  Button,
  Pressable,
} from "react-native";
const image1 = require("../../assets/onboard-1.png");
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { checkOnboarding, onBoaringAction } from "../../Redux/OnboardingSlice";

const OnBoardingItem = ({ item, scrollTo }) => {
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();

  // const onBoarded = async () => {
  //   try {
  //     await AsyncStorage.setItem("@viewedOnboarding", "true");
  //     console.log("done");
  //     dispatch(
  //       onBoaringAction.checkOnboarding({
  //         isOnboarding: false,
  //       })
  //     );
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleSkip = () => {
    // Handle skip action
    dispatch(checkOnboarding());
  };

  return (
    <View style={[styles.container, { width }]}>
      <Image
        source={item.image}
        style={[styles.image, { width, resizeMode: "stretch" }]}
      />

      {/* OnBoading Text */}
      <View style={{ flex: 0.2, paddingHorizontal: 10, gap: 10 }}>
        <Text style={{ color: "#1E0000", fontSize: 24, fontWeight: "900" }}>
          {item?.title}
        </Text>
        <Text style={{ color: "#1E0000", fontSize: 16 }}>
          {item?.description}
        </Text>
      </View>

      {/* Onboarding Buttons */}
      <View
        style={{
          flex: 0.2,
          marginTop: 10,
          justifyContent: "space-evenly",
          paddingHorizontal: 10,
        }}
      >
        <View style={{ gap: 10 }}>
          {item.id !== 3 && (
            <Pressable
              style={{
                padding: 10,
                borderRadius: 5,
                backgroundColor: "#001272",
              }}
              onPress={() => scrollTo()}
            >
              <Text style={{ textAlign: "center", color: "white" }}>Next</Text>
            </Pressable>
          )}
          {item.id !== 3 && (
            <Pressable
              style={{ padding: 10, borderRadius: 5 }}
              onPress={handleSkip}
            >
              <Text style={{ textAlign: "center", color: "#001272" }}>
                Skip
              </Text>
            </Pressable>
          )}
          {item.id === 3 && (
            <Pressable
              style={{
                padding: 10,
                borderRadius: 5,
                backgroundColor: "#001272",
              }}
              onPress={handleSkip}
            >
              <Text style={{ textAlign: "center", color: "white" }}>
                Complete
              </Text>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
};

export default OnBoardingItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    margin: 0,
    gap: 40,
    // justifyContent: "space-between",
    // height: "100%",
  },

  image: {
    flex: 0.7,
    marginTop: -10,
  },
});
