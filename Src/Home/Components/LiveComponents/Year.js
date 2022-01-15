import React, { useState } from "react";
import axios from "axios";
import { View, StyleSheet, ScrollView } from "react-native";
import { useTheme } from "@react-navigation/native";

import { LineChart } from "react-native-chart-kit";
import { ResponsiveText } from "../../../Components";
import { useSelector } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import config from '../../../../config.json';
import { Dimensions } from 'react-native';
const windowHeight = Dimensions.get('window').height;

export default function Month({navigation}) {
  const userdata = useSelector((state) => state.user);
  const [monthhlyData, setmonthhlyData] = useState([0]);
  const [monthhlyCount, setmonthhlyCount] = useState([0]);
  const [thisYear, setThisYear] = useState(0);
  const [lastYear, setLastYear] = useState(0);
  let monthData = [2020, 2021, 2022];
  const colors = useTheme().colors;


  const handleGetData = () =>
  {
     axios
      .post(
        config.base_url+"users/activityLogDetails",
        {
          yearToPerformLookup: [2020, 2021],
        },
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
          setLastYear(response.data[0]?response.data[0].total_count:null);
          let respons = response.data;
          {
            respons.map((month, index) => {
              monthhlyCount.push(month.total_count);
            });
          }

          {
            monthData.map((item, index) => {
              const result = respons.filter((e) => {
                if (e.year == item) {
                  return e.total_count;
                }
              });

              if (result.length > 0) {
                monthhlyData.push(Number(result[0].total_count));
              } else {
                monthhlyData.push(0);
              }
              setmonthhlyData([...monthhlyData]);
            });
          }
        },
        (error) => {
          console.log("error====>", error);
        }
      )
      .catch((error) => {
        console.error("goal /exercise data", error);
      });
  }

  React.useEffect(() =>
  {
        handleGetData();
        handleThisYear();
        const unsubscribe = navigation.addListener("focus", () => {
           
    });

    return unsubscribe;
      }, [navigation]);
  
  const handleThisYear = () => {
    let sum = 0;
    monthhlyCount.map((item, index) => {
      sum = sum + parseInt(item);
      setThisYear(sum);
    });
  };
  const data = {
    labels: [2020, 2021, 2022],
    datasets: [
      {
        data: monthhlyData,
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
        style={{ backgroundColor: colors.background,height:windowHeight*0.6 }}
        showsHorizontalScrollIndicator={true}
        withHorizontalLabels={true}
        withInnerLines={true}
        withVerticalLabels={true}
        width={wp(100)}
        height={windowHeight*0.6}
        yLabelsOffset={10}
        xLabelsOffset={5}
        chartConfig={chartConfig}
        showBarTops={false}
      />
      <View style={[styles.mainContainer,{backgroundColor:colors.background}]}>
        <View
          style={{
            flexDirection: "column",
            height:150,
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignSelf: "center" }}>
            <View style={styles.view1} />
            <ResponsiveText style={[styles.name, { color: colors.textColor }]}>
              Last Year
            </ResponsiveText>
          </View>

          <View style={{ flexDirection: "row", alignSelf: "center" }}>
            <View style={styles.view2} />
            <ResponsiveText style={[styles.name, { color: colors.textColor }]}>
              This Year
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
              {lastYear}
            </ResponsiveText>
            <ResponsiveText style={(styles.name, { color: colors.textColor })}>
              Total Prayed
            </ResponsiveText>
          </View>
          <View style={{ height: "30%", alignSelf: "center" }}>
            <ResponsiveText
              style={(styles.totalCount, { color: colors.textColor })}
            >
              {thisYear}
            </ResponsiveText>
            <ResponsiveText style={(styles.name, { color: colors.textColor })}>
              Total Prayed
            </ResponsiveText>
          </View>

          <View style={{ height: "20%", alignSelf: "center" }}>
            <ResponsiveText
              style={(styles.totalCount, { color: colors.textColor })}
            >
              {thisYear==0?lastYear:thisYear-lastYear}
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
    height:windowHeight*0.3,
    paddingVertical: 40,
    paddingTop: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
    elevation: 1,
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
