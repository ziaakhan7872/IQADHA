import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { StyleSheet, ScrollView } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import CalendarLogs from "./GraphDetailsComponent/CalendarLogs";
import GregorianHijri from "./GraphDetailsComponent/GregorianHijri";
import GregorialCalendar from "./GraphDetailsComponent/GregorialCalendar";
import HijriCalendar from "./GraphDetailsComponent/HijriCalendar";
import Summary from "./GraphDetailsComponent/Summary";
import GregorianLogs from "./GraphDetailsComponent/GregorianLogs";
import HijriLogs from "./GraphDetailsComponent/HijriLogs";
import { useTheme } from "@react-navigation/native";
import config from '../../../../config.json';

export default function GraphDetails({ navigation }) {
  const colors = useTheme().colors;
  const userdata = useSelector((state) => state.user);
  const [selectedMonthType, setselectedmonthType] = useState("Calendar");
  const [selectedMonth, setselectedmonth] = useState("GREGORIAN");
  const [year, setYear] = useState("");
  const [GCDate, setGCDate] = useState(new Date());
  const [scrollView, setScrollView] = useState(true);
  const [namazData, setNamazData] = useState([]);
  const [monthData, setMonthData] = useState([0]);
  const [activityLogData, setactivityLogData] = useState([]);
  let monthArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  useEffect(() => {
    let todayDate = new Date();
    loadInitialData(GCDate.getMonth() + 1, todayDate.getDate());
  }, []);

  const loadInitialData = (currentMonth, datetoday) => {
    console.log("current data", currentMonth, datetoday);
    let body;
    if (selectedMonthType == "Calendar" && selectedMonth == "GREGORIAN") {
      body = {
        yearToPerformLookup: 2021,
        monthsToPerformLookup: [currentMonth],
      };
    } else if (selectedMonthType == "Logs" && selectedMonth == "GREGORIAN") {
      body = {
        yearToPerformLookup: 2021,
        monthsToPerformLookup: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      };
    } else if (selectedMonthType == "Calendar" && selectedMonth == "HIJRI") {
      body = {
        yearToPerformLookup: 2021,
        monthsToPerformLookup: [currentMonth],
      };
    }

    axios
      .post(
        config.base_url+"users/activityLogDetails",

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
          setactivityLogData(response.data);
          response.data.filter((findMonth) => {
            let months = new Date(findMonth.activityDate);
            {
              monthArray.map((item, index) => {
                if (item == months.getMonth() + 1) {
                  monthData.push(findMonth);
                }
              });
            }
          });
          let namazArray = [];
          const result = response.data.filter((finddate) => {
            let datee = new Date(finddate.activityDate);
            if ("prayer" in finddate) {
              if (datetoday == datee.getDate()) {
                namazArray.push(finddate);
              }
            } else {
              finddate["Fasts"].filter((fastData) => {
                let dateFast = new Date(fastData.activityDate);

                if (datetoday == dateFast.getDate()) {
                  let obj = {
                    activityDate: fastData.activityDate,
                    count: fastData.count,
                    prayer: { name: "Fast" },
                  };
                  namazArray.push(obj);
                }
              });
            }
          });

          setNamazData([...namazArray]);
        },
        (error) => {
          console.log("error====>", error);
        }
      )
      .catch((error) => {
        console.error("goal /exercise data", error);
      });
  };
  const onGeorgianDateChange = (data) => {
    let newDate = new Date(data);

    loadInitialData(newDate.getMonth() + 1, newDate.getDate());
  };
  return (
    <ScrollView scrollEnabled={scrollView}>
      <CalendarLogs
        navigation={navigation}
        selectedMonthType={selectedMonthType}
        setselectedmonthType={setselectedmonthType}
        year={year}
        colors={colors}
      />

      <GregorianHijri
        selectedMonth={selectedMonth}
        setselectedmonth={setselectedmonth}
        colors={colors}
      />

      {selectedMonthType == "Calendar" && selectedMonth == "GREGORIAN" ? (
        <GregorialCalendar
          year={year}
          setYear={setYear}
          setGCDate={setGCDate}
          fnPressButton={onGeorgianDateChange}
          colors={colors}
        />
      ) : selectedMonthType == "Calendar" && selectedMonth == "HIJRI" ? (
        <HijriCalendar
          year={year}
          setYear={setYear}
          colors={colors}
          setGCDate={setGCDate}
          fnPressButton={onGeorgianDateChange}
        />
      ) : selectedMonthType == "Logs" && selectedMonth == "GREGORIAN" ? (
        <GregorianLogs
          setScrollView={setScrollView}
          scrollView={scrollView}
          monthData={monthData}
          colors={colors}
        />
      ) : (
        <HijriLogs
          setScrollView={setScrollView}
          scrollView={scrollView}
          colors={colors}
        />
      )}

      {selectedMonthType == "Calendar" && selectedMonth == "GREGORIAN" ? (
        <Summary namazData={namazData} colors={colors} />
      ) : selectedMonthType == "Calendar" && selectedMonth == "HIJRI" ? (
        <Summary namazData={namazData} colors={colors} />
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  greContainer: {
    marginTop: 10,
    backgroundColor: "#e6e6e6",
    flexDirection: "row",
    borderRadius: 20,
    width: widthPercentageToDP(95),
    alignSelf: "center",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  arrowContainer: {
    marginLeft: 10,
    flexDirection: "row",
    width: 140,
    justifyContent: "space-between",
  },
  leftArrow: {
    width: 20,
    height: 20,
  },
  rightArrow: {
    width: 20,
    height: 20,
  },
  graph: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
});
