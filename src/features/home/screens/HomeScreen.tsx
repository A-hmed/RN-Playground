import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';
import { AdsCarousel, BannerItem } from '../components/AdsCarousel';
import { CategoriesGrid } from '../components/CategoriesGrid';
import { PopularProductsList } from '../components/PopularProductsList';
import { useCategories } from '../api/homeApis';
import { useProducts } from '../../products/api/productsApi';

const BANNERS: BannerItem[] = [
  { id: '1', title: 'UP TO 50% OFF', subtitle: 'On Electronics', color: colors.primary },
  { id: '2', title: 'NEW ARRIVALS', subtitle: 'Fashion Collection', color: colors.secondary },
  { id: '3', title: 'FLASH SALE ⚡', subtitle: 'Limited Time Offers', color: colors.error },
];

export const HomeScreen = () => {
  const { categories } = useCategories();
  const { products } = useProducts();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* Section 1: Ads Carousel */}
        <AdsCarousel banners={BANNERS} />

        {/* Section 2: Categories Grid */}
        <CategoriesGrid categories={categories} />

        {/* Section 3: Popular Products */}
        <PopularProductsList products={products} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
});
