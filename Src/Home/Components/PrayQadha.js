import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import LoadingBar from "../../PopupModels/LoadingBar";
import { useSelector } from "react-redux";
import { Checkbox } from "react-native-paper";
import axios from "axios";
import Color from "../../Constants/Colors";
import PrayModal from "../../PopupModels/PrayModal";
import { ResponsiveText } from "../../Components";
import moment from 'moment';

import config from "../../../config.json";
const PrayQadha = ({navigation}) => {
  const { colors } = useTheme();

  const [prayModal, setprayModal] = useState(false);
  const userdata = useSelector((state) => state.user);
  const [data, setdata] = useState([]);
  const [LoadingBarModel, setLoadingBarModel] = useState(false);
  const [totalQadha, settotalQadha] = useState(0);
  const [findactivityDate, setfindactivityDate] = useState(0);

  const [EachNamaz, setEachNamaz] = useState({
    FajrC: 0,
    ZuhrC: 0,
    AsarC: 0,
    MagribC: 0,
    IshaC: 0,
    WitrC: 0,
  });
  const [modal, setModal] = useState(false);
  const [namazName, setNamazName] = useState("");
  const [updateCount, setupdateCount] = useState(0);
  const [applyAll, setApplyAll] = useState(false);

  const images = [
    {
      id: "1",
      image: require("../../Assets/Images/fajar.png"),
      tintColor: "#FFE86D",
    },
    {
      id: "2",
      image: require("../../Assets/Images/Dhuhr.png"),
      tintColor: "#FFE83E",
    },
    {
      id: "3",
      image: require("../../Assets/Images/Asr.png"),
      tintColor: "#FED66C",
    },
    {
      id: "4",
      image: require("../../Assets/Images/Maghrib.png"),
      tintColor: "#FEB76C",
    },
    {
      id: "5",
      image: require("../../Assets/Images/Ishaa.png"),
      tintColor: "#6A549D",
    },
    {
      id: "6",
      image: require("../../Assets/Images/Witr.png"),
      tintColor: "#6A549D",
    },
  ];

  useEffect(() => {
    var date = new Date();
    let datee = date.toLocaleDateString()
    let time = date.toLocaleTimeString()
    let formateDate =  moment(datee).format('YYYY-MM-DD');
    let formatedateTime = formateDate + " " + time
    setfindactivityDate(formatedateTime)
   // console.log(formatedateTime,'formatedateTime');

    
    const unsubscribe = navigation.addListener("focus", () =>
    {
       loadnamazdata();
           
     });
    return unsubscribe;
  }, [navigation]);

  const loadnamazdata = () => {
    setLoadingBarModel(true);
    axios
      .post(
        config.base_url + "users/qadhaNamaz",
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
         // console.log('response==========>>>>>>>',response);
          setEachNamaz({
            FajrC: response.data.pendingQadha[0].count,
            ZuhrC: response.data.pendingQadha[1].count,
            AsarC: response.data.pendingQadha[2].count,
            MagribC: response.data.pendingQadha[3].count,
            IshaC: response.data.pendingQadha[4].count,
            WitrC: response.data.pendingQadha[5].count,
          });
          setLoadingBarModel(false);
          setdata(response.data.pendingQadha);
          settotalQadha(response.data.totalQadha);
        },
        (error) => {
          console.log(error);
        }
      )
      .catch((error) => {
        console.error("goal /exercise data", error);
      });
  };

  const updateQadahNamaz = (F, Z, A, M, I, W) => {
    let totalNamazCount =
      data[0].count +
      data[1].count +
      data[2].count +
      data[3].count +
      data[4].count +
      data[5].count;
    let PrayedNowTotal = totalNamazCount - (F + Z + A + M + I + W);
    let namazDataToPush = [];
    let Fajrobj = {
      prayerId: 1,
      prayerName: "Fajr",
      count: F,
      prayedNow: data[0].count - F,
    };
    let Zuhrobj = {
      prayerId: 2,
      prayerName: "Dhuhr",
      count: Z,
      prayedNow: data[1].count - Z,
    };
    let Asrobj = {
      prayerId: 3,
      prayerName: "Asr",
      count: A,
      prayedNow: data[2].count - A,
    };
    let Maghribobj = {
      prayerId: 4,
      prayerName: "Maghrib",
      count: M,
      prayedNow: data[3].count - M,
    };
    let Ishaobj = {
      prayerId: 5,
      prayerName: "Ishaa",
      count: I,
      prayedNow: data[4].count - I,
    };
    let Witrobj = {
      prayerId: 6,
      prayerName: "Witr",
      count: W,
      prayedNow: data[5].count - W,
    };
    if (F != null) {
      namazDataToPush.push(Fajrobj);
    }
    if (Z != null) {
      namazDataToPush.push(Zuhrobj);
    }
    if (A != null) {
      namazDataToPush.push(Asrobj);
    }
    if (M != null) {
      namazDataToPush.push(Maghribobj);
    }
    if (I != null) {
      namazDataToPush.push(Ishaobj);
    }
    if (W != null) {
      namazDataToPush.push(Witrobj);
    }

    var date = new Date();
    setLoadingBarModel(true);
    console.log(
      "check ===============",
      date.toISOString().split("T")[0] + " " + date.toLocaleTimeString()
    );
    axios
      .put(
        config.base_url + "users/updateQadhaNamaz",
        {
          prayers: namazDataToPush,
          totalQadha: totalQadha,
          qadhaPrayed: PrayedNowTotal,
          activityDate:findactivityDate
          //  date.toISOString().split("T")[0] + " " + date.toLocaleTimeString(),
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
  const renderItemNmaz = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setModal(!modal), setNamazName(item.prayer.name);
          setupdateCount(
            index == 0
              ? EachNamaz.FajrC
              : index == 1
              ? EachNamaz.ZuhrC
              : index == 2
              ? EachNamaz.AsarC
              : index == 3
              ? EachNamaz.MagribC
              : index == 4
              ? EachNamaz.IshaC
              : index == 5
              ? EachNamaz.WitrC
              : 0
          );
        }}
        style={{
          backgroundColor: colors.cardcolor,
          height: 130,
          flex: 1,
          margin: 10,
          elevation: 1,
          borderRadius: 10,
        }}
      >
        <View>
          <Image
            style={[Style.iconStyle, { tintColor: images[index].tintColor }]}
            source={images[index].image}
          />
        </View>
        {/* TODO: */}
        <Text style={[Style.namazName, { color: colors.textColor }]}>
          {item.prayer.name}
        </Text>
        <Text style={[Style.namazCount, { color: colors.textColor }]}>
          {index == 0
            ? EachNamaz.FajrC
            : index == 1
            ? EachNamaz.ZuhrC
            : index == 2
            ? EachNamaz.AsarC
            : index == 3
            ? EachNamaz.MagribC
            : index == 4
            ? EachNamaz.IshaC
            : index == 5
            ? EachNamaz.WitrC
            : 0}
        </Text>
      </TouchableOpacity>
    );
  };
  const callback = () => {
    setprayModal(false);
  };

  return (
    <View style={Style.flexview}>
      <StatusBar animated={true} backgroundColor="#000" hidden={true} />
      {LoadingBarModel == true ? (
        <LoadingBar show={LoadingBarModel} parentCallback={callback} />
      ) : null}
      <View style={{ flex: 0.5 }}>
        {colors.darkbackground ? (
          <ImageBackground
            source={require("../../Assets/Images/night_half_bg.png")}
            resizeMode="cover"
            style={{
              height: "100%",
              width: "100%",
              resizeMode: "stretch",
              flex: 1,
            }}
          >
            <View style={{ marginTop: 30 }}>
              <ResponsiveText style={Style.textIqadah}>iQadha</ResponsiveText>
            </View>
          </ImageBackground>
        ) : (
          <ImageBackground
            source={require("../../Assets/Images/day.png")}
            resizeMode="cover"
            style={{
              height: "100%",
              width: "100%",
              resizeMode: "stretch",
              flex: 1,
            }}
          >
            <View style={{ marginTop: 30 }}>
              <ResponsiveText style={Style.textIqadah}>iQadha</ResponsiveText>
            </View>
          </ImageBackground>
        )}
      </View>
      {modal ? (
        <View
          style={{
            marginTop: 200,
            width: 300,
            height: 300,
            borderRadius: 10,
            alignSelf: "center",
            backgroundColor: colors.background,
            position: "absolute",
            zIndex: 2,
            elevation: 5,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setModal(false);
            }}
          >
            <Image
              style={{
                width: 20,
                height: 20,
                alignSelf: "flex-end",
                marginRight: 15,
                marginTop: 15,
                tintColor: colors.textColor,
              }}
              source={require("../../Assets/Images/cancel.png")}
            />
          </TouchableOpacity>
          <ResponsiveText
            style={{
              marginTop: 20,
              alignSelf: "center",
              fontSize: 4.5,
              color: colors.textColor,
            }}
          >
            Add {namazName} Qadah for today
          </ResponsiveText>
          <View style={Style.container}>
            <ResponsiveText
              style={{
                alignSelf: "center",
                fontSize: 4,
                paddingLeft: 40,
                color: colors.textColor,
              }}
            >
              {namazName}
            </ResponsiveText>
            <View style={Style.plusMinus}>
              <View style={Style.minusContainer}>
                <TouchableOpacity
                  onPress={() => {
                    setupdateCount(updateCount - 1);
                  }}
                  style={{ flex: 1, alignItems: "center" }}
                  hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                >
                  <Image
                    style={Style.minusImage}
                    source={require("../../Assets/Images/minus.png")}
                  />
                </TouchableOpacity>
                <ResponsiveText style={{ color: colors.textColor }}>
                  {Math.max(0, updateCount - 0)}
                </ResponsiveText>
                <TouchableOpacity
                  onPress={() => {
                    setupdateCount(updateCount + 1);
                  }}
                  style={{ flex: 1, alignItems: "center" }}
                  hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                >
                  <Image
                    style={Style.plusImage}
                    source={require("../../Assets/Images/plus.png")}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={Style.applyAllView}>
            <ResponsiveText
              style={{ alignSelf: "center", color: colors.textColor }}
            >
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
              setModal(false);
              if (applyAll == true) {
                updateQadahNamaz(
                  updateCount,
                  updateCount,
                  updateCount,
                  updateCount,
                  updateCount,
                  updateCount
                );
              } else {
                if (namazName == "Fajr") {
                  updateQadahNamaz(updateCount, null, null, null, null, null);
                } else if (namazName == "Dhuhr") {
                  updateQadahNamaz(null, updateCount, null, null, null, null);
                } else if (namazName == "Asr") {
                  updateQadahNamaz(null, null, updateCount, null, null, null);
                } else if (namazName == "Maghrib") {
                  updateQadahNamaz(null, null, null, updateCount, null, null);
                } else if (namazName == "Ishaa") {
                  updateQadahNamaz(null, null, null, null, updateCount, null);
                } else if (namazName == "Witr") {
                  updateQadahNamaz(null, null, null, null, null, updateCount);
                }
              }
            }}
            style={Style.saveContainer}
          >
            <ResponsiveText style={Style.saveButton}>Save</ResponsiveText>
          </TouchableOpacity>
        </View>
      ) : null}
      <View style={{ flex: 1 }}>
        <FlatList
          style={{ padding: 20 }}
          data={data}
          numColumns={2}
          contentContainerStyle={{ paddingBottom: 30 }}
          keyExtractor={(item, index) => item.prayer.name}
          renderItem={renderItemNmaz}
        />
      </View>
    </View>
  );
};

const Style = StyleSheet.create({
  flexview: {
    flex: 1,
  },
  header: {
    padding: 20,
    flex: 1,
  },
  modalView: {
    marginTop: 200,
    width: 300,
    height: 300,
    borderRadius: 10,
    alignSelf: "center",
    backgroundColor: "white",
    position: "absolute",
    zIndex: 2,
    borderColor: "gray",
    borderWidth: 0.3,
  },
  namazCount: {
    color: Color.black,
    marginLeft: 20,
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
  },
  textIqadah: {
    alignSelf: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: 6,
  },
  applyAllView: {
    marginTop: 40,
    flexDirection: "row",
    alignSelf: "center",
  },
  namazName: {
    color: Color.black,
    marginLeft: 20,
    fontSize: 16,
  },
  minusImage: {
    height: 10,
    width: 10,
    flex: 1,
    resizeMode: "contain",
    tintColor: Color.grey,
  },
  plusMinus: {
    height: 30,
    marginTop: 10,
    width: 200,
    paddingRight: 40,
  },
  saveButton: {
    textAlign: "center",
    padding: 15,
    color: Color.white,
    width: "100%",
    fontWeight: "bold",
  },
  minusContainer: {
    flexDirection: "row",
    borderWidth: 0.2,
    borderRadius: 5,
    color: Color.grey,
    padding: 5,
    alignSelf: "flex-end",
  },
  fajarText: {
    marginTop: 20,
    alignSelf: "center",
    fontSize: 4.5,
  },
  mainContainer: {
    height: 130,
    flex: 1,
    margin: 10,
    elevation: 1,
    borderRadius: 10,
  },
  textformat1: {
    color: Color.white,
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  textformat2: {
    color: Color.white,
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  dob_btn: {
    flex: 1,
    backgroundColor: Color.secondary_green,
    margin: 20,
    justifyContent: "center",
  },
  saveContainer: {
    bottom: 0,
    margin: 10,
    borderRadius: 30,
    width: "80%",
    alignSelf: "center",
    backgroundColor: Color.primary_green,
  },
  iconStyle: {
    height: 50,
    width: 50,
    resizeMode: "cover",
    alignSelf: "flex-end",
    marginRight: 20,
    marginTop: 10,
  },
  plusImage: {
    flex: 1,
    height: 10,
    width: 10,
    tintColor: Color.grey,
    resizeMode: "contain",
  },
  dob_select: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  cancel: {
    width: 20,
    height: 20,
    alignSelf: "flex-end",
    marginRight: 10,
    marginTop: 10,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});
export default PrayQadha;
