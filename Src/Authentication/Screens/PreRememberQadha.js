import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  Pressable,
} from "react-native";

import I18n from "../../i18";
import Colors from "../../Constants/Colors";
import { ResponsiveText } from "../../Components";
import LetUsHelpYou from "../../PopupModels/LetUsHelpYou";

const PreRememberQadha = ({route, navigation, index }) =>
{
  let resetdata = route.params ? route.params.reset : null

  const [letUsHelpYouModel, setletUsHelpYouModel] = useState(false);

  const callback = (count, status) =>
  {
    var resetData =resetdata=="reset"?resetdata:null
    if (status == "") {
      setletUsHelpYouModel(false);
    } else {
      setletUsHelpYouModel(false);
      console.log("status", status);
      if (status == "first") {
        navigation.navigate("RegisterStep1", {
          fromToday: true,
          yes: "let us help you",
          resetData:resetData
          
        });
      } else {
        navigation.navigate("RegisterStep1", {
          fromToday: false,
          yes: "let us help you",
          resetData:resetData
        });
      }
    }
    // navigation.navigate("AmountQadhaPrayed");
  };
  return (
    <View style={Style.flexview}>
      {letUsHelpYouModel == true ? (
        <LetUsHelpYou show={letUsHelpYouModel}
          resetdata={resetdata} parentCallback={callback} />
      ) : null}
      <SafeAreaView style={Style.header}>
        <View
          style={[
            Style.textformat1,
            {
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
        >
          <Image
            style={Style.logo}
            source={require("../../Assets/Images/logo.png")}
          />
        </View>

        <View style={Style.qadahPrayers}>
          <ResponsiveText style={Style.qadahText}>
            {I18n.t("Track your Qadha prayers")}
          </ResponsiveText>
          <ResponsiveText style={Style.rememberPrayer}>
            {I18n.t("Do you remember how many Qadha prayers you have missed?")}
          </ResponsiveText>
        
           
            <Pressable
              onPress={() =>
            {
               resetdata == 'reset' ? navigation.navigate("AmountQadhaPrayed",{resetdata:resetdata}) : navigation.navigate("AmountQadhaPrayed")}
    
              }
              style={Style.yesContainer}
            >
              <ResponsiveText style={Style.yesText}>
                {I18n.t("Yes")}
              </ResponsiveText>
            </Pressable>
       
          <ResponsiveText style={Style.dontRemember}>
            {I18n.t("If you don't remember")}
          </ResponsiveText>
          <Pressable
            onPress={() => {
              setletUsHelpYouModel(true);
            }}
            style={Style.btn}
          >
            <ResponsiveText style={Style.helpBtn}>
              {I18n.t("LET US HELP YOU")}
            </ResponsiveText>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
};

const Style = StyleSheet.create({
  flexview: {
    flex: 1,
    backgroundColor: Colors.primary_green,
  },
  header: {
    flex: 1,
  },
  yesText: {
    color: Colors.white,
    textAlign: "center",
    fontSize: 4.5,
  },
  textformat1: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  textformat2: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  dontRemember: {
    textAlign: "center",
    fontSize: 4,
    padding: 20,
    color: "#262626",
  },
  dob_btn: {
    flex: 1,
    backgroundColor: Colors.secondary_green,
    margin: 20,
    justifyContent: "center",
  },
  helpBtn: {
    color: Colors.white,
    textAlign: "center",
    fontSize: 4,
  },
  btn: {
    backgroundColor: Colors.primary_green,
    width: "100%",
    height: 50,
    justifyContent: "center",
    borderRadius: 30,
  },
  rememberPrayer: {
    textAlign: "center",
    fontSize: 4,
    padding: 70,
    paddingTop: 20,
    paddingBottom: 20,
    color: "#383838",
  },
  qadahText: {
    textAlign: "center",
    fontSize: 6,
    color: "#383838",
  },
  dob_select: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    height: "30%",
    width: "30%",
    resizeMode: "contain",
    tintColor: "white",
  },
  qadahPrayers: {
    flex: 2,
    backgroundColor: "white",
    padding: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  yesContainer: {
    backgroundColor: Colors.primary_green,
    width: "100%",
    height: 50,
    marginTop: 20,
    justifyContent: "center",
    borderRadius: 30,
  },
});

export default PreRememberQadha;
