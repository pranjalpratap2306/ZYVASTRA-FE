import React, { useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, Pressable, Image, Platform } from 'react-native';
import { colors } from '../theme/colors';

const CATEGORIES = [
  { key: 'ROUND_NECK_TSHIRTS', title: 'Round Neck T‑Shirts', imageUrl: require('../../assets/over_sized_tshirt_product_category.jpeg') },
  { key: 'POLO_TSHIRTS', title: 'Polo T‑Shirts', imageUrl: require('../../assets/polo_tshirt_product_category.jpeg') },
  { key: 'PRINTED_TSHIRTS', title: 'Printed T‑Shirts', imageUrl: require('../../assets/Printed-Tshirt.png') },
  { key: 'ECO_FRIENDLY_TSHIRTS', title: 'Eco‑friendly T‑Shirt', imageUrl: require('../../assets/dashboard_2.png') },
];

interface CategorySectionProps {
  onCategoryPress: (title: string, key: string, imageUrl: any) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({ onCategoryPress }) => {
  const { width } = useWindowDimensions();
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const isSmallScreen = width < 768;
  const isMediumScreen = width >= 768 && width < 1024;

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: isSmallScreen ? 12 : 24,
      paddingVertical: isSmallScreen ? 24 : 48,
      backgroundColor: '#F5F0E5', // Light beige background
    },
    header: {
      marginBottom: isSmallScreen ? 24 : 32,
      alignItems: 'center', // Center the header content
    },
    title: {
      fontSize: isSmallScreen ? 28 : 36,
      fontWeight: '600',
      color: colors.textPrimary,
      fontFamily: 'serif',
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      margin: isSmallScreen ? -6 : -12, // Gutter compensation
    },
    gridItem: {
      width: isSmallScreen ? '100%' : isMediumScreen ? '50%' : '33.333%',
      padding: isSmallScreen ? 6 : 12, // Gutter
      marginBottom: isSmallScreen ? 12 : 0,
    },
    card: {
      backgroundColor: 'transparent',
      alignItems: 'center',
    },
    cardImageContainer: {
      borderRadius: 8,
      overflow: 'hidden', // Ensures the zoom effect doesn't break the border radius
      marginBottom: 16,
      width: '100%',
    },
    cardImage: {
      width: '100%',
      height: isSmallScreen ? 240 : 280,
      borderRadius: 8,
      transition: 'transform 0.3s ease-in-out', // Smooth transition for zoom
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: '500',
      color: colors.textPrimary,
      fontFamily: 'serif',
      marginBottom: 12,
    },
    cardButton: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: colors.textPrimary,
      borderRadius: 4,
    },
    cardButtonText: {
      fontSize: 12,
      fontWeight: '600',
      color: colors.textPrimary,
      letterSpacing: 1,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Our Offerings</Text>
      </View>
      <View style={styles.grid}>
        {CATEGORIES.map((item) => {
          const isHovered = item.key === hoveredKey;

          const imageStyle = {
            transform: isHovered ? [{ scale: 1.05 }] : [{ scale: 1 }],
          };

          const buttonStyle = {
            backgroundColor: isHovered ? colors.brandNavyHeader : 'transparent',
          };

          const buttonTextStyle = {
            color: isHovered ? colors.surface : colors.textPrimary,
          };

          return (
            <View key={item.key} style={styles.gridItem}>
              <Pressable 
                onPress={() => onCategoryPress(item.title, item.key, item.imageUrl)} 
                style={({ pressed }) => [
                  styles.card,
                  { opacity: pressed ? 0.8 : 1 },
                ]}
                // @ts-ignore-next-line - onHoverIn and onHoverOut are web-only but work here
                onHoverIn={() => setHoveredKey(item.key)}
                onHoverOut={() => setHoveredKey(null)}
              >
                <View style={styles.cardImageContainer}>
                  <Image 
                    source={item.imageUrl} 
                    style={[styles.cardImage, imageStyle]} 
                    resizeMode={'cover'}
                  />
                </View>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <View style={[styles.cardButton, buttonStyle]}>
                  <Text style={[styles.cardButtonText, buttonTextStyle]}>VIEW DETAILS</Text>
                </View>
              </Pressable>
            </View>
          );
        })}
      </View>
    </View>
  );
};
