import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import AppScreen from "../components/shared/AppScreen";
import { ReusableBackButton } from "../components/shared/SharedButton_Icon";
import { ReusableTitle } from "../components/shared/Reuseablecomponent";
import { AntDesign } from "@expo/vector-icons";
const FAQs = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const faqs = [
    "Ut enim ad minim veniam quis nost exercit dation laboris?",
    "Lorem ipsum dolor conseret ading?",
    "Duis aute irure dolor in reprehenderit velit cillum dolore?",
    "Exceptuer sint occaecat?",
    "Lorem ipsum dolor conseret ading?",
    "Ut enim ad minim veniam quis nost exercit dation laboris?",
    "Exceptuer sint occaecat?",
    "Duis aute irure dolor in reprehenderit velit cillum dolore?",
  ];

  const faqContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

  const toggleExpand = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  return (
    <AppScreen>
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          paddingTop: 20,
        }}
      >
        <ReusableBackButton
          style={{ position: "absolute", top: 15, zIndex: 1, left: 20 }}
        />
        <View
          style={{
            width: "60%",
            alignSelf: "center",
          }}
        >
          <ReusableTitle data="Frequently Asked Questions" />
        </View>
        <View
          style={{
            paddingHorizontal: 30,
            marginVertical: 20,
          }}
        ></View>
        <ScrollView style={styles.container}>
          {/* FAQ Items */}
          <View style={styles.faqContainer}>
            {faqs.map((faq, index) => (
              <View key={index}>
                <TouchableOpacity
                  style={styles.faqItem}
                  onPress={() => toggleExpand(index)}
                >
                  <Text style={styles.faqQuestion}>{faq}</Text>
                  <Text style={styles.arrow}>
                    {expandedIndex === index ? (
                      <>
                        <AntDesign name="up" size={24} color="black" />
                      </>
                    ) : (
                      <>
                        <AntDesign name="down" size={24} color="black" />
                      </>
                    )}
                    {/* // "▲" : "▼"} */}
                  </Text>
                </TouchableOpacity>
                {expandedIndex === index && (
                  <Text style={styles.faqAnswer}>{faqContent}</Text>
                )}
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backArrow: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  faqContainer: {
    marginTop: 10,
  },
  faqItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
  arrow: {
    fontSize: 16,
    color: "#888",
  },
  faqAnswer: {
    fontSize: 14,
    color: "#555",
    marginTop: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});

export default FAQs;
