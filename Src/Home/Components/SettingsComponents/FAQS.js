import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native'
import { Container } from "native-base";
import { useTheme } from '@react-navigation/native';
import I18n from '../../../i18';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { fetching_faqs_request } from "../../../store/actions";

const FAQS = ({ todos,navigation }) =>
{
    const [data, setData] = useState(todos)
    const [selectedIndex, setSelectedIndex] = useState(-1)
    const colors = useTheme().colors;

    const renderItemNmaz = ({ item, index }) => 
    {
        if (selectedIndex == index)
        {
            return (
                <View style={{ padding: 10, flexDirection: "row" }}>
                    <View style={{ flex: 9, }}>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={[styles.question,{color:colors.textColor}]}>{item.question}</Text>
                            <TouchableOpacity
                                style={styles.arrowUpContainer} onPress={() =>
                                {
                                    setSelectedIndex(-1)
                                }}
                            >
                                <Image
                                    style={[styles.arrowUpimage,{tintColor:colors.textColor}]}
                                    source={require("../../../Assets/Images/arrow_up.png")}
                                />
                            </TouchableOpacity>
                        </View>
                        <Text style={[styles.answer,{color:colors.textColor}]}>
                            {item.answer}
                        </Text>
                    </View>
                </View>
            );
        } else
        {
            return (
                <View style={styles.arrowDownContainer}>
                    <Text
                        style={[styles.arrowDownText,{color:colors.textColor,marginTop:20}]}
                    >
                        {item.question}
                    </Text>
                    <TouchableOpacity style={{ flex: 1 }}
                        onPress={() =>
                        {
                            setSelectedIndex(index)
                        }}
                    >
                        <Image
                            style={[styles.arrowDownImage,{tintColor:colors.textColor}]}
                            source={require("../../../Assets/Images/arrow_dn.png")}
                        />
                    </TouchableOpacity>
                </View>
            );
        }
    }
    return (
        <Container style={{backgroundColor:colors.background}}>
            <View style={[styles.headerContainer]}>
                <TouchableOpacity onPress={() => navigation.pop()}>
                    <Image source={require('../../../Assets/Images/left.png')}
                        style={[styles.backArrow,{tintColor:colors.textColor}]} />
                </TouchableOpacity>
                <Text style={[styles.contact,{color:colors.textColor}]}>{I18n.t("FAQs")}</Text>
                <Text />
            </View>
            <FlatList
                data={data}
                renderItem={renderItemNmaz}
                keyExtractor={(item) => item.question}
            />
        </Container>
    )
}

function mapStateToProps(state)
{
    return {
        todos: state.user.Faqs,
    };
}

function mapDispatchToProps(dispatch)
{
    return {
        ...bindActionCreators({ fetching_faqs_request }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FAQS);
const styles = StyleSheet.create({
    headerContainer: {
        paddingTop: 30,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    backArrow: {
        width: 15,
        height: 15,
        resizeMode: 'contain'
    },
    contact: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    question: {
        paddingHorizontal:20,
        flex: 9,
        fontWeight: "bold",
        padding: 5,
    },
    arrowUpContainer: {
        flex: 1,
        alignItems: "center"
    },
    arrowUpimage: {
        height: 16,
        width: 16,
        resizeMode: "contain",
        flex: 1,
    },
    answer: {
        paddingHorizontal: 20,
        //fontWeight: "bold",
        fontSize:16
    },
    arrowDownContainer: {
        padding: 10,
        flexDirection: "row"
    },
    arrowDownText: {
        paddingHorizontal:20,
        fontWeight: "bold", flex: 9
    }, arrowDownImage: {
        height: 16,
        width: 16,
        resizeMode: "contain",
        flex: 1,
    }

})
