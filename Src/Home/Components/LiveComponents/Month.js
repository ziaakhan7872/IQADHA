import React, {useState } from 'react'
import axios from 'axios';
import { View, Dimensions, StyleSheet, ScrollView } from 'react-native'
import { useTheme } from '@react-navigation/native';

import { LineChart } from "react-native-chart-kit";
import { ResponsiveText } from '../../../Components';
import { useSelector } from "react-redux";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import config from '../../../../config.json';

const windowHeight = Dimensions.get('window').height;

export default function Month({navigation})
{
    const userdata = useSelector((state) => state.user);
    const [monthhlyData, setmonthhlyData] = useState([0])
    const [monthhlyCount, setmonthhlyCount] = useState([])
    const [thisMonth, setThisMonth] = useState(0)
    const [lastMonth, setLastMonth] = useState(0)

    let monthData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    const colors = useTheme().colors

    const handleGetData = () =>
    {
    
        axios
            .post(
                config.base_url+"users/activityLogDetails",
                {
                    yearToPerformLookup: [2021]
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${userdata.user.token}`,
                    },
                }
            )
            .then(
                (response) =>
                {
                    let respons = response.data
                    findMonths(respons)
                    {
                        respons.map((month, index) =>
                        {
                            monthhlyCount.push(month.total_count);

                        })
                    }
                    {
                        monthData.map((item, index) =>
                        {
                            const result = respons.filter(e =>
                            {
                                if (e.month == item)
                                {
                                    return e.total_count
                                }

                            }
                            );


                            if (result.length > 0)
                            {
                                monthhlyData.push(Number(result[0].total_count))
                            }
                            else
                            {
                                monthhlyData.push(0)
                            }
                            setmonthhlyData([...monthhlyData])
                        })
                    }


                },
                (error) =>
                {
                    console.log('error====>', error);
                }
            )
            .catch((error) =>
            {
                console.error("goal /exercise data", error);

            });
}
    React.useEffect(() =>
    {
          handleGetData();
        const unsubscribe = navigation.addListener("focus", () => {
      	
    });

    return unsubscribe;
  }, [navigation]);

    const findMonths = (respons) =>
    {
        let date = new Date()
        let month = date.getMonth() + 1
        let findlastMonth= date.getMonth()
        
        let monthNO = respons.filter((el, index) =>
        {
            if (el.month == month)
            {
                setThisMonth(el.total_count)
            }
            else if (el.month == findlastMonth)
            {
                setLastMonth(el.total_count)
            }
        }
        )

}

    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
            "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                data: monthhlyData
            }
        ]
    };
    const chartConfig = {
        backgroundGradientFrom: colors.background,
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: colors.background,
        backgroundGradientToOpacity: 0,
        color: (opacity = 1) => `rgba(200, 200, 200, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(189, 189, 189, ${opacity})`,
        strokeWidth: 2,
        barPercentage: 0.5,
        linejoinType: 'round',
        barColors: '#EEF0FA',
        useShadowColorFromDataset: false,
        decimalPlaces: 0,
        fillShadowGradient: '#EEF0FA',
        fillShadowGradientOpacity: 1,
        propsForDots: {
            r: "6",
            strokeWidth: "1",
            stroke: "#6478D3"
        }
    };
    return (
        <ScrollView style={{ flex: 1 }}>
            <LineChart
                data={data}
                style={{ backgroundColor: colors.background,height:windowHeight*0.6 }}
                showsHorizontalScrollIndicator={true}
                withHorizontalLabels={true}

                withInnerLines={true}
                withVerticalLabels={true}
                width={wp(100)}
                height={windowHeight*0.6}
                yLabelsOffset={10}
                xLabelsOffset={5}
                chartConfig={chartConfig}
                showBarTops={false}
            />
            <View style={[styles.mainContainer,{backgroundColor:colors.background}]}>
                <View style={{ flexDirection: 'column', height: 150, justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignSelf: 'center', }}>
                        <View style={styles.view1} />
                        <ResponsiveText style={[styles.name, { color: colors.textColor }]}>Last Month</ResponsiveText>
                    </View>

                    <View style={{ flexDirection: 'row', alignSelf: 'center', }}>
                        <View style={styles.view2} />
                        <ResponsiveText style={[styles.name, { color: colors.textColor }]}>This Month</ResponsiveText>
                    </View>
                    <View style={{ flexDirection: 'row', alignSelf: 'center', }}>
                        <View style={styles.view3} />
                        <ResponsiveText style={[styles.name, { color: colors.textColor }]}>Change</ResponsiveText>
                    </View>
                </View>
                <View style={styles.verticleLine} />
                <View style={{ flexDirection: 'column', height: 150, justifyContent: 'space-between' }}>
                    <View style={{ height: '30%', alignSelf: 'center' }}>
                        <ResponsiveText style={[styles.totalCount, { color: colors.textColor }]}>{lastMonth}</ResponsiveText>
                        <ResponsiveText style={styles.name, { color: colors.textColor }}>Total Prayed</ResponsiveText>
                    </View>
                    <View style={{ height: '30%', alignSelf: 'center' }}>
                        <ResponsiveText style={styles.totalCount, { color: colors.textColor }}>{thisMonth}</ResponsiveText>
                        <ResponsiveText style={styles.name, { color: colors.textColor }}>Total Prayed</ResponsiveText>
                    </View>

                    <View style={{ height: '20%', alignSelf: 'center' }}>
                        <ResponsiveText style={styles.totalCount, { color: colors.textColor }}>{thisMonth==0?lastMonth:thisMonth-lastMonth}</ResponsiveText>
                        <ResponsiveText style={styles.name, { color: colors.textColor }}>Comparison</ResponsiveText>
                    </View>
                </View>
            </View>

        </ScrollView>

    )
}

const styles = StyleSheet.create({
    mainContainer: {
        paddingVertical: 40,
        paddingTop: 20,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 20,
        elevation: 1,
        borderRadius: 10,
        width: '90%',
        alignSelf: 'center'
    },
    name: {
        fontSize: 4,
        color: '#000',
        width: 75,
    },
    verticleLine: {
        height: '100%',
        width: 1,
        backgroundColor: '#F1F3F8',
    },
    totalCount: {
        fontSize: 4,
        color: '#000',
        fontWeight: 'bold',
    },
    view1: {
        backgroundColor: '#F7B579',
        width: 10,
        height: 10,
        alignSelf: 'center',
        marginRight: 5,
        borderRadius: 10
    },
    view2: {
        backgroundColor: '#6478D3',
        width: 10,
        height: 10,
        alignSelf: 'center',
        marginRight: 5,
        borderRadius: 10
    },
    view3: {
        backgroundColor: '#CDCDD7',
        width: 10,
        height: 10,
        alignSelf: 'center',
        marginRight: 5,
        borderRadius: 10
    },

})