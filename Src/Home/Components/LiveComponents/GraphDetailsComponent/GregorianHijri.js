import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { widthPercentageToDP } from 'react-native-responsive-screen';
import I18n from "../../../../i18";

export default function GregorianHijri({selectedMonth,colors,setselectedmonth})
{
    return (
        
          <View style={styles.greContainer}>
            <TouchableOpacity
              onPress={() => setselectedmonth("GREGORIAN")}
              style={{ flex: 1 }}
              >
              <View>
                <Text style={{ textAlign: "center", padding: 10,color:colors.textColor }}>
                  {I18n.t("GREGORIAN")}
            </Text>
             <View style={{ 
                  borderBottomColor:
                    selectedMonth == "GREGORIAN" ? '#6478D3' : colors.background,
              borderBottomWidth: 2,
              width: 30,
              alignSelf:'center'
              }}/>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setselectedmonth("HIJRI")}
              style={{ flex: 1 }}
              >
              <View>
                <Text style={{ textAlign: "center", padding: 10,color:colors.textColor }}>
                  {I18n.t("HIJRI")}
            </Text>
            <View style={{ 
                  borderBottomColor:
                    selectedMonth == "HIJRI" ? '#6478D3' : colors.background,
              borderBottomWidth: 2,
              width: 30,
                alignSelf:'center'
              }}/>
              </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
      greContainer: {
    marginTop: 10,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor:'#E6E6E6',
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