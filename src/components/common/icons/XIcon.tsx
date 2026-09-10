import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';

export const XIcon: React.FC<IconProps> = ({
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
    <Path d="M18 6L6 18" />
    <Path d="M6 6l12 12" />
  </Svg>
);
