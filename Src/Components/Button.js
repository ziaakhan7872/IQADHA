import React from 'react';
import
{
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

function Button({
  btnContainer,
  _onPress,
  tintColor,
  title,
  color,
  fontColor,
  borderWidth,
})
{
  return (
    <TouchableOpacity
      style={[
        styles.btn,
        {
          height: wp('14%'),
          backgroundColor: color,
          color: tintColor,
          borderWidth: borderWidth,
        },
        btnContainer ? btnContainer : {},
      ]}
      activeOpacity={0.9}
      onPress={() => _onPress()}>
      <Text style={{ color: fontColor }}> {title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: wp('4%'),
    borderRadius: wp('10%'),
    marginBottom: 8,
    borderColor: '#FFFFFF',
  },
  title: {
    fontSize: 15,
    margin: 0,
    padding: 0,
  },
});
export default Button;
