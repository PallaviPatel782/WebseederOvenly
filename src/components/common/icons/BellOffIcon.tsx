import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';

export const BellOffIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#000000',
  strokeWidth = 2,
  style,
  ...props
}) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
    {...props}
  >
    <Path d="M8.66 8.66A5 5 0 0 1 17 13v4H6v-4a4.98 4.98 0 0 1 1.17-3.17" />
    <Path d="M13.73 21a2 2 0 0 1-3.46 0" />
    <Path d="M2 2l20 20" />
  </Svg>
);
