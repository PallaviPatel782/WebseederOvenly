import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { IMAGES } from '../../assets/images';
import { styles, SLIDER_WIDTH } from './BannerSlider.styles';

const BANNERS = [
  { id: 'b3', image: IMAGES.banner3 },
  { id: 'b4', image: IMAGES.banner4 },
];

export const BannerSlider: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<any>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (activeIndex + 1) % BANNERS.length;
      setActiveIndex(nextIndex);
      scrollViewRef.current?.scrollTo({
        x: nextIndex * (SLIDER_WIDTH + 16),
        animated: true,
      });
    }, 4000);

    return () => clearInterval(timer);
  }, [activeIndex]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffset / (SLIDER_WIDTH + 16));
    if (currentIndex >= 0 && currentIndex < BANNERS.length && currentIndex !== activeIndex) {
      setActiveIndex(currentIndex);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled={false}
        snapToInterval={SLIDER_WIDTH + 16}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
      >
        {BANNERS.map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.9}
            style={styles.bannerCard}
          >
            <Image
              source={item.image}
              style={styles.bannerImage}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.paginationContainer}>
        {BANNERS.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === activeIndex ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};
