import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';

export const CheckIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#000000',
  strokeWidth = 2.5,
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
    <Path d="M20 6L9 17l-5-5" />
  </Svg>
);
