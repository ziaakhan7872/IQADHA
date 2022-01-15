import React, { useEffect, useState } from "react";
import
{
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Pressable,
} from "react-native";
import config from '../../../config.json';

import axios from "axios";
import I18n from "../../i18";
import DatePicker from "react-native-date-picker";
import Colors from "../../Constants/Colors";
import BottomSheet from "reanimated-bottom-sheet";
import { ResponsiveText } from "../../Components";
import { Checkbox } from "react-native-paper";
import { Dropdown } from "react-native-material-dropdown";
import { date, year, arabicMonth } from "../../Components/dummyData";
import { useSelector } from "react-redux";
const RegisterStep1 = ({ navigation, route }) =>
{
  const userdata = useSelector((state) => state);
  let fromPageStatus = route.params.yes;
  let fajrC, zuhrC, asarC, maghribC, ishaC, witrC;
  let resetHelp = route.params.resetData?route.params.resetData:null
  console.log('resetHelp===>',resetHelp);

  if (fromPageStatus == "Yes")
  {
    fajrC = route.params.fajrC;
    zuhrC = route.params.zuhrC;
    asarC = route.params.asarC;
    maghribC = route.params.maghribC;
    ishaC = route.params.ishaC;
    witrC = route.params.witrC;
  } else
  {
    fajrC = 0;
    zuhrC = 0;
    asarC = 0;
    maghribC = 0;
    ishaC = 0;
    witrC = 0;
  }
  const [selectedMonthType, setselectedmonthType] = useState("Gregorian");
  const [currentSelected, setcurrentSelected] = useState(false);
  const [data, setData] = useState("");
  const [ageStartedPraying, setageStartedPraying] = useState(13);
  const [haidhhabit, setHaidhhabit] = useState(7);
  const [fromToday, setfromToday] = useState(route.params.fromToday);
  const [DOB, setDOB] = useState(new Date());
  const [BalighDate, setBalighDate] = useState(new Date());
  const [startDate, setstartDate] = useState(new Date());
  const [endDate, setEnddate] = useState(new Date());
  const sheetRef = React.useRef(null);
  const [DOBHijri, setDOBHijri] = useState("14 Muharram , 1442");
  const [BalighHijri, setBalighHijri] = useState("14 Safar , 1439");
  const [startHijri, setStartHijri] = useState("12 Rajab , 1433");
  const [endHijri, setEndHijri] = useState("2 Shawwal , 1430");

  let hijriDate;
  let hijriYear;
  let hijriMonth;

  let balighDate;
  let balighMonth;
  let balighYear;

  let startHijriDatee;
  let startHijriMonth;
  let startHijriYear;

  let endtHijriDatee;
  let endHijriMonth;
  let endHijriYear;

  const changeDate = (e) =>
  {
    if (currentSelected == "balighdate")
    {
      balighDate = e;
    } else if (currentSelected == "startdate")
    {
      startHijriDatee = e;
    } else if (currentSelected == "enddate")
    {
      endtHijriDatee = e;
    } else
    {
      hijriDate = e;
    }
  };
  const changeYear = (y) =>
  {
    if (currentSelected == "balighdate")
    {
      balighYear = y;
    } else if (currentSelected == "startdate")
    {
      startHijriYear = y;
    } else if (currentSelected == "enddate")
    {
      endHijriYear = y;
    } else
    {
      hijriYear = y;
    }
  };
  const changeMonth = (m) =>
  {
    if (currentSelected == "balighdate")
    {
      balighMonth = m;
    } else if (currentSelected == "startdate")
    {
      startHijriMonth = m;
    } else if (currentSelected == "enddate")
    {
      endHijriMonth = m;
    } else
    {
      hijriMonth = m;
    }
  };

  useEffect(() =>
  {
    sheetRef.current.snapTo(1);
  }, []);

  const renderContent = () =>
  {
    if (selectedMonthType == "Gregorian")
    {
      return (
        <View style={Style.mainContainer}>
          <DatePicker
            date={
              currentSelected == "dob"
                ? DOB
                : currentSelected == "balighdate"
                  ? BalighDate
                  : currentSelected == "startdate"
                    ? startDate
                    : currentSelected == "enddate"
                      ? endDate
                      : DOB
            }
            maximumDate={new Date()}
            mode="date"
            onDateChange={(e) =>
            {
              if (currentSelected == "dob")
              {
                setDOB(e);
              } else if (currentSelected == "balighdate")
              {
                setBalighDate(e);
              } else if (currentSelected == "startdate")
              {
                setstartDate(e);
              } else if (currentSelected == "enddate")
              {
                setEnddate(e);
              }
            }}
          />
          <TouchableOpacity
            style={Style.okButton}
            onPress={() => sheetRef.current.snapTo(1)}
          >
            <Text style={{ color: "#fff" }}>OK</Text>
          </TouchableOpacity>
        </View>
      );
    } else
    {
      return (
        <View style={Style.hijriView}>
          <ResponsiveText style={Style.hijriDate}>
            Add Hijri Date
          </ResponsiveText>
          <View
            style={{ flexDirection: "row", justifyContent: "space-evenly" }}
          >
            {selectedMonthType == "Hijri" ? (
              <View style={Style.dropDown}>
                <Dropdown
                  label=""
                  value="Select Date"
                  data={date}
                  inputContainerStyle={{ borderBottomColor: "transparent" }}
                  onChangeText={(e) =>
                  {
                    console.log(`e`, e);
                    changeDate(e);
                  }}
                />
              </View>
            ) : null}
            {selectedMonthType == "Hijri" ? (
              <View style={Style.dropDown}>
                <Dropdown
                  label=""
                  value="Year"
                  data={year}
                  inputContainerStyle={{ borderBottomColor: "transparent" }}
                  onChangeText={(y) =>
                  {
                    changeYear(y);
                  }}
                />
              </View>
            ) : null}
          </View>
          {selectedMonthType == "Hijri" ? (
            <View style={Style.months}>
              <Dropdown
                label=""
                value="Months"
                data={arabicMonth}
                inputContainerStyle={{ borderBottomColor: "transparent" }}
                onChangeText={(m, n) =>
                {
                  console.log(`changeMonth`, m);
                  changeMonth(m);
                }}
              />
            </View>
          ) : null}

          {currentSelected == "balighdate" ? (
            <TouchableOpacity
              style={Style.hijriOk}
              onPress={() =>
              {
                sheetRef.current.snapTo(1);
                if (balighDate && balighMonth && balighYear)
                {
                  setBalighHijri(
                    balighDate + " " + balighMonth + ", " + balighYear
                  );
                }
              }}
            >
              <Text style={{ color: "#fff" }}> OK</Text>
            </TouchableOpacity>
          ) : currentSelected == "startdate" ? (
            <TouchableOpacity
              style={Style.hijriOk}
              onPress={() =>
              {
                sheetRef.current.snapTo(1);
                if (startHijriDatee && startHijriMonth && startHijriYear)
                {
                  setStartHijri(
                    startHijriDatee +
                    " " +
                    startHijriMonth +
                    ", " +
                    startHijriYear
                  );
                }
              }}
            >
              <Text style={{ color: "#fff" }}>Ok</Text>
            </TouchableOpacity>
          ) : currentSelected == "enddate" ? (
            <TouchableOpacity
              style={Style.hijriOk}
              onPress={() =>
              {
                sheetRef.current.snapTo(1);
                if (endtHijriDatee && endHijriMonth && endHijriYear)
                {
                  setEndHijri(
                    endtHijriDatee + " " + endHijriMonth + ", " + endHijriYear
                  );
                }
              }}
            >
              <Text style={{ color: "#fff" }}>Ok</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={Style.hijriOk}
              onPress={() =>
              {
                sheetRef.current.snapTo(1);
                if (hijriDate && hijriMonth && hijriYear)
                {
                  setDOBHijri(hijriDate + " " + hijriMonth + ", " + hijriYear);
                }
              }}
            >
              <Text style={{ color: "#fff" }}>Ok</Text>
            </TouchableOpacity>
          )}
        </View>
      );
    }
  };

  const calculatePrayers = () =>
  {
    let body;
    if (fromPageStatus == "Yes" && fromToday == true)
    {
      let day = BalighDate.getDate();
      let month = BalighDate.getMonth() + 1;
      let year = BalighDate.getFullYear();
      let baligh_date = year + "-" + month + "-" + day;
      var currentdates = new Date();
      let c_day = currentdates.getDate();
      let c_month = currentdates.getMonth() + 1;
      let c_year = currentdates.getFullYear();
      currentdates = c_year + "-" + c_month + "-" + c_day;
      body = {
        balighDate: baligh_date,
        prayedStartDate: currentdates,
      };
    } else if (fromPageStatus == "Yes" && fromToday == false)
    {
      let day = BalighDate.getDate();
      let month = BalighDate.getMonth();
      let year = BalighDate.getFullYear();
      let baligh_date = year + "-" + month + "-" + day;
      let prayed_start_date =
        year + (ageStartedPraying - 13) + "-" + month + "-" + day;
      body = {
        balighDate: baligh_date,
        prayedStartDate: prayed_start_date,
      };
    } else if (fromPageStatus == "let us help you" && fromToday == true)
    {
      let day = BalighDate.getDate();
      let month = BalighDate.getMonth() + 1;
      let year = BalighDate.getFullYear();
      let baligh_date = year + "-" + month + "-" + day;
      var currentdate = new Date();
      let c_day = currentdate.getDate();
      let c_month = currentdate.getMonth() + 1;
      let c_year = currentdate.getFullYear();
      currentdate = c_year + "-" + c_month + "-" + c_day;
      body = {
        balighDate: baligh_date,
        prayedStartDate: currentdate,
      };
    } else if (fromPageStatus == "let us help you" && fromToday == false)
    {
      let day = startDate.getDate();
      let month = startDate.getMonth() + 1;
      let year = startDate.getFullYear();
      let start_date = year + "-" + month + "-" + day;

      let c_day = endDate.getDate();
      let c_month = endDate.getMonth() + 1;
      let c_year = endDate.getFullYear();
      let end_date = c_year + "-" + c_month + "-" + c_day;
      body = {
        prayedStartDate: start_date,
        prayedEndDate: end_date,
      };
    }
    axios
      .post(
        config.base_url+"utils/calculateQadhaNamaz",
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(
        (response) =>
        {
          let namazData = [];
          let namaztosubtract = [fajrC, zuhrC, asarC, maghribC, ishaC, witrC];
          for (let i = 0; i < response.data.length; i++)
          {
            let namazCount;
            if (userdata.user.userdata.gender == "feMale")
            {
              namazCount =
                (response.data[i].count > 0
                  ? response.data[i].count - namaztosubtract[i]
                  : response.data[i].count) -
                haidhhabit * (ageStartedPraying - 13) * 12;
            } else
            {
              namazCount =
                response.data[i].count > 0
                  ? response.data[i].count - namaztosubtract[i]
                  : response.data[i].count;
            }

            let obj = {
              count: namazCount,
              prayerId: response.data[i].prayerId,
              prayerName: response.data[i].prayerName,
            };
            namazData.push(obj);
          }
          setData(response.data);
          {
            response
              ? navigation.navigate("RegisterStep2", { data: namazData,resetHelp:resetHelp })
              : null;
          }
        },
        (error) =>
        {
          console.log(error);
        }
      )
      .catch((error) =>
      {
        console.error("goal /exercise data", error);
      });
  };

  return (
    <>
      <ScrollView style={{ backgroundColor: Colors.white }}>
        <View style={Style.step1Container}>
          <Text style={Style.step1Text}>{I18n.t("Step 1")}</Text>
          <Text style={Style.prayers}>
            {I18n.t("Fill in to calculate your Qadha prayers")}
          </Text>
        </View>
        <View style={Style.birthDate}>
          <Text>{I18n.t("Date of Birth")}</Text>
          <View style={Style.greContainer}>
            <TouchableOpacity
              onPress={() => setselectedmonthType("Gregorian")}
              style={{ flex: 1 }}
              >
              <View
                style={{
                  backgroundColor:
                    selectedMonthType == "Gregorian" ? Colors.white : "#e6e6e6",
                  margin: 5,
                  borderRadius: 20,
                }}
              >
                <Text style={{ textAlign: "center", padding: 10 }}>
                  {I18n.t("Gregorian")}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setselectedmonthType("Hijri")}
              style={{ flex: 1 }}
              >
              <View
                style={{
                  backgroundColor:
                    selectedMonthType == "Hijri" ? Colors.white : "#e6e6e6",
                  margin: 5,
                  borderRadius: 20,
                }}
              >
                <Text style={{ textAlign: "center", padding: 10 }}>
                  {I18n.t("Hijri")}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          {selectedMonthType == "Hijri" ? (
            <TouchableOpacity
              style={Style.dob}
              onPress={() =>
              {
                sheetRef.current.snapTo(0), setcurrentSelected("dob");
              }}
            >
              <Text style={{ color: "black" }}>{DOBHijri}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={Style.dob}
              onPress={() =>
              {
                sheetRef.current.snapTo(0), setcurrentSelected("dob");
              }}
            >
              <Text style={{ color: "black" }}>
                {DOB.getDate()} / {DOB.getMonth() + 1} / {DOB.getFullYear()}
              </Text>
            </TouchableOpacity>
          )}

          <Text style={{ paddingTop: 20 }}>{I18n.t("Baligh Date")}</Text>
          {selectedMonthType == "Hijri" ? (
            <TouchableOpacity
              style={Style.balig}
              onPress={() =>
              {
                sheetRef.current.snapTo(0), setcurrentSelected("balighdate");
              }}
            >
              <Text style={{ color: "black" }}>{BalighHijri}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={Style.balig}
              onPress={() =>
              {
                sheetRef.current.snapTo(0), setcurrentSelected("balighdate");
              }}
            >
              <Text style={{ color: "black" }}>
                {BalighDate.getDate()} / {BalighDate.getMonth() + 1} /{" "}
                {BalighDate.getFullYear()}
              </Text>
            </TouchableOpacity>
          )}

          {fromPageStatus == "let us help you" && fromToday == false ? (
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1, padding: 10 }}>
                <Text style={{ paddingTop: 20 }}>Start Date</Text>
                {selectedMonthType == "Hijri" ? (
                  <TouchableOpacity
                    style={Style.balig}
                    onPress={() =>
                    {
                      sheetRef.current.snapTo(0),
                        setcurrentSelected("startdate");
                    }}
                  >
                    <Text style={{ color: "black" }}>{startHijri}</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={Style.balig}
                    onPress={() =>
                    {
                      sheetRef.current.snapTo(0),
                        setcurrentSelected("startdate");
                    }}
                  >
                    <Text style={{ color: "black" }}>
                      {startDate.getDate()} / {startDate.getMonth() + 1} /{" "}
                      {startDate.getFullYear()}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
              <View style={{ flex: 1, padding: 10 }}>
                <Text style={{ paddingTop: 20 }}>End Date</Text>
                {selectedMonthType == "Hijri" ? (
                  <TouchableOpacity
                    style={Style.balig}
                    onPress={() =>
                    {
                      sheetRef.current.snapTo(0), setcurrentSelected("enddate");
                    }}
                  >
                    <Text style={{ color: "black" }}>{endHijri}</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={Style.balig}
                    onPress={() =>
                    {
                      sheetRef.current.snapTo(0), setcurrentSelected("enddate");
                    }}
                  >
                    <Text style={{ color: "black" }}>
                      {endDate.getDate()} / {endDate.getMonth() + 1} /{" "}
                      {endDate.getFullYear()}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ) : (
            <View>
              <View
                style={{
                  borderBottomColor: Colors.grey,
                  borderBottomWidth: 0.5,
                  paddingTop: 10,
                }}
              ></View>
              <Text style={{ color: "black", paddingTop: 10 }}>
                {I18n.t("Age when you started praying")}
              </Text>
              <View style={{ flexDirection: "row", marginTop: 10 }}>
                <View style={Style.ageStart}>
                  <TouchableOpacity
                    onPress={() =>
                    {
                      setageStartedPraying(ageStartedPraying - 1);
                    }}
                    style={{ flex: 1, alignItems: "center" }}
                  >
                    <Image
                      style={Style.minus}
                      source={require("../../Assets/Images/minus.png")}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      color: Colors.grey,
                      flex: 1,
                      textAlign: "center",
                      color: Colors.black,
                    }}
                  >
                    {ageStartedPraying}
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                    {
                      setageStartedPraying(ageStartedPraying + 1);
                    }}
                    style={{ flex: 1, alignItems: "center" }}
                  >
                    <Image
                      style={Style.plus}
                      source={require("../../Assets/Images/plus.png")}
                    />
                  </TouchableOpacity>
                </View>
                <View style={Style.today}>
                  <Text> {I18n.t("From today")}</Text>
                  <Checkbox
                    status={fromToday == true ? "checked" : "unchecked"}
                    onPress={() =>
                    {
                      setfromToday(!fromToday);
                    }}
                  />
                </View>
              </View>
              {userdata.user.userdata.gender == "feMale" ? (
                <View>
                  <Text style={{ color: "black", paddingTop: 10 }}>
                    {"Haidh Habit"}
                  </Text>
                  <View style={{ flexDirection: "row", marginTop: 10 }}>
                    <View style={Style.minusContainer}>
                      <TouchableOpacity
                        onPress={() =>
                        {
                          setHaidhhabit(haidhhabit - 1);
                        }}
                        style={{ flex: 1, alignItems: "center" }}
                      >
                        <Image
                          style={Style.minusImage}
                          source={require("../../Assets/Images/minus.png")}
                        />
                      </TouchableOpacity>
                      <Text style={Style.age}>{haidhhabit}</Text>
                      <TouchableOpacity
                        onPress={() =>
                        {
                          setHaidhhabit(haidhhabit + 1);
                          console.log(`haidhhabit`, haidhhabit);
                        }}
                        style={{ flex: 1, alignItems: "center" }}
                      >
                        <Image
                          style={Style.plusImage}
                          source={require("../../Assets/Images/plus.png")}
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={Style.view1}></View>
                  </View>
                </View>
              ) : null}
            </View>
          )}
        </View>
      </ScrollView>
      <Pressable
        onPress={() => calculatePrayers()}
        style={Style.register2}
      >
        <Text style={Style.calculate}>Calculate</Text>
      </Pressable>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[200, 0, 0]}
        borderRadius={10}
        renderContent={renderContent}
      />
    </>
  );
};

export default RegisterStep1;

const Style = StyleSheet.create({
  flexview: {
    flex: 1,
  },
  hijriView: {
    marginTop: 20,
    backgroundColor: "white",
    width: "100%",
    height: 300,
  },
  dropDown: {
    width: "40%",
    height: 50,
    paddingLeft: 20,
    paddingBottom: 10,
    backgroundColor: "#fff",
    justifyContent: "center",
    borderWidth: 0.5,
    borderRadius: 30,
    borderColor: "#000000",
  },
  balig: {
    borderWidth: 0.5,
    marginTop: 20,
    padding: 15,
    borderRadius: 25,
    marginBottom: 10,
  },
  prayers: { fontSize: 18, color: Colors.white },
  mainContainer: {
    backgroundColor: "white",
    height: 200,
    alignItems: "center",
  },
  minus: {
    height: 10,
    width: 10,
    flex: 1,
    resizeMode: "contain",
    tintColor: Colors.grey,
  },
  minusImage: {
    height: 10,
    width: 10,
    flex: 1,
    resizeMode: "contain",
    tintColor: Colors.grey,
  },
  okButton: {
    width: "90%",
    padding: 15,
    borderRadius: 30,
    backgroundColor: "#5CB390",
    alignItems: "center",
    bottom: 40,
    borderWidth: 0.5,
  },
  hijriOk: {
    width: "90%",
    padding: 15,
    borderRadius: 30,
    backgroundColor: "#5CB390",
    alignSelf: "center",
    alignItems: "center",
    borderWidth: 0.5,
    marginTop: 30,
  },
  months: {
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
    height: 50,
    paddingLeft: 20,
    paddingBottom: 10,
    backgroundColor: "#fff",
    justifyContent: "center",
    borderWidth: 0.5,
    borderRadius: 30,
    borderColor: "#000000",
  },
  plus: {
    flex: 1,
    height: 10,
    width: 10,
    tintColor: Colors.grey,
    resizeMode: "contain",
  },
  step1Container: {
    height: Dimensions.get("window").height / 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary_green,
  },
  step1Text: {
    fontSize: 18,
    color: Colors.white,
  },
  logoView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10%",
  },
  register2: {
    bottom: 0,
    padding: 10,
    backgroundColor: Colors.white,
  },
  addbtn: {
    marginTop: 20,
    padding: 10,
    backgroundColor: Colors.white,
  },
  ageStart: {
    flex: 1,
    flexDirection: "row",
    borderWidth: 0.2,
    borderRadius: 5,
    color: Colors.grey,
    padding: 5,
    alignItems: "center",
  },
  today: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
  },
  calculate: {
    textAlign: "center",
    padding: 16,
    borderRadius: 30,
    backgroundColor: Colors.primary_green,
    color: Colors.white,
    width: "100%",
  },
  Imageview: {
    width: "33%",
    height: "33%",
    resizeMode: "contain",
  },
  view1: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
  },
  text_input: {
    marginBottom: 10,
    paddingLeft: 10,
    height: 50,
    width: "100%",
    fontSize: 16,
    color: Colors.grey,
  },
  age: {
    color: Colors.grey,
    flex: 1,
    textAlign: "center",
    color: Colors.black,
  },
  greContainer: {
    marginTop: 10,
    backgroundColor: "#e6e6e6",
    flexDirection: "row",
    borderRadius: 20,
  },
  hijriDate: {
    marginBottom: 20,
    fontSize: 4.5,
    paddingLeft: 30,
    paddingTop: 30,
  },
  dob: {
    borderWidth: 0.5,
    marginTop: 20,
    padding: 15,
    borderRadius: 25,
  },
  signinButton: {
    justifyContent: "center",
    marginTop: 50,
    borderRadius: 20,
    backgroundColor: Colors.primary_green,
    width: "100%",
    height: 50,
  },
  dv_height: {
    height: Dimensions.get("window").height,
    backgroundColor: Colors.primary_green,
  },
  dv_width: {
    width: Dimensions.get("window").width,
  },
  textInput_border: {
    marginTop: 10,
    borderWidth: 0.5,
    height: 50,
    borderRadius: 20,
  },
  birthDate: {
    backgroundColor: "white",
    height: "100%",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    backgroundColor: Colors.white,
  },
  plusImage: {
    flex: 1,
    height: 10,
    width: 10,
    tintColor: Colors.grey,
    resizeMode: "contain",
  },
  minusContainer: {
    flex: 1,
    flexDirection: "row",
    borderWidth: 0.2,
    borderRadius: 5,
    color: Colors.grey,
    padding: 5,
    alignItems: "center",
  },
});
