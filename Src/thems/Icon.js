import React from 'react';
import { Image } from 'react-native';

import eye from '../Assets/Icons/eye.png';

const Icon = {
  eye: props => <IconComp source={eye} {...props} />,

};

const IconComp = ({ source, size, color }) =>
{
  console.log('source', source)
  return (
    <Image
      source={source}
      style={{
        width: size,
        height: size,
        resizeMode: 'contain',
        tintColor: color,
      }}
    />
  );
};

export default Icon;
