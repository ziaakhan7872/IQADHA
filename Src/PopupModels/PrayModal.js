import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Colors from "../Constants/Colors";
import LottieView from "lottie-react-native";
const PrayModal = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [praycounter, setpraycounter] = useState([0, 0, 0, 0, 0, 0]);
  const [counter, setcounter] = useState(0);
  const [FajrC, setFajrC] = useState(0);
  const [ZuhrC, setZuhrC] = useState(0);
  const [AsarC, setAsarC] = useState(0);
  const [MagribC, setMagribC] = useState(0);
  const [IshaC, setishaC] = useState(0);
  const [WitrC, setWitrC] = useState(0);
  const getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    //Alert.alert(date + '-' + month + '-' + year);
    // You can turn it in to your desired format
    return date + "-" + month + "-" + year; //format: dd-mm-yyyy;
  };

  const renderItemNmaz = (item, index) => {
    return (
      <View
        style={{
          backgroundColor: "white",

          flex: 1,
          flexDirection: "row",
          margin: 10,

          justifyContent: "center",

          alignItems: "center",
        }}
        onPress={() => {}}
      >
        <View style={{ flex: 1, flexDirection: "row" }}>
          <Image
            style={{
              height: 20,
              width: 20,
              resizeMode: "contain",
            }}
            source={require("../Assets/Images/Fajr.png")}
          />
          <Text
            style={{
              textAlign: "center",
              color: "black",
              fontSize: 16,
              color: Colors.grey,
              paddingLeft: 10,
            }}
          >
            {item.item.prayer.name}
          </Text>
        </View>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => {
              const newarray = [...praycounter];
              if (newarray[item.index] > 0) {
                console.log("hy", item.index);
                if (item.index == 0) {
                  setFajrC(FajrC - 1);
                } else if (item.index == 1) {
                  setZuhrC(ZuhrC - 1);
                } else if (item.index == 2) {
                  setAsarC(AsarC - 1);
                } else if (item.index == 3) {
                  setMagribC(MagribC - 1);
                } else if (item.index == 4) {
                  setishaC(IshaC - 1);
                } else if (item.index == 5) {
                  setWitrC(WitrC - 1);
                }
                let prayed = newarray[item.index] - 1;

                newarray[item.index] = prayed;
                setcounter(counter - 1);
                setpraycounter(newarray);
              }
            }}
            style={{ flex: 1, alignItems: "center" }}
          >
            <Image
              style={{
                height: 16,
                width: 16,
                flex: 1,
                resizeMode: "contain",
                tintColor: Colors.grey,
                padding: 10,
              }}
              source={require("../Assets/Images/minus.png")}
            />
          </TouchableOpacity>
          <Text style={{ color: Colors.grey, flex: 1, textAlign: "center" }}>
            {praycounter[item.index] + ""}
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
              const newarray = [...praycounter];

              let prayed = newarray[item.index] + 1;

              newarray[item.index] = prayed;
              setcounter(counter + 1);
              setpraycounter(newarray);
            }}
            style={{ flex: 1, alignItems: "center" }}
          >
            <Image
              style={{
                flex: 1,
                height: 16,
                width: 16,
                padding: 10,
                tintColor: Colors.grey,
                resizeMode: "contain",
              }}
              source={require("../Assets/Images/plus.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    // <View style={styles.centeredView}>
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.show}
      onRequestClose={() => {
        props.parentCallback(
          false,
          praycounter,
          FajrC,
          ZuhrC,
          AsarC,
          MagribC,
          IshaC,
          WitrC
        );
      }}
    >
      <View style={styles.centeredView}>
        <View
          style={{
            backgroundColor: "white",
            height: "100%",
            width: "100%",
          }}
        >
          <Text style={{ color: Colors.grey, fontSize: 16, padding: 10 }}>
            {getCurrentDate()}
          </Text>
          <View
            style={{ borderBottomColor: Colors.grey, borderBottomWidth: 1 }}
          />
          <FlatList
            data={props.data}
            render
            renderItem={renderItemNmaz}
            keyExtractor={(item) => item.prayerName}
          />
          <TouchableOpacity
            style={{
              position: "absolute",
              bottom: 0,

              marginBottom: 20,

              alignSelf: "center",
            }}
            onPress={() => {
              props.parentCallback(
                false,
                praycounter,
                counter,
                FajrC,
                ZuhrC,
                AsarC,
                MagribC,
                IshaC,
                WitrC
              );
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: Colors.white,
                fontSize: 18,
                padding: 15,
                borderRadius: 50,
                backgroundColor: "#585e8c",
              }}
            >
              {" "}
              Save{" "}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
    // </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    padding: 80,
    paddingLeft: 50,
    paddingRight: 50,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    alignItems: "center",
  },
  //   modalView: {
  //     margin: 40,
  //     marginTop: 80,
  //     backgroundColor: "white",
  //   },
  //   button: {
  //     borderRadius: 20,
  //     padding: 10,
  //     elevation: 2,
  //     margin: 20,
  //   },

  //   buttonClose: {
  //     backgroundColor: Colors.primary_green,
  //   },
  //   textStyle: {
  //     color: "white",
  //     fontWeight: "bold",
  //     textAlign: "center",
  //   },
  //   modalText: {
  //     marginBottom: 15,
  //     textAlign: "center",
  //   },
});

export default PrayModal;
