import React from 'react'
import { View, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Container, ResponsiveText } from '../../../Components';
import I18n from '../../../i18';
import { useTheme } from '@react-navigation/native';

export default function TermsAndConditions({ navigation })
{
    const colors = useTheme().colors;
    return (
        <Container>
            <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.pop()}>
                        <Image source={require('../../../Assets/Images/left.png')}
                            style={[styles.backArrow, { tintColor: colors.textColor }]} />
                    </TouchableOpacity>
                    <ResponsiveText style={[styles.editQadah, { color: colors.textColor }]}>{I18n.t("Terms & Conditions")}</ResponsiveText>
                    <ResponsiveText />
                </View>
                <View style={styles.textContainer}>
                    <ResponsiveText style={{color:colors.textColor}}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </ResponsiveText>
                   <ResponsiveText style={{color:colors.textColor}}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </ResponsiveText>
                  <ResponsiveText style={{color:colors.textColor}}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </ResponsiveText>
                </View>
            </ScrollView>
        </Container>
    )
}


const styles = StyleSheet.create({
    headerContainer: {
        paddingTop: 30,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    backArrow: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    },
    editQadah: {
        fontSize: 6,
        fontWeight: 'bold',
    },
    textContainer: {
        padding: 20,
        fontSize: 6
    }
})