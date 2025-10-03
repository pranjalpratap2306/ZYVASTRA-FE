import React from 'react';
import { View, Text, Image, StyleSheet, Animated, useWindowDimensions, Platform } from 'react-native';
import { colors } from '../theme/colors';

// A visually rich, animated strip to make the eco section more attractive on web.
// Shows four blocks: left poster, central tagline + badge, USPs, and a product mock.
export const EcoAttractStrip: React.FC = () => {
  const { width } = useWindowDimensions();
  const isNarrow = width < 1024; // keep the strip mainly for wide screens

  const a0 = React.useRef(new Animated.Value(0)).current;
  const a1 = React.useRef(new Animated.Value(0)).current;
  const a2 = React.useRef(new Animated.Value(0)).current;
  const a3 = React.useRef(new Animated.Value(0)).current;
  const pulse = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    // Staggered entrance
    Animated.stagger(120, [a0, a1, a2, a3].map(v => (
      Animated.timing(v, { toValue: 1, duration: 500, useNativeDriver: Platform.OS !== 'web' ? true : false })
    ))).start();

    // Gentle pulsing for the badge
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.06, duration: 1200, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1.0, duration: 1200, useNativeDriver: true }),
      ])
    ).start();
  }, [a0, a1, a2, a3, pulse]);

  if (isNarrow) return null; // avoid rendering on mobile – this is web‑focused visual flair

  const card = (anim: Animated.Value, children: React.ReactNode) => (
    <Animated.View
      style={{
        opacity: anim,
        transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [18, 0] }) }],
      }}
    >
      {children}
    </Animated.View>
  );

  return (
    <View style={styles.row}>
      {card(a0, (
        <View style={styles.posterCard}>
          <Image source={require('../../assets/eco-friendly-bamboo.jpeg')} style={styles.posterImg} resizeMode="cover" />
        </View>
      ))}

      {card(a1, (
        <View style={styles.taglineCard}>
          <Text style={styles.tagTitle}>Sustainably made,{'\n'}effortlessly worn.</Text>
          <Animated.Image
            source={require('../../assets/eco-friendly_section_3.png')}
            style={[styles.badgeImg, { transform: [{ scale: pulse }] }]}
            resizeMode="contain"
          />
          <Text style={styles.tagSub}>Organic cotton • Water‑based inks • Recycled blends</Text>
        </View>
      ))}

      {card(a2, (
        <View style={styles.uspsCard}>
          <Text style={styles.uspsTitle}>Unique Selling Propositions</Text>
          <View style={styles.uspRow}><Text style={styles.uspIcon}>🤝</Text><Text style={styles.uspText}>Artisan collaboration & ethical sourcing</Text></View>
          <View style={styles.uspRow}><Text style={styles.uspIcon}>🌍</Text><Text style={styles.uspText}>Materials that respect the planet</Text></View>
          <View style={styles.uspRow}><Text style={styles.uspIcon}>🏷️</Text><Text style={styles.uspText}>Clean, modern design language</Text></View>
          <View style={styles.uspRow}><Text style={styles.uspIcon}>🧵</Text><Text style={styles.uspText}>Rigorous QA from cut to stitch</Text></View>
        </View>
      ))}

      {card(a3, (
        <View style={styles.productCard}>
          <Image source={require('../../assets/Polo-Tshirt.jpg')} style={styles.productImg} resizeMode="cover" />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 16,
    width: '100%',
    maxWidth: 1280,
    alignSelf: 'center',
    paddingHorizontal: 16,
  },
  posterCard: {
    flex: 1,
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  posterImg: { width: '100%', height: 280 },
  taglineCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    minHeight: 280,
  },
  badgeImg: { width: 140, height: 100, marginTop: 12 },
  tagTitle: { color: colors.textPrimary, fontSize: 24, fontFamily: 'serif', textAlign: 'center' },
  tagSub: { marginTop: 10, color: colors.textSecondary, textAlign: 'center' },
  uspsCard: {
    flex: 1.2,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    minHeight: 280,
    justifyContent: 'center',
  },
  uspsTitle: { color: colors.textPrimary, fontWeight: '800', marginBottom: 10 },
  uspRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginVertical: 6 },
  uspIcon: { fontSize: 18 },
  uspText: { color: colors.textSecondary },
  productCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  productImg: { width: '100%', height: 280 },
});




