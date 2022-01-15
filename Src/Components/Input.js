import React from 'react';
import { View, TextInput } from 'react-native';

const Input = props =>
{
  return (
    <View
      style={{
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 30,
        borderColor: '#E6E6E6',
        borderWidth:1,
        borderRadius: 30,
      }}>

      <TextInput
        underlineColorAndroid="transparent"
        placeholder={props.placeholder}
        placeholderStyle={props.placeholderStyle}
        placeholderTextColor={props.placeholderTextColor}
        keyboardType={props.keyboardType}
        onChangeText={props.onChangeText}
        returnKeyType={props.returnKeyType}
        numberOfLines={props.numberOfLines}
        multiline={props.multiline}
        onSubmitEditing={props.onSubmitEditing}
        style={props.style}
        blurOnSubmit={false}
        value={props.value}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
      />
    </View>
  );
};
export default Input;
