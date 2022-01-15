import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import
{
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";

import SplashScreen from "./Screens/SplashScreen";
import Language from "./Screens/Language";
import Login from "./Screens/Login";
import Register from "./Screens/Register";
import RegisterStep1 from "./Screens/RegisterStep1";
import RegisterStep2 from "./Screens/RegisterStep2";
import RegisterStep1of2 from "./Screens/RegisterStep1of2";
import Tabs from "../Home/index";
import PreRememberQadha from "./Screens/PreRememberQadha";
import AmountQadhaPrayed from "./Screens/AmountQadhaPrayed";
const Stack = createStackNavigator();
import { useSelector } from "react-redux";

const Authentication = () =>
{
  const themeData = useSelector((state) => state.user.theme);

  const customDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: "#42346E",
      cardcolor: "#463774",
      darkbackground: true,
      textColor: "white",
      subHeading: "white",
      purpleWhite: "white",
      purplegreyish: "#463774",
      splashColor: "#42346E",
      calendarHeader: "#7E71A5",
      fastQadahCircle: "#CBC9D5",
       dashbordCounter:"#fff"
    },
  };

  const customDefaultTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "white",
      cardcolor: "white",
      textColor: "#000",
      subHeading: "#a4acb6",
      purpleWhite: "#6a549d",
      purplegreyish: "#cdcdd7",
      splashColor: "#5CB390",
      calendarHeader: "#e6e6e6",
      fastQadahCircle: "#CBC9D5",
      dashbordCounter:"#D4D1D1"
    },
  };
  return (
    <NavigationContainer
      theme={themeData == "light" ? customDefaultTheme : customDarkTheme}
    >
      <Stack.Navigator
        headerMode="none"
        linking={"athletictrainingscheduler://"}
      >
        <Stack.Screen
          initialRouteName="SplashScreen"
          name="SplashScreen"
          component={SplashScreen}
          options={{ gestureEnabled: false }}
        />

        <Stack.Screen
          name="Language"
          component={Language}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name="PreRememberQadha"
          component={PreRememberQadha}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          initialRouteName="AmountQadhaPrayed"
          name="AmountQadhaPrayed"
          component={AmountQadhaPrayed}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name="RegisterStep1"
          component={RegisterStep1}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name="RegisterStep2"
          component={RegisterStep2}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name="RegisterStep1of2"
          component={RegisterStep1of2}
          options={{ gestureEnabled: false }}
        />

        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{ gestureEnabled: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Authentication;
