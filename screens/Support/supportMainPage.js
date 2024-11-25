import React from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { ReusableBackButton } from "../../components/shared/SharedButton_Icon";
import { ReusableTitle } from "../../components/shared/Reuseablecomponent";
import { useNavigation } from "@react-navigation/native";

import arrowLeftIcon from '../../assets/arrow-left.png';

const SupportMainPage = () => {
    const Navigation = useNavigation();
    const navigation = async(data) => {
        console.log(data);
        
        Navigation.navigate(data)
    }
    return (
        <View style={{paddingTop: 60, paddingLeft: 20, paddingRight: 20, backgroundColor: '#fff', height: '100%'}}>
            <View style={styles.firstDiv}>
                <ReusableBackButton style={styles.BackButton}/>
                <ReusableTitle data={'Support'}/>
            </View>
            <View style={{marginTop: '12%'}}>
                <Pressable style={styles.Btn} onPress={() => navigation('ReportIssue')}>
                    <Text style={{marginRight: '65%'}}>Report an issue</Text>
                    <Image source={arrowLeftIcon}/>
                </Pressable>
                <Pressable style={styles.Btn} onPress={() => navigation('Chat')}>
                    <Text style={{marginRight: '70%'}}>Chat with Us</Text>
                    <Image source={arrowLeftIcon}/>
                </Pressable>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    firstDiv: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    BackButton: {
        position: 'absolute',
        zIndex: 1,
        left: 10
    },
    Btn: {
        flexDirection: 'row',
        alignItems: 'center',
        height: "20%"
    }
})


export default SupportMainPage;