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

const FastSettings = (props) => {
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
                padding: 10,
                borderBottomColor: Colors.grey,
                borderBottomWidth: 0.8,
              }}
            >
              <Text style={{ flex: 1 }}>Update Fast</Text>
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
            <Text style={{ padding: 10 }}>
              You can use iQadha for trackign and recording fasts. Just go to
              the settings page to add a total target.
            </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={
                () => {
                  props.parentCallback(false),
                    props.navigate.navigate("FastSettingsUpdate");
                }
                // props.navigation.navigate("FastSettingsUpdate")
                // props.navigate.navigation.navigate("FastSettingsUpdate")
              }
            >
              <Text style={styles.textStyle}>Fasts Settings</Text>
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
    marginTop: 80,
    backgroundColor: "white",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 20,
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

export default FastSettings;
