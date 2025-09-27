import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Pressable, useWindowDimensions } from 'react-native';
import { colors } from '../theme/colors';

interface EcoFriendlySectionProps {
  onExplore?: () => void;
}

// Ordered images requested for eco-friendly carousel
const images = [
  require('../../assets/eco-friendly_section_3.png'),
  require('../../assets/ecofriendly_section-1.png'),
  require('../../assets/eco-friendly_3.png'),
];

export const EcoFriendlySection: React.FC<EcoFriendlySectionProps> = ({ onExplore }) => {
  const { width } = useWindowDimensions();
  const isNarrow = width < 992;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, []);

  const styles = getStyles(isNarrow);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.imageColumn}>
          <Image 
            source={images[currentIndex]} 
            style={styles.image} 
            resizeMode="contain" 
          />
        </View>
        <View style={styles.textColumn}>
          <Text style={styles.eyebrow}>SUSTAINABLE STYLE</Text>
          <Text style={styles.title}>Wear the Change: Eco-Friendly T-Shirts</Text>
          <Text style={styles.body}>
            At Zyvastra, we're committed to a greener planet. Our eco-friendly t-shirts are crafted from 100% organic cotton and sustainable materials, ensuring a soft feel and a clear conscience. Make a statement with fashion that feels good and does good.
          </Text>
          <View style={styles.featuresRow}>
            <View style={styles.feature}>
              <Text style={styles.featureIcon}>🌱</Text>
              <Text style={styles.featureText}>Organic Cotton</Text>
            </View>
            <View style={styles.feature}>
              <Text style={styles.featureIcon}>💧</Text>
              <Text style={styles.featureText}>Water-Based Inks</Text>
            </View>
            <View style={styles.feature}>
              <Text style={styles.featureIcon}>♻️</Text>
              <Text style={styles.featureText}>Recycled Materials</Text>
            </View>
          </View>
          <Pressable style={styles.button} onPress={onExplore}>
            <Text style={styles.buttonText}>Explore the Collection</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const getStyles = (isNarrow: boolean) => StyleSheet.create({
  container: {
    paddingTop: isNarrow ? 48 : 80,
    paddingBottom: 0,
    paddingHorizontal: 24,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flexDirection: isNarrow ? 'column' : 'row',
    alignItems: 'center',
    maxWidth: 1200,
    alignSelf: 'center',
    gap: isNarrow ? 24 : 32,
  },
  imageColumn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: isNarrow ? 220 : 360,
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  textColumn: {
    flex: 1,
    alignItems: isNarrow ? 'center' : 'flex-start',
  },
  eyebrow: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  title: {
    fontSize: isNarrow ? 32 : 40,
    fontWeight: 'bold',
    color: colors.textPrimary,
    fontFamily: 'serif',
    marginBottom: 16,
    textAlign: isNarrow ? 'center' : 'left',
  },
  body: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
    marginBottom: 12,
    textAlign: isNarrow ? 'center' : 'left',
  },
  featuresRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 8,
    justifyContent: isNarrow ? 'center' : 'flex-start',
  },
  feature: {
    alignItems: 'center',
  },
  featureIcon: {
    fontSize: 24,
  },
  featureText: {
    marginTop: 8,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  button: {
    backgroundColor: colors.brandNavy,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
