import PrayQadha from "./Components/PrayQadha";
import FastQadha from "./Components/FastQadha";
import Live from "./Components/Live";
import Settings from "./Components/Settings";
import Dashboard from "./Components/Dashboard";
import Colors from "../Constants/Colors";
import GraphDetails from "./Components/LiveComponents/GraphDetails";
import Fast from "../Home/Fast";
import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function liveStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Live" component={Live} />
      <Stack.Screen name="GraphDetails" component={GraphDetails} />
    </Stack.Navigator>
  );
}

const Tabs = (props) => {
  const themeData = useSelector((state) => state.user.theme);
  const userdata = useSelector((state) => state.user);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: (focused, tintColor) => {
          if (route.name === "PrayQadha") {
            let color = "white";
            if (themeData == "light") {
              if (focused.focused == true) {
                color = "#7b67a8";
              } else {
                color = "#cfcfd9";
              }
            } else {
              if (focused.focused == true) {
                color = "#f7b579";
              } else {
                color = "#cdcdd7";
              }
            }

            return (
              <Image
                style={{
                  width: 25,
                  height: 25,
                  tintColor: color,
                  resizeMode: "contain",
                }}
                source={require("../Assets/TabIcons/pray.png")}
              />
            );
          } else if (route.name === "FastQadha") {
            //console.log(focused.focused);
            let color = "white";
            if (themeData == "light") {
              if (focused.focused == true) {
                color = "#7b67a8";
              } else {
                color = "#cfcfd9";
              }
            } else {
              if (focused.focused == true) {
                color = "#f7b579";
              } else {
                color = "#cdcdd7";
              }
            }
            return (
              <Image
                style={{
                  width: 25,
                  height: 25,
                  tintColor: color,
                  resizeMode: "contain",
                }}
                source={require("../Assets/TabIcons/fast.png")}
              />
            );
          } else if (route.name === "fastQadaha") {
            //console.log(focused.focused);
            let color = "white";
            if (themeData == "light") {
              if (focused.focused == true) {
                color = "#7b67a8";
              } else {
                color = "#cfcfd9";
              }
            } else {
              if (focused.focused == true) {
                color = "#f7b579";
              } else {
                color = "#cdcdd7";
              }
            }
            return (
              <Image
                style={{
                  width: 25,
                  height: 25,
                  tintColor: color,
                  resizeMode: "contain",
                }}
                source={require("../Assets/AppBarIcons/fast.png")}
              />
            );
          } else if (route.name === "Live") {
            console.log(focused.focused);
            let color = "white";
            if (themeData == "light") {
              if (focused.focused == true) {
                color = "#7b67a8";
              } else {
                color = "#cfcfd9";
              }
            } else {
              if (focused.focused == true) {
                color = "#f7b579";
              } else {
                color = "#cdcdd7";
              }
            }
            return (
              <Image
                style={{
                  width: 25,
                  height: 25,
                  tintColor: color,
                  resizeMode: "contain",
                }}
                source={require("../Assets/TabIcons/activityLog.png")}
              />
            );
          } else if (route.name === "Dashboard") {
            console.log(focused.focused);
            let color = "white";
            if (themeData == "light") {
              if (focused.focused == true) {
                color = "#7b67a8";
              } else {
                color = "#cfcfd9";
              }
            } else {
              if (focused.focused == true) {
                color = "#f7b579";
              } else {
                color = "#cdcdd7";
              }
            }
            return (
              <Image
                style={{
                  width: 25,
                  height: 25,
                  tintColor: color,
                  resizeMode: "contain",
                }}
                source={require("../Assets/TabIcons/dashboard.png")}
              />
            );
          } else if (route.name === "Settings") {
            console.log(focused.focused);
            let color = "white";
            if (themeData == "light") {
              if (focused.focused == true) {
                color = "#7b67a8";
              } else {
                color = "#cfcfd9";
              }
            } else {
              if (focused.focused == true) {
                color = "#f7b579";
              } else {
                color = "#cdcdd7";
              }
            }
            return (
              <Image
                style={{
                  width: 25,
                  height: 25,
                  tintColor: color,
                  resizeMode: "contain",
                }}
                source={require("../Assets/TabIcons/settings.png")}
              />
            );
          }
        },
      })}
      initialRouteName={PrayQadha}
      tabBarOptions={{
        showLabel: false,

        activeBackgroundColor: themeData == "light" ? "white" : "#463774",
        activeTintColor: Colors.grey,
        inactiveTintColor: Colors.grey,
        style: {
          backgroundColor: themeData == "light" ? "white" : "#463774",
        },
      }}
    >
      <Tab.Screen name="PrayQadha" component={PrayQadha} />
      <Tab.Screen
        name="fastQadaha"
        component={userdata.fast == undefined ? FastQadha : Fast}
      />
      <Tab.Screen name="Live" component={liveStack} />
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};
export default Tabs;
