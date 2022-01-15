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

const ProfileSettings = (props) => {
  console.log(props.selected);
  const [value, setvalue] = useState("");
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={() => {
        props.parentCallback(false);
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
            <Text style={{ flex: 1 }}>{props.selected}</Text>
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
          <View style={{ alignSelf: "center" }}>
            <TextInput
              style={styles.input}
              onChangeText={(e) => {
                setvalue(e);
              }}
              value={value}
              placeholder={""}
            />
          </View>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => {
              props.parentCallback(false, value);
            }}
          >
            <Text style={styles.textStyle}>Update</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,

    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  input: {
    textAlign: "center",
    width: 100,
    borderBottomColor: Colors.grey,
    borderBottomWidth: 2,
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

export default ProfileSettings;
