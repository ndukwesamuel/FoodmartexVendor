import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TextInput, Pressable, Modal } from 'react-native';

import { ReusableBackButton } from "../../components/shared/SharedButton_Icon";
import { ReusableTitle } from "../../components/shared/Reuseablecomponent";

const BankDetailsPage = () => {

    return(
        <View style={{paddingTop: '13%', paddingHorizontal: '5%', backgroundColor: '#fff', height: '100%'}}>
            <View style={styles.container}>
                <ReusableBackButton/>
                <ReusableTitle data={'Bank Details'}/>
                <Pressable>
                    <Text>Save</Text>
                </Pressable>
            </View>
            <View style={{paddingTop: '17%'}}>
                <Text>Account Name</Text>
                <TextInput style={styles.FormTextInput('100%')}/> 
                <Text>Account Number</Text>
                <TextInput style={styles.FormTextInput("100%")}/>  
                <Text>Bank Name</Text>
                <TextInput style={styles.FormTextInput('100%')}/>
            </View>
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
        marginVertical: 8,
        paddingVertical: 10,
        paddingHorizontal: 5
    }),
    SubContainerForFormTextInput: {
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    SubContainer: {
        width: '45%'
    },
})

export default BankDetailsPage