import { View, Animated, useWindowDimensions } from "react-native";

export default function Paginator({ data, scrollX }) {
  const { width } = useWindowDimensions();

  return (
    <View
      style={{
        bottom: "90%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
      }}
    >
      {data.map((item, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: "clamp",
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            key={i.toString()}
            style={{
              borderRadius: 10,
              height: 10,
              backgroundColor: "#001272",
              marginHorizontal: 8,
              width: dotWidth,
              opacity,
            }}
          />
        );
      })}
    </View>
  );
}
