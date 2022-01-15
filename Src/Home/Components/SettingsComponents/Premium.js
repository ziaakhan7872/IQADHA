import React from 'react'
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ImageBackground } from 'react-native'
import { useTheme } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function Premium({ navigation })
{
    const colors = useTheme().colors;
    const image = require('../../../Assets/Images/Card.png');
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
                        Premium Features
                    </Text>
                    <Text />
                </View>
                <TouchableOpacity style={styles.buyPremium} onPress={() => navigation.navigate('PremiumSubscription')}>
                    <Text style={styles.premiunText}>Buy Premium</Text>
                    <Image source={require('../../../Assets/Images/heart.png')} style={styles.heart} />
                </TouchableOpacity>
            </View>


            <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>


                <ImageBackground source={image} resizeMode="contain"
                    imageStyle={{ borderRadius: 10 }}
                    style={{ width: '100%', height: 150 }}>
                    <View style={styles.darkMode}>
                        <Text style={styles.darkmodeText}>Dark Mode</Text>
                        <Text style={styles.text}>- Enable night time experience</Text>
                        <Text style={styles.text}>- Beatuiful features</Text>
                        <Text style={styles.text}>- Improve night time visibility</Text>
                    </View>
                </ImageBackground>

                <View style={[styles.cardView, { color: colors.background }]}>
                    <Text style={[styles.activityLog, { color: colors.textColor }]}>All Activity Logs</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: colors.textColor }}>- </Text>
                        <Text style={{ color: colors.textColor }}>Track the history of all prayers since started using app</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: colors.textColor }}>- </Text>
                        <Text style={{ color: colors.textColor }}>Easy to track logs from any date</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: colors.textColor }}>- </Text>
                        <Text style={{ color: colors.textColor }}>Detailed history</Text>
                    </View>
                </View>

                {/* Monthly namaz card */}

                <View style={[styles.namazCard, { color: colors.background }]}>
                    <View style={{ alignSelf: 'center' }}>
                        <Text style={[styles.monthName, { color: colors.textColor }]}>Jan</Text>
                        <Text style={{ alignSelf: 'center', color: '#5CB390' }}>66</Text>
                    </View>
                    <View style={styles.verticalLine} />
                    <View>
                        <Image source={require('../../../Assets/Images/fajar.png')}
                            style={styles.iconStyle} />
                        <Text style={{ color: colors.textColor }}>Fajr</Text>
                        <Text style={{ alignSelf: 'center', color: colors.textColor }}>5</Text>
                    </View>
                    <View>
                        <Image source={require('../../../Assets/Images/Dhuhr.png')}
                            style={styles.iconStyle} />
                        <Text style={{ color: colors.textColor }}>Zuhr</Text>
                        <Text style={{ alignSelf: 'center', color: colors.textColor }}>5</Text>
                    </View>
                    <View>
                        <Image source={require('../../../Assets/Images/Asr.png')}
                            style={styles.iconStyle} />
                        <Text style={{ color: colors.textColor }}>Asr</Text>
                        <Text style={{ alignSelf: 'center', color: colors.textColor }}>5</Text>
                    </View>
                    <View>
                        <Image source={require('../../../Assets/Images/Maghrib.png')}
                            style={[styles.iconStyle, { tintColor: '#FEB76C' }]} />
                        <Text style={{ color: colors.textColor }}>Maghrib</Text>
                        <Text style={{ alignSelf: 'center', color: colors.textColor }}>5</Text>
                    </View>
                    <View>
                        <Image source={require('../../../Assets/Images/Ishaa.png')}
                            style={[styles.iconStyle, { tintColor: '#564283' }]} />
                        <Text style={{ color: colors.textColor }}>Isha</Text>
                        <Text style={{ alignSelf: 'center', color: colors.textColor }}>5</Text>
                    </View>
                    <View>
                        <Image source={require('../../../Assets/Images/Witr.png')}
                            style={[styles.iconStyle, { tintColor: '#564283' }]} />
                        <Text style={{ color: colors.textColor }}>Witr</Text>
                        <Text style={{ alignSelf: 'center', color: colors.textColor }}>5</Text>
                    </View>
                </View>
                {/* offline Mode */}
                <View style={styles.offlineView}>
                    <Text style={[styles.activityLog, { color: colors.textColor }]}>Offline Mode</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: colors.textColor }}>- </Text>
                        <Text style={{ color: colors.textColor }}>Use app without internet connection</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: colors.textColor }}>- </Text>
                        <Text style={{ color: colors.textColor }}>App will update data once your device is connected to the internet</Text>
                    </View>
                </View>
                {/* Widgets */}
                <View style={styles.offlineView}>
                    <Text style={[styles.activityLog, { color: colors.textColor }]}>Widgets</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: colors.textColor }}>- </Text>
                        <Text style={{ color: colors.textColor }}>Track your prayer without opening the app</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: colors.textColor }}>- </Text>
                        <Text style={{ color: colors.textColor }}>Both dark mode and light mode widgets</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: colors.textColor }}>- </Text>
                        <Text style={{ color: colors.textColor }}>Show progress of each prayer</Text>
                    </View>
                </View>

                {/* Light card */}
                <View style={{}}>
                    <View style={{ position: 'absolute', marginTop: 2, zIndex: 1 }}>
                        <Image source={require('../.../../../../Assets/Images/Widget_light.png')}
                            resizeMode="contain"
                            style={{ width: 200 }}

                        />
                    </View>
                    <View style={{ marginTop: hp(12) }}>
                        <Image source={require('../.../../../../Assets/Images/Widgets_dark.png')}
                            resizeMode="contain"
                            style={{ width: 200, alignSelf: 'flex-end' }}
                        />
                    </View>
                </View>
                {/* Reset to orignal */}
                <View style={styles.orignalView}>
                    <Text style={[styles.resetOrignal, { color: colors.textColor }]}>Reset to Orignal</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: colors.textColor }}>- </Text>
                        <Text style={{ color: colors.textColor }}>Ability to start again</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: colors.textColor }}>- </Text>
                        <Text style={{ color: colors.textColor }}>App will backup your previous data to cloud</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingHorizontal: 10
    },
    header: {
        height: hp(25),
    },
    body: {
        flex: 1,
    },
    leftArrow: {
        width: wp(5),
        height: wp(5),
        resizeMode: 'contain'
    },
    headerView: {
        marginTop: hp(4),
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    premiumFeatures: {
        fontSize: 16,
        fontFamily: 'AvenirNextLTPro-Bold',
        fontWeight: 'bold'
    },
    heart: {
        width: wp(5),
        height: wp(5),
        tintColor: '#04AA6D'
    },
    buyPremium: {
        marginTop: hp(5),
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#544182',
        paddingVertical: 20,
        borderRadius: 30,
        paddingHorizontal: 20,
        alignContent: 'center',
        shadowColor: "#42346E",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
    },
    premiunText: {
        alignSelf: 'center',
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
        fontFamily: 'AvenirNextLTPro-Bold'
    },
    darkMode: {
        paddingVertical: hp(5),
        paddingHorizontal: wp(5),
    },
    darkmodeText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: 'AvenirNextLTPro-Bold',
        marginBottom: 10
    },
    text: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
        fontFamily: 'AvenirNextLTPro-Bold',
    },
    circle: {
        width: wp(15),
        height: wp(15),
        backgroundColor: '#E7E8FE',
        position: 'absolute',
        zIndex: 1,
        alignSelf: 'flex-end',
        borderRadius: 60,
        right: 30,
        top: -10,
        borderWidth: 0.2,
        borderColor: '#E7E8FE'
    },
    cardView: {
        paddingVertical: hp(5),
        paddingHorizontal: wp(5),
        borderRadius: 10,
        marginTop: hp(3),
        borderWidth: 0.2,
        borderColor: '#D3D3D3'
    },
    activityLog: {
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: 'AvenirNextLTPro-Bold',
        marginBottom: hp(2)
    },
    namazCard: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        paddingVertical: wp(5),
        elevation: 5,
        borderRadius: 10,
        width: wp(90),
        alignSelf: 'center',
        shadowColor: '#D3D3D3'
    },
    iconStyle: {
        width: 20,
        height: 20,
        alignSelf: 'center',
        resizeMode: 'contain'
    },
    monthName: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    verticalLine: {
        borderWidth: 0.5,
        borderColor: '#E6E6E6'
    },
    offlineView: {
        marginTop: hp(5),
        paddingHorizontal: 10
    },

    iconStyle: {
        width: 20,
        height: 20,
        alignSelf: 'center',
        resizeMode: 'contain'
    },
    icons: {
        width: 10, height: 10
    },
    orignalView: {
        marginBottom: hp(5),
        paddingLeft: 10,
    },
    resetOrignal: {
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: 'AvenirNextLTPro-Bold',
        marginBottom: hp(2)
    }
})
