import React from 'react';
import Svg, { Rect, Path } from 'react-native-svg';
import { IconProps } from './types';

export const SmartphoneIcon: React.FC<IconProps> = ({
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
    <Rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <Path d="M12 18h.01" />
  </Svg>
);
