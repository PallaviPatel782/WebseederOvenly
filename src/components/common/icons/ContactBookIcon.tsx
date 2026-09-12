import React from 'react';
import Svg, { Rect, Path } from 'react-native-svg';
import { IconProps } from './types';

export const ContactBookIcon: React.FC<IconProps> = ({
  size = 20,
  color = '#6B7280',
  strokeWidth = 1.8,
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
    <Rect x="4" y="3" width="16" height="18" rx="2" />
    <Path d="M8 3v18" />
    <Path d="M12 8h4" />
    <Path d="M12 12h4" />
    <Path d="M12 16h3" />
  </Svg>
);
