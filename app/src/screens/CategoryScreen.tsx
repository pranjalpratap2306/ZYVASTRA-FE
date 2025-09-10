import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, useWindowDimensions } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors } from '../theme/colors';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { ProductCard } from '../components/ProductCard';

const MOCK_ITEMS = Array.from({ length: 12 }).map((_, i) => ({
  id: String(i + 1),
  name: `Mens Round Neck T-Shirt ${i + 1}`,
  colors: ['Black', 'Navy', 'White', 'Maroon'][i % 4],
  size: ['S', 'M', 'L', 'XL'][i % 4],
  imageUrl: [
    'https://images.unsplash.com/photo-1520974735194-5f0a18b1988b?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
  ][i % 4],
}));

export type CategoryScreenProps = NativeStackScreenProps<RootStackParamList, 'Category'>;

export const CategoryScreen: React.FC<CategoryScreenProps> = ({ route }) => {
  const { title } = route.params;
  const { width } = useWindowDimensions();
  const numColumns = width >= 1200 ? 3 : width >= 800 ? 2 : 1;

  const [size, setSize] = React.useState<string | null>(null);
  const [color, setColor] = React.useState<string | null>(null);

  const items = MOCK_ITEMS.filter((i) => (!size || i.size === size) && (!color || i.colors === color));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.filters}>
        <View style={styles.filterGroup}>
          <Text style={styles.filterLabel}>Size</Text>
          {['S', 'M', 'L', 'XL'].map((s) => (
            <Pressable key={s} onPress={() => setSize(s === size ? null : s)} style={[styles.chip, size === s && styles.chipActive]}>
              <Text style={[styles.chipText, size === s && styles.chipTextActive]}>{s}</Text>
            </Pressable>
          ))}
        </View>
        <View style={styles.filterGroup}>
          <Text style={styles.filterLabel}>Color</Text>
          {['Black', 'Navy', 'White', 'Maroon'].map((c) => (
            <Pressable key={c} onPress={() => setColor(c === color ? null : c)} style={[styles.chip, color === c && styles.chipActive]}>
              <Text style={[styles.chipText, color === c && styles.chipTextActive]}>{c}</Text>
            </Pressable>
          ))}
        </View>
      </View>
      <FlatList
        data={items}
        key={numColumns}
        keyExtractor={(i) => i.id}
        numColumns={numColumns}
        columnWrapperStyle={numColumns > 1 ? { gap: 12 } : undefined}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24, gap: 12 }}
        renderItem={({ item }) => (
          <View style={{ flex: 1 / numColumns }}>
            <ProductCard
              title={item.name}
              imageUrl={item.imageUrl}
              material={'Cotton'}
              color={item.colors}
              sleeve={'Half Sleeves'}
              sizes={`S, M, L, XL`}
              pattern={'Printed'}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surfaceAlt },
  title: { fontSize: 20, fontWeight: '800', color: colors.textPrimary, paddingHorizontal: 16, paddingTop: 16 },
  filters: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 12 },
  filterGroup: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginTop: 8 },
  filterLabel: { color: colors.textPrimary, fontWeight: '700', marginRight: 8 },
  chip: { paddingVertical: 6, paddingHorizontal: 10, borderWidth: 1, borderColor: colors.border, borderRadius: 999 },
  chipActive: { borderColor: colors.brandNavyHeader, backgroundColor: '#E9EEF3' },
  chipText: { color: colors.textPrimary },
  chipTextActive: { color: colors.brandNavyHeader, fontWeight: '800' },
}); 