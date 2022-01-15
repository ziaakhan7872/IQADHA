import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  StatusBar,
} from "react-native";
import axios from "axios";
const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? 45 : StatusBar.currentHeight;
import Colors from "../Constants/Colors";
import EditModalPray from "../PopupModels/EditModalPray";
import { useSelector } from "react-redux";
import config from '../../config.json';
const PraySettingsUpdate = () => {
  const userdata = useSelector((state) => state.user);
  const [data, setdata] = useState(0);
  const [prayModal, setprayModal] = useState(false);

  useEffect(() => {
    loadfastdata();
  }, []);
  const updateQadahNamaz = (F, Z, A, M, I, W) => {

    var date = new Date();

    axios
      .put(
        config.base_url+"users/updateQadhaNamaz",
        {
          prayers: [
            {
              prayerId: 1,
              prayerName: "Fajr",
              count: F,
            },
            {
              prayerId: 2,
              prayerName: "Dhuhr",
              count: Z,
            },
            {
              prayerId: 3,
              prayerName: "Asr",
              count: A,
            },
            {
              prayerId: 4,
              prayerName: "Maghrib",
              count: M,
            },
            {
              prayerId: 5,
              prayerName: "Ishaa",
              count: I,
            },
            {
              prayerId: 6,
              prayerName: "Witr",
              count: W,
            },
          ],
          totalQadha: F + Z + A + M + I + W,
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
          console.log(response);
          loadfastdata();
        },
        (error) => {
          // setLoadingBarModel(false);
          console.log(error.response);
        }
      )
      .catch((error) => {
        setLoadingBarModel(false);
        console.error("goal /exercise data", error);
      });
  };
  const loadfastdata = () => {
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
        (response) => {
          console.log(response);
          setdata(response.data.pendingQadha);
        },
        (error) => {
          console.log(error);
        }
      )
      .catch((error) => {
        console.error("goal /exercise data", error);
      });
  };
  console.log("hehe", data);
  const renderItemNmaz = (item) => {
    console.log(item.item.count);
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          backgroundColor: "white",

          height: 60,
          flex: 1,
          margin: 10,
          justifyContent: "center",

          alignItems: "center",
        }}
        onPress={() => {
          setprayModal(true);
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "black",
            flex: 1,
            fontSize: 16,
            color: Colors.grey,
            // fontWeight: "bold",
          }}
        >
          {item.item.prayer.name}
        </Text>
        <Image
          style={{
            flex: 1,
            height: 20,
            width: 20,
            resizeMode: "contain",
          }}
          source={require("../Assets/Images/Fajr.png")}
        />
        <Text
          style={{
            textAlign: "center",
            color: "black",
            fontSize: 16,
            flex: 1,
            color: Colors.grey,
          }}
        >
          {item.item.count}
        </Text>
      </TouchableOpacity>
    );
  };
  const callback = (
    count,
    prayeddata,
    totaltoday,
    Fajrc,
    Zuhrc,
    Asarc,
    Magribc,
    Ishac,
    Witrc
  ) => {
    console.log("tim", Fajrc);
    console.log(Zuhrc);
    console.log(Asarc);
    console.log(Magribc);
    console.log(Ishac);
    console.log(Witrc);

    setprayModal(false);
    // setlogtotal(totaltoday);
    updateQadahNamaz(Fajrc, Zuhrc, Asarc, Magribc, Ishac, Witrc);
  };
  return (
    <View style={Style.flexview}>
      <EditModalPray show={prayModal} parentCallback={callback} data={data} />
      <View
        style={{
          height: STATUS_BAR_HEIGHT,
          backgroundColor: Colors.primary_green,
        }}
      >
        <StatusBar
          translucent
          backgroundColor={Colors.primary_green}
          barStyle="light-content"
        />
      </View>
      <View
        style={{
          backgroundColor: Colors.primary_green,
          height: 50,
          justifyContent: "center",
        }}
      >
        <Text style={{ textAlign: "center", color: Colors.white }}>
          Edit Qadha
        </Text>
      </View>
      <View style={{ flex: 1, padding: 30, flexDirection: "row" }}>
        <FlatList
          style={{ paddingTop: 15 }}
          data={data}
          renderItem={renderItemNmaz}
          keyExtractor={(item) => item.prayer.name}
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
  textformat1: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  textformat2: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  dob_btn: {
    flex: 1,
    backgroundColor: Colors.secondary_green,
    margin: 20,
    justifyContent: "center",
  },
  dob_select: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PraySettingsUpdate;
