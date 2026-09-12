import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';

export const DoorIcon: React.FC<IconProps> = ({
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
    <Path d="M18 20V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16" />
    <Path d="M2 20h20" />
    <Path d="M14 12v.01" />
  </Svg>
);
