import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import axios from "axios";
import { useSelector } from "react-redux";

import config from "../../../../../config.json";
let abc;
const GregorianLogs = ({ setScrollView, scrollView, colors }) => {
  const [shouldShow, setShouldShow] = useState(false);

  const [index1, setIndex1] = useState(null);
  const [YearlyData, setYearlyData] = useState([]);
  const userdata = useSelector((state) => state.user);
  let monthArray = [
    {
      id: 0,
      month: "Jan",
      namazdata: [],
      totalNamaz: 0,
      totalNamazDetail: [],
    },
    {
      id: 1,
      month: "Feb",
      namazdata: [],
      totalNamaz: 0,
      totalNamazDetail: [],
    },
    {
      id: 2,
      month: "Mar",
      namazdata: [],
      totalNamaz: 0,
      totalNamazDetail: [],
    },
    {
      id: 3,
      month: "Apr",
      namazdata: [],
      totalNamaz: 0,
      totalNamazDetail: [],
    },
    {
      id: 4,
      month: "May",
      namazdata: [],
      totalNamaz: 0,
      totalNamazDetail: [],
    },
    {
      id: 5,
      month: "June",
      namazdata: [],
      totalNamaz: 0,
      totalNamazDetail: [],
    },
    {
      id: 6,
      month: "July",
      namazdata: [],
      totalNamaz: 0,
      totalNamazDetail: [],
    },
    {
      id: 7,
      month: "Aug",
      namazdata: [],
      totalNamaz: 0,
      totalNamazDetail: [],
    },
    {
      id: 8,
      month: "Sep",
      namazdata: [],
      totalNamaz: 0,
      totalNamazDetail: [],
    },
    {
      id: 9,
      month: "Oct",
      namazdata: [],
      totalNamaz: 0,
      totalNamazDetail: [],
    },
    {
      id: 10,
      month: "Nov",
      namazdata: [],
      totalNamaz: 0,
      totalNamazDetail: [],
    },
    {
      id: 11,
      month: "Dec",
      namazdata: [],
      totalNamaz: 0,
      totalNamazDetail: [],
    },
  ];

  useEffect(() => {
    loadInitialData(2021);
  }, []);

  const loadInitialData = (year) => {
    let body;

    body = {
      yearToPerformLookup: year,
      monthsToPerformLookup: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    };

    axios
      .post(
        config.base_url + "users/activityLogDetails",

        body,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userdata.user.token}`,
          },
        }
      )
      .then(
        (response) => {
          processResponse(response);
        },
        (error) => {
          console.log("error====>", error);
        }
      )
      .catch((error) => {
        console.error("goal /exercise data", error);
      });
  };

  const processResponse = async (response) => {
    monthArray.map((data, index) => {
      const monthData = extractMonthData(index, response);

      if (monthData.length > 0) {
        monthArray[index].namazdata = monthData;
        const namazTotal = monthData.reduce(sum);
        const namazNames = getNamazNamesFromData(monthData);
        namazNames.map((namazName) => {
          const namazData = extractNamazByName(namazName, monthData);
          if (namazData.length > 0) {
            const sumDataNamaz = calculateTotals(namazData);
            monthArray[index].totalNamazDetail.push({
              prayer: { name: namazName },
              count: sumDataNamaz,
            });
          }
        });
        monthArray[index].totalNamaz = namazTotal;
      }
    });
    setYearlyData([...monthArray]);
  };

  const extractMonthData = (monthNo, response) => {
    return response.data.filter((data) => {
      let month = new Date(data.activityDate).getMonth();
      if (month === monthNo) {
        return true;
      }
    });
  };

  const parseDataForMonthlyView = (year, data) => {
    const monthlyView = [];
    var daysInMonth = new Date(year, data.id, 0).getDate();
    const days = Array.from(Array(daysInMonth).keys());
    days.map((date, index) => {
      if (data.namazdata) {
        const dateData = extractNamazByDate(date, data.namazdata);
        monthlyView.push({ date: date, namazData: [] });
        const namazNames = getNamazNamesFromData(dateData);
        namazNames.map((namazName) => {
          const namazData = extractNamazByName(namazName, dateData);
          if (namazData.length > 0) {
            const sumDataNamaz = calculateTotals(namazData);
            monthlyView[index].namazData.push({
              prayer: { name: namazName },
              count: sumDataNamaz,
            });
          }
        });
      }
    });
    return monthlyView;
  };

  const getNamazNamesFromData = (data) => {
    return [...new Set(data.map((element) => element.prayer.name))];
  };

  const calculateTotals = (data) => {
    if (data.length > 1) {
      return data.reduce(sum);
    }
    return data[0] ? data[0].count : 0;
  };

  const sum = (total, num) => {
    if (total.count) {
      return total.count + num.count;
    }
    return total + num.count;
  };

  const extractNamazByDate = (dateDay, data) => {
    return data.filter((namazData) => {
      const date = new Date(namazData.activityDate);
      if (date.getDate() - 1 === dateDay) {
        return true;
      }
    });
  };

  const extractNamazByName = (name, data) => {
    return data.filter((namazdata) => {
      if (name === namazdata.prayer.name) {
        return true;
      }
    });
  };

  const renderItem = ({ item, index }) => {
    return (
      <View>
        <View>
          <View
            style={[
              styles.mainContainer,
              { backgroundColor: colors.background },
            ]}
          >
            <TouchableOpacity
              onPress={() => {
                abc = parseDataForMonthlyView(2021, item);

                setShouldShow(!shouldShow),
                  setIndex1(index),
                  setScrollView(!scrollView);
              }}
            >
              <View style={styles.cardview}>
                {index == 0 ? (
                  <View
                    style={[
                      styles.cardview,
                      { flexDirection: "row", paddingBottom: 10 },
                    ]}
                  >
                    <View></View>
                    <View>
                      <Image
                        source={require("../../../../Assets/Images/fajar.png")}
                        style={styles.iconStyle}
                      />
                    </View>

                    <View>
                      <Image
                        source={require("../../../../Assets/Images/Dhuhr.png")}
                        style={styles.iconStyle}
                      />
                    </View>
                    <View>
                      <Image
                        source={require("../../../../Assets/Images/Asr.png")}
                        style={styles.iconStyle}
                      />
                    </View>
                    <View>
                      <Image
                        source={require("../../../../Assets/Images/Maghrib.png")}
                        style={styles.iconStyle}
                      />
                    </View>
                    <View>
                      <Image
                        source={require("../../../../Assets/Images/Ishaa.png")}
                        style={[styles.iconStyle, { tintColor: "#6A549D" }]}
                      />
                    </View>
                    <View>
                      <Image
                        source={require("../../../../Assets/Images/Witr.png")}
                        style={[styles.iconStyle, { tintColor: "#6A549D" }]}
                      />
                    </View>
                  </View>
                ) : null}
                <View style={[styles.cardview, { flexDirection: "row" }]}>
                  <View>
                    <Text
                      style={[styles.monthsName, { color: colors.textColor }]}
                    >
                      {monthArray[index].month}
                    </Text>
                    <Text style={styles.number}>{item.totalNamaz}</Text>
                  </View>

                  <View>
                    <Text style={[styles.text, { color: colors.textColor }]}>
                      Fajr
                    </Text>
                    <Text style={[styles.text, { color: colors.textColor }]}>
                      {extractNamazByName("Fajr", item.totalNamazDetail)
                        .length > 0
                        ? extractNamazByName(
                            "Fajr",
                            item.totalNamazDetail
                          ).pop().count
                        : 0}
                    </Text>
                  </View>
                  <View>
                    <Text style={[styles.text, { color: colors.textColor }]}>
                      Zuhr
                    </Text>
                    <Text style={[styles.text, { color: colors.textColor }]}>
                      {extractNamazByName("Dhuhr", item.totalNamazDetail)
                        .length > 0
                        ? extractNamazByName(
                            "Dhuhr",
                            item.totalNamazDetail
                          ).pop().count
                        : 0}
                    </Text>
                  </View>
                  <View>
                    <Text style={[styles.text, { color: colors.textColor }]}>
                      Asr
                    </Text>
                    <Text style={[styles.text, { color: colors.textColor }]}>
                      {extractNamazByName("Asr", item.totalNamazDetail).length >
                      0
                        ? extractNamazByName("Asr", item.totalNamazDetail).pop()
                            .count
                        : 0}
                    </Text>
                  </View>
                  <View>
                    <Text style={[styles.text, { color: colors.textColor }]}>
                      Maghrib
                    </Text>
                    <Text style={[styles.text, { color: colors.textColor }]}>
                      {extractNamazByName("Maghrib", item.totalNamazDetail)
                        .length > 0
                        ? extractNamazByName(
                            "Maghrib",
                            item.totalNamazDetail
                          ).pop().count
                        : 0}
                    </Text>
                  </View>
                  <View>
                    <Text style={[styles.text, { color: colors.textColor }]}>
                      Isha
                    </Text>
                    <Text style={[styles.text, { color: colors.textColor }]}>
                      {extractNamazByName("Ishaa", item.totalNamazDetail)
                        .length > 0
                        ? extractNamazByName(
                            "Ishaa",
                            item.totalNamazDetail
                          ).pop().count
                        : 0}
                    </Text>
                  </View>
                  <View>
                    <Text style={[styles.text, { color: colors.textColor }]}>
                      Witr
                    </Text>
                    <Text style={[styles.text, { color: colors.textColor }]}>
                      {extractNamazByName("Witr", item.totalNamazDetail)
                        .length > 0
                        ? extractNamazByName(
                            "Witr",
                            item.totalNamazDetail
                          ).pop().count
                        : 0}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          {shouldShow && index == index1 ? (
            <View style={styles.openCard}>
              <TouchableOpacity style={styles.arrowUp}>
                <Image
                  source={require("../../../../Assets/Images/arrow_up.png")}
                  style={[styles.imageView, { tintColor: colors.textColor }]}
                />
              </TouchableOpacity>
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ height: 100 }}
              >
                {abc.map((item, index) => {
                  return (
                    <View style={styles.cardContaniner}>
                      <Text style={{ color: "green" }}>
                        {Number(index) + 1}
                      </Text>
                      <Text style={[styles.text, { color: colors.textColor }]}>
                        {extractNamazByName("Fajr", item.namazData).length > 0
                          ? extractNamazByName("Fajr", item.namazData).pop()
                              .count
                          : 0}
                      </Text>
                      <Text style={[styles.text, { color: colors.textColor }]}>
                        {extractNamazByName("Dhuhr", item.namazData).length > 0
                          ? extractNamazByName("Dhuhr", item.namazData).pop()
                              .count
                          : 0}
                      </Text>
                      <Text style={[styles.text, { color: colors.textColor }]}>
                        {extractNamazByName("Asr", item.namazData).length > 0
                          ? extractNamazByName("Asr", item.namazData).pop()
                              .count
                          : 0}
                      </Text>
                      <Text style={[styles.text, { color: colors.textColor }]}>
                        {extractNamazByName("Maghrib", item.namazData).length >
                        0
                          ? extractNamazByName("Maghrib", item.namazData).pop()
                              .count
                          : 0}
                      </Text>
                      <Text style={[styles.text, { color: colors.textColor }]}>
                        {extractNamazByName("Ishaa", item.namazData).length > 0
                          ? extractNamazByName("Ishaa", item.namazData).pop()
                              .count
                          : 0}
                      </Text>

                      <Text style={[styles.text, { color: colors.textColor }]}>
                        {extractNamazByName("Witr", item.namazData).length > 0
                          ? extractNamazByName("Witr", item.namazData).pop()
                              .count
                          : 0}
                      </Text>
                    </View>
                  );
                })}
              </ScrollView>

              <TouchableOpacity>
                <Image
                  source={require("../../../../Assets/Images/arrow_dn.png")}
                  style={[styles.imageView, { tintColor: colors.textColor }]}
                />
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
        {/* )} */}
      </View>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <FlatList
          data={YearlyData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    borderRadius: 10,

    marginHorizontal: 20,
    paddingHorizontal: 20,
    marginBottom: 10,
    marginTop: 10,
    paddingVertical: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  iconStyle: {
    width: 20,
    height: 20,
    alignSelf: "center",
    resizeMode: "contain",
  },
  summeryText: {
    marginTop: 20,
  },
  cardview: {
    justifyContent: "space-around",
  },
  text: {
    alignSelf: "center",
  },
  monthsName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  number: {
    color: "green",
    alignSelf: "center",
  },
  monthsnamJan: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 20,
  },
  openCard: {
    paddingVertical: 20,

    marginHorizontal: 20,

    marginTop: 10,
    marginBottom: 10,
    flex: 1,
  },
  cardContaniner: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 25,
  },
  scrollView: {
    backgroundColor: "pink",
    marginHorizontal: 20,
  },
  arrowUp: {
    paddingBottom: 10,
  },
  imageView: {
    width: 10,
    height: 10,
    marginLeft: 25,
  },
});
export default GregorianLogs;
