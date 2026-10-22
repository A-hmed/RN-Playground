import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';

interface Props {
  message?: string;
  onRetry?: () => void;
}

export const ErrorView: React.FC<Props> = ({
  message = 'Something went wrong. Please try again.',
  onRetry,
}) => (
  <View style={styles.container}>
    <Text style={styles.errorText}>{message}</Text>
    {onRetry ? <Button title="Try Again" onPress={onRetry} color={colors.primary} /> : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.background,
  },
  errorText: {
    fontSize: 16,
    color: colors.error,
    marginBottom: 16,
    textAlign: 'center',
  },
});
