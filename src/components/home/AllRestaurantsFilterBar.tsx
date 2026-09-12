import React from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { AppText } from '../common/AppText';
import { ChevronDownIcon, StarIcon } from '../common/icons';
import { COLORS } from '../../theme/colors';
import { styles } from './AllRestaurantsSection.styles';

interface FilterBarProps {
  selectedFilter?: string;
  onSelectFilter?: (filter: string) => void;
  onOpenSortModal?: () => void;
  sortLabel?: string;
}

export const AllRestaurantsFilterBar: React.FC<FilterBarProps> = ({
  selectedFilter = 'all',
  onSelectFilter,
  onOpenSortModal,
  sortLabel = 'Sort by',
}) => {
  const isSortActive = sortLabel !== 'Sort by';

  return (
    <View style={styles.filterSection}>
      <AppText style={styles.sectionHeaderTitle}>All Restaurants</AppText>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterScroll}
      >
        <TouchableOpacity
          style={[
            styles.filterPill,
            isSortActive ? styles.filterPillActive : undefined,
          ]}
          activeOpacity={0.7}
          onPress={() => onOpenSortModal?.()}
        >
          <AppText
            style={[
              styles.filterPillText,
              isSortActive ? styles.filterPillTextActive : undefined,
            ]}
          >
            {sortLabel}{' '}
          </AppText>
          <ChevronDownIcon size={14} color={isSortActive ? COLORS.brandPink : COLORS.textSlateSub} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterPill,
            selectedFilter === 'veg' ? styles.filterPillActive : undefined,
          ]}
          activeOpacity={0.7}
          onPress={() => onSelectFilter?.(selectedFilter === 'veg' ? 'all' : 'veg')}
        >
          <View
            style={[
              styles.vegDotCircle,
              selectedFilter === 'veg' ? { borderColor: COLORS.brandPink } : undefined,
            ]}
          >
            <View
              style={[
                styles.vegDotInside,
                selectedFilter === 'veg' ? { backgroundColor: COLORS.brandPink } : undefined,
              ]}
            />
          </View>
          <AppText
            style={[
              styles.filterPillText,
              selectedFilter === 'veg' ? styles.filterPillTextActive : undefined,
            ]}
          >
            Pure Veg
          </AppText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterPill,
            selectedFilter === 'rating' ? styles.filterPillActive : undefined,
          ]}
          activeOpacity={0.7}
          onPress={() => onSelectFilter?.(selectedFilter === 'rating' ? 'all' : 'rating')}
        >
          <StarIcon size={13} color={selectedFilter === 'rating' ? COLORS.brandPink : COLORS.badgeGreen} />
          <AppText
            style={[
              styles.filterPillText,
              { marginLeft: 3 },
              selectedFilter === 'rating' ? styles.filterPillTextActive : undefined,
            ]}
          >
            Rating 4+
          </AppText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterPill,
            selectedFilter === 'lowest' ? styles.filterPillActive : undefined,
          ]}
          activeOpacity={0.7}
          onPress={() => onSelectFilter?.(selectedFilter === 'lowest' ? 'all' : 'lowest')}
        >
          <View
            style={[
              styles.percentBadgeIcon,
              selectedFilter === 'lowest' ? { backgroundColor: COLORS.brandPink } : undefined,
            ]}
          >
            <AppText style={styles.percentBadgeText}>%</AppText>
          </View>
          <AppText
            style={[
              styles.filterPillText,
              selectedFilter === 'lowest' ? styles.filterPillTextActive : undefined,
            ]}
          >
            Lowest Price
          </AppText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterPill,
            selectedFilter === 'under200' ? styles.filterPillActive : undefined,
          ]}
          activeOpacity={0.7}
          onPress={() => onSelectFilter?.(selectedFilter === 'under200' ? 'all' : 'under200')}
        >
          <AppText
            style={[
              styles.filterPillText,
              selectedFilter === 'under200' ? styles.filterPillTextActive : undefined,
            ]}
          >
            Under ₹200
          </AppText>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
