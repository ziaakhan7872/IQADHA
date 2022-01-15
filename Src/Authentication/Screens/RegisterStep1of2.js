import React, {useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";
import {useDispatch } from "react-redux";
import LoadingBar from "../../PopupModels/LoadingBar";
import config from '../../../config.json';
import { RadioButton } from "react-native-paper";

import axios from "axios";
import Colors from "../../Constants/Colors";
let day = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31,
];
let month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let year = [
  1940,
  1941,
  1942,
  1943,
  1944,
  1945,
  1946,
  1947,
  1948,
  1949,
  1950,
  1951,
  1952,
  1953,
  1954,
  1955,
  1956,
  1957,
  1958,
  1959,
  1960,
  1961,
  1962,
  1963,
  1964,
  1965,
  1966,
  1967,
  1968,
  1969,
  1970,
  1971,
  1972,
  1973,
  1974,
  1975,
  1976,
  1977,
  1978,
  1979,
  1980,
  1981,
  1982,
  1983,
  1984,
  1985,
  1986,
  1987,
  1988,
  1989,
  1990,
  1991,
  1992,
  1993,
  1994,
  1995,
  1996,
  1997,
  1998,
  1999,
  2000,
  2001,
  2002,
  2003,
  2004,
  2005,
  2006,
  2007,
  2008,
  2009,
  2010,
  2011,
  2012,
  2013,
  2014,
  2015,
  2016,
  2017,
  2018,
  2019,
  2020,
  2021,
];
const RegisterStep1of2 = (props) => {
  const dispatch = useDispatch();
  // const [forgetPassModel, setforgetPassModel] = useState(false);
  const [daybox, setdaybox] = useState(false);
  const [monthbox, setmontbox] = useState(false);
  const [yearbox, setyearbox] = useState(false);
  const [alldone, setalldone] = useState(false);
  const [dayselected, setdayselected] = useState("Day");
  const [monthselected, setmonthselected] = useState("Month");
  const [yearselected, setyearselected] = useState("Year");
  const [typeSelected, settypeSelected] = useState("");
  const [LoadingBarModel, setLoadingBarModel] = useState(false);
  const [dobalighfinal, setdobalighfinal] = useState("");
  const [dobirthfinal, setdobirthfinal] = useState("");

  const [dobDDselected, setdobDDselected] = useState(false);
  const [dobMMselected, setdobMMselected] = useState(false);
  const [dobYYselected, setdobYYselected] = useState(false);

  const [bdDDselected, setbdDDselected] = useState(false);
  const [bdMMselected, setbdMMselected] = useState(false);
  const [bdYYselected, setbdYYselected] = useState(false);

  const [menstruationSelected, setmenstruationSelected] = useState(false);
  const [menstruation, setmenstruation] = useState(0);

  const [dobDD, setdobDD] = useState("");
  const [dobMM, setdobMM] = useState("");
  const [dobYY, setdobYY] = useState("");

  const [bdDD, setbdDD] = useState("");
  const [bdMM, setbdMM] = useState("");
  const [bdYY, setbdYY] = useState("");

  const [checked, setChecked] = React.useState("first");
  // const [dateofbirthselected, setdateofbirthselected] = useState("");
  // const [dateofbalighselected, setdateofbalighselected] = useState("");
  const [completeDateofbirth, setcompleteDateofbirth] = useState(
    "DD / MM / YY"
  );
  const [completeDateofbaligh, setcompleteDateofbaligh] = useState(
    "DD / MM / YY"
  );
  const validatenavigation = () => {
    if (checked == "second" || checked == "third" || checked == "first") {
      if (checked == "first") {
        if (
          bdDD != "" &&
          bdMM != "" &&
          bdYY != "" &&
          dobDD != "" &&
          dobMM != "" &&
          dobYY != ""
        )
          return true;
      } else if (checked == "second") {
        console.log("second");
        if (dobDD != "" && dobMM != "" && dobYY != "") {
          return true;
        } else {
          false;
        }
      } else if (checked == "third") {
        return true;
      }
    } else {
      return false;
    }
  };
  const func = () => {
    let body;
    let prayerstartdate = "";
    let prayerenddate = "";
    if (checked == "first") {
      let dob = dobYY + "-" + dobMM + "-" + dobDD;
      let bd = bdYY + "-" + bdMM + "-" + bdDD;
      prayerstartdate = dob;
      prayerenddate = bd;
      body = {
        balighDate: props.route.params.balighdata,
        prayedStartDate: dob,
        prayedEndDate: bd,
      };
    } else if (checked == "second") {
      let dob = dobYY + "-" + dobMM + "-" + dobDD;
      (prayerstartdate = dob),
        (body = {
          balighDate: props.route.params.balighdata,
          prayedStartDate: dob,
        });
    } else if (checked == "third") {
      // let dob = dobYY + "-" + dobMM + "-" + dobDD;

      body = {
        balighDate: props.route.params.balighdata,
      };
    }
    setLoadingBarModel(true);
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
        (response) => {
          console.log("response", JSON.stringify(response));

          props.navigation.navigate("RegisterStep2", {
            totalnmazqadha: response.data.data[0].count * 6,
            data: response.data.data,
            userdata: props.route.params,
            birthdata: props.route.params.birthdata,
            balighdata: props.route.params.balighdata,
            prayerstartdate: prayerstartdate,
            prayerenddate: prayerenddate,
          });
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

  const renderItemday = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setdayselected(item);
        setdaybox(false);
        setmontbox(true);
        setyearbox(false);
      }}
    >
      <Text style={{ textAlign: "center", color: Colors.white, fontSize: 18 }}>
        {item}
      </Text>
    </TouchableOpacity>
  );
  const renderItemmonth = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => {
        setmonthselected(index + 1);
        setdaybox(false);
        setmontbox(false);
        setyearbox(true);
      }}
    >
      <Text style={{ textAlign: "center", color: Colors.white, fontSize: 18 }}>
        {item}
      </Text>
    </TouchableOpacity>
  );
  const renderItemyear = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setyearselected(item);
        setdaybox(false);
        setmontbox(false);
        setyearbox(false);
        if (typeSelected == "birth_date") {
          setdobirthfinal(item + "-" + monthselected + "-" + dayselected);
          setcompleteDateofbirth(
            dayselected + " / " + month[monthselected] + " / " + item
          );
        } else {
          setdobalighfinal(item + "-" + monthselected + "-" + dayselected);
          setcompleteDateofbaligh(
            dayselected + " / " + monthselected + " / " + item
          );
        }
        setalldone(true);
        settypeSelected("");
      }}
    >
      <Text style={{ textAlign: "center", color: Colors.white, fontSize: 18 }}>
        {item}
      </Text>
    </TouchableOpacity>
  );
  const callback = (count) => {
    setforgetPassModel(false);
  };
  return (
    <View style={Style.flexview}>
      <SafeAreaView style={Style.header}>
        <View
          style={{
            flexDirection: "row",
            // flex: 1,
            height: 70,
            justifyContent: "center",
            alignContent: "center",
            alignSelf: "center",
            alignItems: "center",
            backgroundColor: Colors.primary_green,
            paddingTop: 20,
          }}
        >
          <Text style={{ flex: 1 }}></Text>
          <Text style={[Style.textformat1, { flex: 1 }]}>Step 2</Text>

          <Image
            style={{
              height: 25,
              width: 25,
              resizeMode: "contain",
              flex: 1,
            }}
            source={require("../../Assets/Images/info.png")}
          />
        </View>
      </SafeAreaView>
      {LoadingBarModel == true ? (
        <LoadingBar show={LoadingBarModel} parentCallback={callback} />
      ) : null}
      <ScrollView>
        <Text
          style={[
            {
              fontSize: 20,

              color: Colors.primary_green,
              textAlign: "left",
              padding: 20,
            },
          ]}
        >
          Have you ever prayed ?
        </Text>
        <View style={{ flex: 1, padding: 20, flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <View
              style={{
                color: Colors.primary_green,
                borderWidth: 2,
                borderRadius: 50,
                borderColor:
                  (dobDD && dobMM && dobYY) == ""
                    ? Colors.grey
                    : Colors.primary_green,
                width: 20,
                height: 20,
                margin: 10,
              }}
            ></View>
          </View>
          <View style={{ flex: 5, margin: 10 }}>
            <Text
              style={{
                color:
                  (dobDD && dobMM && dobYY) == ""
                    ? Colors.grey
                    : Colors.primary_green,
              }}
            >
              Start Date
            </Text>
            <View style={{ flexDirection: "row", paddingTop: 10 }}>
              <Text
                style={{
                  flex: 1,
                  paddingLeft: 4,
                  color:
                    dobDDselected == true ? Colors.primary_green : Colors.grey,
                }}
              >
                {dobDDselected == true || dobDD != "" ? "DD" : ""}
              </Text>
              <Text
                style={{
                  flex: 1,
                  color:
                    dobMMselected == true ? Colors.primary_green : Colors.grey,
                }}
              >
                {dobMMselected == true || dobMM != "" ? "MM" : ""}
              </Text>
              <Text
                style={{
                  flex: 1,
                  color:
                    dobYYselected == true ? Colors.primary_green : Colors.grey,
                }}
              >
                {dobYYselected == true || dobYY != "" ? "YYYY" : ""}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                style={{ flex: 1 }}
                onFocus={() => setdobDDselected(true)}
                onBlur={() => setdobDDselected(false)}
                onChangeText={(e) =>
                  e > 31 ? Alert.alert("Invalid date") : setdobDD(e)
                }
                value={dobDD}
                placeholder="DD"
                keyboardType="numeric"
              />
              <TextInput
                style={{ flex: 1 }}
                onFocus={() => setdobMMselected(true)}
                onBlur={() => setdobMMselected(false)}
                onChangeText={(e) =>
                  e > 12 ? Alert.alert("Invalid month") : setdobMM(e)
                }
                value={dobMM}
                placeholder="MM"
                keyboardType="numeric"
              />
              <TextInput
                style={{ flex: 1 }}
                onFocus={() => setdobYYselected(true)}
                onBlur={() => setdobYYselected(false)}
                onChangeText={(e) =>
                  e > 2021 ? Alert.alert("Invalid year") : setdobYY(e)
                }
                value={dobYY}
                placeholder="YYYY"
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>

        <View style={{ flex: 1, padding: 20, flexDirection: "row" }}>
          <View style={{ flex: 1, paddingTop: 10 }}>
            <RadioButton
              color={Colors.primary_green}
              value="first"
              status={checked === "first" ? "checked" : "unchecked"}
              onPress={() => setChecked("first")}
            />
            {/* <View
              style={{
                color: Colors.primary_green,
                borderWidth: 2,
                borderRadius: 50,
                borderColor:
                  (bdDD && bdMM && bdYY) == ""
                    ? Colors.grey
                    : Colors.primary_green,
                width: 20,
                height: 20,
                margin: 10,
              }}
            ></View> */}
          </View>

          <View style={{ flex: 5, margin: 10 }}>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  //justifyContent: "center",
                  //   alignItems: "center",
                }}
              >
                {/* <RadioButton
                  color={Colors.grey}
                  value="first"
                  status={checked === "first" ? "checked" : "unchecked"}
                  onPress={() => setChecked("first")}
                /> */}
                <Text
                  style={{
                    color:
                      checked == "first" ? Colors.primary_green : Colors.grey,
                  }}
                >
                  End Date
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",

                  alignItems: "center",
                }}
              >
                <RadioButton
                  color={Colors.primary_green}
                  padding={10}
                  value="second"
                  status={checked === "second" ? "checked" : "unchecked"}
                  onPress={() => setChecked("second")}
                />
                <Text
                  style={{
                    color:
                      checked == "second" ? Colors.primary_green : Colors.grey,
                  }}
                >
                  Still Praying
                </Text>
              </View>
            </View>
            {/* <Text
              style={{
                color:
                  (bdDD && bdMM && bdYY) == ""
                    ? Colors.grey
                    : Colors.primary_green,
              }}
            >
              End Date
            </Text> */}
            {checked == "first" ? (
              <View>
                <View style={{ flexDirection: "row", paddingTop: 10 }}>
                  <Text
                    style={{
                      flex: 1,
                      paddingLeft: 4,
                      color:
                        bdDDselected == true
                          ? Colors.primary_green
                          : Colors.grey,
                    }}
                  >
                    {bdDDselected == true || bdDD != "" ? "DD" : ""}
                  </Text>
                  <Text
                    style={{
                      flex: 1,
                      color:
                        bdMMselected == true
                          ? Colors.primary_green
                          : Colors.grey,
                    }}
                  >
                    {bdMMselected == true || bdMM != "" ? "MM" : ""}
                  </Text>
                  <Text
                    style={{
                      flex: 1,
                      color:
                        bdYYselected == true
                          ? Colors.primary_green
                          : Colors.grey,
                    }}
                  >
                    {bdYYselected == true || bdYY != "" ? "YYYY" : ""}
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <TextInput
                    style={{ flex: 1 }}
                    onFocus={() => setbdDDselected(true)}
                    onBlur={() => setbdDDselected(false)}
                    onChangeText={(e) =>
                      e > 31 ? Alert.alert("Invalid date") : setbdDD(e)
                    }
                    value={bdDD}
                    placeholder="DD"
                    keyboardType="numeric"
                  />
                  <TextInput
                    style={{ flex: 1 }}
                    onFocus={() => setbdMMselected(true)}
                    onBlur={() => setbdMMselected(false)}
                    onChangeText={(e) =>
                      e > 12 ? Alert.alert("Invalid date") : setbdMM(e)
                    }
                    value={bdMM}
                    placeholder="MM"
                    keyboardType="numeric"
                  />
                  <TextInput
                    style={{ flex: 1 }}
                    onFocus={() => setbdYYselected(true)}
                    onBlur={() => setbdYYselected(false)}
                    onChangeText={(e) =>
                      e > 2021 ? Alert.alert("Invalid date") : setbdYY(e)
                    }
                    value={bdYY}
                    placeholder="YYYY"
                    keyboardType="numeric"
                  />
                </View>
              </View>
            ) : null}
          </View>
        </View>
        <View style={{ flex: 1, padding: 20, flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <RadioButton
              color={Colors.primary_green}
              value="third"
              status={checked === "third" ? "checked" : "unchecked"}
              onPress={() => setChecked("third")}
            />
          </View>
          <View style={{ flex: 5, margin: 10 }}>
            <Text
              style={{
                color: menstruation == "" ? Colors.grey : Colors.primary_green,
              }}
            >
              I have never prayed
            </Text>
          </View>
        </View>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              alignItems: "center",
            }}
            onPress={() => {
              func();
            }}
          >
            {validatenavigation() == true ? (
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: Colors.white,
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                  borderRadius: 50,
                  paddingLeft: 10,
                  paddingRight: 10,
                  maxWidth: 100,
                  backgroundColor: Colors.primary_green,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: Colors.white,

                    fontSize: 18,
                    padding: 15,
                  }}
                >
                  Next
                </Text>
                <Image
                  style={{
                    height: 16,
                    width: 16,
                    resizeMode: "contain",

                    tintColor: Colors.white,
                  }}
                  source={require("../../Assets/Images/next.png")}
                />
              </View>
            ) : null}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const Style = StyleSheet.create({
  flexview: {
    flex: 1,
    // backgroundColor: Colors.primary_green,
  },
  header: {
    // padding: 20,
    // flex: 1,
  },
  textformat1: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  textformat2: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  dob_btn: {
    flex: 1,
    backgroundColor: Colors.secondary_green,
    margin: 20,
    justifyContent: "center",
  },
  dob_select: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RegisterStep1of2;
