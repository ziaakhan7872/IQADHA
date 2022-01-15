import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import FastSettingsUpdate from "./FastSettingsUpdate";
import PraySettingsUpdate from "./PraySettingsUpdate";
import EditFast from "../Home/EditFast";


import Premium from '../Home/Components/SettingsComponents/Premium';
import PremiumSubscription from '../Home/Components/SettingsComponents/PremiumSubscription';
import Account from '../Home/Components/SettingsComponents/Account';
import UpdateAccount from '../Home/Components/SettingsComponents/UpdateAccount';
import Notifications from '../Home/Components/SettingsComponents/Notifications';
import EditQadhaPrayers from '../Home/Components/SettingsComponents/EditQadhaPrayers';
import EditFastsSettings from './Components/SettingsComponents/EditFastsSettings';
import ResetOrignal from '../Home/Components/SettingsComponents/ResetOrignal';
import About from '../Home/Components/SettingsComponents/About';
import FAQS from '../Home/Components/SettingsComponents/FAQS';
import ContactInfo from '../Home/Components/SettingsComponents/ContactInfo';
import TermsAndConditions from '../Home/Components/SettingsComponents/TermsAndConditions';
//Screens

import Tabs from "./Tabs";
import Fast from "../Home/Fast";

const Stack = createStackNavigator();
const Home = () =>
{
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        name="Tabs"
        component={Tabs}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="FastSettingsUpdate"
        component={FastSettingsUpdate}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="EditFast"
        component={EditFast}
        options={{ gestureEnabled: false }}
      />

      <Stack.Screen
        name="PraySettingsUpdate"
        component={PraySettingsUpdate}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="Fast"
        component={Fast}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="Premium"
        component={Premium}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="PremiumSubscription"
        component={PremiumSubscription}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="Account"
        component={Account}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="UpdateAccount"
        component={UpdateAccount}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="EditQadhaPrayers"
        component={EditQadhaPrayers}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="EditFastsSettings"
        component={EditFastsSettings}
        options={{ gestureEnabled: false }}
      />

      <Stack.Screen
        name="ResetOrignal"
        component={ResetOrignal}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="About"
        component={About}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="FAQS"
        component={FAQS}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="ContactInfo"
        component={ContactInfo}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="TermsAndConditions"
        component={TermsAndConditions}
        options={{ gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
};

export default Home;
