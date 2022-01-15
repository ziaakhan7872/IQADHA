import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import { days } from "../../../../Components/dummyData";

const Summary = ({ namazData,colors }) => {
  useEffect(() => {}, []);
  let array = [0, 0, 0, 0, 0, 0, 0];

  for (let i = 0; i < namazData.length; i++) {
    if (namazData[i].prayer.name == "Fajr") {
      let obj = {
        namazcount: namazData[i].count,
        namazTotal:
          array[0].namazTotal == undefined
            ? namazData[i].count
            : array[0].namazTotal + namazData[i].count,
      };
      array[0] = obj;
    } else if (namazData[i].prayer.name == "Dhuhr") {
      let obj = {
        namazcount: namazData[i].count,
        namazTotal:
          array[1].namazTotal == undefined
            ? namazData[i].count
            : array[1].namazTotal + namazData[i].count,
      };
      array[1] = obj;
    } else if (namazData[i].prayer.name == "Asr") {
      let obj = {
        namazcount: namazData[i].count,
        namazTotal:
          array[2].namazTotal == undefined
            ? namazData[i].count
            : array[2].namazTotal + namazData[i].count,
      };
      array[2] = obj;
    } else if (namazData[i].prayer.name == "Maghrib") {
      let obj = {
        namazcount: namazData[i].count,
        namazTotal:
          array[3].namazTotal == undefined
            ? namazData[i].count
            : array[3].namazTotal + namazData[i].count,
      };
      array[3] = obj;
    } else if (namazData[i].prayer.name == "Ishaa") {
      let obj = {
        namazcount: namazData[i].count,
        namazTotal:
          array[4].namazTotal == undefined
            ? namazData[i].count
            : array[4].namazTotal + namazData[i].count,
      };
      array[4] = obj;
    } else if (namazData[i].prayer.name == "Witr") {
      let obj = {
        namazcount: namazData[i].count,
        namazTotal:
          array[5].namazTotal == undefined
            ? namazData[i].count
            : array[5].namazTotal + namazData[i].count,
      };
      array[5] = obj;
    } else if (namazData[i].prayer.name == "Fast") {
      let obj = {
        namazcount: namazData[i].count,
        namazTotal:
          array[6].namazTotal == undefined
            ? namazData[i].count
            : array[6].namazTotal + namazData[i].count,
      };
      array[6] = obj;
    }
  }

  const [date, setDate] = useState("");

  useEffect(() => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var day = new Date().getDay();
    var daysget = days[day].value;
    setDate(daysget + " " + date + " " + month + " " + year);
  }, []);
  const calculateDate = (date) => {
    let dateee = new Date(date);
    var hours = dateee.getUTCHours();
    var minutes = dateee.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; 
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;

    return strTime;
  };
  return (
    <View>
      <View style={[styles.mainContainer,{backgroundColor:colors.background}]}>
        <View style={styles.summeryText}>
          <Text style={[styles.summary,{color:colors.textColor}]}>Summary</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
        <View style={styles.cardview}>
          <View>
            <Image
              source={require("../../../../Assets/Images/fajar.png")}
              style={styles.iconStyle}
            />
            <Text style={{color:colors.textColor}}>Fajr </Text>
            <Text style={{ alignSelf: "center",color:colors.textColor }}>
              {array[0] == 0 ? "-" : array[0].namazTotal}
            </Text>
          </View>
          <View>
            <Image
              source={require("../../../../Assets/Images/Dhuhr.png")}
              style={styles.iconStyle}
            />
            <Text style={{color:colors.textColor}}>Zuhr</Text>
            <Text style={{ alignSelf: "center",color:colors.textColor }}>
              {array[1] == 0 ? "-" : array[1].namazTotal}
            </Text>
          </View>
          <View>
            <Image
              source={require("../../../../Assets/Images/Asr.png")}
              style={styles.iconStyle}
            />
            <Text style={{color:colors.textColor}}>Asr</Text>
            <Text style={{ alignSelf: "center",color:colors.textColor }}>
              {array[2] == 0 ? "-" : array[2].namazTotal}
            </Text>
          </View>
          <View>
            <Image
              source={require("../../../../Assets/Images/Maghrib.png")}
              style={styles.iconStyle}
            />
            <Text style={{color:colors.textColor}}>Maghrib</Text>
            <Text style={{ alignSelf: "center",color:colors.textColor }}>
              {array[3] == 0 ? "-" : array[3].namazTotal}
            </Text>
          </View>
          <View>
            <Image
              source={require("../../../../Assets/Images/Ishaa.png")}
              style={[styles.iconStyle,{tintColor:'#6A549D'}]}
            />
            <Text style={{color:colors.textColor}}>Isha</Text>
            <Text style={{ alignSelf: "center" ,color:colors.textColor}}>
              {array[4] == 0 ? "-" : array[4].namazTotal}
            </Text>
          </View>
          <View>
            <Image
              source={require("../../../../Assets/Images/Witr.png")}
              style={[styles.iconStyle,{tintColor:'#6A549D'}]}
            />
            <Text style={{color:colors.textColor}}>Witr</Text>
            <Text style={{ alignSelf: "center",color:colors.textColor }}>
              {array[5] == 0 ? "-" : array[5].namazTotal}
            </Text>
          </View>
          <View>
            <Image
              source={require("../../../../Assets/Images/lamp.png")}
              style={styles.iconStyle}
            />
            <Text style={{color:colors.textColor}}>Fast</Text>
            <Text style={{ alignSelf: "center",color:colors.textColor }}>
              {array[6] == 0 ? "-" : array[6].namazTotal}
            </Text>
          </View>
        </View>
      </View>
      <View style={[styles.detailsCard,{backgroundColor:colors.background}]}>
        <Text style={[styles.details,{color:colors.textColor}]}>Details</Text>
        <FlatList
          data={namazData}
          renderItem={({ item, index }) => (
            <View style={{ flexDirection: "row", marginBottom: 10 }}>
              <View style={{ marginLeft: 20, width: 100 }}>
                <Text style={{color:colors.textColor}}>{calculateDate(item.activityDate)}</Text>
              </View>
              <View style={styles.dotText}>
                <View style={styles.dot} />
                <Text style={{ alignSelf: "center",color:colors.textColor }}>
                  {item.count} {item.prayer.name}
                </Text>
                <Text style={styles.added}>added</Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default Summary;

const styles = StyleSheet.create({
  mainContainer: {
    borderRadius: 10,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    height: 160,
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
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
   
  },
  detailsCard: {
    marginTop: 20,
    paddingBottom: 20,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 2,
  },
  details: {
    padding: 20,
    fontSize: 18,
  },
  dot: {
    width: 10,
    height: 10,
    backgroundColor: "#FFE86D",
    alignSelf: "center",
    borderRadius: 10,
    marginRight: 10,
  },
  dotText: {
    marginLeft: 10,
    flexDirection: "row",
    borderBottomColor: "#F1F3F8",
    borderBottomWidth: 1,
    paddingBottom: 10,
    width: 200,
  },
  added: {
    marginLeft: 10,
    color: "gray",
  },
  summary: {
    fontSize: 18,
  },
  date: {
    color: "gray",
  },
});
