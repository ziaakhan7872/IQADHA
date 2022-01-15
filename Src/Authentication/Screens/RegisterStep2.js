import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Pressable,
} from "react-native";
import { ResponsiveText } from "../../Components";
import I18n from "../../i18";
import Colors from "../../Constants/Colors";
import { Checkbox } from "react-native-paper";
import moment from "moment";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import LottieView from "lottie-react-native";
import config from '../../../config.json';
import { update_user_request, update_theme } from "../../store/actions";
const RegisterStep2 = ({ navigation, route, index }) =>
{

  const dispatch = useDispatch();
  const userdata = useSelector((state) => state.user);
  const resetdataa = route.params.resetdataa ? route.params.resetdataa : null
  const resethelp = route.params.resetHelp ? route.params.resetHelp : null
console.log('resethelp====jj',resethelp);
  const [data, setData] = useState(route.params.bodydata ? route.params.bodydata
    : route.params.data);

  let totalQadah =
    data[0].count +
    data[1].count +
    data[2].count +
    data[3].count +
    data[4].count +
    data[5].count;
  const [LoadingBarModel, setLoadingBarModel] = useState(false);
  const [applyAll, setApplyAll] = useState(false);
  const [modal, setMoal] = useState(false);
  const [prayer, setPrayer] = useState(0);
  const [fajar, setFajar] = useState(data[0].count);
  const [zuhr, setZuhr] = useState(data[1].count);
  const [asir, setAsir] = useState(data[2].count);
  const [maghrib, setMaghrib] = useState(data[3].count);
  const [isha, setIsha] = useState(data[4].count);
  const [witr, setWitr] = useState(data[5].count);
  const [updatedValue, setupdatedValue] = useState(0);
  const [fajarPrayer, setFajarPrayer] = useState("");
  const [selectedIndex, setSelectedIndex] = useState("");
  const [findYears, setfindYears] = useState("");
  const [findMonth, setfindMonth] = useState("");
  const [findDays, setFindDays] = useState("");
  const [findactivityDate, setfindactivityDate] = useState(0);

 let Details = [
        {
          id :0,
          image: require('../../Assets/Images/logo.png')
        },
        {
         id :1,
          image: require("../../Assets/Images/Fajr.png")
        },
        {
         id :2,
          image: require("../../Assets/Images/Dhuhr.png")
        },
        {
         id :3,
          image: require("../../Assets/Images/Asr.png")
        },
        {
         id :4,
          image: require("../../Assets/Images/Maghrib.png")
        },
        {
         id :5,
          image: require("../../Assets/Images/Ishaa.png")
        },
        {
         id :6,
          image: require("../../Assets/Images/Witr.png")
        },
  ];

  useEffect(() =>
  {
     var date = new Date();
    let datee = date.toLocaleDateString()
    let time = date.toLocaleTimeString()
    let formateDate =  moment(datee).format('YYYY-MM-DD');
    let formatedateTime = formateDate + " " + time
    setfindactivityDate(formatedateTime)

    const totalDays = totalQadah / 5;
    var start = moment();
    var end = moment().add(totalDays, "days");

    let years = end.diff(start, "year");
    start.add(years, "years");
    setfindYears(years);

    let months = end.diff(start, "months");
    start.add(months, "months");
    setfindMonth(months);

    let days = end.diff(start, "days");
    setFindDays(days);

    console.log(years + " years " + months + " months " + days + " days");
  }, []);
  const updateData = () =>
  {
  //  {TODO:working here}
    setLoadingBarModel(true);
        axios
      .put(
        config.base_url+"users/updateQadhaNamaz",
          {
           
          prayers: [
            {
              prayerId: 1,
              prayerName: "Fajr",
              count: data[0].count,
              
            },
            {
              prayerId: 2,
              prayerName: "Dhuhr",
              count: data[1].count,
              
            },
            {
              prayerId: 3,
              prayerName: "Asr",
              count: data[2].count,
              
            },
            {
              prayerId: 4,
              prayerName: "Maghrib",
              count: data[3].count,
             
            },
            {
              prayerId: 5,
              prayerName: "Ishaa",
              count: data[4].count,
             
            },
            {
              prayerId: 6,
              prayerName: "Witr",
              count: data[5].count,
              
            },
          ],
          
            totalQadha: data[0].count + data[1].count + data[2].count + data[3].count + data[4].count + data[5].count,
            //totalQadha: 100,
           // activityDate: findactivityDate,
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
          setLoadingBarModel(false);
         // navigation.navigate("Tabs", { tabname: "PrayQadha" })
              navigation.reset({
        index: 0,
       routes: [{ name: "Tabs" }],
        });
          navigation.navigate("Tabs", { tabname: "PrayQadha" })
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
  }
  const registerUser = () => {
    setLoadingBarModel(true);
    var bodyFormData = new FormData();
    axios
      .post(
        config.base_url+"users",
        {
          location: {
            latitude: 0,
            longitude: 0,
          },
          fasts: {
            count: 0,
          },
          user: {
            email: userdata.userdata.email,
            password: userdata.userdata.password,
            deviceType: 0,
            onlineTime: 0,
            totalQadhaNamaz: totalQadah,
            balighDate: "2018-04-22",
            prayedStartDate: "2018-04-22",
            prayedEndDate: "2018-04-22",
            language: "en",
            gender: userdata.userdata.gender,
            dob: "2018-04-22",
            phoneNumber: "00000",
            qadhaReminder: true,
          },
          prayers: [
            {
              prayerId: 1,
              prayerName: "Fajr",
              count: fajar,
            },
            {
              prayerId: 2,
              prayerName: "Dhuhr",
              count: zuhr,
            },
            {
              prayerId: 3,
              prayerName: "Asr",
              count: asir,
            },
            {
              prayerId: 4,
              prayerName: "Maghrib",
              count: maghrib,
            },
            {
              prayerId: 5,
              prayerName: "Isha'a",
              count: isha,
            },
            {
              prayerId: 6,
              prayerName: "Witr",
              count: witr,
            },
          ],
        },

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(
        (response) => {
          setLoadingBarModel(false);
          dispatch(update_user_request(response.data));
          dispatch(update_theme("light"));
          navigation.navigate("Tabs", { tabname: "PrayQadha" });
        },
        (error) => {
          // setLoadingBarModel(false);
          console.log(error.response);
        }
      )
      .catch((error) => {
        console.error("goal /exercise data", error);
      });
  };
  const circularView = (
    size,
    width,
    fontSize,
    fontsize2,
    namazName,
    totalCount,
    index
  ) => {
    return (
      <AnimatedCircularProgress
        rotation={0}
        size={size}
        width={width}
        duration={0}
        fill={100}
        tintColor="#f1f3f8"
        tintColor={"#f1f3f8"}
      >
        {(fill) => (
          <View
            style={{
              backgroundColor: "white",
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignSelf: "center",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={{
                height: 16,
                width: 16,

                resizeMode: "contain",
                tintColor: Colors.grey,
              }}
              source={Details[index].image}
            />
            <Text
              style={{
                textAlign: "center",
                color: Colors.black,
                fontSize: fontSize,
                fontWeight: "bold",
              }}
            >
              {totalCount}
            </Text>
            <Text
              style={{
                textAlign: "center",
                color: Colors.grey,
                fontSize: fontsize2,
              }}
            >
              {namazName}
            </Text>
            <Text
              style={{
                textAlign: "center",
                color: Colors.grey,
                fontSize: fontsize2,
              }}
            >
              Prayer
            </Text>
          </View>
        )}
      </AnimatedCircularProgress>
    );
  };
  const handlePrayer = () => {
    if (selectedIndex == 1) {
      setFajar(updatedValue);
    } else if (selectedIndex == 2) {
      setZuhr(updatedValue);
    } else if (selectedIndex == 3) {
      setAsir(updatedValue);
    } else if (selectedIndex == 4) {
      setMaghrib(updatedValue);
    } else if (selectedIndex == 5) {
      setIsha(updatedValue);
    } else if (selectedIndex == 6) {
      setWitr(updatedValue);
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {LoadingBarModel == true ? (
        <View
          style={{
            backgroundColor: "rgba(0,0,0,0.4)",
            position: "absolute",
            zIndex: 1,
            marginTop: "80%",
            width: 200,
            height: 100,
            borderRadius:10,
            justifyContent: 'center',
            alignItems: "center",
            alignSelf:'center' 
          }}
        >
          <LottieView
            style={{
              width: 100,
              height: 100,
            }}
            source={require("../../Assets/Animations/lf30_editor_64vaq56h.json")}
            autoPlay
            loop
          />
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Loading..
          </Text>
        </View>
      ) : null}

      <ScrollView style={{ backgroundColor: Colors.white }}>
        <View
          style={{
            height: Dimensions.get("window").height / 6,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: Colors.primary_green,
          }}
        >
          <View style={{flexDirection:'row',justifyContent:'space-between',width:'90%'}}>
            <Pressable onPress={()=>navigation.goBack()}>
              <Image
                resizeMode="contain"
                source={require('../.../../../Assets/Images/left.png')}
                style={{width:20,height:20,tintColor:'#fff',alignSelf:'center',paddingLeft:10}}
              />
            </Pressable>
          <Text style={{ fontSize: 18, color: Colors.white }}>
            {I18n.t("Step 2")}
          </Text>
          <Text/>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "white",
            height: "100%",
            padding: 20,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            marginTop: -20,
            backgroundColor: Colors.white,
          }}
        >
          <Text style={{ textAlign: "center" }}>
            <Text style={Style.remainingText}>{findYears} </Text>
            <Text style={{ color: "grey" }}>years </Text>
            <Text style={Style.remainingText}>{findMonth} </Text>
            <Text style={{ color: "grey" }}>Months </Text>
            <Text style={Style.remainingText}>{findDays} </Text>
            <Text style={{ color: "grey" }}>Days </Text>
          </Text>
          <Text style={{ textAlign: "center",alignSelf:'center',fontSize:14,fontWeight:'bold' }}>
            {I18n.t("If you pray each Qadha once everyday")}
          </Text>
          <View
            style={{
              alignItems: "center",
              padding: 10,
            }}
          >
            {circularView(150, 15, 20, 14, "Total Qadha", totalQadah,0)}
          </View>
          {modal ? (
            <View style={Style.modalView}>
              <TouchableOpacity onPress={() => setMoal(false)}>
                <Image
                  style={Style.cancel}
                  source={require("../../Assets/Images/cancel.png")}
                />
                <ResponsiveText style={Style.fajarText}>
                  Add Qadah {fajarPrayer}
                </ResponsiveText>
                <View style={Style.container}>
                  <ResponsiveText
                    style={{
                      alignSelf: "center",
                      fontSize: 4,
                      paddingLeft: 40,
                    }}
                  >
                    {fajarPrayer}
                  </ResponsiveText>
                  <View style={Style.plusMinus}>
                    <View style={Style.minusContainer}>
                      <TouchableOpacity
                        onPress={() => {
                          setupdatedValue(updatedValue - 1);
                        }}
                        style={{ flex: 1, alignItems: "center" }}
                      >
                        <Image
                          style={Style.minusImage}
                          source={require("../../Assets/Images/minus.png")}
                        />
                      </TouchableOpacity>
                      <Text style={Style.age}>{updatedValue}</Text>
                      <TouchableOpacity
                        onPress={() => {
                          setupdatedValue(updatedValue + 1);
                          console.log(`prayer`, prayer);
                        }}
                        style={{ flex: 1, alignItems: "center" }}
                      >
                        <Image
                          style={Style.plusImage}
                          source={require("../../Assets/Images/plus.png")}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              <View style={Style.applyAllView}>
                <ResponsiveText style={{ alignSelf: "center" }}>
                  Apply to all
                </ResponsiveText>
                <Checkbox
                  status={applyAll == true ? "checked" : "unchecked"}
                  onPress={() => {
                    setApplyAll(!applyAll);
                  }}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  handlePrayer(), setMoal(false);
                }}
                style={Style.saveContainer}
              >
                <Text style={Style.saveButton}>Save</Text>
              </TouchableOpacity>
            </View>
          ) : null}

          <View style={{ flexDirection: "row", paddingTop: 20 }}>
            <View
              style={{
                flex: 1,

                alignItems: "center",
              }}
            >
              <View style={{ width: 80, height: 80 }}>
                <TouchableOpacity
                  onPress={() => {
                    setMoal(!modal),
                      setupdatedValue(data[0].count),
                      setSelectedIndex(data[0].prayerId),
                      setFajarPrayer(data[0].prayerName);
                  }}
                  style={{
                    backgroundColor: Colors.primary_green,
                    borderRadius: 30,
                    position: "absolute",
                    right: 0,
                    zIndex: 1,
                    height: 26,
                    width: 26,
                  }}
                >
                  <Image
                    style={{
                      height: 14,
                      marginTop: 5,
                      width: 28,
                      justifyContent: "center",
                      resizeMode: "contain",
                      tintColor: "#fff",
                    }}
                    source={require("../../Assets/Images/edit1.png")}
                  />
                </TouchableOpacity>
                {circularView(90, 10, 12, 10, "Fajar", fajar,1)}
              </View>
            </View>
            <View style={{ width: 80, height: 80 }}>
              <TouchableOpacity
                onPress={() => {
                  setMoal(!modal),
                    setupdatedValue(data[1].count),
                    setSelectedIndex(data[1].prayerId),
                    setFajarPrayer(data[1].prayerName);
                }}
                style={{
                  backgroundColor: Colors.primary_green,
                  borderRadius: 30,
                  position: "absolute",
                  right: 0,
                  zIndex: 1,
                  height: 26,
                  width: 26,
                }}
              >
                <Image
                  style={{
                    height: 14,
                    marginTop: 5,
                    width: 28,
                    justifyContent: "center",
                    resizeMode: "contain",
                    tintColor: "#fff",
                  }}
                  source={require("../../Assets/Images/edit1.png")}
                />
              </TouchableOpacity>
              {circularView(90, 10, 12, 10, "Zuhr", zuhr,2)}
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <View style={{ width: 80, height: 80 }}>
                <TouchableOpacity
                  onPress={() => {
                    setMoal(!modal),
                      setupdatedValue(data[2].count),
                      setSelectedIndex(data[2].prayerId),
                      setFajarPrayer(data[2].prayerName);
                  }}
                  style={{
                    backgroundColor: Colors.primary_green,
                    borderRadius: 30,
                    position: "absolute",
                    right: 0,
                    zIndex: 1,
                    height: 26,
                    width: 26,
                  }}
                >
                  <Image
                    style={{
                      height: 14,
                      marginTop: 5,
                      width: 28,
                      justifyContent: "center",
                      resizeMode: "contain",
                      tintColor: "#fff",
                    }}
                    source={require("../../Assets/Images/edit1.png")}
                  />
                </TouchableOpacity>
                {circularView(90, 10, 12, 10, "Asar", asir,3)}
              </View>
            </View>
          </View>

          <View style={{ flexDirection: "row", paddingTop: 20 }}>
            <View style={{ flex: 1, alignItems: "center" }}>
              <View style={{ width: 80, height: 80 }}>
                <TouchableOpacity
                  onPress={() => {
                    setMoal(!modal),
                      setupdatedValue(data[3].count),
                      setSelectedIndex(data[3].prayerId);
                    setFajarPrayer(data[3].prayerName);
                  }}
                  style={{
                    backgroundColor: Colors.primary_green,
                    borderRadius: 30,
                    position: "absolute",
                    right: 0,
                    zIndex: 1,
                    height: 26,
                    width: 26,
                  }}
                >
                  <Image
                    style={{
                      height: 14,
                      marginTop: 5,
                      width: 28,
                      justifyContent: "center",
                      resizeMode: "contain",
                      tintColor: "#fff",
                    }}
                    source={require("../../Assets/Images/edit1.png")}
                  />
                </TouchableOpacity>
                {circularView(90, 10, 12, 10, "Maghrib", maghrib,4)}
              </View>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <View style={{ width: 80, height: 80 }}>
                <TouchableOpacity
                  onPress={() => {
                    setMoal(!modal),
                      setupdatedValue(data[4].count),
                      setSelectedIndex(data[4].prayerId);
                    setFajarPrayer(data[4].prayerName);
                  }}
                  style={{
                    backgroundColor: Colors.primary_green,
                    borderRadius: 30,
                    position: "absolute",
                    right: 0,
                    zIndex: 1,
                    height: 26,
                    width: 26,
                  }}
                >
                  <Image
                    style={{
                      height: 14,
                      marginTop: 5,
                      width: 28,
                      justifyContent: "center",
                      resizeMode: "contain",
                      tintColor: "#fff",
                    }}
                    source={require("../../Assets/Images/edit1.png")}
                  />
                </TouchableOpacity>
                {circularView(90, 10, 12, 10, "Isha", isha,5)}
              </View>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <View style={{ width: 80, height: 80 }}>
                <TouchableOpacity
                  onPress={() => {
                    setMoal(!modal),
                      setupdatedValue(data[5].count),
                      setSelectedIndex(data[5].prayerId),
                      setFajarPrayer(data[5].prayerName);
                  }}
                  style={{
                    backgroundColor: Colors.primary_green,
                    borderRadius: 30,
                    position: "absolute",
                    right: 0,
                    zIndex: 1,
                    height: 26,
                    width: 26,
                  }}
                >
                  <Image
                    style={{
                      height: 14,
                      marginTop: 5,
                      width: 28,
                      justifyContent: "center",
                      resizeMode: "contain",
                      tintColor: "#fff",
                    }}
                    source={require("../../Assets/Images/edit1.png")}
                  />
                </TouchableOpacity>
                {circularView(90, 10, 12, 10, "Witr", witr,6)}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      {resetdataa == 'reset' ||resethelp=='reset' ?
        <Pressable onPress={() => { updateData() }}
        style={Style.register}
      >
        <Text style={Style.done}> Update</Text>
      </Pressable> :
        <Pressable onPress={() => { registerUser() }}
          style={Style.register}
        >
          <Text style={Style.done}> Done</Text>
        </Pressable>
      }
    </View>
  );
};

const Style = StyleSheet.create({
  flexview: {
    flex: 1,
  },
  minusImage: {
    height: 10,
    width: 10,
    flex: 1,
    resizeMode: "contain",
    tintColor: Colors.grey,
  },
  register: {
    
          bottom: 0,
          margin: 10,
          borderRadius: 30,
          backgroundColor: Colors.primary_green,
        
  },
  done: {
    
            textAlign: "center",
            padding: 15,
            color: Colors.white,
            width: "100%",
            fontWeight: "bold",
          
  },
  applyAllView: {
    marginTop: 40,
    flexDirection: "row",
    alignSelf: "center",
  },
  remainingText: {
    fontSize: 22,
    color: Colors.primary_green,
  },
  fajarText: {
    marginTop: 20,
    alignSelf: "center",
    fontSize: 4.5,
  },
  saveButton: {
    textAlign: "center",
    padding: 15,
    color: Colors.white,
    width: "100%",
    fontWeight: "bold",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  logoView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10%",
  },
  plusImage: {
    flex: 1,
    height: 10,
    width: 10,
    tintColor: Colors.grey,
    resizeMode: "contain",
  },
  plusMinus: {
    height: 30,
    marginTop: 10,
    width: 200,
    paddingRight: 40,
  },
  minusContainer: {
    flexDirection: "row",
    borderWidth: 0.2,
    borderRadius: 5,
    color: Colors.grey,
    padding: 5,
    alignSelf: "flex-end",
  },
  modalView: {
    marginTop: 80,
    width: 300,
    height: 300,
    borderRadius: 10,
    alignSelf: "center",
    backgroundColor: "white",
    position: "absolute",
    zIndex: 2,
    //borderColor: "#000",
   // borderWidth: 0.3,
    elevation:5
  },
  cancel: {
    width: 20,
    height: 20,
    alignSelf: "flex-end",
    marginRight: 15,
    marginTop: 15,
  },
  fajarContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  fajarView: {
    width: 80,
    backgroundColor: "red",
    paddingLeft: 20,
  },
  saveContainer: {
    bottom: 0,
    margin: 10,
    borderRadius: 30,
    width: "80%",
    alignSelf: "center",
    backgroundColor: Colors.primary_green,
  },
  Imageview: {
    width: "33%",
    height: "33%",
    resizeMode: "contain",
  },
  text_input: {
    marginBottom: 10,
    paddingLeft: 10,
    height: 50,
    width: "100%",
    fontSize: 16,
    color: Colors.grey,
  },
  signinButton: {
    justifyContent: "center",
    marginTop: 50,
    borderRadius: 20,
    backgroundColor: Colors.primary_green,
    width: "100%",
    height: 50,
  },
  dv_height: {
    height: Dimensions.get("window").height,
    backgroundColor: Colors.primary_green,
  },
  dv_width: {
    width: Dimensions.get("window").width,
  },
  textInput_border: {
    marginTop: 10,
    borderWidth: 0.5,
    height: 50,
    borderRadius: 20,
  },
});

export default RegisterStep2;
