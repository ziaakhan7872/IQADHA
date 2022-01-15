import React from 'react'
import { View, Image, StyleSheet,Text, TouchableOpacity } from 'react-native'
import Week from './LiveComponents/Week';
import Month from './LiveComponents/Month';
import Year from './LiveComponents/Year';
import { useTheme } from '@react-navigation/native';
import { ResponsiveText } from '../../Components';
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const Tabs = () =>
{
  const colors1 = useTheme().colors;
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: colors1.textColor,
        labelStyle: {
          fontSize: 12,
        },
        style: {
          backgroundColor: colors1.background
        },
        indicatorStyle: {
          width: 50,
          marginLeft: 30

        }
      }}
    >
      <Tab.Screen name="Week" component={Week} />
      <Tab.Screen name="Month" component={Month} />
      <Tab.Screen name="Year" component={Year} />
    </Tab.Navigator>
  )
}

const Live = ({ navigation }) =>
{
  const colors = useTheme().colors
  function LogoTitle()
  {
    return (
      <View style={{
        paddingVertical: 20,
        flexDirection: 'row', justifyContent: 'space-between',
        backgroundColor: colors.background,
      }}>

        <ResponsiveText />
        <Text style={[styles.graph, { color: colors.textColor }]}>Graph</Text>
        <TouchableOpacity onPress={() => navigation.navigate('GraphDetails')}>
          <Image
            style={[styles.dateShow,{ tintColor: colors.textColor,}]}
            source={require('../../Assets/Images/dateshow.png')}
          />
        </TouchableOpacity>
      </View>

    );
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Tabs}
        options={{
          headerTitle: (props) => <LogoTitle {...props} />,
          headerTitleContainerStyle: {
            left: 0,
            right: 0,
          },
        }}
      />
    </Stack.Navigator>

  )
}


export default Live

const styles = StyleSheet.create({
  graph: {
    fontSize: 18,
    fontWeight: 'bold',
   marginLeft:30
    
  },
  dateShow: {
    width: 20,
    resizeMode: "contain",
    height: 20,
   
    marginRight: 10
  }
})