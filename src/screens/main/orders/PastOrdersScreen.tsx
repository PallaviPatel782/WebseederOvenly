import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from '../../../components/common/AppText';
import { ScreenWrapper } from '../../../components/common/ScreenWrapper';
import { SearchBar } from '../../../components/common/SearchBar';
import { ArrowLeftIcon } from '../../../components/common/icons';
import { IMAGES } from '../../../assets/images';
import { COLORS } from '../../../theme/colors';
import { styles } from './PastOrdersScreen.styles';

interface PastOrdersScreenProps {
  onBack?: () => void;
  onExploreFood?: () => void;
}

export const PastOrdersScreen: React.FC<PastOrdersScreenProps> = ({
  onBack,
  onExploreFood,
}) => {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <ScreenWrapper backgroundColor={COLORS.white} barStyle="dark-content" unsafeBottom>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.7}>
            <ArrowLeftIcon size={20} color={COLORS.textDark} strokeWidth={2.5} />
          </TouchableOpacity>
          <AppText style={styles.headerTitle}>Past Orders</AppText>
        </View>

        <View style={styles.content}>
          <View style={styles.searchContainer}>
            <SearchBar
              placeholder="Search past orders..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: Math.max(insets.bottom + 20, 30),
            }}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.emptyContainer}>
              <Image source={IMAGES.emptyOrders} style={styles.emptyImage} resizeMode="contain" />
              <AppText style={styles.emptyTitle}>No past orders found yet</AppText>
              <AppText style={styles.emptySub}>
                You haven't placed any food orders yet. Explore top restaurants near you and get your favorite dishes delivered!
              </AppText>
              <TouchableOpacity style={styles.exploreBtn} activeOpacity={0.85} onPress={onExploreFood}>
                <AppText style={styles.exploreBtnText}>Explore Food & Order Now</AppText>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </ScreenWrapper>
  );
};
