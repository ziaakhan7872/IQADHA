import React, { useEffect, useState } from "react";
import
{
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
import {useDispatch } from "react-redux";
import I18n from "../../i18";
import Colors from "../../Constants/Colors";
import { Checkbox } from "react-native-paper";
import { ResponsiveText, Container, Icon } from "../../Components";
import { update_user_register_request } from "../../store/actions";

const Register = ({ navigation, index }) =>
{
  const dispatch = useDispatch();
  const [isMale, setMale] = useState(true);
  const [isFemale, setFemale] = useState(false);
  const [isFocused, setisFocused] = useState(false);
  const [isFocused2, setisFocused2] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
   const [hidePassword, sethidePassword] = useState(true);

  useEffect(() =>
  {
  }, []);

  const validate = (text) =>
  {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false)
    {
      console.log("Email is Not Correct");

      return false;
    } else
    {
      return true;
    }
  };
  const onFocus = (val) =>
  {
    console.log(`Register`, val)
    if (val == 1)
    {
      setisFocused(true);
    } else
    {
      setisFocused2(true);
    }
  };
  const onBlur = (val) =>
  {
    if (val == 1)
    {
      setisFocused(false);
    } else
    {
      setisFocused2(false);
    }
  };
  const callAlert = (error) =>
  {
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

  const signup = () =>
  {
    console.log('button press');
    if (validate(email) == true)
    {
      if (password.length >= 6)
      {
        
        let data = {
          email: email,
          password: password,
          gender: isMale == true ? "male" : "feMale",
        };
        dispatch(update_user_register_request(data));
        navigation.navigate("PreRememberQadha", {
          email,
          password,
          gender: isMale == true ? "male" : "feMale",
        });
      } else
      {
        callAlert("Password Length should be greater then 6");
      }
    } else
    {
      callAlert("Invalid Email Format");
    }
  };
  const managePasswordVisibility = () =>
	{
    sethidePassword(!hidePassword)
	};

  return (
    <Container>
      <ScrollView style={{ backgroundColor: Colors.primary_green }}>
        <View style={Style.mainContainer}>
          <Image
            style={Style.logoStyle}
            source={require("../../Assets/Images/logo.png")}
          />
        </View>
        <View style={Style.signUpContainer}>
          <ResponsiveText style={Style.loginInfo}>
            {I18n.t("Login_NoAccount_Title")}
          </ResponsiveText>
          <ResponsiveText style={Style.emailText}>{I18n.t("E-mail")}</ResponsiveText>
          <View
            style={
              ({
                borderRadius: 20,
              },
                [
                  Style.textInput_border,
                  {
                    borderColor:
                      isFocused == true ? '#C84040' : Colors.grey,
                  },
                ])
            }
          >
            <TextInput
              onBlur={() => onBlur(1)}
              onFocus={() => onFocus(1)}
              multiline={false}
              value={email}
              style={[Style.text_input]}
              onChangeText={(e) => setemail(e)}
              placeholderTextColor={'#393939'}
               placeholder={"ebizimirli@marier.com"}
            />
          </View>
          <Text style={Style.passText}>Password</Text>
          <View
            style={[
              Style.textInput_border,
              {
                borderColor:
                  isFocused2 == true ? '#C84040' : Colors.grey,
              },
            ]}
          >
            <View style={{flexDirection:'row'}}>
            <TextInput
            onBlur={() => onBlur(2)}
            onFocus={() => onFocus(2)}
            value={password}
            placeholder="* * * * * * * *"
              style={{width:'90%',paddingLeft:15,color:'#383838'}}
            onChangeText={(e) => setpassword(e)}
            placeholderTextColor={'#383838'}
            secureTextEntry={hidePassword}
            />
            <TouchableOpacity style={{alignSelf:'center'}} onPress={managePasswordVisibility}>
									<Image
										source={
                    hidePassword
												?require("../../Assets/Images/eyehide.png")
												: require("../../Assets/Images/eyeshow.png")
										}
                style={{ width: 20, height: 20 }}
									/>
							</TouchableOpacity>
            
          </View>
          </View>

          <View style={Style.touchableContainer}>
            <TouchableOpacity
              onPress={() =>
              {
                setMale(true);
                setFemale(false);
              }}
              style={Style.choiceContainer}
            >
              <ResponsiveText style={Style.male}>Male</ResponsiveText>
              <Checkbox
                color={`#FA4616`}
                status={isMale == true ? "checked" : "unchecked"}
                onPress={() =>
                {
                  setMale(true);
                  setFemale(false);
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
              {
                setFemale(!isFemale), setMale(false);
              }}
              style={Style.female}
            >
              <ResponsiveText style={Style.femaleText}>Female</ResponsiveText>
              <Checkbox
                 color={`#FA4616`}
                status={isFemale == true ? "checked" : "unchecked"}
                onPress={() =>
                {
                  setFemale(!isFemale), setMale(false);
                }}
              />
            </TouchableOpacity>
          </View>
          <Pressable
            style={Style.signinButton}
            onPress={() =>
            {
              signup();
            }}
          >
            <ResponsiveText style={Style.signUp}>{I18n.t('SignupButton')}</ResponsiveText>
          </Pressable>
          <View style={Style.account}>
            <ResponsiveText style={{ color: Colors.black }}>
              Already have an account ?
            </ResponsiveText>
            <Text
              style={{ color: Colors.black, marginLeft: 5, fontWeight: 'bold' }}
              onPress={() =>
              {
                navigation.navigate("Login");
              }}
            >
              Sign in
            </Text>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

const Style = StyleSheet.create({
  flexview: {
    flex: 1,
    backgroundColor:'red'
  },
  emailText: {
    color: "#383838",
    paddingTop: 20,
    fontSize: 4,
    paddingLeft: 10,
  },
  logoView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10%",
  },
  signUp: {
    textAlign: "center",
    color: Colors.white,
    fontSize: 5,
    flexDirection: "row",
  },
  femaleText: {
    color: '#383838',
    fontSize: 4,
    marginLeft:10
  },
  male: {
    color: '#383838',
    fontSize: 4,
    marginLeft:10
  },
  female: {
    flex: 1,
    borderColor: "#383838",
    borderWidth: 0.5,
    borderRadius: 5,
    margin: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  account: {
    flex: 1,
    flexDirection: "row",
    paddingTop: 35,
    paddingBottom: 60,
    alignSelf: "center",
  },
  choiceContainer: {
    flex: 1,
    borderColor: "#383838",
    borderWidth: 0.5,
    borderRadius: 5,
    margin: 5,
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "center",
  },
  passwordContainer: {
    flexDirection: "row",
    borderRadius: 30,
    borderWidth: 0.5,
    borderColor: Colors.grey,
  },
  passText: {
    color: "#383838",
    paddingTop: 20,
    paddingLeft: 10,
  },
  loginInfo: {
    textAlign: "center",
    fontSize: 5,
    fontWeight: "bold",
  },
  mainContainer: {
    height: Dimensions.get("window").height / 3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary_green,
  },
  touchableContainer: {
    flexDirection: "row",
    height: 50,
    marginTop: 20,
  },
  signUpContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: Colors.white,
    bottom: 0,
    position:'relative'

  },
  logoStyle: {
    height: "30%",
    width: "30%",
    resizeMode: "contain",
    tintColor: "white",
  },
  Imageview: {
    width: "33%",
    height: "33%",
    resizeMode: "contain",
  },
  signinButton: {
    justifyContent: "center",
    marginTop: 50,
    borderRadius: 30,
    backgroundColor: Colors.primary_green,
    width: "100%",
    padding: 15,
  },
  dv_height: {
    height: Dimensions.get("window").height,
    backgroundColor: Colors.primary_green,
  },
  dv_width: {
    width: Dimensions.get("window").width,
  },
  textInput_border: {
    marginTop: 10,
    borderWidth: 1,
    height: 50,
    borderRadius: 30,
  },
  text_input: {
    marginBottom: 10,
    paddingLeft: 15,
    height: 50,
    width: "100%",
    fontSize: 16,
    color:'#383838',
  },
});

export default Register;
