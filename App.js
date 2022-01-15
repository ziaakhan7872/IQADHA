/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Authentication from "./Src/Authentication/index";
import Instabug from 'instabug-reactnative';

// import { LogBox } from 'react-native';
// LogBox.ignoreAllLogs();
// import {store} from './src/store/store';

////

// const AuthStack = createStackNavigator();
import AsyncStorage from "@react-native-community/async-storage";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
// import Reducers from './src/redux/reducers';
import rootReducer from "./Src/store/rootReducer/index";

import { persistStore, persistReducer } from "redux-persist";
// import {createLogger} from 'redux-logger';
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
import { PersistGate } from "redux-persist/es/integration/react";
const persitConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["user"],
};
const persistedReducer = persistReducer(persitConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistedStore = persistStore(store);
///
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistedStore} loading={null}>
          <Authentication />
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: "absolute",
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
    color: Colors.dark,
  },
  highlight: {
    fontWeight: "700",
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: "600",
    padding: 4,
    paddingRight: 12,
    textAlign: "right",
  },
});

export default App;
