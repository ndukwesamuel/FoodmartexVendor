import { View, FlatList, Text, Animated } from "react-native";
import { useState, useRef } from "react";
import { list } from "./onboardlist";
import OnBoardingItem from "./OnBoardingItem";
import Paginator from "./Paginator";

const OnBoarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const slidesRef = useRef(null);
  const viewAbleItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  const scrollTo = async () => {
    if (currentIndex < list.length) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 3 }}>
        <FlatList
          data={list}
          renderItem={({ item }) => (
            <OnBoardingItem item={item} scrollTo={scrollTo} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            }
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewAbleItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>
      {/* <Text style={{ top: -50 }}>Hello</Text> */}
      {/* <OnBoardingItem /> */}
      <Paginator data={list} scrollX={scrollX} />
    </View>
  );
};

export default OnBoarding;
