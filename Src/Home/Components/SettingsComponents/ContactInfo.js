import React, { useState } from "react";
import
    {
        View,
        Text,
        ScrollView,
        Image,
        StyleSheet,
        TouchableOpacity,
        TextInput,
        Dimensions,
        Pressable
    } from "react-native";
import { Container, Button, Input } from "../../../Components";
import { useTheme } from "@react-navigation/native";
import I18n from "../../../i18";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
const windowHeight = Dimensions.get('window').height;

export default function ContactInfo({ navigation })
{
    const colors = useTheme().colors;
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [modal, setModal] = useState(true);

    const onPress = () =>
    {
        console.log("press");
        if (name.trim().length === 0)
        {
            setErrorMessage("Enter Name");
        } else if (email.trim().length === 0)
        {
            setErrorMessage("Enter Email");

        } else if (category.trim().length === 0)
        {
            setErrorMessage("Choose Category");
        }
        else if (description.trim().length === 0)
        {
            setErrorMessage("Write Description");
        } else
        {
            setErrorMessage("");
            setModal(true)
        }
    };
    return (
        <Container>
            <ScrollView
                style={{
                    flex: 1,
                    backgroundColor: colors.background,
                    paddingHorizontal: 20,
                }}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.pop()}>
                        <Image
                            source={require("../../../Assets/Images/left.png")}
                            style={[styles.backArrow, { tintColor: colors.textColor }]}
                        />
                    </TouchableOpacity>
                    <Text style={[styles.contact, { color: colors.textColor }]}>
                        {I18n.t("Contact")}
                    </Text>
                    <Text />
                </View>
                <View style={{ alignSelf: "center", marginTop: 40 }}>
                    <Image
                        source={require("../../../Assets/Images/logo.png")}
                        resizeMode="contain"
                        style={{ width: 100, height: 100 }}
                    />
                </View>

                <Text style={[styles.contactUs, { color: colors.textColor }]}>
                    For all support, contact us at
                </Text>
                <Text style={[styles.infoIqadah]}>info@iqadha.com</Text>
                <View>
                    <Text
                        style={{
                            color: errorMessage.length ? "red" : "transparent",
                            textAlign: "center",
                            marginVertical: 10,
                        }}>
                        {errorMessage.length ? errorMessage : null}
                    </Text>

                    <Text style={[styles.label, { color: colors.textColor }]}>Name</Text>
                    <Input
                        style={styles.input}
                        placeholder="Name"
                        placeholderTextColor={colors.textColor}
                        onChangeText={(name) => setName(name)}
                        defaultValue={name}
                    />
                    <Text style={[styles.label, { color: colors.textColor }]}>
                        E-mail
                    </Text>
                    <Input
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor={colors.textColor}
                        onChangeText={(email) => setEmail(email)}
                        defaultValue={email}
                    />
                    <Text style={[styles.label, { color: colors.textColor }]}>
                        Category
                    </Text>

                    <View style={styles.categoryContainer}>
                        <TextInput
                            style={styles.category}
                            placeholder="Category"
                            placeholderTextColor={colors.textColor}
                            onChangeText={(category) => setCategory(category)}
                            defaultValue={category}
                        />
                        <TouchableOpacity style={{ alignSelf: "center" }}>
                            <Image
                                style={[styles.Iconstyle, { tintColor: colors.textColor }]}
                                source={require("../../../Assets/Images/arrow_dn.png")}
                            />
                        </TouchableOpacity>
                    </View>
                    <Text style={[styles.label, { color: colors.textColor }]}>
                        Description
                    </Text>
                    <TextInput
                        style={styles.description}
                        multiline={true}
                        numberOfLines={10}
                        placeholder="Write description"
                        placeholderTextColor={colors.textColor}
                        onChangeText={(description) => setDescription(description)}
                        defaultValue={description}
                    />
                </View>
                <Button
                    title={"SUBMIT"}
                    color="#4EAA81"
                    borderWidth={1}
                    fontColor="#FFFFFF"
                    _onPress={onPress}
                    btnContainer={{
                        marginTop: 20,
                    }}
                />
                {modal ?
                    <View style={[styles.modalStyle, { backgroundColor: colors.background }]}>
                        <Pressable style={styles.circle}>
                            <Image source={require('../../../Assets/Images/checkmark.png')}
                                resizeMode="contain"
                                style={{ width: 50, height: 50 }} />
                        </Pressable>
                        <Text style={{ marginTop: 10 }}>Your query is submitted</Text>
                        <Pressable onPress={() => setModal(false)} style={styles.okButton}>

                            <Text style={{ color: '#fff' }}>OK</Text>
                        </Pressable>
                    </View> : null}
            </ScrollView>
        </Container>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        paddingTop: 30,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    backArrow: {
        width: 20,
        height: 20,
        resizeMode: "contain",
    },
    contact: {
        fontSize: 20,
        fontWeight: "bold",
    },
    input: {
        paddingLeft: 15,
        width: '100%',
    },
    Iconstyle: {
        width: 15,
        height: 15,
    },
    description: {
        height: 100,
        borderColor: "#E6E6E6",
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 10,
        justifyContent: "flex-start",
        textAlignVertical: "top",
        paddingLeft: 10,
    },
    label: {
        paddingLeft: 5,
    },
    category: {
        width: wp(80),
        paddingLeft: 10,
    },
    categoryContainer: {
        flexDirection: "row",
        borderColor: "#E6E6E6",
        borderWidth: 1,
        borderRadius: 30,
        marginBottom: 30,
        marginTop: 10,
    },
    contactUs: {
        alignSelf: "center",
    },
    infoIqadah: {
        alignSelf: "center",
        color: "#5CB390",
        fontWeight: "bold",
    },
    modalStyle: {
        paddingHorizontal: 50,
        paddingVertical: 50,
        position: 'absolute',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        top: windowHeight * 0.35,
        zIndex: 1,
        borderRadius: 10,
        elevation: 5
    },
    circle: {
        borderWidth: 10,
        borderColor: '#6A549D',
        width: 200,
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100
    },
    okButton: {
        marginTop: 30,
        width: '100%',
        backgroundColor: '#5CB390',
        paddingVertical: 15,
        alignItems: 'center',
        borderRadius: 30
    }
});
