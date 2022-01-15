import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Pressable } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTheme } from '@react-navigation/native';
import PushNotification, { Importance } from "react-native-push-notification";

export default function Notifications({ navigation })
{

    const colors = useTheme().colors
    const [toggle, setToggle] = useState(false)
    const [updateToggle, setupdateToggle] = useState(false)

     const sendNotification = () => {
        
        PushNotification.createChannel(
            {
                channelId: "channel-id", 
                channelName: "My channel",
                channelDescription: "A channel to categorise your notifications", 
                playSound: true, 
                soundName: "default", 
                importance: Importance.HIGH, 
                vibrate: true,
                soundName: "default",
            },
            (created) => console.log(`createChannel returned---> '${created}'`)
            );
            
            PushNotification.localNotificationSchedule({
                id: 111,
                channelId: "channel-id", 
                title: "iQadha",
                message: "It's time to offer your qadha prayer", 
                date: new Date(Date.now() +60 * 60 * 12 * 1000), 
                allowWhileIdle: true, 
                repeatType: 'minutes',
            },
            );
        }
    return (
        <View style={styles.mainContainer}>
            <View style={styles.header}>
                <View style={styles.headerView}>
                    <TouchableOpacity onPress={() => navigation.pop()}>
                        <Image source={require('../../../Assets/Images/left.png')}
                            style={[styles.leftArrow, { tintColor: colors.textColor }]}
                        />
                    </TouchableOpacity>
                    <Text style={[styles.premiumFeatures, { color: colors.textColor }]}>
                        Notifications
                    </Text>
                    <Text />
                </View>
            </View>

            <View style={styles.qadhaReminder}>
                <View>
                    <Text style={[styles.reminder, { color: colors.textColor }]}>Qadha Reminder</Text>
                    <Text style={{ color: '#8D92A3' }}>Every 12 hours</Text>
                </View>
                <Pressable style={{ alignSelf: 'center' }} onPress={() =>
                {
                    
                   
                    {!toggle ? sendNotification() : null}
                     setToggle(!toggle)
                    
                }}>
                    {toggle ? <Image source={require('../../../Assets/Images/Switchon.png')} /> :
                        <Image source={require('../../../Assets/Images/Switchoff.png')} />
                    }

                </Pressable>
            </View>
            <View style={styles.line} />
            <View style={styles.AutoUpdate}>
                <View>
                    <Text style={[styles.reminder, { color: colors.textColor }]}>Auto Update</Text>
                    <Text style={{ color: '#8D92A3', width: wp(70) }}>Will automatically add Qadha to your Salah if you do not login to pray daily</Text>
                </View>
                <Pressable style={{ alignSelf: 'center' }} onPress={() => setupdateToggle(!updateToggle)}>
                    {updateToggle ? <Image source={require('../../../Assets/Images/Switchon.png')} /> :
                        <Image source={require('../../../Assets/Images/Switchoff.png')} />
                    }

                </Pressable>
            </View>
             <View style={styles.line} />

        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingHorizontal: 20
    },
    header: {
        height: hp(15),
    },
    headerView: {
        marginTop: hp(4),
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    premiumFeatures: {
        fontSize: 18,
        fontFamily: 'AvenirNextLTPro-Bold',
        fontWeight: 'bold',
        color: '#000'
    },
    leftArrow: {
        width: wp(5),
        height: wp(5),
        resizeMode: 'contain',
        tintColor: '#000'
    },
    qadhaReminder: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    reminder: {
        fontSize: 18,
        fontFamily: 'AvenirNextLTPro-Bold',
        color: '#000'
    },
    AutoUpdate: {
        marginTop: hp(5),
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    line: {
        borderBottomColor: '#F1F3F8',
        borderBottomWidth: 1,
        marginTop: hp(5),
        width: wp(90),
        alignSelf: 'center'
    }
})