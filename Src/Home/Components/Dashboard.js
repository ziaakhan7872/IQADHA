import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import I18n from "../../i18";
import Colors from "../../Constants/Colors";

import moment from "moment";
import config from "../../../config.json";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { useSelector } from "react-redux";
import axios from "axios";
import { useTheme } from "@react-navigation/native";

const Dashboard = ({ navigation, route, index }) => {
  const userdata = useSelector((state) => state.user);
  const { colors } = useTheme();

  let totalQadah = 0;
  const images = [
    {
      id: "0",
      image: require("../../Assets/Images/Ishaa.png"),
    },
    {
      id: "1",
      image: require("../../Assets/Images/fajar.png"),
    },
    {
      id: "2",
      image: require("../../Assets/Images/Dhuhr.png"),
    },
    {
      id: "3",
      image: require("../../Assets/Images/Asr.png"),
    },
    {
      id: "4",
      image: require("../../Assets/Images/Maghrib.png"),
    },
    {
      id: "5",
      image: require("../../Assets/Images/Ishaa.png"),
    },
    {
      id: "6",
      image: require("../../Assets/Images/Witr.png"),
    },
  ];
  const [DastBoardData, setDashboardData] = useState({
    totalQadhaRemaining: 0,
    totalQadhaDonePercentage: 0,
    totalPrayers: 0,
    completedPrayers: 0,
    FRemaining: 0,
    FPercentageDone: 0,
    ZRemaining: 0,
    ZPercentageDone: 0,
    ARemaining: 0,
    APercentageDone: 0,
    MRemaining: 0,
    MPercentageDone: 0,
    IRemaining: 0,
    IPercentageDone: 0,
    WRemaining: 0,
    WPercentageDone: 0,
  });

  const [findYears, setfindYears] = useState("");
  const [findMonth, setfindMonth] = useState("");
  const [findDays, setFindDays] = useState("");
  const [Eachdaypraycounter, setEachdaypraycounter] = useState(5);
  useEffect(() => {
    loadInitialData();
  }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // do something
      loadInitialData();
    });

    return unsubscribe;
  }, [navigation]);
  const calculateEachDayPrayer = (eachpray) => {
    const totalDays = DastBoardData.totalQadhaRemaining / eachpray;
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
  };
  const loadInitialData = () => {
    axios
      .post(
        config.base_url + "users/dashboard",
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
          let totalPrayers = 0;
          response.data.pendingQadha.map(
            (x) => (totalPrayers = totalPrayers + x.totalQadha)
          );
          let totalCount = 0;
          response.data.pendingQadha.map(
            (x) => (totalCount = totalCount + x.count)
          );

          let totalPrayed = totalPrayers - totalCount;

          let donePercentageTotal = (totalPrayed / totalPrayers) * 100;

          const totalDays = (totalPrayers - totalPrayed) / 5;
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
          setDashboardData({
            totalQadhaRemaining: totalPrayers - totalPrayed,
            totalQadhaDonePercentage: donePercentageTotal,
            totalPrayers: totalPrayers,
            completedPrayers: totalPrayed,
            FRemaining: response.data.pendingQadha[0].count,
            FPercentageDone:
              ((response.data.pendingQadha[0].totalQadha -
                response.data.pendingQadha[0].count) /
                response.data.pendingQadha[0].totalQadha) *
              100,
            ZRemaining: response.data.pendingQadha[1].count,
            ZPercentageDone:
              ((response.data.pendingQadha[1].totalQadha -
                response.data.pendingQadha[1].count) /
                response.data.pendingQadha[1].totalQadha) *
              100,
            ARemaining: response.data.pendingQadha[2].count,
            APercentageDone:
              ((response.data.pendingQadha[2].totalQadha -
                response.data.pendingQadha[2].count) /
                response.data.pendingQadha[2].totalQadha) *
              100,
            MRemaining: response.data.pendingQadha[3].count,
            MPercentageDone:
              ((response.data.pendingQadha[3].totalQadha -
                response.data.pendingQadha[3].count) /
                response.data.pendingQadha[3].totalQadha) *
              100,
            IRemaining: response.data.pendingQadha[4].count,
            IPercentageDone:
              ((response.data.pendingQadha[4].totalQadha -
                response.data.pendingQadha[4].count) /
                response.data.pendingQadha[4].totalQadha) *
              100,
            WRemaining: response.data.pendingQadha[5].count,
            WPercentageDone:
              ((response.data.pendingQadha[5].totalQadha -
                response.data.pendingQadha[5].count) /
                response.data.pendingQadha[5].totalQadha) *
              100,
          });
        },
        (error) => {
          console.log(error.response);
        }
      )
      .catch((error) => {});
  };
  const circularView = (
    size,
    width,
    fontSize,
    fontsize2,
    namazName,
    totalCount,
    color,
    index,
    fill
  ) => {
    return (
      <AnimatedCircularProgress
        rotation={0}
        size={size}
        width={width}
        fill={fill}
        duration={100}
        tintColor={color}
        onAnimationComplete={() => console.log("onAnimationComplete")}
        backgroundColor="#f1f3f8"
      >
        {(fill) => (
          <View
            style={{
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
                tintColor: index == 0 ? Colors.primary_green : color,
              }}
              source={images[index].image}
            />
            <Text
              style={{
                textAlign: "center",
                color: colors.textColor,
                fontSize: fontSize,
                fontWeight: "bold",
              }}
            >
              {totalCount}
            </Text>
            <Text
              style={{
                textAlign: "center",
                color: index == 0 ? colors.textColor : Colors.grey,
                fontSize: fontsize2,
              }}
            >
              {namazName}
            </Text>
            <Text
              style={{
                textAlign: "center",
                color: index == 0 ? colors.textColor : Colors.grey,
                fontSize: fontsize2,
              }}
            >
              Prayers
            </Text>
            {index == 0 &&
            isNaN(DastBoardData.totalQadhaDonePercentage) == false ? (
              <Text style={{ color: Colors.primary_green }}>
                {Math.round(DastBoardData.totalQadhaDonePercentage)}%
              </Text>
            ) : null}
          </View>
        )}
      </AnimatedCircularProgress>
    );
  };
  console.log("okay", DastBoardData);
  return (
    <ScrollView
      style={[Style.MainView, { backgroundColor: colors.background }]}
    >
      <Text style={[Style.DashboardText, { color: colors.textColor }]}>
        {I18n.t("Dashboard")}
      </Text>
      <View
        style={{
          alignItems: "center",
          padding: 10,
        }}
      >
        {circularView(
          150,
          15,
          20,
          14,
          "Total Qadha",
          DastBoardData.totalQadhaRemaining,
          "#6478d3",
          0,
          DastBoardData.totalQadhaDonePercentage
        )}
      </View>
      <View style={{ flexDirection: "row", padding: 20 }}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              color: colors.purpleWhite,
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            {DastBoardData.totalPrayers}
          </Text>
          <Text
            style={{
              color: colors.subHeading,
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            Total Prayers
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              textAlign: "right",
              color: Colors.primary_green,
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            {Number(DastBoardData.totalPrayers) -
              Number(DastBoardData.totalQadhaRemaining)}
          </Text>
          <Text
            style={{
              textAlign: "right",
              color: colors.subHeading,
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            Completed Prayers
          </Text>
        </View>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 100,
              height: 100,

              justifyContent: "center",

              alignItems: "center",
            }}
          >
            {circularView(
              90,
              10,
              12,
              10,
              "Fajar",
              DastBoardData.FRemaining,
              "#fae86d",
              1,
              Math.round(DastBoardData.FPercentageDone)
            )}
          </View>
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <View
            style={{
              width: 100,
              height: 100,
              justifyContent: "center",

              alignItems: "center",
            }}
          >
            {circularView(
              90,
              10,
              12,
              10,
              "Zuhr",
              DastBoardData.ZRemaining,
              "#fae86d",
              2,
              Math.round(DastBoardData.ZPercentageDone)
            )}
          </View>
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <View
            style={{
              width: 100,
              height: 100,
              justifyContent: "center",

              alignItems: "center",
            }}
          >
            {circularView(
              90,
              10,
              12,
              10,
              "Asar",
              DastBoardData.ARemaining,
              "#f9d66c",
              3,
              Math.round(DastBoardData.APercentageDone)
            )}
          </View>
        </View>
      </View>

      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <View style={{ width: 100, height: 100 }}>
            {circularView(
              90,
              10,
              12,
              10,
              "Maghrib",
              DastBoardData.MRemaining,
              "#f9b76c",
              4,
              Math.round(DastBoardData.MPercentageDone)
            )}
          </View>
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <View style={{ width: 100, height: 100 }}>
            {circularView(
              90,
              10,
              12,
              10,
              "Isha",
              DastBoardData.IRemaining,
              "#6a549d",
              5,
              Math.round(DastBoardData.IPercentageDone)
            )}
          </View>
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <View style={{ width: 100, height: 100 }}>
            {circularView(
              90,
              10,
              12,
              10,
              "Witr",
              DastBoardData.WRemaining,
              "#6a549d",
              6,
              Math.round(DastBoardData.WPercentageDone)
            )}
          </View>
        </View>
      </View>
      <View
        style={{
          backgroundColor: colors.background,

          margin: 10,
          elevation: 5,
          borderRadius: 10,
          padding: 10,
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            color: colors.textColor,
            fontSize: 18,
          }}
        >
          Prayer Calculator
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Text style={{ flex: 0.5, color: colors.textColor }}>
            If you Pray
          </Text>
          <View
            style={{
              flex: 0.75,
              padding: 10,
              flexDirection: "row",
              borderColor: colors.subHeading,
              borderWidth: 1,
              borderRadius: 5,
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setEachdaypraycounter(Eachdaypraycounter - 1);
                calculateEachDayPrayer(Eachdaypraycounter - 1);
              }}
              style={{ flex: 1, alignItems: "center" }}
            >
              <Image
                style={{
                  flex: 1,
                  resizeMode: "contain",
                  tintColor: colors.dashbordCounter,
                  width: 15,
                  height: 15,
                }}
                source={require("../../Assets/Images/minus.png")}
              />
            </TouchableOpacity>
            <Text
              style={{
                color: Colors.grey,
                flex: 1,
                textAlign: "center",
                color: colors.textColor,
              }}
            >
              {Math.max(0, Eachdaypraycounter - 0)}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setEachdaypraycounter(Eachdaypraycounter + 1);
                calculateEachDayPrayer(Eachdaypraycounter + 1);
              }}
              style={{ flex: 1, alignItems: "center" }}
            >
              <Image
                style={{
                  flex: 1,
                  height: 15,
                  width: 15,
                  tintColor: colors.dashbordCounter,
                  resizeMode: "contain",
                }}
                source={require("../../Assets/Images/plus.png")}
              />
            </TouchableOpacity>
          </View>
          <Text
            style={{ flex: 0.5, textAlign: "right", color: colors.textColor }}
          >
            Per Day
          </Text>
        </View>
        <Text
          style={{
            textAlign: "center",
            paddingTop: 15,
            paddingBottom: 15,
            color: colors.textColor,
          }}
        >
          {" "}
          {I18n.t("If you pray each Qadha once everyday")}
        </Text>
        <Text style={{ textAlign: "center" }}>
          <Text style={Style.remainingText}>{findYears} </Text>
          <Text style={{ color: "grey" }}>years </Text>
          <Text style={Style.remainingText}>{findMonth} </Text>
          <Text style={{ color: "grey" }}>Months </Text>
          <Text style={Style.remainingText}>{Math.max(0, findDays - 1)} </Text>
          <Text style={{ color: "grey" }}>Days </Text>
        </Text>
      </View>
    </ScrollView>
  );
};

const Style = StyleSheet.create({
  MainView: {
    flex: 1,
  },
  DashboardText: {
    fontSize: 20,

    textAlign: "center",
    fontWeight: "bold",
    padding: 20,
  },
  remainingText: {
    fontSize: 25,
    color: Colors.primary_green,
  },
});

export default Dashboard;
