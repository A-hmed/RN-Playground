import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { colors } from '../../../theme/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export interface BannerItem {
  id: string;
  title: string;
  subtitle: string;
  color: string;
}

interface AdsCarouselProps {
  banners: BannerItem[];
}

export const AdsCarousel: React.FC<AdsCarouselProps> = ({ banners }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View style={styles.container}>
      <FlatList
        data={banners}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={(event) => {
          const slide = Math.round(
            event.nativeEvent.contentOffset.x / (SCREEN_WIDTH - 32)
          );
          setActiveIndex(slide);
        }}
        renderItem={({ item }) => (
          <View style={[styles.bannerCard, { backgroundColor: item.color }]}>
            <Text style={styles.bannerTitle}>{item.title}</Text>
            <Text style={styles.bannerSubtitle}>{item.subtitle}</Text>
          </View>
        )}
      />

      <View style={styles.paginationDots}>
        {banners.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              activeIndex === index && styles.activeDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  bannerCard: {
    width: SCREEN_WIDTH - 32,
    height: 140,
    borderRadius: 12,
    padding: 20,
    justifyContent: 'center',
    marginRight: 16,
  },
  bannerTitle: {
    color: colors.white,
    fontSize: 22,
    fontWeight: 'bold',
  },
  bannerSubtitle: {
    color: colors.white,
    fontSize: 14,
    marginTop: 4,
    opacity: 0.9,
  },
  paginationDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
    marginHorizontal: 4,
  },
  activeDot: {
    width: 20,
    backgroundColor: colors.primary,
  },
});
