import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import { IconProps } from './types';

export const HelpCircleIcon: React.FC<IconProps> = ({
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
    <Circle cx="12" cy="12" r="10" />
    <Path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
    <Path d="M12 17h.01" />
  </Svg>
);
