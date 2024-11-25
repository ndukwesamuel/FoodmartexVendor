import React from "react";
import { ScrollView, View, Text, StyleSheet, Image, Pressable, FlatList } from "react-native";
import { ReusableBackButton } from "../../components/shared/SharedButton_Icon";
import { ReusableTitle } from "../../components/shared/Reuseablecomponent";


const SecondRewardScreen = () => {

    const data = [
        {
            id: '1',
            firstText: 'Order Name',
            secondText: 'E8F99P',
            point: '+20'
        },
        {
            id: '1',
            firstText: 'Order Name',
            secondText: 'E8F99P',
            point: '+20'
        },
        {
            id: '1',
            firstText: 'Order Name',
            secondText: 'E8F99P',
            point: '+20'
        },
        {
            id: '1',
            firstText: 'Order Name',
            secondText: 'E8F99P',
            point: '+20'
        },
        {
            id: '1',
            firstText: 'Order Name',
            secondText: 'E8F99P',
            point: '+20'
        },
        {
            id: '1',
            firstText: 'Order Name',
            secondText: 'E8F99P',
            point: '+20'
        },
        {
            id: '1',
            firstText: 'Order Name',
            secondText: 'E8F99P',
            point: '+20'
        },
        {
            id: '1',
            firstText: 'Order Name',
            secondText: 'E8F99P',
            point: '+20'
        },
        {
            id: '1',
            firstText: 'Order Name',
            secondText: 'E8F99P',
            point: '+20'
        },
        {
            id: '1',
            firstText: 'Order Name',
            secondText: 'E8F99P',
            point: '+20'
        },
    ]

    const ReuseableFuction = () => {
        return (
            <View style={{padding: 20}}>
            {data.map((item) => (
                <View style={{flex: 1, flexDirection: 'row', marginTop: 20, borderBottomWidth: 1, alignItems: 'center'}} key={item.id}>
                    <View>
                        <Text style={styles.rewardText}>{item.firstText}</Text>
                        <Text style={styles.rewardText}>{item.secondText}</Text>
                    </View>
                    <View>
                        <Text style={{marginLeft: 200, color: '#F79B2C'}}>{item.point}</Text>
                    </View>
                </View>
            ))}
            </View>
        )
    }
    return(
        <ScrollView 
        style={{
            flex: 1,
            paddingTop: 60,
            backgroundColor: '#fff'
        }}
        >
            <View style={styles.headerStyles}>
                <ReusableBackButton style={styles.headerButton}/>
                <ReusableTitle data={'My Points'}/>
            </View>
                <ReuseableFuction/>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    headerStyles: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    headerButton: {
        position: 'absolute',
        zIndex: 1,
        left: 19
    },
    rewardText: {
        fontSize: 18,
        marginBottom: 9
    }
})
export default SecondRewardScreen;