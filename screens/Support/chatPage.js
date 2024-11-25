import React from "react";
import { View, Text, StyleSheet, TextInput, ScrollView, Image, Pressable } from "react-native";

import { ReusableBackButton } from "../../components/shared/SharedButton_Icon";
import { ReusableTitle } from "../../components/shared/Reuseablecomponent";

import PhoneIcon from '../../assets/phone-call.png';
import SendIcon from '../../assets/send.png';
import MicIcon from '../../assets/microphone.png';

const ChatPage = ()  => {
  return (
    <View style={{
        paddingTop: 50, 
        height: '100%', 
        backgroundColor: '#fff', 
        width: '100%',
        }}>
        <View style={styles.container}>
            <View style={{
                flexDirection: 'row',
                width: '40%',
                justifyContent: 'space-between'
            }}>
                <ReusableBackButton/>
                <ReusableTitle data={'Support'}/>
            </View>
            <Image source={PhoneIcon}/>
        </View>
        <ScrollView style={{
            paddingTop: '6%',
            paddingHorizontal: '4%',
            borderBottomWidth: 1,
            borderBottomColor: '#9B9B9B'
        }}>
            <View style={styles.incomingMessage}>
                <Text style={{margin: 3}}>Hi there, how may we assist you today?</Text>
                <Text style={{position: 'absolute', right: 6, bottom: 5, fontSize: 10}}>12:00PM</Text>
            </View>
            <View style={styles.sentMessages}>
                <Text>Lorem ipsum dolor sit amet, consectetur adipng elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
                <Text style={{position: 'absolute', right: 6, bottom: 5, fontSize: 10}}>12:00PM</Text>
            </View>
            <Text style={{marginLeft: '87%', fontSize: 12}}>SEEN</Text>
        </ScrollView>
        <View style={{display: 'flex', padding: 6, flexDirection: 'row', marginVertical: '7%', borderBottomWidth: 1,
            borderBottomColor: '#9B9B9B'}}>
            <TextInput placeholder="Type your message here" placeholderTextColor={'white'} style={styles.TextInputStyle}/>
            <Pressable style={styles.MicButton}>
                <Image source={MicIcon} style={{height: 20, width: 20}}/>
            </Pressable>
            <Pressable style={styles.SendButton}>
                <Image source={SendIcon} style={{height: 20, width: 20}}/>
            </Pressable>
        </View>
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#E5E5E5',
        paddingHorizontal: 15,
        height: 50
    },
    incomingMessage: {
        backgroundColor: '#9B9B9B',
        height: 'auto',
        width: '60%',
        padding: 12,
        marginVertical: 5,
        borderRadius: 5
    },
    sentMessages: {
        width: '60%',
        marginLeft: '38%',
        backgroundColor: '#008000',
        padding: 12,
        marginVertical: 5,
        borderRadius: 10
    },
    TextInputStyle: {
        backgroundColor: '#9B9B9B',
        width: '65%',
        height: 40,
        padding: 10,
        borderRadius: 10,
        marginHorizontal: 10
    },
    MicButton: {
        backgroundColor: 'rgba(247, 155, 44, 1)',
        width: '12.5%',
        height: 40,
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    SendButton: {
        backgroundColor: 'rgba(247, 155, 44, 1)',
        width: '12.5%',
        height: 40,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default ChatPage

