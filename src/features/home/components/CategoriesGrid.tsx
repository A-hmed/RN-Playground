import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../../theme/colors';
import { Category } from '../types/categoryTypes.ts';

interface CategoriesGridProps {
  categories: Category[];
  onSeeAllPress?: () => void;
  onCategoryPress?: (category: Category) => void;
}

export const CategoriesGrid: React.FC<CategoriesGridProps> = ({
  categories,
  onSeeAllPress,
  onCategoryPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Categories</Text>
        <TouchableOpacity onPress={onSeeAllPress}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.grid}>
        {/* Render up to 6 categories on home screen */}
        {categories.slice(0, 6).map(cat => (
          <TouchableOpacity
            key={cat._id}
            style={styles.categoryCard}
            onPress={() => onCategoryPress?.(cat)}

          >
            <View style={styles.iconBg}>
              <Image
                source={{ uri: cat.image }}
                style={styles.categoryImage}
                resizeMode="cover"
              />
            </View>
            <Text style={styles.name} numberOfLines={1}>
              {cat.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  seeAllText: {
    fontSize: 14,
    color: colors.secondary,
    fontWeight: '600',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconBg: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  icon: {
    fontSize: 26,
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  name: {
    fontSize: 12,
    color: colors.textPrimary,
    fontWeight: '600',
    marginTop: 6,
  },
});
