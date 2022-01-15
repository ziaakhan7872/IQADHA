import React, { useEffect, useState } from "react";
import {
	Text,
	StyleSheet,
	View,
	TouchableOpacity,
	Image,
	TextInput,
	ScrollView,
	Dimensions,
	Alert,
	Pressable,
} from "react-native";
import ForgetPassword from "../../PopupModels/ForgetPassword";
import { update_user_request, update_theme } from "../../store/actions";
import {useDispatch } from "react-redux";
import axios from "axios";
import I18n from "../../i18";
import Colors from "../../Constants/Colors";
import config from '../../../config.json';

const Login = ({ navigation, index }) => {
	const dispatch = useDispatch();
	const [forgetPassModel, setforgetPassModel] = useState(false);
	const [email, setemail] = useState("");
	const [password, setpassword] = useState("");
	const [LoadingBarModel, setLoadingBarModel] = useState(false);
	const [isFocused, setisFocused] = useState(false);
	const [isFocused2, setisFocused2] = useState(false);
	const [hidePassword, sethidePassword] = useState(true);

	useEffect(() => {
	}, []);
	const callback = (count) => {
		setforgetPassModel(false);
	};

	const onFocus = (val) => {
		if (val == 1) {
			setisFocused(true);
		} else {
			setisFocused2(true);
		}
	};
	const onBlur = (val) => {
		if (val == 1) {
			setisFocused(false);
		} else {
			setisFocused2(false);
		}
	};
	const callAlert = (error) => {
		Alert.alert(
			"IQADHA",
			error,
			[
				{
					text: "OK",
					onPress: () => console.log("Yes pressed"),
				},
			],
			{ cancelable: false }
		);
	};
	const validate = (text) => {
		console.log(text);
		let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
		if (reg.test(text) === false) {
			return false;
		} else {
			return true;
		}
	};
	const signin = () => {
		setLoadingBarModel(true);
		if (validate(email) == true)
		{
			axios
				
				.post(
					config.base_url+"users/login",
					{
						email: email,
						password: password,
					},
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				)
				.then(
					(response) => {
						const statusCode = response.status;
						console.log(statusCode);
						if (statusCode == 200) {
							dispatch(update_user_request(response.data));
							dispatch(update_theme("light"));
							navigation.navigate("Tabs", { tabname: "PrayQadha" });

							setLoadingBarModel(false);
						} else {
							setLoadingBarModel(false);
							callAlert("Invalid Email or Password");
						}
					},
					(error) => {
						setLoadingBarModel(false);
						callAlert("Invalid Email or Password");
					}
				)
				.catch((error) => {
					console.error("goal /exercise data", error);
				});
			//
		} else {
			setLoadingBarModel(false);
			callAlert("Invalid Email Format");
		}
	};

	const managePasswordVisibility = () => {
		sethidePassword(!hidePassword);
	};
	return (
		<ScrollView style={{ backgroundColor: Colors.white }}>
			<ForgetPassword show={forgetPassModel} parentCallback={callback} />
			<View
				style={{
					height: Dimensions.get("window").height / 3,
					justifyContent: "center",
					alignItems: "center",
					backgroundColor: Colors.primary_green,
				}}>
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
					padding: 20,
					borderRadius: 20,
					marginTop: -20,
					backgroundColor: Colors.white,
				}}>
				<Text style={{ textAlign: "center", fontSize: 18, fontWeight: "bold" }}>
					{I18n.t("Login_CTA")}
				</Text>
				<Text style={{ color: "#383838", paddingTop: 20 }}>
					{" "}
					{I18n.t("E-mail")}
				</Text>
				<View
					style={
						({
							borderRadius: 20,
						},
						[
							Style.textInput_border,
							{
								borderColor: isFocused == true ? "#C84040" : Colors.grey,
							},
						])
					}>
					<TextInput
						onBlur={() => onBlur(1)}
						onFocus={() => onFocus(1)}
						multiline={false}
						value={email}
						style={Style.text_input}
						onChangeText={(e) => setemail(e)}
						placeholderTextColor={"#383838"}
						placeholder={"ebizimirli@marier.com"}
					/>
				</View>
				<Text style={{ color: "#383838", paddingTop: 20 }}>
					{I18n.t("Password")}
				</Text>
				<View
					style={[
						Style.textInput_border,
						{
							borderColor: isFocused2 == true ? "#C84040" : Colors.grey,
						},
					]}>
					<View style={{ flexDirection: "row" }}>
						<TextInput
							onBlur={() => onBlur(2)}
							onFocus={() => onFocus(2)}
							value={password}
							placeholder="* * * * * * * *"
							style={{ width: "90%",color:'#383838',paddingLeft:15 }}
							onChangeText={(e) => setpassword(e)}
							placeholderTextColor={"#383838"}
							secureTextEntry={hidePassword}
						/>
						<TouchableOpacity
							style={{ alignSelf: "center" }}
							onPress={managePasswordVisibility}>
							<Image
								source={
									hidePassword
										? require("../../Assets/Images/eyehide.png")
										: require("../../Assets/Images/eyeshow.png")
								}
								style={{ width: 20, height: 20 }}
							/>
						</TouchableOpacity>
					</View>
				</View>
				<Pressable
					style={{
						flex: 1,
						alignItems: "flex-end",
					}}
					onPress={() => {
						setforgetPassModel(true);
					}}>
					<Text
						style={{
							flex: 1,
							textAlign: "center",
							color: "#383838",
							fontSize: 14,
							marginTop: 30,
						}}>
						{I18n.t("ForgotPassword")}
					</Text>
				</Pressable>
				<Pressable
					style={Style.signinButton}
					onPress={() => {
						signin();
					}}>
					<Text
						style={{
							textAlign: "center",
							color: Colors.white,
							fontSize: 18,
						}}>
						{I18n.t("SignInButton")}
					</Text>
				</Pressable>
				<View
					style={{
						alignItems: "center",
						paddingTop: 20,
						flexDirection: "row",
						justifyContent: "center",
					}}>
					<Text style={{ color: Colors.dark_grey }}>
						Don't have an account?   
					</Text>
					
					<Text
						style={{ color: "#000", fontWeight: "bold" }}
						onPress={() => {
							navigation.navigate("Register");
						}}>
						 {'  '}Sign Up
					</Text>
				</View>
			</View>
		</ScrollView>
	);
};

const Style = StyleSheet.create({
	flexview: {
		flex: 1,
	},
	logoView: {
		justifyContent: "center",
		alignItems: "center",
		marginTop: "10%",
	},
	textInput_border: {
		marginTop: 10,
		borderWidth: 1,
		height: 50,
		borderRadius: 30,
	},
	Imageview: {
		width: "33%",
		height: "33%",
		resizeMode: "contain",
	},
	text_input: {
		marginBottom: 10,
		paddingLeft: 15,
		height: 50,
		width: "100%",
		fontSize: 16,
		color: "#383838",
	},
	signinButton: {
		justifyContent: "center",
		marginTop: 30,
		borderRadius: 20,
		backgroundColor: Colors.primary_green,
		width: "100%",
		height: 50,
	},
	dv_height: {
		height: Dimensions.get("window").height,
	},
	dv_width: {
		width: Dimensions.get("window").width,
	},
});

export default Login;
