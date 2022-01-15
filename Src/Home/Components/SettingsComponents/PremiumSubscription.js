import React from 'react'
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTheme } from "@react-navigation/native";

const PremiumSubscription = ({ navigation }) =>
{
    const colors = useTheme().colors
    const baseImage = require('../../../Assets/Images/Base.png')
    return (
        <View style={styles.mainContainer}>
            {/* header */}
            <View style={styles.header}>
                <View style={styles.headerView}>
                    <TouchableOpacity onPress={() => navigation.pop()}>
                        <Image source={require('../../../Assets/Images/left.png')}
                            style={styles.leftArrow}
                        />
                    </TouchableOpacity>
                    <Text style={styles.premiumFeatures}>
                        Premium Subscription
                    </Text>
                    <Text />
                </View>
            </View>
            {/* Image Background */}
            <ImageBackground
                imageStyle={{ width: '100%', height: 300 }}
                source={baseImage}
                resizeMode='contain'
                style={{}}>
                <View style={styles.liftimeBuy}>
                    <Text style={styles.buyText}>Buy iQadha Lifetime</Text>
                    <Text style={styles.buyText}>Premium Subscription</Text>
                </View>
                {/* draw line */}
                <View style={styles.line} />
                {/* amound view */}
                <View style={styles.aedView}>
                    <Text style={styles.aed}>AED</Text>
                    <Text style={styles.amount}>215.00</Text>
                </View>
                <View style={styles.line} />
                {/* See premium Features */}
            <TouchableOpacity style={styles.aedView} onPress={()=>navigation.pop()}>
                <Text>See</Text>
                    <Text style={{marginLeft:5,color:'#5CB390'}}>premium Features</Text>
                    </TouchableOpacity>
            </ImageBackground>

        </View>
    )
}

export default PremiumSubscription
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff'
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
        color:'#000'
    },
    leftArrow: {
        width: wp(5),
        height: wp(5),
        resizeMode: 'contain',
        tintColor:'#000'
    },
    liftimeBuy: {
        paddingHorizontal: wp(20),
        paddingTop: hp(5)
    },
    buyText: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'AvenirNextLTPro-Bold',
        alignSelf: 'center',
        color: '#fff'
    },
    line: {
        borderBottomColor: '#fff',
        borderBottomWidth: 1,
        marginTop: hp(5),
        width: wp(70),
        alignSelf: 'center'
    },
    aedView: {
        paddingHorizontal: wp(20),
        paddingTop: hp(5),
        flexDirection: 'row',
        alignSelf: 'center'
    }, amount: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff'
    },
    aed: {
        color: '#A08ED6',
        alignSelf: 'center',
        marginRight: 5
    }
})
