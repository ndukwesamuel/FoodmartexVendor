import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ReusableBackButton } from "../../components/shared/SharedButton_Icon";

export default function Wallet() {
  const navigation = useNavigation();
  const [transactions, setTransactions] = useState([
    {
      id: "1",
      type: "Cash Withdrawal",
      amount: -3000,
      date: "Fri 13",
      time: "2:00PM",
    },
    { id: "2", type: "Top Up", amount: 3000, date: "Fri 13", time: "2:00PM" },
    {
      id: "3",
      type: "Cash Withdrawal",
      amount: -3000,
      date: "Fri 13",
      time: "2:00PM",
    },
    { id: "4", type: "Top Up", amount: 3000, date: "Fri 13", time: "2:00PM" },
    {
      id: "5",
      type: "Cash Withdrawal",
      amount: -3000,
      date: "Fri 13",
      time: "2:00PM",
    },
  ]);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.container}>
      {/* Total Balance Section */}
      <ReusableBackButton
        style={{ position: "absolute", top: 80, zIndex: 1, left: 20 }}
      />
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Total Balance</Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
          <Text style={styles.balanceValue}>
            {isPasswordVisible ? "₦170,000.00" : "****"}
          </Text>
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <MaterialIcons
              name={isPasswordVisible ? "visibility" : "visibility-off"}
              size={24}
              color="#888"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("TopupScreen")}
          >
            <Image source={require("../../assets/Foodmart/top-up.png")} />
            <Text style={styles.buttonText}>Top Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("WithdrawalScreen")}
          >
            <Image source={require("../../assets/Foodmart/withdraw.png")} />
            <Text style={styles.buttonText}>Withdraw</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recent Transactions Section */}
      <Text style={styles.transactionHeader}>Recent Transactions</Text>
      <View style={styles.transactionContainer}>
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View>
              <View style={styles.transactionItem}>
                <View style={{ flexDirection: "row", gap: 8 }}>
                  <View>
                    <Text
                      style={{
                        width: 40,
                        height: 40,
                        backgroundColor: "#D9D9D9",
                        borderRadius: 20,
                      }}
                    ></Text>
                  </View>
                  <View style={styles.transactionDetails}>
                    <Text style={styles.transactionType}>{item.type}</Text>
                    <Text style={styles.transactionDate}>
                      {item.date}, {item.time}
                    </Text>
                  </View>
                </View>
                <Text
                  style={[
                    styles.transactionAmount,
                    item.amount < 0 ? styles.negative : styles.positive,
                  ]}
                >
                  {item.amount < 0
                    ? `-₦${Math.abs(item.amount)}`
                    : `+₦${item.amount}`}
                </Text>
              </View>
              <View style={styles.line}></View>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    // padding: 20,
    // marginTop:30
  },
  balanceContainer: {
    backgroundColor: "#064d3d",
    // borderRadius: 10,
    paddingTop: 88,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  balanceLabel: {
    color: "#ffffff",
    fontSize: 16,
  },
  balanceValue: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "70%",
    marginTop: 10,
    backgroundColor: "white",
    marginBottom: -60,
    shadowColor: "#6868681A",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  button: {
    backgroundColor: "#ffffff",
    paddingVertical: 10,
    // paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "400",
  },
  transactionHeader: {
    fontSize: 24,
    fontWeight: "400",
    marginBottom: 10,
    paddingHorizontal: 20,
    marginTop: 60,
  },
  transactionContainer: {
    paddingHorizontal: 20,
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: "#ffffff",
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    // paddingHorizontal: 20,
  },
  //   transactionDetails: {
  //     flex: 1,
  //   },
  transactionType: {
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 5,
  },
  transactionDate: {
    fontSize: 14,
    color: "#999",
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  negative: {
    color: "red",
  },
  positive: {
    color: "green",
  },
  line: {
    borderColor: "#9B9B9B4D",
    borderWidth: 1,
  },
});
