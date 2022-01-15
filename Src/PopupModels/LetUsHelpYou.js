import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Colors from "../Constants/Colors";
import { RadioButton } from "react-native-paper";

const windowHeight = Dimensions.get('window').height;

const LetUsHelpYou = (props) =>
{
  console.log(`props.resetdata`, props.resetdata)
  const [modalVisible, setModalVisible] = useState(false);
  const [checked, setChecked] = React.useState("first");
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

                alignSelf: "flex-end",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  props.parentCallback(false, "");
                }}
              >
                <Image
                  style={{ height: 16, width: 16, resizeMode: "contain" }}
                  source={require("../Assets/Images/cancel.png")}
                />
              </TouchableOpacity>
            </View>
            <View>
              <View style={{ flexDirection: "row", paddingTop: 10 }}>
               <View style={{
                   width: 20,
                  height: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop:10,
                  overflow: 'hidden',
                  borderRadius:30
                }}>
                  <RadioButton
                  color="#6A549D"
                  value="first"
                  status={checked === "first" ? "checked" : "unchecked"}
                  onPress={() => setChecked("first")}
                />
                </View>
                <Text style={{ width: "80%",marginLeft:10 }}>
                  I want to start praying from today and calculate all my life
                  Qadha and prayers
                </Text>
              </View>
              <View style={{ flexDirection: "row", paddingTop: 10 }}>
                <View style={{
                  width: 20,
                  height: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop:10,
                  overflow: 'hidden',
                  borderRadius:30
                }}>
                <RadioButton
                  color="#6A549D"
                  value="second"
                 
                  status={checked === "second" ? "checked" : "unchecked"}
                  onPress={() => setChecked("second")}
                  />
                  </View>


               
                <Text style={{ width: "80%",marginLeft:10 }}>
                  I want to track Qadha between two custom dates of when I
                  missed my prayers
                </Text>
              </View>
            </View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => props.parentCallback(true, checked)}
            >
              <Text style={styles.textStyle}>GO AHEAD</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    position: 'absolute',
    height: windowHeight*1,
    alignSelf:'center'
   // backgroundColor:'red'

  },
  modalView: {
    padding: 20,
    marginHorizontal: 40,
    marginTop: "50%",
    textAlign: "center",
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical:30
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop:25
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

export default LetUsHelpYou;
