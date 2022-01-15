import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';

function Container(props) {
  return (
    <SafeAreaView style={[styles.container, props.style]}>
      <StatusBar
        backgroundColor={props.backgroundColor}
        barStyle={props.barStyle}
      />
      {props.children}
    </SafeAreaView>
  );
}

const styles = {
  container: {
    flex: 1,
   
  },
};

export default Container;
