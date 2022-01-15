import React, { useEffect, useState } from "react";
import
{
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    LogBox,
} from "react-native";

import I18n from "../../../i18";
import Color from "../../../Constants/Colors";
import axios from "axios";
import { useSelector } from "react-redux";
import LoadingBar from "../../../PopupModels/LoadingBar";
import { useTheme } from '@react-navigation/native';
import config from '../../../../config.json';

LogBox.ignoreAllLogs();

const EditQadhaPrayers = ({ navigation }) =>
{
    const [data, setdata] = useState([]);
    const [totalQadha, settotalQadha] = useState(0);
    const colors = useTheme().colors;
    const userdata = useSelector((state) => state.user);
    const [FajrC, setFajrC] = useState(0);
    const [ZuhrC, setZuhrC] = useState(0);
    const [AsarC, setAsarC] = useState(0);
    const [MagribC, setMagribC] = useState(0);
    const [IshaC, setishaC] = useState(0);
    const [WitrC, setWitrC] = useState(0);
    const [LoadingBarModel, setLoadingBarModel] = useState(false);
    const [updateCount, setupdateCount] = useState(0);
    const [fajar, setFajr] = useState(0);
    const [zuhr, setZuhr] = useState(0);
    const [asr, setAsr] = useState(0);
    const [maghrib, setMaghrib] = useState(0);
    const [isha, setIsha] = useState(0);
    const [witr, setWitr] = useState(0);
    const [logtotol, setlogtotal] = useState(0);

    const handleUpdate = () =>
    {
        let fajrCount = fajar - FajrC;
        let zuhrCount = zuhr - ZuhrC;
        let asrCount = asr - AsarC;
        let magribCount = maghrib - MagribC;
        let ishaCount = isha - IshaC;
        let witrCount = witr-WitrC
           
        var date = new Date();
         setLoadingBarModel(true);
        axios
      .put(
        config.base_url+"users/updateQadhaNamaz",
          {
           
          prayers: [
            {
              prayerId: 1,
              prayerName: "Fajr",
              count: fajar-fajrCount,
              prayedNow: fajrCount,
            },
            {
              prayerId: 2,
              prayerName: "Dhuhr",
              count: zuhr-zuhrCount,
              prayedNow:zuhrCount,
            },
            {
              prayerId: 3,
              prayerName: "Asr",
              count: asr-asrCount,
              prayedNow: asrCount,
            },
            {
              prayerId: 4,
              prayerName: "Maghrib",
              count: maghrib-magribCount,
              prayedNow:magribCount ,
            },
            {
              prayerId: 5,
              prayerName: "Ishaa",
              count: isha-ishaCount,
              prayedNow:ishaCount,
            },
            {
              prayerId: 6,
              prayerName: "Witr",
              count: witr-witrCount,
              prayedNow:witrCount,
            },
          ],
          totalQadha: totalQadha-logtotol,
          qadhaPrayed: logtotol,
          activityDate: date.toISOString().split("T")[0]+' '+date.toLocaleTimeString(),
        },

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userdata.user.token}`,
          },
        }
      )
      .then(
        (response) => {
          console.log('update body-=========>>>>>',response);
          loadnamazdata();
          setLoadingBarModel(false);
        },
        (error) => {
          setLoadingBarModel(false);
          console.log(error.response);
        }
      )
      .catch((error) => {
        setLoadingBarModel(false);
        console.error("goal /exercise data", error);
      });
  };
    

    useEffect(() =>
    {
        loadnamazdata();
    }, []);

    const loadnamazdata = () => 
    {
        setLoadingBarModel(true);
        axios
            .post(
               config.base_url+"users/qadhaNamaz",
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${userdata.user.token}`,
                    },
                }
            )
            .then(
                (response) =>
                {
                   // console.log('response.data.pendingQadha[0]', response.data.pendingQadha[0].prayer.name);
                    setFajrC(response.data.pendingQadha[0].count)
                    setFajr(response.data.pendingQadha[0].count)
                    setZuhrC(response.data.pendingQadha[1].count)
                    setZuhr(response.data.pendingQadha[1].count)
                    setAsarC(response.data.pendingQadha[2].count)
                    setAsr(response.data.pendingQadha[2].count)
                    setMagribC(response.data.pendingQadha[3].count)
                    setMaghrib(response.data.pendingQadha[3].count)
                    setishaC(response.data.pendingQadha[4].count)
                    setIsha(response.data.pendingQadha[4].count)
                    setWitrC(response.data.pendingQadha[5].count)
                    setWitr(response.data.pendingQadha[5].count)
                    setLoadingBarModel(false);
                    setdata(response.data.pendingQadha);
                    settotalQadha(response.data.totalQadha);
                },
                (error) =>
                {
                    console.log(error);
                }
            )
            .catch((error) =>
            {
                console.error("goal /exercise data", error);
            });
    };
 const callback = () => {
    setprayModal(false);
  };

    return (
        <View style={{ flex: 1 }}>
            <View style={Style.headerContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                    <Image source={require('../../../Assets/Images/left.png')}
                        style={[Style.backArrow, { tintColor: colors.textColor }]} />
                </TouchableOpacity>
                <Text style={[Style.editQadah, { color: colors.textColor }]}>{I18n.t("Edit Qadha Prayers")}</Text>
                <Text />
            </View>
            {LoadingBarModel == true ? (
        <LoadingBar show={LoadingBarModel} parentCallback={callback} />
      ) : null}
            <View style={Style.qadahPrayer}>
                <View style={{ flex: 1 }}>
                    {/* Fajr */}
                    <View style={Style.mainContainer}>
                        <Text style={{ marginLeft: 100, fontSize: 18,width:70,color:colors.textColor }}>Fajr</Text>
                        <View style={[Style.menuContainer, { borderColor: colors.textColor, }]}>
                            <TouchableOpacity
                                hitSlop={{top:20,bottom:20,left:20,right:20}}
                                onPress={() => setFajrC(FajrC - 1)} style={Style.menuTouuch}>
                                <Image
                                    style={[Style.minusContainer, { tintColor: colors.textColor }]}
                                    source={require("../../../Assets/Images/minus.png")}
                                />
                            </TouchableOpacity>
                            <Text style={[Style.plusText, { color: colors.textColor }]}>
                                {Math.max(0,FajrC-0)}
                            </Text>
                            <TouchableOpacity
                                hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                                onPress={() => setFajrC(FajrC + 1)} style={Style.plusTouch}>
                                <Image
                                    style={[Style.plusImage, { tintColor: colors.textColor }]}
                                    source={require("../../../Assets/Images/plus.png")}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* zuhr */}
                    <View style={Style.mainContainer}>
                        <Text style={{ marginLeft: 100, fontSize: 18,width:70,color:colors.textColor }}>Zuhr</Text>
                        <View style={[Style.menuContainer, { borderColor: colors.textColor, }]}>
                            <TouchableOpacity
                                 hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                                onPress={() => setZuhrC(ZuhrC - 1)} style={Style.menuTouuch}>
                                <Image
                                    style={[Style.minusContainer, { tintColor: colors.textColor }]}
                                    source={require("../../../Assets/Images/minus.png")}
                                />
                            </TouchableOpacity>
                            <Text style={[Style.plusText, { color: colors.textColor }]}>
                                
                                {Math.max(0,ZuhrC-0)}
                            </Text>
                            <TouchableOpacity
                                 hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                                onPress={() => setZuhrC(ZuhrC + 1)} style={Style.plusTouch}>
                                <Image
                                    style={[Style.plusImage, { tintColor: colors.textColor }]}
                                    source={require("../../../Assets/Images/plus.png")}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* Asr */}
                    <View style={Style.mainContainer}>
                        <Text style={{ marginLeft: 100, fontSize: 18,width:70,color:colors.textColor }}>Asr</Text>
                        <View style={[Style.menuContainer, { borderColor: colors.textColor, }]}>
                            <TouchableOpacity
                                 hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                                onPress={() => setAsarC(AsarC - 1)} style={Style.menuTouuch}>
                                <Image
                                    style={[Style.minusContainer, { tintColor: colors.textColor }]}
                                    source={require("../../../Assets/Images/minus.png")}
                                />
                            </TouchableOpacity>
                            <Text style={[Style.plusText, { color: colors.textColor }]}>
        
                                 {Math.max(0,AsarC-0)}
                            </Text>
                            <TouchableOpacity
                                 hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                                onPress={() => setAsarC(AsarC + 1)} style={Style.plusTouch}>
                                <Image
                                    style={[Style.plusImage, { tintColor: colors.textColor }]}
                                    source={require("../../../Assets/Images/plus.png")}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* maghrib */}
                    <View style={Style.mainContainer}>
                        <Text style={{ marginLeft: 100, fontSize: 18,width:70,color:colors.textColor }}>Maghrib</Text>
                        <View style={[Style.menuContainer, { borderColor: colors.textColor, }]}>
                            <TouchableOpacity
                                 hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                                onPress={() => setMagribC(MagribC - 1)} style={Style.menuTouuch}>
                                <Image
                                    style={[Style.minusContainer, { tintColor: colors.textColor }]}
                                    source={require("../../../Assets/Images/minus.png")}
                                />
                            </TouchableOpacity>
                            <Text style={[Style.plusText, { color: colors.textColor }]}>
                                {Math.max(0,MagribC-0)}
                            </Text>
                            <TouchableOpacity
                                 hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                                onPress={() => setMagribC(MagribC + 1)} style={Style.plusTouch}>
                                <Image
                                    style={[Style.plusImage, { tintColor: colors.textColor }]}
                                    source={require("../../../Assets/Images/plus.png")}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* isha */}
                    <View style={Style.mainContainer}>
                        <Text style={{ marginLeft: 100, fontSize: 18,width:70,color:colors.textColor }}>Isha</Text>
                        <View style={[Style.menuContainer, { borderColor: colors.textColor, }]}>
                            <TouchableOpacity
                                 hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                                onPress={() => setishaC(IshaC - 1)} style={Style.menuTouuch}>
                                <Image
                                    style={[Style.minusContainer, { tintColor: colors.textColor }]}
                                    source={require("../../../Assets/Images/minus.png")}
                                />
                            </TouchableOpacity>
                            <Text style={[Style.plusText, { color: colors.textColor }]}>
                               
                                {Math.max(0,IshaC-0)}
                            </Text>
                            <TouchableOpacity
                                 hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                                onPress={() => setishaC(IshaC + 1)} style={Style.plusTouch}>
                                <Image
                                    style={[Style.plusImage, { tintColor: colors.textColor }]}
                                    source={require("../../../Assets/Images/plus.png")}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* witr */}
                    <View style={Style.mainContainer}>
                        <Text style={{ marginLeft: 100, fontSize: 18,width:70,color:colors.textColor }}>Witr</Text>
                        <View style={[Style.menuContainer, { borderColor: colors.textColor, }]}>
                            <TouchableOpacity
                                 hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                                onPress={() => setWitrC(WitrC - 1)} style={Style.menuTouuch}>
                                <Image
                                    style={[Style.minusContainer, { tintColor: colors.textColor }]}
                                    source={require("../../../Assets/Images/minus.png")}
                                />
                            </TouchableOpacity>
                            <Text style={[Style.plusText, { color: colors.textColor }]}>
                                
                                {Math.max(0,WitrC-0)}
                            </Text>
                            <TouchableOpacity
                                 hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                                onPress={() => setWitrC(WitrC + 1)} style={Style.plusTouch}>
                                <Image
                                    style={[Style.plusImage, { tintColor: colors.textColor }]}
                                    source={require("../../../Assets/Images/plus.png")}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
                <TouchableOpacity onPress={() => handleUpdate()} style={Style.doneContainer}>
                    <Text style={Style.doneText}>{I18n.t("SAVE")}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default EditQadhaPrayers;

const Style = StyleSheet.create({
    mainContainer: {
        marginTop:20,
        flexDirection: "row",
        marginVertical: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    prayerNameContainer: {
        flex: 1,
        flexDirection: "row",
    },
    prayername: {
        textAlign: "center",
        color: "black",
        fontSize: 16,
        paddingLeft: 10,
    },
    menuTouuch: {
        flex: 1,
        alignItems: "center",
    },
    plusText: {
        color: Color.grey,
        flex: 1,
        textAlign: "center",
        color: Color.black,
    },
    plusTouch: {
        flex: 1,
        alignItems: "center",
    },
    minusContainer: {
        flex: 1,
        height: 10,
        width: 12,
        justifyContent: "center",
        resizeMode: "contain",
        tintColor: Color.grey,
    },
    menuContainer: {
        flexDirection: "row",
        borderWidth: 0.4,
        borderRadius: 5,
        color: Color.grey,
        padding: 7,
        paddingHorizontal: 30,
        marginLeft: 10,
        marginRight: 100
    },
    doneContainer: {
        backgroundColor: Color.primary_green,
        width: "100%",
        padding: 15,
        justifyContent: "center",
        borderRadius: 30,
        zIndex: 1,
    },
    doneText: {
        color: Color.white,
        textAlign: "center",
        fontSize: 18,
    },
    editQadah: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    plusImage: {
        flex: 1,
        height: 10,
        width: 12,
        tintColor: Color.grey,
        resizeMode: "contain",
    },
    qadahPrayer: {
        flex: 1,
        padding: 20,
    },
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
    }
});
