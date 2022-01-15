import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

import { useSelector } from "react-redux";
import { useTheme } from "@react-navigation/native";
import axios from "axios";
import I18n from "../../i18";
import ResponsiveText from "../../Components/ResponsiveText";
import config from '../../../config.json';

const FastQadha = ({ navigation, index }) => {
  const { colors } = useTheme();
  const [LoadingBarModel, setLoadingBarModel] = useState(false);
  const [FastModal, setFastModal] = useState(false);
  const [FastSettingsModal, setFastSettingsModal] = useState(false);
  const userdata = useSelector((state) => state.user);
  const [data, setdata] = useState([]);
  useEffect(() => {
    loadqadahfast();
  }, []);
  const loadqadahfast = () => {
    setLoadingBarModel(true);

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
          if (response.data.data[0].count == 0) {
            setFastSettingsModal(true);
          }
          setdata(response.data.data[0].count);
          setLoadingBarModel(false);
        },
        (error) => {
          console.log(error);
        }
      )
      .catch((error) => {
        console.error("goal /exercise data", error);
      });
  };

  const callback = (count) => {
    setFastSettingsModal(false);
  };
  const callback2 = (count, fastcounter) => {
    console.log(fastcounter);
    updateQadahFasts(fastcounter);
    setFastModal(false);
  };
  console.log(data);
  const updateQadahFasts = (fastcounter) => {
    var date = new Date();
    axios
      .put(
        config.base_url+"users/fasts",
        {
          count: data - fastcounter,
          activityDate:
            date.toISOString().split("T")[0] + " " + date.toLocaleTimeString(),
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
          loadqadahfast();
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

  return (
    <View style={Style.flexview}>
      <View style={{ flex: 1 }}>
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
      <View
        style={[Style.textContainer, { backgroundColor: colors.background }]}
      >
        <Text style={[Style.fasting, { color: colors.textColor }]}>
          {" "}
          {I18n.t("Fasting is not being tracked")}
        </Text>
        <Text style={[Style.btnTraking, { color: colors.fastQadahCircle }]}>
          {I18n.t("Tap the button bellow to start traking your fast")}
        </Text>
      </View>
      <View style={[Style.plusIcon, { backgroundColor: colors.background }]}>
        <TouchableOpacity
          onPress={() => navigation.navigate("EditFast")}
          style={[Style.addButton, { borderColor: colors.fastQadahCircle }]}
        >
          <Text style={[Style.addbtnStyle, { color: colors.fastQadahCircle }]}>
            +
          </Text>
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
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "30%",
  },
  textIqadah: {
    alignSelf: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: 6,
  },
  plusIcon: {
    height: "35%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  fasting: {
    width: "70%",
    alignSelf: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  btnTraking: {
    width: "50%",
    fontSize: 16,
  },
  addButton: {
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderStyle: "dashed",
    borderRadius: 100,
  },
  addbtnStyle: {
    fontSize: 30,
  },
});

export default FastQadha;
