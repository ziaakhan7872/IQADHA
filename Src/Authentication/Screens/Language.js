import React, { useEffect, useState } from "react";
import {
	Text,
	StyleSheet,
	View,
	Image,
	SafeAreaView,
	LogBox,
	Pressable,
	Dimensions
} from "react-native";
import I18n from "../../i18";
import { Picker } from "@react-native-picker/picker";
import Colors from "../../Constants/Colors";

const windowWidth = Dimensions.get('window').width;

const Language = ({ navigation, index }) => {
	const [language, setlanguage] = useState(false);
	console.log("language", language);
	useEffect(() => {
		LogBox.ignoreLogs(["Animated: `useNativeDriver`"]);
	}, []);

	const changelanguage = (itemValue) => {
		console.log('itemValue',itemValue);
		if (itemValue == "English") {
			console.log("Selected language english");
			I18n.locale = "en";
		} else {
			console.log("Selected language arabic");
			I18n.locale = "ar";
		}
		setlanguage(itemValue);
	};
	return (
		<View style={Style.flexview}>
			<SafeAreaView style={Style.header}>
				<View
					style={[
						Style.textformat1,
						{
							flex: 1,
							justifyContent: "center",
							alignItems: "center",
						},
					]}>
					<Image
						style={{
							height: "30%",
							width: "30%",
							resizeMode: "contain",
							tintColor: "white",
						}}
						source={require("../../Assets/Images/logo.png")}
					/>
				</View>

				<View
					style={{
						flex: 2,
						backgroundColor: "white",
						padding: 20,
						borderTopRightRadius: 20,
						borderTopLeftRadius: 20,
					}}>
					<Text
						style={{ textAlign: "center", fontSize: 18, fontWeight: "bold" }}>
						{I18n.t("Select language")}
					</Text>

					<View style={Style.pickerContainer}>
						<Picker
						style={Style.pickerStyle}
						selectedValue={language}
						onValueChange={(itemValue) => changelanguage(itemValue)}>
						<Picker.Item label="English" value="English" />
						<Picker.Item label="Arabic" value="Arabic" />
					</Picker>
					</View>
					<Pressable
						onPress={() => {
							navigation.navigate("Login");
						}}
						style={{
							backgroundColor: Colors.primary_green,
							width: "100%",
							height: 50,
							marginTop: 30,
							justifyContent: "center",
							borderRadius: 30,
						}}>
						<Text
							style={{
								color: Colors.white,
								textAlign: "center",
								fontSize: 18,
							}}>
							{I18n.t("BISMILLAH")}
						</Text>
					</Pressable>
				</View>
			</SafeAreaView>
		</View>
	);
};

const Style = StyleSheet.create({
	flexview: {
		flex: 1,
		backgroundColor: Colors.primary_green,
	},
	header: {
		flex: 1,
	},
	pickerStyle: {
		width: windowWidth * 0.85,
		
	},
	pickerContainer: {
		marginTop:20,
		borderColor: '#CDCDD7',
		borderWidth: 1,
		borderRadius: 30,
		paddingRight:10
	},
	textformat1: {
		color: Colors.white,
		fontWeight: "bold",
		fontSize: 18,
		textAlign: "center",
	},
	textformat2: {
		color: Colors.white,
		fontWeight: "bold",
		fontSize: 16,
		textAlign: "center",
	},
	dob_btn: {
		flex: 1,
		backgroundColor: Colors.secondary_green,
		margin: 20,
		justifyContent: "center",
	},
	dob_select: {
		flex: 1,
		backgroundColor: "white",
		justifyContent: "center",
		alignItems: "center",
	},
});

export default Language;
