import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  FlatList,
  Pressable,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { ReusableBackButton } from "../../components/shared/SharedButton_Icon";
import { ReusableTitle } from "../../components/shared/Reuseablecomponent";
import AppScreen from "../../components/shared/AppScreen";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { Get_All_Vendor_Order_Fun } from "../../Redux/OrderSlice";
import { useMutation } from "react-query";
import Toast from "react-native-toast-message";
import axios from "axios";
const API_BASEURL = "https://foodmart-backend.gigtech.site/api/"

export default function AllOrder() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { user_data } = useSelector((state) => state?.Auth);
  const { vendor_order_data, vendor_order_isLoading } = useSelector((state) => state?.OrderSlice);

  useEffect(() => {
    dispatch(Get_All_Vendor_Order_Fun());

    return () => {};
  }, []);

  console.log({ vendorOrder: vendor_order_data[0]?.id });

  const AcceptAnOrder_Mutation = useMutation(
    ( id, data_info ) => {
      const url = `${API_BASEURL}v1/vendor/orders/:${id}/status`;
      console.log({url: url})
      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${user_data?.data?.token}`,
        },
      };
      return axios.post(url, data_info, config);
    },
    {
      onSuccess: (success) => {
        Toast.show({
          type: "success",
          text1: `${success?.data?.message}`,
        });
      },
      onError: (error) => {
        Toast.show({
          type: "error",
          text1: `${error?.response?.data?.message}`,
        });
      },
    }
  );

  const handleAcceptAnOrder = (id, status) => {
    const data = { status: status };
    console.log({ id: id, status: status });
    AcceptAnOrder_Mutation.mutate(id, data);
  };
  const renderOrder = ({ item }) => (
    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
      }}
    >
      <TouchableOpacity onPress={() => navigation.navigate("MyOrder")}>
        <Text style={{ color: "red", fontWeight: "bold", marginBottom: 8 }}>
          {item?.status}
        </Text>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          Order ID: {item?.id}
        </Text>
        <Text style={{ color: "#666", fontSize: 14, marginBottom: 8 }}>
          {item?.date} | {item?.time}
        </Text>
      </TouchableOpacity>
      <View
        style={{
          height: 1,
          backgroundColor: "#e0e0e0",
          marginVertical: 8,
        }}
      />
      {item?.order_items?.map((product, index) => (
        <View
          key={index}
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              marginRight: 8,
            }}
          >
            x{product?.quantity}
          </Text>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {product?.menu_item?.name}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: "#333",
            }}
          >
            ₦{product?.price.toLocaleString()}
          </Text>
        </View>
      ))}
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
          onPress={() => handleAcceptAnOrder(item?.id, "accepted")}
        >
          {AcceptAnOrder_Mutation.isLoading ? (
            <ActivityIndicator size={"small"} color={"white"} />
          ) : (
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#fff",
              }}
            >
              Accept
            </Text>
          )}
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
          onPress={() => handleAcceptAnOrder(item?.id, "declined")}
        >
          {AcceptAnOrder_Mutation?.isLoading ? (
            <ActivityIndicator size={"small"} color={"yellow"}/>
          ) : (
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#FFA500",
              }}
            >
              Reject
            </Text>
          )}
        </Pressable>
      </View>
    </View>
  );
  return (
    <AppScreen>
      <View style={styles.container}>
        <ReusableBackButton
          style={{ position: "absolute", top: 15, zIndex: 1, left: 20 }}
        />
        <ReusableTitle data="All Orders" />
        <View
          style={{
            marginVertical: 20,
          }}
        >
          {vendor_order_data?.length > 0 ? (
            <FlatList
              data={vendor_order_data}
              renderItem={renderOrder}
              keyExtractor={(item) => item?.id}
              contentContainerStyle={{
                paddingHorizontal: 16,
                paddingVertical: 8,
              }}
            />
          ) : (
            <Text style={{ textAlign: "center", marginTop: 20, fontSize: 20 }}>
              No orders available.
            </Text>
          )}
        </View>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", paddingTop: 20 },

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
  statusSection: {
    marginBottom: 20,
  },
  status: {
    color: "green",
    fontSize: 16,
    fontWeight: "bold",
  },
  orderId: {
    fontSize: 14,
    color: "#333",
    marginTop: 5,
  },
  dateTime: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  restaurantSection: {
    marginBottom: 20,
  },
  restaurantTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  itemQuantity: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  itemOptions: {
    fontSize: 12,
    color: "#555",
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: "bold",
  },
  cutlerySection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  cutleryIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  cutleryText: {
    fontSize: 14,
  },
  deliverySection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  summarySection: {
    marginBottom: 20,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#555",
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: "bold",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "green",
  },
});
