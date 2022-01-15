import React from "react";
import {
  StyleSheet,
  View,
  Image,
  StatusBar,
  Linking,
} from "react-native";
import LottieView from "lottie-react-native";
import Amplify, { Auth } from "aws-amplify";
import axios from "axios";
import awsconfig from "../../../aws-exports";
import config from "../../../config.json";
import colors from "../../Constants/colors";
Amplify.configure(awsconfig);
const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? 45 : StatusBar.currentHeight;
class StatusBar extends React.Component {
  async componentDidMount() {
    Linking.addEventListener("url", this.handleOpenURL);
  }

  homefunction = (email) => {
    this.setState({ loader: true });
    axios
      .post(
        config.baseurl + "mobileApp-Home",
        {
          email: email,
        },

        {
          headers: {
            "Content-Type": "text/plain",
          },
        }
      )
      .then(
        (response) => {
          this.setState({
            loader: false,
          }),
            this.props.navigation.navigate("Home", {});
        },
        (error) => {
          console.log(error);
        }
      );
  };
  googlesignup(data) {
    this.homefunction(data.idToken.payload.email);
  }
  componentWillUnmount() {
    Linking.removeEventListener("url", this.handleOpenURL);
  }

  handleOpenURL = (event) => {
    console.log("fine", this.state.registrationSource);

    if (this.state.registrationSource == "facebook") {
      console.log("here");
      Auth.currentSession().then((data) => {
        console.log(data.idToken.payload.email);
        this.homefunction(data.idToken.payload.email);
      });
    }
    this.setState({
      registrationSource: "",
    });
  };

  toggleUserType(type) {
    if (type == "Athlete") {
      this.setState({
        selectedAthlete: true,
        selectedTrainer: false,
        selected: "Athlete",
      });
    } else {
      this.setState({
        selectedAthlete: false,
        selectedTrainer: true,
        selected: "Trainer",
      });
    }
  }
  imageViewAthlete() {
    if (this.state.selectedAthlete == true) {
      return (
        <Image
          style={[Style.selecticon]}
          source={require("../../Assets/images/plan_selected.png")}
        />
      );
    } else {
      return <View style={Style.notselected}></View>;
    }
  }
  imageViewTrainer() {
    if (this.state.selectedTrainer == true) {
      return (
        <Image
          style={[Style.selecticon]}
          source={require("../../Assets/images/plan_selected.png")}
        />
      );
    } else {
      return <View style={Style.notselected}></View>;
    }
  }
  lottieview = () => {
    if (this.state.loader == true) {
      return (
        <LottieView
          style={{
            position: "absolute",
            flex: 1,
            zIndex: 1,
            top: 70,
            left: 70,
            right: 70,
            bottom: 70,
            justifyContent: "center",
            alignItems: "center",
          }}
          source={require("../../Assets/Animations/9825-loading-screen-loader-spinning-circle.json")}
          autoPlay
          loop
        />
      );
    }
  };
  render() {
    return (
      <View style={Style.flexview}>
        <View
          style={{
            height: STATUS_BAR_HEIGHT,
            backgroundColor: colors.primary_blue,
          }}
        >
          <StatusBar
            translucent
            backgroundColor={colors.primary_red}
            barStyle="light-content"
          />
        </View>
      </View>
    );
  }
}

const Style = StyleSheet.create({
  texttype: {
    paddingLeft: 5,
    fontSize: 18,
  },
  typeselectedview: {
    flexDirection: "row",
  },
  LoginHead: { padding: 10 },
  selectedType: {
    marginTop: 5,
    width: 15,
    height: 15,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: colors.primary_blue,
    backgroundColor: colors.primary_blue,
  },
  notselected: {
    marginTop: 5,
    width: 20,
    height: 20,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: colors.primary_blue,
    backgroundColor: "white",
  },
  flexview: {
    flex: 1,
  },
  fb_btn: {
    backgroundColor: colors.primary_blue,
    color: colors.white,
    borderRadius: 10,
    margin: 15,
    marginTop: 25,
    flexDirection: "row",
  },
  google_btn: {
    elevation: 50,
    backgroundColor: colors.white,
    color: colors.white,
    borderRadius: 10,
    margin: 15,
    flexDirection: "row",
  },
  google_text: {
    fontSize: 18,
    padding: 15,
  },
  fb_text: {
    color: colors.white,
    fontSize: 18,
    padding: 15,
  },
  fb_email: {
    color: colors.white,
    fontSize: 18,
    padding: 15,
    textAlign: "center",

    width: "100%",
  },
  btnview: {
    flex: 1,
    justifyContent: "center",
  },
  socialtext: {
    justifyContent: "center",
    margin: 20,
    textAlign: "center",
  },
});

export default StatusBar;
