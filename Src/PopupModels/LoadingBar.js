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
  TouchableOpacity,
} from "react-native";
import Colors from "../Constants/Colors";
import LottieView from "lottie-react-native";
const LoadingBar = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    // <View style={styles.centeredView}>
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.show}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!props.show);
      }}
    >
      <View style={styles.centeredView}>
        <View
          style={{
            backgroundColor: "white",
            width: 100,
            height: 100,
            padding: 10,
          }}
        >
          <LottieView
            style={{
              //   position: "absolute",
              flex: 1,
              zIndex: 1,

              width: 100,
              height: 100,
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
              alignSelf: "center",
            }}
            source={require("../Assets/Animations/lf30_editor_64vaq56h.json")}
            autoPlay
            loop
          />
          <Text style={{ textAlign: "center", fontWeight: "bold" }}>
            Loading..
          </Text>
        </View>
        {/* <View style={styles.modalView}>
            <View
              style={{
                flexDirection: "row",
                padding: 10,
                borderBottomColor: Colors.grey,
                borderBottomWidth: 0.8,
              }}
            >
              <Text style={{ flex: 1 }}>Forget Password?</Text>
              <TouchableOpacity
                onPress={() => {
                  props.parentCallback(false);
                }}
              >
                <Image
                  style={{ height: 16, width: 16, resizeMode: "contain" }}
                  source={require("../Assets/Images/cancel.png")}
                />
              </TouchableOpacity>
            </View>
            <TextInput
              style={{
                textAlign: "center",
                borderBottomWidth: 0.8,
                margin: 40,
                marginTop: 10,
                marginBottom: 10,
                borderColor: "grey",
              }}
              onChangeText={() => console.log()}
              placeholderTextColor={Colors.grey}
              placeholder={"Enter Email"}
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => props.parentCallback(false)}
            >
              <Text style={styles.textStyle}>Reset Password</Text>
            </Pressable>
          </View> */}
      </View>
    </Modal>
    // </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
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

export default LoadingBar;
