import React from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";

import { ReusableBackButton } from "../../components/shared/SharedButton_Icon";
import { ReusableTitle } from "../../components/shared/Reuseablecomponent";

const UpdatePassword = () => {
    return (
        <View style={{paddingTop: '13%', paddingHorizontal: '5%', backgroundColor: '#fff', height: '100%'}}>
            <View style={styles.container}>
                <ReusableBackButton/>
                <ReusableTitle data={'Change Password'}/>
                <View></View>
            </View>
            <View style={{paddingTop: '13%'}}>
                <Text>Current Password</Text>
                <TextInput style={styles.FormTextInput('100%')}/> 
                <Text>New Password</Text>
                <TextInput style={styles.FormTextInput("100%")}/>
                <Text>Confirm Password</Text>
                <TextInput style={styles.FormTextInput("100%")}/>
            </View>
            <Pressable style={styles.SubmitButton}>
                    <Text style={{
                        marginVertical: 12,
                        fontSize: 15,
                        color: '#fff'
                    }}>Change Password</Text>
                </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    FormTextInput: (width) => ({
        height: 40,
        width: width,
        borderWidth: 2,
        borderColor: '#F4F4F4',
        borderRadius: 4,
        marginVertical: 10,
        paddingVertical: 10,
        paddingHorizontal: 5,
        backgroundColor: '#F4F4F4'
    }),
    SubmitButton: {
        marginTop: '12%',
        backgroundColor: 'rgba(247, 155, 44, 1)',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default UpdatePassword