import React, { useState, useEffect } from "react";
import I18n from "../i18";
import {
	View,
	Text,
	Modal,
	ImageBackground,
	TouchableOpacity,
	ScrollView,
	Image,
	StyleSheet,
	Pressable,
	Dimensions,
} from "react-native";
import axios from "axios";
import { Container, ResponsiveText } from "../Components";
import { useTheme } from "@react-navigation/native";
import moment from "moment-hijri";
import { arabicMonth } from "../Components/dummyData";
import { useSelector } from "react-redux";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import config from "../../config.json";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Fast = ({ navigation, route }) => {
	const [date, setDate] = useState("16 July, 2021");
	const [hijridate, setHijriDate] = useState("12 Ramadan, 1442");
	const [modalVisible, setModalVisible] = useState(false);
	const [totalFast, setTotalFast] = useState(0);
	const [completed, setCompletedFast] = useState(0);
	const [todayfast, setTodayFast] = useState(0);
	let completedFasts = totalFast - completed;

	const userdata = useSelector((state) => state.user);
	const colors = useTheme().colors;

	useEffect(() => {
		var date1 = new Date().getDate();
		var months = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];
		var d = new Date();
		var monthName = months[d.getMonth()];
		var year = new Date().getFullYear();
		let today = date1 + " " + monthName + ", " + year;
		setDate(today);

		var hijriDate = moment().format("iD");
		var hijriMonth = moment().format("iM");
		var hijriYear = moment().format("iYYYY");
		var someStr = JSON.stringify(arabicMonth[Number(hijriMonth - 1)].value);
		var month = someStr.replace(/['"]+/g, "");
		var hijridateFormate = hijriDate + " " + month + ", " + hijriYear;
		console.log(`hijridateFormate`, hijridateFormate);
		setHijriDate(hijridateFormate);

		const unsubscribe = navigation.addListener("focus", () => {
			getFasts();
		});

		return unsubscribe;
	}, [navigation]);

	const getFasts = () => {
		axios
			.post(
				config.base_url + "users/fasts",
				{},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${userdata.user.token}`,
					},
				}
			)
			.then(
				(response) => {
					let count = response.data.data[0].count;
					let total = response.data.data[0].totalFastCount;
					setCompletedFast(count);
					setTodayFast(count);
					setTotalFast(total);
				},
				(error) => {
					console.log(error);
				}
			)
			.catch((error) => {
				console.error("goal /exercise data", error);
			});
	};

	const handleSave = () => {
		var date = new Date();
		axios
			.put(
				config.base_url + "users/fasts",
				{
					count: todayfast,
					activityDate:
						date.toISOString().split("T")[0] + " " + date.toLocaleTimeString(),
				},

				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${userdata.user.token}`,
					},
				}
			)
			.then(
				(response) => {
					console.log(`response fast======>`, response);
					if (response.data) {
						getFasts();
					}
				},
				(error) => {
					console.log(error.response);
				}
			)
			.catch((error) => {
				console.error("goal /exercise data", error);
			});
	};
	console.log("till", Math.round((completed / totalFast) * 100));
	return (
		<Container>
			<View style={{ height: "40%" }}>
				{colors.darkbackground ? (
					<ImageBackground
						source={require("../Assets/Images/night_half_bg.png")}
						resizeMode="cover"
						style={styles.imageBackground}>
						<View style={{ marginTop: 30 }}>
							<ResponsiveText style={styles.textIqadah}>
								{I18n.t("Fasts")}
							</ResponsiveText>
							<TouchableOpacity
								style={styles.addButton}
								onPress={() => setModalVisible(true)}>
								<ResponsiveText style={styles.plusButton}>+</ResponsiveText>
							</TouchableOpacity>
						</View>
					</ImageBackground>
				) : (
					<ImageBackground
						source={require("../Assets/Images/day.png")}
						resizeMode="cover"
						style={styles.imageBackground}>
						<View style={{ marginTop: 30 }}>
							<ResponsiveText style={styles.textIqadah}>
								{I18n.t("Fasts")}
							</ResponsiveText>
							<TouchableOpacity
								style={styles.addButton}
								onPress={() => setModalVisible(true)}>
								<ResponsiveText style={styles.plusButton}>+</ResponsiveText>
							</TouchableOpacity>
						</View>
					</ImageBackground>
				)}
				<View
					style={[
						styles.ramadanContainer,
						{ backgroundColor: colors.background },
					]}>
					<View style={styles.textView}>
						<View style={styles.ramadanView}>
							<ResponsiveText
								style={[styles.text, { color: colors.textColor }]}>
								{date}
							</ResponsiveText>
							<ResponsiveText
								style={[styles.text, { color: colors.textColor }]}>
								{hijridate}
							</ResponsiveText>
						</View>
						<View style={{ marginTop: 15 }}>
							<Image
								source={require("../Assets/Images/lamp.png")}
								resizeMode="contain"
								style={{ width: 100, height: 70 }}
							/>
						</View>
					</View>
				</View>
			</View>

			<ScrollView>
				<Modal
					animationType="slide"
					transparent={true}
					visible={modalVisible}
					onRequestClose={() => {
						Alert.alert("Modal has been closed.");
						setModalVisible(!modalVisible);
					}}>
					<View style={styles.centeredView}>
						<View
							style={[
								styles.modalView,
								{ backgroundColor: colors.background },
							]}>
							<Pressable
								style={styles.button}
								onPress={() => setModalVisible(!modalVisible)}>
								<Image
									style={{
										width: 20,
										height: 20,
										tintColor: colors.textColor,
									}}
									source={require("../Assets/Images/cancel.png")}
								/>
							</Pressable>
							<ResponsiveText
								style={[styles.complete, { color: colors.textColor }]}>
								Add fasts completed
							</ResponsiveText>
							<View style={styles.container}>
								<ResponsiveText
									style={[styles.namazName, { color: colors.textColor }]}>
									Fasts
								</ResponsiveText>
								<View style={styles.plusMinus}>
									<View style={styles.minusContainer}>
										<TouchableOpacity
											onPress={() => {
												setTodayFast(todayfast - 1);
												// setCompletedFast(completed - 1);
											}}
											style={{ flex: 1, alignItems: "center" }}>
											<Image
												style={styles.minusImage}
												source={require("../Assets/Images/minus.png")}
											/>
										</TouchableOpacity>
										<ResponsiveText style={{ color: colors.textColor }}>
											{todayfast}
										</ResponsiveText>
										<TouchableOpacity
											onPress={() => {
												setTodayFast(todayfast + 1);
												//setCompletedFast(completed + 1);
											}}
											style={{ flex: 1, alignItems: "center" }}>
											<Image
												style={styles.plusImage}
												source={require("../Assets/Images/plus.png")}
											/>
										</TouchableOpacity>
									</View>
								</View>
							</View>

							<TouchableOpacity
								onPress={() => {
									handleSave(), setModalVisible(false);
								}}
								style={styles.saveContainer}>
								<ResponsiveText style={styles.saveButton}>Save</ResponsiveText>
							</TouchableOpacity>
						</View>
					</View>
				</Modal>
				<View style={styles.graph}>
					<AnimatedCircularProgress
						rotation={0}
						size={170}
						width={15}
						fill={Math.round(((totalFast - completed) / totalFast) * 100)}
						duration={100}
						tintColor={"#6478D3"}
						onAnimationComplete={() => console.log("onAnimationComplete")}
						backgroundColor="#f1f3f8">
						{(fill) => (
							<View>
								<ResponsiveText
									style={[styles.remaningFasts, { color: colors.textColor }]}>
									{completed}
								</ResponsiveText>
								<ResponsiveText style={{ color: colors.textColor }}>
									{I18n.t("REMANING FASTS")}
								</ResponsiveText>
							</View>
						)}
					</AnimatedCircularProgress>
				</View>

				<View style={styles.totalFast}>
					<View>
						<Text style={[styles.count, { color: colors.textColor }]}>
							{totalFast}
						</Text>
						<ResponsiveText style={{ color: colors.textColor }}>
							{I18n.t("TOTAL FASTS")}
						</ResponsiveText>
					</View>
					<View>
						<Text
							style={[
								styles.quantity,
								{ color: "#5CB390", alignSelf: "flex-end" },
							]}>
							{completedFasts}
						</Text>
						<ResponsiveText style={{ color: colors.textColor }}>
							{I18n.t("COMPLETED FASTS")}
						</ResponsiveText>
					</View>
				</View>
			</ScrollView>
		</Container>
	);
};

export default Fast;

const styles = StyleSheet.create({
	mainContainer: {
		backgroundColor: "gray",
		padding: 10,
	},
	textIqadah: {
		alignSelf: "center",
		justifyContent: "center",
		color: "#fff",
		fontSize: 6,
	},
	imageBackground: {
		height: windowHeight * 0.4,
		resizeMode: "stretch",
		flex: 1,
	},
	graph: {
		marginTop: 120,
		justifyContent: "center",
		alignItems: "center",
	},
	addButton: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#5CB390",
		width: windowWidth * 0.15,
		height: windowWidth * 0.15,
		alignSelf: "center",
		position: "absolute",
		borderRadius: 30,
		marginTop: windowHeight * 0.1,
	},
	complete: {
		alignSelf: "center",
		fontSize: 4.5,
	},
	plusMinus: {
		height: 30,
		marginTop: 10,
		width: windowWidth * 0.4,
	},
	minusContainer: {
		flexDirection: "row",
		borderWidth: 0.3,
		borderRadius: 5,
		borderColor: "white",
		padding: 5,
		alignSelf: "flex-end",
	},
	plusImage: {
		flex: 1,
		height: 10,
		width: 10,
		tintColor: "gray",
		resizeMode: "contain",
	},
	minusImage: {
		height: 10,
		width: 10,
		flex: 1,
		resizeMode: "contain",
		tintColor: "gray",
	},
	count: {
		fontSize: 18,
		fontWeight: "bold",
	},
	plusButton: {
		fontSize: 8,
		color: "#fff",
	},
	quantity: {
		fontSize: 18,
		fontWeight: "bold",
	},
	ramadanContainer: {
		width: windowWidth * 0.9,
		padding: 10,
		top: windowHeight * 0.3,
		zIndex: 1,
		alignSelf: "center",
		borderRadius: 10,
		position: "absolute",
		elevation: 5,
	},
	textView: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	ramadanView: {
		alignSelf: "center",
		marginLeft: 10,
	},
	text: {
		marginTop: 10,
		fontSize: 4.5,
	},
	totalFast: {
		justifyContent: "space-between",
		flexDirection: "row",
		marginHorizontal: 20,
	},
	remaningFasts: {
		alignSelf: "center",
		fontSize: 18,
		fontWeight: "bold",
	},

	saveContainer: {
		bottom: 0,
		margin: 10,
		borderRadius: 30,
		width: windowWidth * 0.7,
		alignSelf: "center",
		backgroundColor: "#5CB390",
		marginTop: windowHeight * 0.1,
	},
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 20,
	},
	saveButton: {
		textAlign: "center",
		padding: 15,
		color: "#fff",
		width: "100%",
		fontWeight: "bold",
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalView: {
		width: 300,
		height: 300,
		margin: 20,

		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	button: {
		alignSelf: "flex-end",
	},

	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center",
	},
	namazName: {
		alignSelf: "center",
		fontSize: 4,
		paddingLeft: 30,
		marginRight: 10,
	},
});
