import React from "react";
import { ScrollView, View, Text, StyleSheet, Image, Pressable } from "react-native";
import { ReusableBackButton } from "../../components/shared/SharedButton_Icon";
import { ReusableTitle } from "../../components/shared/Reuseablecomponent";
import LocationIcon from "../../assets/pin.png";
import PencilIcon from "../../assets/pencil.png";
import PlusIcon from "../../assets/plus.png";

const SavedAddresses = () => {
    const data = [
        { Location: LocationIcon, firstText: '345 House Estate, Lekki...', pencil: PencilIcon },
        { Location: LocationIcon, firstText: '345 House Estate, Lekki...', pencil: PencilIcon },
        { Location: LocationIcon, firstText: '345 House Estate, Lekki...', pencil: PencilIcon },
        { Location: LocationIcon, firstText: '345 House Estate, Lekki...', pencil: PencilIcon },
        { Location: LocationIcon, firstText: '345 House Estate, Lekki...', pencil: PencilIcon },
    ];

    const ReuseableFunction = () => {
        return (
            <View>
                {data.map((item, index) => (
                    <View key={index} style={styles.container}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Image source={item.Location} style={styles.IconStyles('8.2%')} resizeMode="contain" />
                            <Text style={styles.rewardText}>{item.firstText}</Text>
                        </View>
                        <Image source={item.pencil} style={styles.IconStyles('6%')} resizeMode="contain" />
                    </View>
                ))}
            </View>
        );
    }

    return (
        <ScrollView 
            style={styles.scrollView}
        >
            <View style={styles.headerStyles}>
                <ReusableBackButton style={styles.headerButton} />
                <ReusableTitle data={'Addresses'} />
            </View>
            <View style={{marginTop: '6%'}}>
                <ReuseableFunction />
            </View>
            <Pressable style={styles.footer}>
                <Image source={PlusIcon} style={styles.AddIconStyles}/>
                <Text style={{fontSize: 16}}>Add A New Address</Text>
            </Pressable>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        paddingTop: 60,
        backgroundColor: '#fff',
        paddingHorizontal: 10
    },
    headerStyles: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    headerButton: {
        position: 'absolute',
        zIndex: 1,
        left: 19,
    },
    rewardText: {
        fontSize: 18,
        marginLeft: '3%',
    },
    IconStyles: (size) => ({
        height: 20,
        width: size,
        margin: 0,
    }),
    container: {
        flexDirection: "row",
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 20,
        marginVertical: 0,
        borderBottomWidth: 1,
    },
    footer: {
        marginTop: '6%',
        flexDirection: 'row',
        padding: 4,
        alignItems: 'center'
    },
    AddIconStyles: {
        borderColor: '#F79B2C',
        borderRadius: 4,
        borderWidth: 1,
        marginHorizontal: 6,
        height: 30,
        width: '9%'
    }
});
export default SavedAddresses;