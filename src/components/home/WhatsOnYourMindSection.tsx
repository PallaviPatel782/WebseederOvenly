import React from 'react';
import { View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { AppText } from '../common/AppText';
import { WHATS_ON_YOUR_MIND_DATA, MindCategoryItem } from '../../constants/homeData';
import { styles } from './WhatsOnYourMindSection.styles';

interface WhatsOnYourMindSectionProps {
  title?: string;
  data?: MindCategoryItem[];
  onSelectCategory?: (item: MindCategoryItem) => void;
}

export const WhatsOnYourMindSection: React.FC<WhatsOnYourMindSectionProps> = ({
  title = "What's On Your Mind?",
  data = WHATS_ON_YOUR_MIND_DATA,
  onSelectCategory,
}) => {
  return (
    <View style={styles.container}>
      <AppText style={styles.sectionTitle}>{title}</AppText>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScroll}
      >
        {data.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.itemCard}
            activeOpacity={0.8}
            onPress={() => onSelectCategory?.(item)}
          >
            <View style={styles.imageCircle}>
              <Image source={item.image} style={styles.foodImage} resizeMode="cover" />
            </View>
            <AppText style={styles.itemTitle} numberOfLines={1}>
              {item.title}
            </AppText>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
