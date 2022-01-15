import React, { Component } from "react";
import Colors from "../../Constants/Colors";
import { Container, Header, Tab, Tabs } from "native-base";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { fetching_faqs_request } from "../../store/actions";

class Info extends Component {
  state = {
    data: this.props.todos,
    selectedIndex: -1,
  };
  componentDidMount() {
    this.props.fetching_faqs_request();
  }
  renderItemNmaz = ({ item, index }) => {
    console.log("index", this.state.selectedIndex);
    if (this.state.selectedIndex == index) {
      return (
        <View style={{ padding: 10, flexDirection: "row" }}>
          <View style={{ flex: 9 }}>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  flex: 9,
                  color: Colors.dark_grey,
                  fontWeight: "bold",
                  backgroundColor: Colors.grey,
                  padding: 5,
                }}
              >
                {item.question}
              </Text>
              <TouchableOpacity
                style={{
                  flex: 1,

                  alignItems: "center",
                }}
                onPress={() => {
                  this.setState({
                    selectedIndex: -1,
                  });
                }}
              >
                <Image
                  style={{
                    height: 16,
                    width: 16,
                    resizeMode: "contain",
                    flex: 1,
                    tintColor: Colors.secondary_green,
                  }}
                  source={require("../../Assets/Images/arrow_up.png")}
                />
              </TouchableOpacity>
            </View>
            <Text style={{ color: Colors.dark_grey, fontWeight: "bold" }}>
              {item.answer}
            </Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={{ padding: 10, flexDirection: "row" }}>
          <Text
            style={{ color: Colors.dark_grey, fontWeight: "bold", flex: 9 }}
          >
            {item.question}
          </Text>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => {
              this.setState({
                selectedIndex: index,
              });
            }}
          >
            <Image
              style={{
                height: 16,
                width: 16,
                resizeMode: "contain",
                flex: 1,
                tintColor: Colors.secondary_green,
              }}
              source={require("../../Assets/Images/arrow_dn.png")}
            />
          </TouchableOpacity>
        </View>
      );
    }
  };
  render() {
    return (
      <Container>
        <Header
          androidStatusBarColor={Colors.primary_green}
          style={{
            backgroundColor: Colors.primary_green,
            paddingTop: 10,
            alignItems: "center",
          }}
        >
          <Text style={{ color: Colors.white, fontWeight: "bold" }}>
            INFORMATION
          </Text>
        </Header>
        <Tabs tabBarUnderlineStyle={{ backgroundColor: Colors.primary_green }}>
          <Tab
            heading="About"
            tabStyle={{ backgroundColor: Colors.white }}
            textStyle={{ color: Colors.black }}
            activeTabStyle={{
              backgroundColor: Colors.white,
            }}
            activeTextStyle={{
              color: Colors.primary_green,
              fontWeihgt: "normal",
            }}
          >
            <View style={{ padding: 15 }}>
              <Text style={{ color: Colors.primary_green, fontSize: 18 }}>
                About iQadah
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: Colors.dark_grey,
                  paddingBottom: 15,
                }}
              >
                {" "}
                You never forget the first time you see the Kabah or the tearful
                journey back from Madinah...
              </Text>

              <Text
                style={{
                  fontSize: 16,
                  color: Colors.dark_grey,
                  paddingBottom: 15,
                }}
              >
                With just a pen and a paper in my hand I calculated all the
                missed prayers in my life... When I saw that first figure I knew
                this was serious business.
              </Text>

              <Text
                style={{
                  fontSize: 16,
                  color: Colors.dark_grey,
                  paddingBottom: 15,
                }}
              >
                I decided to make an app so I could track and monitor all my
                prayers.
              </Text>

              <Text style={{ fontSize: 16, color: Colors.dark_grey }}>
                Thus iQadha was born. I hope it becomes a source of success in
                the Hereafter and be a source of Khair for me and the Ummah
                inshaa-Allah.
              </Text>
            </View>
          </Tab>
          <Tab
            heading="Faq"
            tabStyle={{ backgroundColor: Colors.white }}
            textStyle={{ color: Colors.black }}
            activeTabStyle={{ backgroundColor: Colors.white }}
            activeTextStyle={{
              color: Colors.primary_green,
              fontWeight: "normal",
            }}
          >
            <FlatList
              data={this.state.data}
              renderItem={this.renderItemNmaz}
              keyExtractor={(item) => item.question}
            />
          </Tab>
          <Tab
            heading="Contact"
            tabStyle={{ backgroundColor: Colors.white }}
            textStyle={{ color: Colors.black }}
            activeTabStyle={{ backgroundColor: Colors.white }}
            activeTextStyle={{
              color: Colors.primary_green,
              fontWeight: "normal",
            }}
          >
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ flex: 1 }}></View>
              <View
                style={{
                  flex: 3,
                  paddingTop: 50,
                  alignItems: "center",
                }}
              >
                <Image
                  style={{
                    height: 50,
                    width: 50,
                    resizeMode: "contain",

                    tintColor: Colors.secondary_green,
                  }}
                  source={require("../../Assets/Images/logo.png")}
                />
                <Text
                  style={{
                    color: Colors.dark_grey,
                    paddingTop: 15,
                    textAlign: "center",
                  }}
                >
                  For all support or requests please Conteact us on{" "}
                  <Text style={{ color: Colors.primary_green }}>
                    info@iqadha.com
                  </Text>
                </Text>
                <Text
                  style={{
                    color: Colors.dark_grey,
                    paddingTop: 15,
                    textAlign: "center",
                  }}
                >
                  We aim to respond to all emails with in 24 hours
                </Text>
                <Text style={{ color: Colors.primary_green, paddingTop: 15 }}>
                  Made With Love
                </Text>
                <Text style={{ color: Colors.dark_grey, paddingTop: 15 }}>
                  JazakAllah Khairan
                </Text>
                <Text style={{ color: Colors.primary_green, paddingTop: 5 }}>
                  iQadah Team
                </Text>
                <Text style={{ color: Colors.primary_green, paddingTop: 15 }}>
                  App version 1.0.0
                </Text>
              </View>
              <View style={{ flex: 1 }}></View>
            </View>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
function mapStateToProps(state) {
  return {
    todos: state.user.Faqs,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({ fetching_faqs_request }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Info);
