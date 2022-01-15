import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity,Image } from 'react-native'
import { widthPercentageToDP } from 'react-native-responsive-screen';
import I18n from "../../../../i18";

export default function CalendarLogs({navigation,selectedMonthType,setselectedmonthType,year,colors})
{
    return (
        <View>
            <View style={styles.headerContainer}>
          <Text/>
          <View style={styles.arrowContainer}>
            <TouchableOpacity>
              <Image source={require('../../../../Assets/Images/GroupLeft.png')}
              style={styles.leftArrow}
            />
            </TouchableOpacity>
            <Text style={{color:colors.textColor,fontSize:16,fontWeight:'bold'}}>{year}</Text>
             <TouchableOpacity>
              <Image source={require('../../../../Assets/Images/GroupRight.png')}
              style={styles.rightArrow}
            />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={()=>navigation.pop()}>
            <Image source={require('../../../../Assets/Images/graph.png')} style={[styles.graph, {tintColor:colors.textColor}]}/>
           </TouchableOpacity>
        </View>
        
          <View style={[styles.greContainer,{backgroundColor:colors.calendarHeader}]}>
            <TouchableOpacity
              onPress={() =>setselectedmonthType("Calendar")}
              style={{ flex: 1 }}
              >
              <View
                style={{
                  backgroundColor:
                   selectedMonthType == "Calendar" ? colors.background : colors.calendarHeader,
                  margin: 5,
                  borderRadius: 20,
                }}
              >
                <Text style={{ textAlign: "center", padding: 10,color:colors.textColor }}>
                  {I18n.t("Calendar")}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>setselectedmonthType("Logs")}
              style={{ flex: 1 }}
              >
              <View
                style={{
                  backgroundColor:
                    selectedMonthType == "Logs" ? colors.background  : colors.calendarHeader,
                  margin: 5,
                  borderRadius: 20,
                }}
              >
                <Text style={{ textAlign: "center", padding: 10,color:colors.textColor }}>
                  {I18n.t("Logs")}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
      greContainer: {
    marginTop: 10,
    flexDirection: "row",
    borderRadius: 20,
    width: widthPercentageToDP(95),
    alignSelf:'center'
    },
    headerContainer: {
        flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 20,

  },
  arrowContainer: {
    marginLeft:10,
    flexDirection: 'row',
    width: 140,
    justifyContent: 'space-between'
  },
  leftArrow: {
    width: 20,
    height: 20
  },
  rightArrow: {
    width: 20,
    height: 20
  },
  graph: {
    width: 20,
    height: 20,
    marginRight:10
  }
})