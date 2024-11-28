import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TextInput, Pressable, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { ReusableBackButton } from "../../components/shared/SharedButton_Icon";
import { ReusableTitle } from "../../components/shared/Reuseablecomponent";

const VendorDetailsPage = () => {

    return(
        <View style={{paddingTop: '13%', paddingHorizontal: '5%', backgroundColor: '#fff', height: '100%'}}>
            <View style={styles.container}>
                <ReusableBackButton/>
                <ReusableTitle data={'My Details'}/>
                <Pressable>
                    <Text>Save</Text>
                </Pressable>
            </View>
            <View style={{paddingTop: '13%'}}>
                <Text>Business Name</Text>
                <TextInput style={styles.FormTextInput('100%')}/> 
                <Text>Business Registration Number</Text>
                <TextInput style={styles.FormTextInput("100%")}/>  
                <Text>Business Address</Text>
                <TextInput style={styles.FormTextInput('100%')}/>
                <View style={styles.SubContainerForFormTextInput}>
                    <View style={styles.SubContainer}>
                        <Text>City</Text>
                        <TextInput style={styles.FormTextInput('100%')}/>
                    </View>
                    <View style={styles.SubContainer}>
                        <Text>State</Text>
                        <TextInput style={styles.FormTextInput('100%')}/>  
                    </View>
                </View>
                <Text>Contact Person’s Name</Text>
                <TextInput style={styles.FormTextInput('100%')}/> 
                <Text>Contact Person’s Email</Text>
                <TextInput style={styles.FormTextInput("100%")}/>  
                <Text>Contact Person’s Mobile Number</Text>
                <TextInput style={styles.FormTextInput('100%')}/>
                <Text>Add Emergency Number</Text>
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
        marginVertical: 5,
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

export default VendorDetailsPage