import React, { useState,useEffect} from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { useTheme } from '@react-navigation/native';
import I18n from '../../../i18';
import { ResponsiveText } from '../../../Components';
import { useSelector } from "react-redux";
import axios from 'axios';
import LoadingBar from "../../../PopupModels/LoadingBar";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import config from '../../../../config.json';
export default function Account({ navigation })
{
    const colors = useTheme().colors
     const userdata = useSelector((state) => state.user);
    const [name,setName]= useState('')
    const [email,setEmail]= useState('')
    const [phone,setPhone]= useState('')
    const [gender, setGender] = useState('')
     const [LoadingBarModel, setLoadingBarModel] = useState(false);

    useEffect(() =>
    {
     handlegetData()   
    }, [])

    const handlegetData = () =>
    {
         setLoadingBarModel(true);
    axios.get(
        config.base_url+"users/profile",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userdata.user.token}`,
          },
        }
      )
      .then(
        (response) => {
              setEmail(response.data.data.email)
              setGender(response.data.data.gender)
              setName(response.data.data.name)
              setPhone(response.data.data.phoneNumber)
               setLoadingBarModel(false);
        },
        (error) => {
            console.log(error);
            setLoadingBarModel(false);
        }
      )
      .catch((error) => {
          console.error("goal /exercise data", error);
          setLoadingBarModel(false);
      });
    
    }
     const callback = () => {
    setprayModal(false);
  };
    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.pop()}>
                    <Image source={require('../../../Assets/Images/left.png')}
                        style={[styles.backArrow, { tintColor: colors.textColor }]} />
                </TouchableOpacity>
                <Text style={[styles.editQadah, { color: colors.textColor }]}>{I18n.t("Account")}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('UpdateAccount')}>
                    <Image source={require('../../../Assets/Images/edit1.png')}
                        style={[styles.backArrow, { tintColor: colors.textColor }]} />
                </TouchableOpacity>
            </View>
             {LoadingBarModel == true ? (
        <LoadingBar show={LoadingBarModel} parentCallback={callback} />
      ) : null}
            <View style={styles.mainContainer}>
                <ResponsiveText style={styles.title}>NAME</ResponsiveText>
                <ResponsiveText style={[styles.name,{color:colors.textColor}]}>{name}</ResponsiveText>
                <View style={styles.bottomBorder} />

                <ResponsiveText style={styles.title}>GENDER</ResponsiveText>
                <ResponsiveText style={[styles.name,{color:colors.textColor}]}>{gender}</ResponsiveText>
                <View style={styles.bottomBorder} />

                <ResponsiveText style={styles.title}>Phone</ResponsiveText>
                <ResponsiveText style={[styles.name,{color:colors.textColor}]}>{phone}</ResponsiveText>
                <View style={styles.bottomBorder} />

                <ResponsiveText style={styles.title}>Email</ResponsiveText>
                <ResponsiveText style={[styles.name,{color:colors.textColor}]}>{email}</ResponsiveText>
                <View style={styles.bottomBorder} />

            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        paddingTop: 30,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    backArrow: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    },
    editQadah: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    mainContainer: {
        paddingHorizontal: 20,
        paddingTop: hp(5),
    },
    title: {
        color: '#8D92A3',
        fontSize: 4.5

    },
    name: {
        //color: '#22242A',
        marginTop: hp(1),
        fontSize: 4.5
    },
    bottomBorder: {
        width: wp(90),
        height: 1,
        borderColor: '#F1F3F8',
        marginTop: hp(3),
        borderBottomWidth: 1,
        marginBottom: hp(3)
    }
})