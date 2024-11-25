import React from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { ReusableBackButton } from "../../components/shared/SharedButton_Icon";
import { ReusableTitle } from "../../components/shared/Reuseablecomponent";

// import ProfilePicture from "../../assets/1.png";
// import ProfilePicture from '../../assets/1.png'
// import checkedIcon from "../../assets/checked.png";

import { useNavigation } from "@react-navigation/native";
const FirstRewardScreen = () => {
  const navigation = useNavigation();
  const Data = [
    {
      id: "1",
      text: "Lorem ipsum dolor sit amet conseetur adipiscing elit sed do eiusmod.",
    },
    {
      id: "2",
      text: "Lorem ipsum dolor sit amet conseetur adipiscing elit sed do eiusmod.",
    },
    {
      id: "3",
      text: "Lorem ipsum dolor sit amet conseetur adipiscing elit sed do eiusmod.",
    },
    {
      id: "4",
      text: "Lorem ipsum dolor sit amet conseetur adipiscing elit sed do eiusmod.",
    },
    {
      id: "5",
      text: "Lorem ipsum dolor sit amet conseetur adipiscing elit sed do eiusmod.",
    },
  ];
  const ListFunction = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Image
          source={require('../../assets/checked.png')}
          style={{ height: 20, width: 20, marginRight: 10 }}
        />
        <Text>{item}</Text>
      </View>
    );
  };
  return (
    <ScrollView
      style={{
        flex: 1,
        paddingTop: 60,
        backgroundColor: "#fff",
      }}
    >
      <View style={styles.headerStyles}>
        <ReusableBackButton style={styles.headerButton} />
        <ReusableTitle data={"My Points"} />
      </View>
      <View style={styles.secondDiv}>
        <Text style={styles.helloText}>Hello user,</Text>

        <TouchableOpacity
          onPress={() => navigation.navigate("PointHistory")}
          style={
            {
              // alignSelf: "flex-end",
            }
          }
        >
          <Text style={styles.LinkText}>View Points History</Text>
        </TouchableOpacity>
      </View>
      <View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../assets/1.png")}
            style={{
              height: 95,
              width: 95,
              borderRadius: 95,
              marginRight: 14,
            }}
          />
          <View>
            <Text
              style={{
                fontSize: 25,
                fontWeight: "700",
                marginBottom: 4,
              }}
            >
              79,000 Pts
            </Text>
            <Text
              style={{
                color: "#686868",
              }}
            >
              expires on 15/08/24
            </Text>
          </View>
        </View>
        <Pressable
          style={{
            flex: 1,
            width: "80%",
            justifyContent: "center",
            alignItems: "center",
            height: 50,
            borderWidth: 1,
            borderRadius: 5,
            marginTop: 20,
            marginLeft: 34,
          }}
        >
          <Text style={{ fontSize: 18 }}>Redeem Points</Text>
        </Pressable>
      </View>
      <View style={{ marginTop: 39, paddingLeft: 20, paddingRight: 20 }}>
        <Text style={{ fontSize: 25, fontWeight: "600" }}>
          How to Earn Points
        </Text>
        <FlatList
          data={Data}
          renderItem={({ item }) => <ListFunction item={item.text} />}
          keyExtractor={(item) => item.id}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerStyles: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  headerButton: {
    position: "absolute",
    zIndex: 1,
    left: 19,
  },
  secondDiv: {
    marginTop: 20,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 19,
  },
  helloText: {
    fontSize: 26,
    fontWeight: "400",
  },
  LinkText: {
    color: "#F79B2C",
    borderBottomWidth: 1,
    borderBottomColor: "#F79B2C",
    fontSize: 16,
    // position: "absolute",
    // right: 24,
  },
});

export default FirstRewardScreen;
