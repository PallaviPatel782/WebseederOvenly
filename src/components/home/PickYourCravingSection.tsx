import React from 'react';
import { View, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import { AppText } from '../common/AppText';
import { IMAGES } from '../../assets/images';
import { styles } from './PickYourCravingSection.styles';

export interface CravingItem {
  id: string;
  label: string;
  image: ImageSourcePropType;
}

export const DEFAULT_CRAVINGS_DATA: CravingItem[] = [
  {
    id: 'healthy',
    label: 'Healthy',
    image: IMAGES.cravingHealthy,
  },
  {
    id: 'local_gem',
    label: 'Local Gem',
    image: IMAGES.cravingLocalGem,
  },
  {
    id: 'discount_20',
    label: '20% Lower',
    image: IMAGES.cravingDiscount,
  },
  {
    id: 'top_brands',
    label: 'Top Brands',
    image: IMAGES.cravingTopBrands,
  },
];

interface PickYourCravingSectionProps {
  title?: string;
  data?: CravingItem[];
  onSelectCraving?: (item: CravingItem) => void;
}

export const PickYourCravingSection: React.FC<PickYourCravingSectionProps> = ({
  title = 'Pick Your Craving',
  data = DEFAULT_CRAVINGS_DATA,
  onSelectCraving,
}) => {
  return (
    <View style={styles.container}>
      <AppText style={styles.sectionTitle}>{title}</AppText>
      <View style={styles.cravingsRow}>
        {data.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.cravingCard}
            activeOpacity={0.8}
            onPress={() => onSelectCraving?.(item)}
          >
            <View style={styles.cravingIconBox}>
              <Image
                source={item.image}
                style={styles.cravingImage}
                resizeMode="cover"
              />
            </View>
            <AppText style={styles.cravingLabel} numberOfLines={1}>
              {item.label}
            </AppText>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
