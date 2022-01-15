import React, { useState } from "react";
import I18n from "../i18";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { Container, ResponsiveText, Button } from "../Components";
import { useTheme } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { update_fast } from "../store/actions";
import axios from "axios";
import config from "../../config.json";

const EditFast = ({ navigation, index }) => {
  const [LoadingBarModel, setLoadingBarModel] = useState(false);
  const [updateCount, setupdateCount] = useState(0);
  const userdata = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const colors = useTheme().colors;

  const handleKafarah = () => {
    setupdateCount(updateCount + 60);
  };
  const handleShawal = () => {
    setupdateCount(updateCount + 6);
  };
  const getFasts = () => {
    axios
      .post(
        config.base_url + "users/fasts",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userdata.user.token}`,
          },
        }
      )
      .then(
        (response) => {
          console.log(`response from get Fasts`, response.data.data[0].count);
          if (response.data.data[0].count) {
            let fastCount = response.data.data[0].count;
            dispatch(update_fast(fastCount));
            navigation.navigate("Tabs", { tabname: "fastQadaha" });
          }
        },
        (error) => {
          console.log(error);
        }
      )
      .catch((error) => {
        console.error("goal /exercise data", error);
      });
  };
  const handleSave = () => {
    var date = new Date();
    axios
      .put(
        config.base_url + "users/fasts",
        {
          count: updateCount,
          // activityDate:
          //   date.toISOString().split("T")[0] + " " + date.toLocaleTimeString(),
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
          console.log(`response`, response);
          if (response.data) {
            // navigation.navigate('Fast')
            getFasts();
          }
        },
        (error) => {
          console.log(error.response);
          setLoadingBarModel(false);
        }
      )
      .catch((error) => {
        console.log("goal /exercise data", error);
        setLoadingBarModel(false);
      });
  };
  return (
    <Container>
      <ScrollView
        style={[styles.mainContainer, { backgroundColor: colors.background }]}
      >
        <View style={styles.headerContainer}>
          <TouchableOpacity
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            onPress={() => navigation.pop()}
          >
            <Image
              style={[styles.leftArrow, { tintColor: colors.textColor }]}
              source={require("../../Src/Assets/Images/left.png")}
            />
          </TouchableOpacity>
          <ResponsiveText
            style={[styles.editFast, { color: colors.textColor }]}
          >
            {I18n.t("Edit Fast")}
          </ResponsiveText>
          <View />
        </View>
        <View style={styles.missedFasts}>
          <ResponsiveText
            style={[styles.missedText, { color: colors.textColor }]}
          >
            {I18n.t("Missed Fasts")}
          </ResponsiveText>
          <View style={styles.plusMinus}>
            <View style={styles.minusContainer}>
              <TouchableOpacity
                onPress={() => {
                  setupdateCount(updateCount - 1);
                }}
                style={{ flex: 1, alignItems: "center" }}
                hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
              >
                <Image
                  style={styles.minusImage}
                  source={require("../../Src/Assets/Images/minus.png")}
                />
              </TouchableOpacity>
              <ResponsiveText style={{ color: colors.textColor }}>
                {Math.max(0, updateCount - 0)}
              </ResponsiveText>
              <TouchableOpacity
                onPress={() => {
                  setupdateCount(updateCount + 1);
                }}
                style={{ flex: 1, alignItems: "center" }}
                hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
              >
                <Image
                  style={styles.plusImage}
                  source={require("../../Src/Assets/Images/plus.png")}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={{ flexDirection: "row", alignSelf: "center" }}>
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: colors.textColor,
              width: "35%",
              alignSelf: "center",
            }}
          />
          <ResponsiveText
            style={[styles.drawlineText, { color: colors.textColor }]}
          >
            OR
          </ResponsiveText>
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: colors.textColor,
              width: "35%",
              alignSelf: "center",
            }}
          />
        </View>
        <View style={styles.btnContainer}>
          <ResponsiveText
            style={{
              marginTop: 30,
              fontSize: 3.5,
              marginLeft: 10,
              color: colors.textColor,
            }}
          >
            {I18n.t("Select kafarah button to add 60 fasts")}
          </ResponsiveText>
          <Button
            title={"MAKE KAFFARAH"}
            color="#6A549D"
            borderWidth={1}
            fontColor="#FFFFFF"
            _onPress={handleKafarah}
            btnContainer={{
              marginTop: 20,
            }}
          />
          <ResponsiveText
            style={{
              marginTop: 30,
              fontSize: 3.5,
              marginLeft: 10,
              color: colors.textColor,
            }}
          >
            {I18n.t("Select shawal button to 6 lasts")}
          </ResponsiveText>
          <Button
            title={"SHAWAL FASTS"}
            color="#6A549D"
            borderWidth={1}
            fontColor="#fff"
            _onPress={handleShawal}
            btnContainer={{
              marginTop: 20,
            }}
          />
          <Button
            title={"SAVE"}
            color="#4EAA81"
            borderWidth={1}
            fontColor="#FFFFFF"
            _onPress={handleSave}
            btnContainer={{
              marginTop: 60,
            }}
          />
        </View>
      </ScrollView>
    </Container>
  );
};

export default EditFast;

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
  },

  headerContainer: {
    flexDirection: "row",
    padding: "10%",
    justifyContent: "space-between",
  },
  editFast: {
    fontSize: 18,
    fontWeight: "bold",
  },
  plusMinus: {
    height: 30,
    marginTop: 10,
    width: 200,
    paddingRight: 40,
  },
  minusContainer: {
    flexDirection: "row",
    borderWidth: 0.2,
    borderRadius: 5,
    color: "gray",
    padding: 5,
    alignSelf: "flex-end",
  },
  plusImage: {
    flex: 1,
    height: 10,
    width: 10,
    tintColor: "gray",
    resizeMode: "contain",
  },
  minusImage: {
    height: 10,
    width: 10,
    flex: 1,
    resizeMode: "contain",
    tintColor: "gray",
  },
  missedFasts: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  missedText: {
    alignSelf: "center",
    paddingLeft: 40,
    fontSize: 4.5,
    alignSelf: "center",
  },
  drawlineContainer1: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 40,
    marginTop: 30,
  },
  drawlineContainer2: {
    flex: 1,
    height: 1,
    backgroundColor: "black",
  },
  drawlineContainer3: {
    flex: 1,
    height: 1,
    backgroundColor: "black",
    marginRight: 40,
  },
  drawlineText: {
    width: 50,
    textAlign: "center",
  },
  btnContainer: {
    marginHorizontal: 40,
  },
  leftArrow: {
    width: 15,
    height: 15,
    resizeMode: "contain",
  },
});
