import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Toggle from "react-native-toggle-element";
import heroSectionImage from "../../assets/heroSectionImage.jpeg";
import { ReusableBackButton } from "../../components/shared/SharedButton_Icon";
import Icon from "react-native-vector-icons/Ionicons";
export default function MenuDetails() {
  const footerButton = 'Footer Button';
  const [toggleValue, setToggleValue] = useState(false);

  const HandleToggleText = () => {
    return (
      <>
        {toggleValue ? (
          <Text style={styles.toggleValueStyle(toggleValue)}>Available</Text>
        ) : (
            <Text style={styles.toggleValueStyle(toggleValue)}>Unavailable</Text>
        )}
      </>
    )
  }


  return (
    <View style={styles.container}>
      <View>
        <Image
          source={heroSectionImage}
          style={styles.heroSectionImageStyles}
        />
        <ReusableBackButton style={styles.backButtonStyles} />
      </View>
      <View style={styles.headerContainer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 19, color: "#F79B2C", margin: 5 }}>
            Special Rice
          </Text>
          <Text style={{ fontSize: 19 }}>(5,500)</Text>
        </View>
        <Toggle
          value={toggleValue}
          onPress={(val) => setToggleValue(val)}
          trackBar={{
            activeBackgroundColor: "#76EE59",
            inActiveBackgroundColor: "#FFFFFF",
            width: 120,
            height: 40,
          }}
          thumbButton={{
            height: 35,
            width: 35,
            activeBackgroundColor: "#fff",
            inActiveBackgroundColor: "#fff",
          }}
          thumbStyle={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.8,
            shadowRadius: 2,
            elevation: 5,
          }}
          trackBarStyle={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.8,
            shadowRadius: 2,
            elevation: 5,
          }}
          leftComponent={<HandleToggleText />}
        />
      </View>
      <View>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur elit adipiscing elit, sed do
          eiusmod tempor sed incididunt ut labore et sed dolore magna.
        </Text>
        <Text
          style={{
            marginHorizontal: 20,
            color: "#023526",
            fontSize: 18,
            fontWeight: "500",
          }}
        >
          Protein
        </Text>
        <View style={styles.listContainer}>
          <Text style={styles.listFoodTitle}>Chicken</Text>
          <Text style={styles.listFoodPrice}>(+5,500)</Text>
        </View>
        <View style={styles.listContainer}>
          <Text style={styles.listFoodTitle}>Fish</Text>
          <Text style={styles.listFoodPrice}>(+5,500)</Text>
        </View>
        <View style={styles.listContainer}>
          <Text style={styles.listFoodTitle}>Turkey</Text>
          <Text style={styles.listFoodPrice}>(+5,500)</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButtonStyle(footerButton)}>
          <Icon name="create-outline" size={26} color="#FFFFFF" />
          <Text style={styles.footerButtonTextStyle(footerButton)}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButtonStyle("")}>
          <Icon name="trash-outline" size={26} color="red" />
          <Text style={styles.footerButtonTextStyle("")}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  heroSectionImageStyles: {
    height: 250,
    width: "100%",
  },
  backButtonStyles: {
    position: "absolute",
    top: 20,
    left: 15,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    marginVertical: 20,
  },
  description: {
    fontSize: 13,
    width: "67%",
    color: "#686868",
    marginHorizontal: 20,
    paddingBottom: 20,
  },
  listContainer: {
    marginHorizontal: 26,
    marginVertical: 9,
    flexDirection: "row",
  },
  listFoodTitle: {
    fontSize: 16,
    paddingHorizontal: 4,
  },
  listFoodPrice: {
    fontSize: 16,
    color: "#686868",
    fontStyle: "italic",
  },
  footer: {
    flex: 1,
    position: "absolute",
    bottom: 10,
    flexDirection: "row",
  },
  footerButtonStyle: (data) => ({
    height: 50,
    width: "45%",
    backgroundColor: data == "Footer Button" ? "#F79B2C" : "transparent",
    marginHorizontal: "2.2%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: data == "Footer Button" ? "transparent" : "red",
    borderWidth: 2,
  }),
  footerButtonTextStyle: (data) => ({
    fontSize: 20,
    marginHorizontal: 5,
    color: data == "Footer Button" ? "#fff" : "red",
  }),
  toggleValueStyle: (data) => ({
    width: "100%",
    marginTop: 9,
    marginLeft: data ? 70 : 120,
    fontWeight: 'bold',
    color: data ? '#fff' : '#000'
  }),
});