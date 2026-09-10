import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import { IconProps } from './types';

export const SearchIcon: React.FC<IconProps> = ({
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
    <Circle cx="11" cy="11" r="8" />
    <Path d="M21 21l-4.35-4.35" />
  </Svg>
);
