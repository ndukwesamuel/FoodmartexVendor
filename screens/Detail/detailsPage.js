import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TextInput, Pressable, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { ReusableBackButton } from "../../components/shared/SharedButton_Icon";
import { ReusableTitle } from "../../components/shared/Reuseablecomponent";

const DetailsPage = () => {

    const [isGenderModalVisible, setGenderModalVisible] = useState(false);
    const [gender, setGender] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false)

    const openGenderModal = () => {
        setGenderModalVisible(true);
      };

      const selectGender = (option) => {
        setGender(option)
        setGenderModalVisible(false)
      } 

      const onChangeDOB = (event, selectedDate) => {
        const currentDate = selectedDate || dateOfBirth;
        setShowDatePicker(false);
        setDateOfBirth(currentDate);
    };

    const formatDate = (date) => {
        return date.toLocaleDateString(); // Format the date to a readable string
    };

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
                <Text>Full Name</Text>
                <TextInput style={styles.FormTextInput('100%')}/> 
                <Text>Email</Text>
                <TextInput style={styles.FormTextInput("100%")}/>  
                <Text>Mobile Number</Text>
                <TextInput style={styles.FormTextInput('100%')}/> 
                <View style={styles.SubContainerForFormTextInput}>
                    <Pressable style={styles.SubContainer} onPress={openGenderModal}>
                        <Text>Gender (optional)</Text>
                        <Text style={styles.FormTextInput('100%')}>{gender}</Text>
                    </Pressable>
                    <Pressable style={styles.SubContainer} onPress={() => setShowDatePicker(true)}>
                        <Text>Date of birth (optional)</Text>
                        <Text style={styles.FormTextInput('100%')}>{formatDate(dateOfBirth)}</Text>
                    </Pressable>
                </View>
                {showDatePicker && (
                    <DateTimePicker
                        value={dateOfBirth}
                        mode='date'
                        display='default'
                        onChange={onChangeDOB}
                    />
                )}
                <View style={styles.SubContainerForFormTextInput}>
                    <View style={styles.SubContainer}>
                        <Text>Occupation (optional)</Text>
                        <TextInput style={styles.FormTextInput('100%')}/>
                    </View>
                    <View style={styles.SubContainer}>
                        <Text>Hobbies (optional)</Text>
                        <TextInput style={styles.FormTextInput('100%')}/>  
                    </View>
                    
                </View>
            </View>
            <Modal
            transparent={true}
            visible={isGenderModalVisible}
            onRequestClose={() => setGenderModalVisible(false)}
            >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                <Text style={styles.modalHeader}>Select Gender</Text>
                {["male", "female"].map((option) => (
                    <Pressable
                    key={option}
                    onPress={() => selectGender(option)}
                    style={styles.modalOption}
                    >
                    <Text style={styles.modalOptionText}>{option}</Text>
                    </Pressable>
                ))}
                </View>
            </View>
            </Modal>
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
        paddingHorizontal: 5
    }),
    SubContainerForFormTextInput: {
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    SubContainer: {
        width: '45%'
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      },
      modalContainer: {
        width: "80%",
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
      },
      modalHeader: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 15,
        textAlign: "center",
      },
      modalOption: {
        paddingVertical: 10,
        alignItems: "center",
      },
      modalOptionText: {
        fontSize: 16,
      },
})

export default DetailsPage