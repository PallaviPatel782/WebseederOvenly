import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';

export const ZapIcon: React.FC<IconProps> = ({
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
    <Path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </Svg>
);
