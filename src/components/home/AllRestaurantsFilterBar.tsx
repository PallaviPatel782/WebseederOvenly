import React from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { AppText } from '../common/AppText';
import { ChevronDownIcon, StarIcon } from '../common/icons';
import { styles } from './AllRestaurantsSection.styles';

interface FilterBarProps {
  selectedFilter?: string;
  onSelectFilter?: (filter: string) => void;
}

export const AllRestaurantsFilterBar: React.FC<FilterBarProps> = ({
  selectedFilter = 'all',
  onSelectFilter,
}) => {
  return (
    <View style={styles.filterSection}>
      <AppText style={styles.sectionHeaderTitle}>All Restaurants</AppText>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterScroll}
      >
        <TouchableOpacity
          style={styles.filterPill}
          activeOpacity={0.7}
          onPress={() => onSelectFilter?.('sort')}
        >
          <AppText style={styles.filterPillText}>Sort by </AppText>
          <ChevronDownIcon size={14} color="#334155" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterPill,
            selectedFilter === 'veg' ? styles.filterPillActive : null,
          ]}
          activeOpacity={0.7}
          onPress={() => onSelectFilter?.('veg')}
        >
          <View style={styles.vegDotCircle}>
            <View style={styles.vegDotInside} />
          </View>
          <AppText style={styles.filterPillText}>Pure Veg</AppText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterPill,
            selectedFilter === 'rating' ? styles.filterPillActive : null,
          ]}
          activeOpacity={0.7}
          onPress={() => onSelectFilter?.('rating')}
        >
          <StarIcon size={13} color="#16A34A" />
          <AppText style={[styles.filterPillText, { marginLeft: 3 }]}>
            Rating 4+
          </AppText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterPill,
            selectedFilter === 'lowest' ? styles.filterPillActive : null,
          ]}
          activeOpacity={0.7}
          onPress={() => onSelectFilter?.('lowest')}
        >
          <View style={styles.percentBadgeIcon}>
            <AppText style={styles.percentBadgeText}>%</AppText>
          </View>
          <AppText style={styles.filterPillText}>Lowest Price</AppText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterPill,
            selectedFilter === 'under200' ? styles.filterPillActive : null,
          ]}
          activeOpacity={0.7}
          onPress={() => onSelectFilter?.('under200')}
        >
          <AppText style={styles.filterPillText}>Under ₹200</AppText>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
