import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors } from '../../../theme/colors';
import { Product } from '../types/productTypes';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  addToCartThunk,
  removeFromCartThunk,
  updateCartQuantityThunk,
} from '../../cart/slice/cartSlice';

interface ProductCardProps {
  product: Product;
  userToken?: string;
  onPress?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  userToken = '',
  onPress,
}) => {
  const dispatch = useAppDispatch();
  const productId = product._id || product.id;

  // Read current cart item quantity from Redux state
  const cartItem = useAppSelector((state) => state.cart.items[productId]);
  const quantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    dispatch(addToCartThunk({ productId, token: userToken }));
  };

  const handleIncrement = () => {
    dispatch(
      updateCartQuantityThunk({
        productId,
        count: quantity + 1,
        token: userToken,
      })
    );
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      dispatch(
        updateCartQuantityThunk({
          productId,
          count: quantity - 1,
          token: userToken,
        })
      );
    } else {
      dispatch(removeFromCartThunk({ productId, token: userToken }));
    }
  };

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={onPress}>
      {/* Product Image */}
      <Image
        source={{ uri: product.imageCover }}
        style={styles.image}
        resizeMode="contain"
      />

      {/* Product Info */}
      <Text style={styles.rating}>{product.ratingsAverage} ⭐</Text>
      <Text style={styles.title} numberOfLines={1}>
        {product.title}
      </Text>

      <View style={styles.priceRow}>
        <Text style={styles.price}>${product.price}</Text>
        {product.priceAfterDiscount ? (
          <Text style={styles.oldPrice}>${product.priceAfterDiscount}</Text>
        ) : null}
      </View>

      {/* Cart Actions: Add to Cart OR Quantity Controls */}
      <View style={styles.actionContainer}>
        {quantity === 0 ? (
          <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
            <Text style={styles.addButtonText}>+ Add to Cart</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.qtyContainer}>
            <TouchableOpacity style={styles.qtyBtn} onPress={handleDecrement}>
              <Text style={styles.qtyBtnText}>-</Text>
            </TouchableOpacity>

            <Text style={styles.qtyText}>{quantity}</Text>

            <TouchableOpacity style={styles.qtyBtn} onPress={handleIncrement}>
              <Text style={styles.qtyBtnText}>+</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 155,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 10,
    marginRight: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    backgroundColor: colors.white,
  },
  rating: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 6,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginTop: 2,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.primary,
  },
  oldPrice: {
    fontSize: 12,
    color: colors.textPlaceholder,
    textDecorationLine: 'line-through',
  },
  actionContainer: {
    marginTop: 10,
  },
  addButton: {
    backgroundColor: colors.primary,
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: 'center',
  },
  addButtonText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  qtyBtn: {
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  qtyBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  qtyText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
});
