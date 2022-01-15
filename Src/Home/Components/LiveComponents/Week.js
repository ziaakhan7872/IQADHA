import React, { useEffect, useState } from "react";
import { View, Dimensions, StyleSheet, ScrollView } from "react-native";
import { useTheme } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { LineChart } from "react-native-chart-kit";
import { ResponsiveText } from "../../../Components";
import axios from "axios";

const windowHeight = Dimensions.get("window").height;

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import config from "../../../../config.json";

export default function Week({ navigation }) {
  const colors = useTheme().colors;

  const userdata = useSelector((state) => state.user);
  const [grapghData, setgrapghData] = useState([]);

  const [LoadingBarModel, setLoadingBarModel] = useState(false);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      handleGetData();
    });

    return unsubscribe;
  }, [navigation]);
  const handleThisWeek = () => {
    let date = new Date();
    let findDate = date.getDate();
    if (findDate <= 7) {
      return grapghData[0];
    } else if (findDate >= 8 && findDate <= 14) {
      return grapghData[1];
    } else if (findDate >= 15 && findDate <= 22) {
      return grapghData[2];
    } else {
      return grapghData[0];
    }
  };
  const handleLastWeek = () => {
    let date = new Date();
    let findDate = date.getDate();
    if (findDate <= 7) {
      return grapghData[0];
    } else if (findDate >= 8 && findDate <= 14) {
      return grapghData[0];
    } else if (findDate >= 15 && findDate <= 22) {
      return grapghData[1];
    } else {
      return grapghData[2];
    }
  };

  const handleGetData = () => {
    axios
      .post(
        config.base_url + "users/activityLogDetails",
        {
          yearToPerformLookup: [2021],
          monthsToPerformLookup: [8],
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
          let data = response.data;

          processResponse(data);
        },

        (error) => {
          console.log("error====>", error);
          setLoadingBarModel(false);
        }
      )
      .catch((error) => {
        console.error("goal /exercise data", error);
        setLoadingBarModel(false);
      });
  };

  const processResponse = (data) => {
    let dataArray = [0, 0, 0, 0];
    data.filter((e) => {
      let dbDate = new Date(e.activityDate);
      if (dbDate.getDate() <= 7) {
        dataArray[0] = Number(dataArray[0]) + e.count;
      } else if (dbDate.getDate() >= 8 && dbDate.getDate() <= 14) {
        dataArray[1] = Number(dataArray[1]) + e.count;
      } else if (dbDate.getDate() >= 15 && dbDate.getDate() <= 22) {
        dataArray[2] = Number(dataArray[2]) + e.count;
      } else if (dbDate.getDate() >= 23 && dbDate.getDate() <= 29) {
        dataArray[3] = Number(dataArray[3]) + e.count;
      }
    });
    setgrapghData([...dataArray]);
  };

  const data = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        data: grapghData.length > 0 ? grapghData : [0, 0, 0, 0],
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: colors.background,
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: colors.background,
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(200, 200, 200, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(189, 189, 189, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    linejoinType: "round",
    barColors: "#EEF0FA",
    useShadowColorFromDataset: false,
    decimalPlaces: 0,
    fillShadowGradient: "#EEF0FA",
    fillShadowGradientOpacity: 1,
    propsForDots: {
      r: "6",
      strokeWidth: "1",
      stroke: "#6478D3",
    },
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <LineChart
        data={data}
        style={{
          backgroundColor: colors.background,
          height: windowHeight * 0.6,
        }}
        showsHorizontalScrollIndicator={true}
        withHorizontalLabels={true}
        withInnerLines={true}
        withVerticalLabels={true}
        width={wp(100)}
        height={windowHeight * 0.6}
        yLabelsOffset={10}
        xLabelsOffset={0}
        chartConfig={chartConfig}
        showBarTops={false}
      />
      <View
        style={[styles.mainContainer, { backgroundColor: colors.background }]}
      >
        <View
          style={{
            flexDirection: "column",
            height: 150,
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignSelf: "center" }}>
            <View style={styles.view1} />
            <ResponsiveText style={[styles.name, { color: colors.textColor }]}>
              Last Week
            </ResponsiveText>
          </View>

          <View style={{ flexDirection: "row", alignSelf: "center" }}>
            <View style={styles.view2} />
            <ResponsiveText style={[styles.name, { color: colors.textColor }]}>
              This Week
            </ResponsiveText>
          </View>
          <View style={{ flexDirection: "row", alignSelf: "center" }}>
            <View style={styles.view3} />
            <ResponsiveText style={[styles.name, { color: colors.textColor }]}>
              Change
            </ResponsiveText>
          </View>
        </View>
        <View style={styles.verticleLine} />
        <View
          style={{
            flexDirection: "column",
            height: 150,
            justifyContent: "space-between",
          }}
        >
          <View style={{ height: "30%", alignSelf: "center" }}>
            <ResponsiveText
              style={[styles.totalCount, { color: colors.textColor }]}
            >
              {handleLastWeek()}
            </ResponsiveText>
            <ResponsiveText style={(styles.name, { color: colors.textColor })}>
              Total Prayed
            </ResponsiveText>
          </View>
          <View style={{ height: "30%", alignSelf: "center" }}>
            <ResponsiveText
              style={(styles.totalCount, { color: colors.textColor })}
            >
              {handleThisWeek()}
            </ResponsiveText>
            <ResponsiveText style={(styles.name, { color: colors.textColor })}>
              Total Prayed
            </ResponsiveText>
          </View>

          <View style={{ height: "20%", alignSelf: "center" }}>
            <ResponsiveText
              style={(styles.totalCount, { color: colors.textColor })}
            >
              {Math.abs(handleThisWeek() - handleLastWeek())}
              {/* {thisWeek == 0 ? lastWeek : thisWeek - lastWeek} */}
            </ResponsiveText>
            <ResponsiveText style={(styles.name, { color: colors.textColor })}>
              Comparison
            </ResponsiveText>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingVertical: 40,
    paddingTop: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 20,
    elevation: 5,
    borderColor: "#000",
    borderRadius: 10,
    width: "90%",
    alignSelf: "center",
  },
  name: {
    fontSize: 4,
    color: "#000",
    width: 75,
  },
  verticleLine: {
    height: "100%",
    width: 1,
    backgroundColor: "#F1F3F8",
  },
  totalCount: {
    fontSize: 4,
    color: "#000",
    fontWeight: "bold",
  },
  view1: {
    backgroundColor: "#F7B579",
    width: 10,
    height: 10,
    alignSelf: "center",
    marginRight: 5,
    borderRadius: 10,
  },
  view2: {
    backgroundColor: "#6478D3",
    width: 10,
    height: 10,
    alignSelf: "center",
    marginRight: 5,
    borderRadius: 10,
  },
  view3: {
    backgroundColor: "#CDCDD7",
    width: 10,
    height: 10,
    alignSelf: "center",
    marginRight: 5,
    borderRadius: 10,
  },
});
