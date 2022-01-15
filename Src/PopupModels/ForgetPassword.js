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

const ForgetPassword = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.centeredView}>
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
          <View style={styles.modalView}>
            <View
              style={{
                flexDirection: "row",
                padding: 30,
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
               // textAlign: "center",
                borderWidth: 0.8,
                borderRadius: 30,
                paddingLeft:10,
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
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalView: {
    margin: 40,
    marginTop: 100,
    backgroundColor: "white",
    borderRadius:10,
    paddingBottom:25
  },
  button: {
    borderRadius: 30,
    padding: 15,
    elevation: 2,
    marginTop: 20,
    marginHorizontal: 40,
    marginBottom:20
  },

  buttonClose: {
    backgroundColor: Colors.primary_green,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default ForgetPassword;
