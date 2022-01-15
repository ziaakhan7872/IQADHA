import React, { useEffect, useState } from "react";
import
{
  StyleSheet,
  View,
  Image,
  ScrollView,
  Pressable,
  StatusBar,
  Switch,
  Modal,
  TouchableOpacity
} from "react-native";
import axios from "axios";
import { useTheme } from '@react-navigation/native';
import { useSelector, useDispatch } from "react-redux";
import Color from "../../Constants/Colors";
import { ResponsiveText, ResetModal } from '../../Components';
import { update_theme, signOut } from "../../store/actions";
import config from '../../../config.json';

const Settings = ({ navigation, index }) =>
{
  const { colors } = useTheme();
  // const [isEnabled, setIsEnabled] = useState(themeData=="light"?false:true);
  const dispatch = useDispatch();
  const toggleSwitch = () =>
  {
    setIsEnabled((previousState) => !previousState);
    if (themeData == "light")
    {
      dispatch(update_theme("dark"));
    } else
    {
      dispatch(update_theme("light"));
    }
  };
 
  const userdata = useSelector((state) => state.user);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setgender] = useState("");
  const [selectedField, setselectedField] = useState("");
  const themeData = useSelector((state) => state.user.theme);
  const [modalVisible, setModalVisible] = useState(false);
  const [resetOrignal, setResetOrignal] = useState(false);
   const [isEnabled, setIsEnabled] = useState(themeData=="light"?false:true);
  useEffect(() =>
  {
    loadProfileData();
  }, []);
  const updateProfile = (name_, email_, phone_, gender_) =>
  {
    axios
      .put(
        config.base_url+"users/profile",
        {
          name: name_,
          email: email_,
          phoneNumber: phone_,
          gender: gender_,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userdata.user ? userdata.user.token : ''}`,
          },
        }
      )
      .then(
        (response) =>
        {
          console.log(response);
        },
        (error) =>
        {
          console.log(error);
        }
      )
      .catch((error) =>
      {
        console.error("goal /exercise data", error);
      });
  };
  const loadProfileData = () =>
  {
    // setLoadingBarModel(true);
    axios
      .get(
        config.base_url+"users/profile",

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userdata.user ? userdata.user.token : ''}`,
          },
        }
      )
      .then(
        (response) =>
        {
          setname(response.data.data.name);
          setemail(response.data.data.email);
          setgender(response.data.data.gender);
          setPhoneNumber(response.data.data.phoneNumber);
        },
        (error) =>
        {
          console.log(error);
        }
      )
      .catch((error) =>
      {
        console.error("goal /exercise data", error);
      });
  };
  const callback = (count, value) =>
  {
    if (selectedField == "Name")
    {
      setname(value);
      updateProfile(value, email, phoneNumber, gender);
    } else if (selectedField == "Email")
    {
      setemail(value);
      updateProfile(name, value, phoneNumber, gender);
    } else if (selectedField == "Phone Number")
    {
      setPhoneNumber(value);
      updateProfile(name, email, value, gender);
    } else if (selectedField == "Gender")
    {
      setgender(value);
      updateProfile(name, email, phoneNumber, value);
    }
    setProfileSettingModal(false);
  };
  const funcSignOut = () => {
    dispatch(signOut());

    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };
  return (
    <View style={styles.flexview}>
      <View>
        <StatusBar translucent backgroundColor={Color.primary_green} hidden={true} barStyle="light-content" />
      </View>
      <ScrollView>
        <View style={styles.mainContainer}>
          <ResponsiveText style={[styles.settings, { color: colors.textColor }]}> Settings </ResponsiveText>


          <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Premium')}>
            <ResponsiveText style={[styles.textContainer, { color: colors.textColor }]}>Buy Premium</ResponsiveText>
            <Image source={require('../../Assets/Images/heart.png')}
              style={[styles.imgContainer, { tintColor: '#EF4B5F' }]} />
          </TouchableOpacity>

          <View style={styles.lineDraw} />

          <View style={styles.container}>
            <ResponsiveText style={[styles.textContainer, { color: colors.textColor }]}>Dark mode</ResponsiveText>
            
            <Switch
              trackColor={{ false: "#767577", true: Color.primary_green }}
              thumbColor={isEnabled ? Color.white : Color.white}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
   
          </View>
          <View style={styles.lineDraw} />

          <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Account')}>
            <ResponsiveText style={[styles.textContainer, { color: colors.textColor }]}>Account</ResponsiveText>

            <Image source={require('../../Assets/Images/next.png')}
              style={[styles.imgContainer, { tintColor: colors.textColor }]} />
          </TouchableOpacity>

          <View style={styles.lineDraw} />
          <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Notifications')}>
            <ResponsiveText style={[styles.textContainer, { color: colors.textColor }]}>Notifications</ResponsiveText>
            <Image source={require('../../Assets/Images/next.png')}
              style={[styles.imgContainer, { tintColor: colors.textColor }]} />
          </TouchableOpacity>

          <View style={styles.lineDraw} />
          <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('EditQadhaPrayers')}>
            <ResponsiveText style={[styles.textContainer, { color: colors.textColor }]}>Edit Qadha Prayers</ResponsiveText>
            <Image source={require('../../Assets/Images/next.png')}
              style={[styles.imgContainer, { tintColor: colors.textColor }]} />
          </TouchableOpacity>

          <View style={styles.lineDraw} />
          <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('EditFastsSettings')}>
            <ResponsiveText style={[styles.textContainer, { color: colors.textColor }]}>Edit Fasts</ResponsiveText>
            <Image source={require('../../Assets/Images/next.png')}
              style={[styles.imgContainer, { tintColor: colors.textColor }]} />
          </TouchableOpacity>

          <View style={styles.lineDraw} />

          <TouchableOpacity style={styles.container} onPress={() => setResetOrignal(true)}>
            <ResponsiveText style={[styles.textContainer, { color: colors.textColor }]}>Reset to Orignal</ResponsiveText>
            <Image source={require('../../Assets/Images/next.png')}
              style={[styles.imgContainer, { tintColor: colors.textColor }]} />
          </TouchableOpacity>

          <View style={styles.lineDraw} />
          <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('About')}>
            <ResponsiveText style={[styles.textContainer, { color: colors.textColor }]}>About</ResponsiveText>
            <Image source={require('../../Assets/Images/next.png')}
              style={[styles.imgContainer, { tintColor: colors.textColor }]} />
          </TouchableOpacity>

          {modalVisible ?
            <View style={styles.centeredView}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() =>
                {
                  console.log("Modal has been closed.");
                  setModalVisible(!modalVisible);
                }}
              >
                <View style={styles.centeredView}>
                  <View style={[styles.modalView, { backgroundColor: colors.background }]}>
                    <Pressable
                      style={styles.btnmodal}
                      onPress={() => setModalVisible(!modalVisible)}
                    >
                      <Image source={require('../../Assets/Images/cancel.png')}
                        style={[styles.cancelImage, { tintColor: colors.textColor }]} />
                    </Pressable>
                    <ResponsiveText style={[styles.modalText, { color: colors.textColor }]}>
                      All your data is saved on iQadha Cloud. You can sign in anytime again in
                      the feature online or via this app
                    </ResponsiveText>
                    <TouchableOpacity style={styles.signOut} onPress={() => funcSignOut()}>
                      <ResponsiveText style={{ color: '#fff' }}>SIGN OUT</ResponsiveText>
                    </TouchableOpacity>
                  </View>

                </View>
              </Modal>
            </View>
            : null
          }
          <View style={styles.lineDraw} />
          <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('FAQS')}>
            <ResponsiveText style={[styles.textContainer, { color: colors.textColor }]}>FAQs</ResponsiveText>

            <Image source={require('../../Assets/Images/next.png')}
              style={[styles.imgContainer, { tintColor: colors.textColor }]} />
          </TouchableOpacity>

          <View style={styles.lineDraw} />
          <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('ContactInfo')}>
            <ResponsiveText style={[styles.textContainer, { color: colors.textColor }]}>Contact Info</ResponsiveText>
            <Image source={require('../../Assets/Images/next.png')}
              style={[styles.imgContainer, { tintColor: colors.textColor }]} />
          </TouchableOpacity>

          <View style={styles.lineDraw} />
          <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('TermsAndConditions')}>
            <ResponsiveText style={[styles.textContainer, { color: colors.textColor }]}>Terms & Conditions</ResponsiveText>

            <Image source={require('../../Assets/Images/next.png')}
              style={[styles.imgContainer, { tintColor: colors.textColor }]} />
          </TouchableOpacity>

          <View style={styles.lineDraw} />
          <TouchableOpacity style={styles.container} onPress={() => setModalVisible(true)}>
            <ResponsiveText style={[styles.textContainer, { color: colors.textColor }]}>Sign out</ResponsiveText>

            <Image source={require('../../Assets/Images/next.png')}
              style={[styles.imgContainer, { tintColor: colors.textColor }]} />
          </TouchableOpacity>

          <View style={styles.lineDrawSignOut} />
        </View>
        <ResetModal
          resetOrignal={resetOrignal}
          CloseModal={() => setResetOrignal(false)}
          navigation={navigation}

        />

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  flexview: {
    flex: 1,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: 'space-between'
  },
  mainContainer: {
    flex: 1,
    padding: 20
  },
  darkMode: {
    color: Color.dark_grey,
    fontSize: 14,
    fontWeight: "bold"
  },
  settings: {
    fontSize: 6,
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textContainer: {
    fontSize: 4.5,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: Color.dark_grey
  },
  imgContainer: {
    alignSelf: 'center',
    width: 20,
    height: 20,
  },
  lineDraw: {
    marginVertical: 20,
    width: '100%',
    height: 1,
    backgroundColor: "#F1F3F8",
  },
  lineDrawSignOut: {
    marginTop: 20,
    width: '100%',
    height: 1,
    backgroundColor: "#F1F3F8",
  },

  modalView: {
    margin: 20,
    borderRadius: 20,
    width: '80%',
    paddingVertical: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  btnmodal: {
    width: 50,
    padding: 10,
    justifyContent: 'flex-end',
    alignSelf: 'flex-end'
  },
  modalText: {
    fontSize: 4,
    textAlign: "center",
    marginHorizontal: 30,
  },
  cancelImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain'
  },
  signOut: {
    backgroundColor: '#5CB390',
    width: '80%',
    padding: 15,
    alignItems: 'center',
    marginTop: 50,
    borderRadius: 30
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal:5

  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Settings;
