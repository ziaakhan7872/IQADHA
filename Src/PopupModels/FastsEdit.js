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
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../Constants/Colors";
import LottieView from "lottie-react-native";
import config from '../../config.json'
const FastsEdit = (props) => {
  console.log(props);
  const [number, setnumber] = useState(props.number);
  const userdata = useSelector((state) => state.user);
  const [praycounter, setpraycounter] = useState([0, 0, 0, 0, 0, 0]);
  const getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    return date + "-" + month + "-" + year; //format: dd-mm-yyyy;
  };
  const updateQadahFasts = () => {
    axios
      .put(
        config.base_url+"users/fasts",
        {
          count: number,
        },

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userdata.user.token}`,
          },
        }
      )
      .then(
        (response) => {
          props.parentCallback(false, praycounter);
        },
        (error) => {
          setLoadingBarModel(false);
          console.log(error.response);
        }
      )
      .catch((error) => {
        setLoadingBarModel(false);
        console.error("goal /exercise data", error);
      });
  };
  const renderItemNmaz = (item, index) => {
    return (
      <View
        style={{
          backgroundColor: "white",

          flex: 1,
          flexDirection: "row",
          margin: 10,

          alignItems: "center",
        }}
        onPress={() => {}}
      >
        <View style={{ flex: 1, flexDirection: "row" }}>
          <TouchableOpacity style={{ flex: 1 }}>
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
              const newarray = [...praycounter];

              let prayed = newarray[item.index] + 1;

              newarray[item.index] = prayed;
              setpraycounter(newarray);
            }}
            style={{ flex: 1 }}
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
        props.parentCallback(false, praycounter);
      }}
    >
      <View style={styles.centeredView}>
        <View
          style={{
            backgroundColor: "white",
            // height: "50%",
            width: "100%",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                flex: 1,
                color: Colors.black,
                fontSize: 16,
                padding: 10,
              }}
            >
              Edit Qadha Fasts
            </Text>
            <TouchableOpacity
              onPress={() => {
                props.parentCallback(false);
              }}
            >
              <Image
                style={{
                  height: 16,
                  width: 16,
                  resizeMode: "contain",
                  margin: 10,
                }}
                source={require("../Assets/Images/cancel.png")}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{ borderBottomColor: Colors.grey, borderBottomWidth: 1 }}
          />
          <View style={{ alignSelf: "center" }}>
            <TextInput
              style={styles.input}
              onChangeText={(e) => {
                setnumber(e);
              }}
              value={number}
              placeholder={number.toString()}
              keyboardType="numeric"
            />
          </View>
          <TouchableOpacity
            style={{
              //   position: "absolute",
              bottom: 0,
              paddingTop: 10,
              marginBottom: 20,

              alignSelf: "center",
            }}
            onPress={() => {
              updateQadahFasts();
              //props.parentCallback(false, praycounter);
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
  input: {
    textAlign: "center",
    width: 100,
    borderBottomColor: Colors.grey,
    borderBottomWidth: 2,
  },
  centeredView: {
    flex: 1,
    paddingTop: 20,
    paddingLeft: 50,
    paddingRight: 50,
    // justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    alignItems: "center",
  },
});

export default FastsEdit;
