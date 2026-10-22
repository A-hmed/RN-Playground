import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const WishlistScreen = () => (
  <View style={styles.center}>
    <Text style={styles.text}>Wishlist Screen ❤️</Text>
  </View>
);

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' },
  text: { fontSize: 20, fontWeight: 'bold', color: '#00416A' },
});
