import React, { useState } from "react";
import { View, StyleSheet} from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import { arabicMonth } from "../../../../Components/dummyData";

const HijriCalendar = ({ setYear, year, fnPressButton, colors }) => {

  const [monthMinus, setMonthMinus] = useState("");
  const [monthPlus, setMonthPlus] = useState("");

  const onDateChange = (date, type) => {
    console.log("hello", date);
    fnPressButton(date);
  };

  const customDayHeaderStyles = ({ year, month }) => {
    setYear(year);

    if (month == 11) {
      var findmonthPlus = arabicMonth[Number(0)].value;
      setMonthPlus(findmonthPlus);

      var findmonthMinus = arabicMonth[Number(month - 1)].value;
      setMonthMinus(findmonthMinus);
    } else if (month == 0) {
      var findmonthMinus = arabicMonth[Number(11)].value;
      setMonthMinus(findmonthMinus);
      var findmonthPlus = arabicMonth[Number(month + 1)].value;
      setMonthPlus(findmonthPlus);
    } else {
      var findmonthMinus = arabicMonth[Number(month - 1)].value;
      setMonthMinus(findmonthMinus);
      var findmonthPlus = arabicMonth[Number(month + 1)].value;
      setMonthPlus(findmonthPlus);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <CalendarPicker
          startFromMonday={true}
          minDate={new Date(2018, 1, 1)}
          maxDate={new Date(2050, 6, 3)}
          weekdays={["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"]}
          months={[
            "Muharram",
            "Safar",
            "Rabi I",
            "Rabi II",
            "Jumada I",
            "Jumada II",
            "Rajab",
            "Shaaban",
            "Ramadan",
            "Shawwal",
            "Dhu al-Qidah",
            "Dhu al-Hijjah",
          ]}
          previousTitle={monthMinus}
          nextTitle={monthPlus}
          todayBackgroundColor="#6478D3"
          todayTextStyle={{ color: "#fff" }}
          selectedEndDate={14}
          selectedStartDate={12}
          customDayHeaderStyles={customDayHeaderStyles}
          hideDayNames={true}
          scaleFactor={375}
          initialDate={new Date("2021-08-14T07:00:00.000Z")}
          textStyle={{
            fontFamily: "Cochin",
            color: colors.textColor,
          }}
          onDateChange={onDateChange}
        />
      </View>
    </View>
  );
};

export default HijriCalendar;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  textStyle: {
    marginTop: 10,
  },
  titleStyle: {
    textAlign: "center",
    fontSize: 20,
    margin: 20,
  },
});
