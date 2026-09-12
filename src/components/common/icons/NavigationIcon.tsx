import React from 'react';
import Svg, { Polygon } from 'react-native-svg';
import { IconProps } from './types';

export const NavigationIcon: React.FC<IconProps> = ({
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
    <Polygon points="3 11 22 2 13 21 11 13 3 11" />
  </Svg>
);
