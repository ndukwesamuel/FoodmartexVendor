import React from "react";
import { ScrollView, View, Text , StyleSheet, TextInput, Pressable, Image} from "react-native";

import { ReusableBackButton } from "../../components/shared/SharedButton_Icon";
import { ReusableTitle } from "../../components/shared/Reuseablecomponent";

import ImageIcon from '../../assets/upload.png';

const ReportIssuePage = () => {
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{
            paddingTop: 50, 
            height: '100%', 
            backgroundColor: '#fff', 
            width: '100%',
            paddingLeft: 20,
            paddingRight: 20
            }}>
            <View style={styles.HeaderCless}>
                <ReusableBackButton style={styles.BackButton}/>
                <ReusableTitle data={'Support'}/>
            </View>
                <Text style={{
                    color:'rgba(155, 155, 155, 1)',
                    marginTop: '10%',
                    fontSize: 16
                }}>Fill out the form below and we’ll be in touch to help</Text>
                <View style={styles.SubSection}>
                    <Text>What’s the issue?</Text>
                    <TextInput style={styles.InputStyle}/>
                </View>
                <View style={styles.SubSection}>
                    <Text>Add a screenshot oft the issue</Text>
                    <Pressable style={styles.ButtonStyles}>
                        <Image source={ImageIcon} style={{height: 30, width: 30, margin: 10}}/>
                        <Text style={{color: 'rgba(247, 155, 44, 1)'}}>Browse</Text>
                    </Pressable>
                </View>
                <Pressable style={styles.SubmitButton}>
                    <Text style={{
                        marginVertical: 12,
                        fontSize: 15,
                        color: '#fff'
                    }}>Done</Text>
                </Pressable>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    HeaderCless: {
        flex: 1,
        flexDirection: 'row', 
        justifyContent: 'center',
        alignItems: 'center'
    },
    BackButton: {
        position: 'absolute',
        left: 10,
        zIndex: 1
    },
    SubSection: {
        marginTop: '8%'
    },
    InputStyle: {
        backgroundColor: 'rgba(104, 104, 104, 0.2)',
        borderWidth: 1,
        borderColor: 'rgba(104, 104, 104, 0.5)',
        borderRadius: 4,
        height: 97,
        marginTop: '4%'
    },
    ButtonStyles: {
        height: 130,
        borderColor: 'rgba(104, 104, 104, 0.5)',
        borderWidth: 1,
        borderStyle: 'dashed',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '8%'
    },
    SubmitButton: {
        marginTop: '12%',
        backgroundColor: 'rgba(247, 155, 44, 1)',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
export default ReportIssuePage;