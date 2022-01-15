import React, { useEffect, useState, Fragment } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import axios from "axios";
import config from '../../config.json';
const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? 45 : StatusBar.currentHeight;
import Colors from "../Constants/Colors";
import FastsEdit from "../PopupModels/FastsEdit";
import { useSelector } from "react-redux";
const FastSettingsUpdate = ({ navigation, index }) => {
  const userdata = useSelector((state) => state.user);
  const [number, setnumber] = useState(0);

  const [FastEditModal, setFastEditModal] = useState(false);
  const callback = (count) => {
    setFastEditModal(false);
  };
  useEffect(() => {
    loadfastdata();
  }, []);

  const loadfastdata = () => {
    axios
      .post(
        config.base_url+"users/fasts",
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
          setnumber(response.data.data[0].count);
        },
        (error) => {
          console.log(error);
        }
      )
      .catch((error) => {
        console.error("goal /exercise data", error);
      });
  };
  return (
    <View style={Style.flexview}>
      {FastEditModal == true ? (
        <FastsEdit
          show={FastEditModal}
          parentCallback={callback}
          navigate={navigation}
          number={number}
        />
      ) : null}
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
      <View style={{ flex: 1, padding: 30, flexDirection: "row" }}>
        <Text style={{ color: Colors.primary_green, fontSize: 18 }}>
          FastQadha
        </Text>
        <Image
          style={{
            flex: 1,
            height: 60,
            width: 60,
            resizeMode: "center",
          }}
          source={require("../Assets/Images/lamp.png")}
        />
        <TouchableOpacity
          onPress={() => {
            setFastEditModal(true);
          }}
        >
          <Text style={{ color: Colors.grey, fontSize: 16 }}>{number}</Text>
        </TouchableOpacity>
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

export default FastSettingsUpdate;
