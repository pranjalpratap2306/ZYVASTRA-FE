import React from 'react';
import { View, TextInput, StyleSheet, Pressable, Text } from 'react-native';
import { colors } from '../theme/colors';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ placeholder = 'Search T-shirts, apparel, sizes, fabric…', onSearch }) => {
  const [query, setQuery] = React.useState('');

  const handleSearch = () => {
    onSearch?.(query);
  };

  return (
    <View style={styles.wrapper}>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        style={styles.input}
      />
      <Pressable onPress={handleSearch} style={styles.button}>
        <Text style={styles.buttonText}>Search</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBgOnLight,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: colors.textPrimary,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.brandNavyHeader,
  },
  buttonText: {
    color: colors.brandGold,
    fontWeight: '700',
  },
}); 