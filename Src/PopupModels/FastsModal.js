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
const FastModal = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [fastcounter, setfastcounter] = useState(0);
  const getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    //Alert.alert(date + '-' + month + '-' + year);
    // You can turn it in to your desired format
    return date + "-" + month + "-" + year; //format: dd-mm-yyyy;
  };

  return (
    // <View style={styles.centeredView}>
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.show}
      onRequestClose={() => {
        props.parentCallback(false, praycounter);
      }}
    >
      <View style={styles.centeredView}>
        <View
          style={{
            backgroundColor: "white",
            // height: "100%",
            width: "100%",
          }}
        >
          <Text style={{ color: Colors.grey, fontSize: 16, padding: 10 }}>
            Update Fasts
          </Text>
          <View
            style={{ borderBottomColor: Colors.grey, borderBottomWidth: 1 }}
          />

          <View style={{ flexDirection: "row", padding: 10 }}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",

                alignItems: "center",
              }}
            >
              <Image
                style={{
                  height: 25,
                  width: 25,
                  resizeMode: "contain",
                }}
                source={require("../Assets/Images/lamp.png")}
              />
              <Text style={{ color: Colors.black, paddingLeft: 5 }}>Fasts</Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  if (fastcounter > 0) {
                    setfastcounter(fastcounter - 1);
                  }
                }}
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
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
              <Text
                style={{
                  color: Colors.grey,
                  flex: 1,

                  textAlign: "center",
                }}
              >
                {fastcounter}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setfastcounter(fastcounter + 1);
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
          <TouchableOpacity
            style={{
              // position: "absolute",
              paddingTop: 10,
              bottom: 0,

              marginBottom: 20,

              alignSelf: "center",
            }}
            onPress={() => {
              props.parentCallback(false, fastcounter);
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: Colors.white,
                fontSize: 18,
                padding: 10,
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

export default FastModal;
