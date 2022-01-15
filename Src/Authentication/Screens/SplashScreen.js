import React, { useEffect, useState } from "react";
import { StyleSheet, View, StatusBar, Image } from "react-native";
import { useTheme } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { update_faqs_list, update_fast } from "../../store/actions";
import config from "../../../config.json";
const SplashScreen = ({ navigation }) => {
  const colors = useTheme().colors;
  const themeData = useSelector((state) => state.user.theme);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.user);
  const userdata = useSelector((state) => state.user);
  const [isDayTime, setisDayTime] = useState(
    themeData == undefined || themeData == "light" ? false : true
  );
  console.log("ttt", themeData);
  // if (themeData == undefined) {
  //   console.log("nnot set", themeData);
  // } else {
  //   console.log("Set", themeData);
  // }
  console.log("isdat", isDayTime);
  const loadfastData = () => {
    axios
      .post(
        config.base_url + "users/fasts",
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
          dispatch(update_fast(response.data.data[0].totalFastCount));
        },
        (error) => {
          console.log(error);
        }
      )
      .catch((error) => {
        console.error("goal /exercise data", error);
      });
  };
  useEffect(() => {
    loadFaqdata();
    // const hours = new Date().getHours();
    // const DayTime = hours > 6 && hours < 20;
    // setisDayTime(DayTime);

    if (userdata.user.length == 0) {
      setTimeout(() => {
        navigation.navigate("Language");
      }, 4000);
    } else {
      setTimeout(() => {
        loadfastData();
        navigation.navigate("Tabs");
      }, 4000);
    }
  }, []);
  const loadFaqdata = () => {
    axios
      .get(config.base_url + "faq/Faq.json")
      .then(
        (response) => {
          const statusCode = response.status;
          if (statusCode == 200) {
            let data = [];
            for (
              let i = 0;
              i <
              response.data.language.english.pageContent.faq.questionnaire
                .length -
                1;
              i++
            ) {
              data.push(
                response.data.language.english.pageContent.faq.questionnaire[
                  i + 1
                ]
              );
            }
            console.log(data.length);
            dispatch(update_faqs_list(data));
          }
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
    <View style={{ flex: 1 }}>
      <StatusBar hidden />
      {isDayTime == false ? (
        <View style={[styles.backgroundLight, { backgroundColor: "#5CB390" }]}>
          <Image
            source={require("../../Assets/Images/logo.png")}
            style={{
              width: 100,
              height: 100,
              tintColor: "#fff",
              resizeMode: "contain",
            }}
          />
        </View>
      ) : (
        <View style={[styles.backgroundDark, { backgroundColor: "#42346E" }]}>
          <Image
            source={require("../../Assets/Images/logo.png")}
            style={{
              width: 100,
              height: 100,
              tintColor: "#fff",
              resizeMode: "contain",
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  texttype: {
    width: "100%",
    height: "100%",
  },
  backgroundLight: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundDark: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SplashScreen;
