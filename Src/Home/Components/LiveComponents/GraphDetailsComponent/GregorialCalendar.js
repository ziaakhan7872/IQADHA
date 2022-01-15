import React, { useState } from "react";
import { View, StyleSheet} from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import { handleMonths } from "../../../../Components/dummyData";

const GregorialCalendar = ({ setYear, year, fnPressButton,colors }) => {
  const [monthMinus, setMonthMinus] = useState("");
  const [monthPlus, setMonthPlus] = useState("");

  const onDateChange = (date, type) => {
    fnPressButton(date);
  };

  const customDayHeaderStyles = ({ year, month }) => {
    setYear(year);

    if (month == 11) {
      var findmonthPlus = handleMonths[Number(0)].value;
      setMonthPlus(findmonthPlus);

      var findmonthMinus = handleMonths[Number(month - 1)].value;
      setMonthMinus(findmonthMinus);
    } else if (month == 0) {
      var findmonthMinus = handleMonths[Number(11)].value;
      setMonthMinus(findmonthMinus);
      var findmonthPlus = handleMonths[Number(month + 1)].value;
      setMonthPlus(findmonthPlus);
    } else {
      var findmonthMinus = handleMonths[Number(month - 1)].value;
      setMonthMinus(findmonthMinus);
      var findmonthPlus = handleMonths[Number(month + 1)].value;
      setMonthPlus(findmonthPlus);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <CalendarPicker
          allowRangeSelection={false}
          startFromMonday={true}
          minDate={new Date(2018, 1, 1)}
          maxDate={new Date(2050, 6, 3)}
          weekdays={["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"]}
          months={[
            "January",
            "Febraury",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ]}
          previousTitle={monthMinus}
          nextTitle={monthPlus}
          todayBackgroundColor="#6478D3"
          todayTextStyle={{ color: colors.textColor }}
          customDayHeaderStyles={customDayHeaderStyles}
          hideDayNames={true}
          scaleFactor={375}
          textStyle={{
            fontFamily: "Cochin",
            color: colors.textColor,
            todayBackgroundColor:'red'
           
          }}
          onDateChange={onDateChange}
        />
      </View>
    </View>
  );
};

export default GregorialCalendar;

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
