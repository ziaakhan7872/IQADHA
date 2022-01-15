import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  FlatList,
  LogBox,
  Pressable,
} from "react-native";


import I18n from "../../i18";
import Colors from "../../Constants/Colors";
import { prayers } from "../../Components/dummyData";
LogBox.ignoreAllLogs();

const AmountQadhaPrayed = ({ navigation, index, route }) =>
{
 let resetdataa = route.params?route.params.resetdata:null
console.log('routeroute',resetdataa);
  const [FajrC, setFajrC] = useState(0);
  const [ZuhrC, setZuhrC] = useState(0);
  const [AsarC, setAsarC] = useState(0);
  const [MagribC, setMagribC] = useState(0);
  const [IshaC, setishaC] = useState(0);
  const [WitrC, setWitrC] = useState(0);

  useEffect(() => {}, []);
  const renderItemNmaz = (item, index) => {
    console.log(item.index);

    return (
      <View style={Style.mainContainer}>
        <View style={Style.prayerNameContainer}>
          <Text style={Style.prayername}>{item.item.prayerName}</Text>
        </View>
        <View style={Style.menuContainer}>
          <TouchableOpacity
            onPress={() => {
              if (item.index == 0) {
                setFajrC(Math.max(0,(FajrC - 1)-1));
              } else if (item.index == 1) {
                setZuhrC(Math.max(0,(ZuhrC - 1)-1));
              } else if (item.index == 2) {
                setAsarC(Math.max(0,(AsarC - 1)-1));
              } else if (item.index == 3) {
                setMagribC(Math.max(0,(MagribC - 1)-1));
              } else if (item.index == 4) {
                setishaC(Math.max(0,(IshaC - 1)-1));
              } else if (item.index == 5) {
                setWitrC(Math.max(0,(WitrC - 1)-1));
              }
            }}
            style={Style.menuTouuch}
          >
            <Image
              style={Style.minusContainer}
              source={require("../../Assets/Images/minus.png")}
            />
          </TouchableOpacity>
          <Text style={Style.plusText}>
            {item.index == 0
              ? FajrC
              : item.index == 1
              ? ZuhrC
              : item.index == 2
              ? AsarC
              : item.index == 3
              ? MagribC
              : item.index == 4
              ? IshaC
              : item.index == 5
              ? WitrC
              : ""}
          </Text>
          <TouchableOpacity
            onPress={() => {
              if (item.index == 0) {
                setFajrC(FajrC + 1);
              } else if (item.index == 1) {
                setZuhrC(ZuhrC + 1);
              } else if (item.index == 2) {
                setAsarC(AsarC + 1);
              } else if (item.index == 3) {
                setMagribC(MagribC + 1);
              } else if (item.index == 4) {
                setishaC(IshaC + 1);
              } else if (item.index == 5) {
                setWitrC(WitrC + 1);
              }
            }}
            style={Style.plusTouch}
          >
            <Image
              style={Style.plusImage}
              source={require("../../Assets/Images/plus.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={{ backgroundColor: Colors.primary_green }}>
      <View style={Style.logoContainer}>
        <Image
          style={Style.logoStyle}
          source={require("../../Assets/Images/logo.png")}
        />
      </View>
      <View style={Style.qadahPrayer}>
        <Text style={Style.qadahText}>
          {I18n.t("Add the amount of your Qadha prayers missed")}
        </Text>
        <FlatList
          style={{ margin: 40 }}
          data={prayers}
          renderItem={renderItemNmaz}
          keyExtractor={(item) => item.prayerName}
        />
       
          <Pressable
            onPress={() =>
            {
              let body = [
                {
                  count: FajrC,
                  prayerId: 1,
                  prayerName: "Fajr",
                },
                {
                  count: ZuhrC,
                  prayerId: 2,
                  prayerName: "Dhuhr",
                },
                {
                  count: AsarC,
                  prayerId: 3,
                  prayerName: "Asr",
                },
                {
                  count: MagribC,
                  prayerId: 4,
                  prayerName: "Maghrib",
                },
                {
                  count: IshaC,
                  prayerId: 5,
                  prayerName: "Ishaa",
                },
                {
                  count: WitrC,
                  prayerId: 6,
                  prayerName: "Witr",
                },
              ];
            {resetdataa=='reset'?navigation.navigate("RegisterStep2", { data: body,resetdataa:resetdataa }):
              navigation.navigate("RegisterStep2", { bodydata: body });
            }
            }}
            style={Style.doneContainer}
          >
            <Text style={Style.doneText}>{I18n.t("Done")}</Text>
          </Pressable>
   
      </View>
    </ScrollView>
  );
};

export default AmountQadhaPrayed;

const Style = StyleSheet.create({
  flexview: {
    flex: 1,
  },
  mainContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  prayerNameContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
  },
  prayername: {
    textAlign: "center",
    color: "black",
    fontSize: 16,
    paddingLeft: 10,
  },
  logoView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10%",
  },
  Imageview: {
    width: "33%",
    height: "33%",
    resizeMode: "contain",
  },
  menuTouuch: {
    flex: 1,
    alignItems: "center",
  },
  plusText: {
    color: Colors.grey,
    flex: 1,
    textAlign: "center",
    color: Colors.black,
  },
  text_input: {
    marginBottom: 10,
    paddingLeft: 10,
    height: 50,
    width: "100%",
    fontSize: 16,
    color: Colors.grey,
  },
  plusTouch: {
    flex: 1,
    alignItems: "center",
  },
  minusContainer: {
    flex: 1,
    height: 10,
    width: 12,
    justifyContent: "center",
    resizeMode: "contain",
    tintColor: Colors.grey,
  },
  menuContainer: {
    flex: 2,
    flexDirection: "row",
    borderWidth: 0.5,
    borderRadius:5,
    borderColor: Colors.grey,
    padding: 7,
  },
  logoStyle: {
    height: "30%",
    width: "30%",
    resizeMode: "contain",
    tintColor: "white",
  },
  doneContainer: {
    backgroundColor: Colors.primary_green,
    width: "100%",
    height: 50,
    marginTop: 20,
    justifyContent: "center",
    borderRadius: 30,
  },
  doneText: {
    color: Colors.white,
    textAlign: "center",
    fontSize: 18,
  },
  plusImage: {
    flex: 1,
    height: 10,
    width: 12,
    tintColor: Colors.grey,
    resizeMode: "contain",
  },
  logoContainer: {
    height: Dimensions.get("window").height / 3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary_green,
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
  qadahPrayer: {
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopEndRadius: 20,
    marginTop: -20,
    backgroundColor: Colors.white,
  },

  textInput_border: {
    marginTop: 10,
    borderWidth: 0.5,
    height: 50,
    borderRadius: 20,
  },
  qadahText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    padding: 30,
    color: Colors.black,
  },
});
