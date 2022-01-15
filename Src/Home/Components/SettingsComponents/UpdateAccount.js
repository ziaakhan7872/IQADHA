import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	Image,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import I18n from "../../../i18";
import { ResponsiveText } from "../../../Components";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Input from "./TextInput";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import LoadingBar from "../../../PopupModels/LoadingBar";
import config from '../../../../config.json';

export default function UpdateAccount({ navigation }) {
	const colors = useTheme().colors;
	const userdata = useSelector((state) => state.user);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [gender, setGender] = useState("");
	const [alertView, setalertView] = useState(false);
	const [LoadingBarModel, setLoadingBarModel] = useState(false);

	useEffect(() => {
		handlegetData();
	}, []);

	const handlegetData = () =>
	{
		 setLoadingBarModel(true);
		axios
			.get(
				config.base_url+"users/profile",
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
					console.log('response',response);
					setEmail(response.data.data.email);
					setGender(response.data.data.gender);
					setName(response.data.data.name);
					setPhone(response.data.data.phoneNumber);
					setLoadingBarModel(false);
				},
				(error) => {
					console.log(error);
					setLoadingBarModel(false);
				}
			)
			.catch((error) => {
				console.error("goal /exercise data", error);
				setLoadingBarModel(false);
			});
	};
	const handleUpdate = () => {
		axios
			.put(
				config.base_url+"users/profile",
				{
					name: name,
					email: email,
					phoneNumber: phone,
					gender: gender,
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
					console.log(`response update======>`, response);
					if (response.data) {
						handlegetData();
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
	
	const callback = () =>
	{
		setprayModal(false);
	}
	return (
		<ScrollView style={{ flex: 1 }}>
			 {LoadingBarModel == true ? (
        <LoadingBar show={LoadingBarModel} parentCallback={callback} />
      ) : null}
			<View style={styles.headerContainer}>
				<TouchableOpacity onPress={() => navigation.pop()}>
					<Image
						source={require("../../../Assets/Images/left.png")}
						style={[styles.backArrow, { tintColor: colors.textColor }]}
					/>
				</TouchableOpacity>
				<Text style={[styles.editQadah, { color: colors.textColor }]}>
					{I18n.t("UpdateAccount")}
				</Text>
				<Text />
			</View>
			<View style={styles.mainContainer}>
				<ResponsiveText style={styles.title}>NAME</ResponsiveText>
				<Input
					style={[styles.input,{color:colors.textColor}]}
					placeholder="Name"
					placeholderTextColor={colors.textColor}
					onChangeText={(name) => setName(name)}
					defaultValue={name}
					value={name}
				/>

				<ResponsiveText style={styles.title}>GENDER</ResponsiveText>
				<Input
					style={[styles.input,{color:colors.textColor}]}
					placeholder="Enter Gender"
					placeholderTextColor={colors.textColor}
					onChangeText={(gender) => setGender(gender)}
					defaultValue={gender}
					value={gender}
				/>

				<ResponsiveText style={styles.title}>Phone</ResponsiveText>
				<Input
					style={[styles.input,{color:colors.textColor}]}
					placeholder="Enter Phone Number"
					placeholderTextColor={colors.textColor}
					onChangeText={(phone) => setPhone(phone)}
					defaultValue={phone}
					value={phone}
					secureTextEntry={true}
				/>

				<ResponsiveText style={styles.title}>Email</ResponsiveText>
				<Input
					style={[styles.input,{color:colors.textColor}]}
					placeholder="Enter Email"
					placeholderTextColor={colors.textColor}
					onChangeText={(email) => setEmail(email)}
					defaultValue={email}
					value={email}
				/>
			</View>
			{alertView ? (
				<View style={styles.alert}>
					<Text numberOfLines={2} style={styles.alertText}>Are you sure to update ?</Text>
					<View style={styles.button}>
                        
                            <TouchableOpacity style={styles.cancel} onPress={()=>setalertView(false)}>
							<Text style={{color:'#fff'}}>CANCEL</Text>
						</TouchableOpacity>
                       
                        <TouchableOpacity style={styles.cancel} onPress={() => { handleUpdate() ,setalertView(false)}}>
							<Text style={{color:'#fff'}}>YES</Text>
						</TouchableOpacity>
                        
					</View>
				</View>
			) : null}
			<TouchableOpacity style={styles.update} onPress={()=>setalertView(true)} >
				<Text style={styles.updatetext}>UPDATE</Text>
			</TouchableOpacity>
		</ScrollView>
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
	editQadah: {
		fontSize: 18,
		fontWeight: "bold",
	},
	input: {
		paddingLeft: 15,
		width: "100%",
	},
	mainContainer: {
		paddingHorizontal: 20,
		paddingTop: hp(5),
	},
	title: {
		color: "#8D92A3",
		fontSize: 4.5,
		paddingLeft: 10,
	},
	name: {
		marginTop: hp(1),
		fontSize: 4.5,
	},
	bottomBorder: {
		width: wp(90),
		height: 1,
		borderColor: "#F1F3F8",
		marginTop: hp(3),
		borderBottomWidth: 1,
		marginBottom: hp(3),
	},
	update: {
		backgroundColor: "#5CB390",
		margin: 15,
		paddingVertical: 15,
		borderRadius: 30,
		alignItems: "center",
	},
	updatetext: {
		fontSize: 18,
		fontWeight: "200",
		color: "#fff",
	},
	alert: {
		backgroundColor: "#fafafa",
        height:200,
		position: "absolute",
		marginTop: 150,
		width: "90%",
		alignSelf: "center",
		alignItems: "center",
		borderRadius: 10,
		borderColor: "gray",
		borderWidth: 0.3,
	},
	button: {
		flex: 1,
		flexDirection: "row",
        justifyContent: "space-between",
        alignItems:'flex-end',
        width: '70%',
        marginBottom:50
    },
    alertText: {
        marginTop: 20,
        fontSize: 14,
        fontWeight:'bold'
    },
    cancel: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        width:100,
        backgroundColor: '#5CB390',
        borderRadius: 30,
        alignItems:'center'
        
        
    }
});
