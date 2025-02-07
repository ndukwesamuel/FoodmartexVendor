import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable, ActivityIndicator } from "react-native";

import { ReusableBackButton } from "../../components/shared/SharedButton_Icon";
import { ReusableTitle } from "../../components/shared/Reuseablecomponent";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import { useMutation } from "react-query";
import axios from "axios";

const API_BASEURL = process.env.EXPO_PUBLIC_API_URL;
const UpdatePassword = () => {
  const { user_data } = useSelector((state) => state?.Auth);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const ChangePassword_Mutation = useMutation(
    (data_info) => {
      const url = `${API_BASEURL}v1/profile/password`;
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
        setConfirmedPassword("");
        setNewPassword("");
        setOldPassword("");
      },
      onError: (error) => {
        Toast.show({
          type: "error",
          text1: `${error?.response?.data?.message}`,
        });
      },
    }
  );

  const handleChangePassword = () => {
    const data = {
      old_password: oldPassword,
      new_password: newPassword,
      new_password_confirmation: confirmedPassword,
    };

    ChangePassword_Mutation.mutate(data);
  };
  return (
    <View
      style={{
        paddingTop: "13%",
        paddingHorizontal: "5%",
        backgroundColor: "#fff",
        height: "100%",
      }}
    >
      <View style={styles.container}>
        <ReusableBackButton />
        <ReusableTitle data={"Change Password"} />
        <View></View>
      </View>
      <View style={{ paddingTop: "13%" }}>
        <Text>Current Password</Text>
        <TextInput
          style={styles.FormTextInput("100%")}
          onChangeText={(text) => setOldPassword(text)}
          value={oldPassword}
        />
        <Text>New Password</Text>
        <TextInput
          style={styles.FormTextInput("100%")}
          onChangeText={(text) => setNewPassword(text)}
          value={newPassword}
        />
        <Text>Confirm Password</Text>
        <TextInput
          style={styles.FormTextInput("100%")}
          onChangeText={(text) => setConfirmedPassword(text)}
          value={confirmedPassword}
        />
      </View>
      <Pressable style={styles.SubmitButton} onPress={handleChangePassword}>
        {ChangePassword_Mutation.isLoading ? (
          <ActivityIndicator size={"small"} color={"white"} />
        ) : (
          <Text
            style={{
              marginVertical: 12,
              fontSize: 15,
              color: "#fff",
            }}
          >
            Change Password
          </Text>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  FormTextInput: (width) => ({
    height: 40,
    width: width,
    borderWidth: 2,
    borderColor: "#F4F4F4",
    borderRadius: 4,
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: "#F4F4F4",
  }),
  SubmitButton: {
    marginTop: "12%",
    backgroundColor: "rgba(247, 155, 44, 1)",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default UpdatePassword;
