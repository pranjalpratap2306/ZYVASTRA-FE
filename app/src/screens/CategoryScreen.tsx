import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, useWindowDimensions, ScrollView, Platform } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors } from '../theme/colors';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { ProductCard } from '../components/ProductCard';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HeaderBar } from '../components/HeaderBar';
import { SiteFooter } from '../components/SiteFooter';

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

export const CategoryScreen: React.FC<CategoryScreenProps> = ({ route, navigation }) => {
  const { title } = route.params;
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  
  // Responsive layout calculations
  const isDesktop = width >= 1024;
  const isTablet = width >= 600 && width < 1024;
  const isMobile = width < 600;
  
  // Responsive grid columns
  const numColumns = isDesktop ? 3 : isTablet ? 2 : 1;
  const itemSpacing = isDesktop ? 16 : 12;
  const containerPadding = isDesktop ? 24 : isTablet ? 16 : 12;

  const [size, setSize] = React.useState<string | null>(null);
  const [color, setColor] = React.useState<string | null>(null);
  
  // Calculate item width based on screen size and number of columns
  const itemWidth = (width - (containerPadding * 2) - ((numColumns - 1) * itemSpacing)) / numColumns;

  const items = MOCK_ITEMS.filter((i) => (!size || i.size === size) && (!color || i.colors === color));

  return (
    <ScrollView style={styles.shell}>
      <HeaderBar />
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View 
          style={[styles.scrollContent, { paddingHorizontal: containerPadding }]}
        >
          <Text style={[styles.title, { fontSize: isDesktop ? 32 : isTablet ? 28 : 24 }]}>{title}</Text>
          
          {/* Filters Section */}
          <View style={[styles.filters, { marginBottom: isMobile ? 16 : 24 }]}>
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Size</Text>
              <View style={styles.filterOptions}>
                {['S', 'M', 'L', 'XL'].map((s) => (
                  <Pressable 
                    key={s} 
                    onPress={() => setSize(s === size ? null : s)} 
                    style={[styles.chip, size === s && styles.chipActive]}
                  >
                    <Text style={[styles.chipText, size === s && styles.chipTextActive]}>{s}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
            
            <View style={[styles.filterSection, { marginTop: isMobile ? 12 : 16 }]}>
              <Text style={styles.filterLabel}>Color</Text>
              <View style={styles.filterOptions}>
                {['Black', 'Navy', 'White', 'Maroon'].map((c) => (
                  <Pressable 
                    key={c} 
                    onPress={() => setColor(c === color ? null : c)} 
                    style={[styles.chip, color === c && styles.chipActive]}
                  >
                    <Text style={[styles.chipText, color === c && styles.chipTextActive]}>{c}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </View>
          {/* Products Grid */}
          <View style={[styles.productsGrid, isMobile && { marginHorizontal: 0 }]}>
            {items.map((item) => (
              <View 
                key={item.id} 
                style={[styles.productCardWrapper, { width: itemWidth }, isMobile && { padding: 6 }]}
              >
                <ProductCard
                  title={item.name}
                  imageUrl={item.imageUrl}
                  material={'Cotton'}
                  color={item.colors}
                  sleeve={'Half Sleeves'}
                  sizes={`S, M, L, XL`}
                  pattern={'Printed'}
                  onViewMore={() => navigation.navigate('ProductDetail', { title: item.name, imageUrl: item.imageUrl })}
                  onEnquiry={() => navigation.navigate('Contact')}
                />
              </View>
            ))}
          </View>
        </View>
      </View>
      <SiteFooter />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  shell: {
    flex: 1,
    backgroundColor: colors.surfaceAlt,
  },
  container: { 
    flex: 1, 
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 16,
    paddingBottom: 24,
  },
  title: { 
    fontWeight: '800', 
    color: colors.textPrimary, 
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  filters: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    ...Platform.select({
      web: {
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      },
      default: {
        elevation: 2,
      },
    }),
  },
  filterSection: {
    marginBottom: 8,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    gap: 8,
  },
  filterLabel: { 
    color: colors.textPrimary, 
    fontWeight: '700', 
    fontSize: 16,
    marginBottom: 4,
  },
  chip: { 
    paddingVertical: 8, 
    paddingHorizontal: 16, 
    borderWidth: 1, 
    borderColor: colors.border, 
    borderRadius: 20,
    minWidth: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipActive: { 
    borderColor: colors.brandNavyHeader, 
    backgroundColor: '#E9EEF3' 
  },
  chipText: { 
    color: colors.textPrimary,
    fontSize: 14,
  },
  chipTextActive: { 
    color: colors.brandNavyHeader, 
    fontWeight: '700' 
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  productCardWrapper: {
    padding: 8,
  },
}); 