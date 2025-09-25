import React from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, Pressable, Animated, Platform } from 'react-native';
import { colors } from '../theme/colors';
import { useNavigation } from '@react-navigation/native';

export const AboutWideSection: React.FC = () => {
  const { width } = useWindowDimensions();
  const isWide = width >= 960;
  const navigation = useNavigation<any>();
  const [isBtnHover, setIsBtnHover] = React.useState(false);

  return (
    <View style={styles.wrap}>
      <View style={[styles.container, !isWide && { flexDirection: 'column' }]}>
        <View style={[styles.imageContainer, !isWide && { width: '100%', height: 400 }]}>
          <Image 
            source={require('../../assets/welcome_website_2.png')} 
            style={styles.image} 
            resizeMode="cover"
          />
        </View>
        <View style={[styles.content, !isWide && { width: '100%', padding: 30 }]}>
          <Text style={[styles.heading, !isWide && { fontSize: 28 }]}>ABOUT ZYVASTRA</Text>
          <View style={styles.headingUnderline} />
          <Text style={styles.copy}>
            ZYVASTRA is a contemporary apparel brand rooted in India's rich textile heritage. 
            We blend natural, skin‑friendly fibers with modern silhouettes to craft pieces that 
            are comfortable, durable and refined. Our promise is simple—thoughtful design, 
            responsible sourcing and quality you can feel—day after day.
          </Text>
          <View style={styles.badgesRow}>
            {['No Harsh Dyes', 'No Plastic', 'No Compromise', 'No Fast Fashion', 'No Waste'].map((t) => (
              <View key={t} style={styles.badge}>
                <Text style={styles.badgeText}>{t}</Text>
              </View>
            ))}
          </View>
          <Pressable
            onHoverIn={() => setIsBtnHover(true)}
            onHoverOut={() => setIsBtnHover(false)}
            style={[styles.cta, isBtnHover && styles.ctaHover]}
            onPress={() => navigation.navigate('About')}
          >
            <Text style={[styles.ctaText, isBtnHover && styles.ctaTextHover]}>DISCOVER OUR STORY</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    backgroundColor: '#ffffff',
    paddingVertical: 0,
  },
  container: {
    width: '100%',
    maxWidth: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imageContainer: {
    width: '50%',
    minHeight: 500,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    width: '50%',
    padding: 40,
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
  },
  heading: {
    color: '#1a1a1a',
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 15,
    textTransform: 'uppercase',
    fontFamily: Platform.OS === 'web' ? '"Playfair Display", serif' : undefined,
  },
  headingUnderline: {
    width: 60,
    height: 3,
    backgroundColor: colors.brandGold,
    marginBottom: 25,
  },
  copy: {
    color: '#333333',
    fontSize: 16,
    lineHeight: 28,
    marginBottom: 25,
    fontFamily: Platform.OS === 'web' ? '"Open Sans", sans-serif' : undefined,
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 30,
  },
  badge: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  badgeText: {
    color: '#444',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  cta: {
    alignSelf: 'flex-start',
    paddingVertical: 14,
    paddingHorizontal: 30,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#1a1a1a',
    borderRadius: 0,
    ...(Platform.OS === 'web' ? {
      transition: 'all 0.3s ease',
      cursor: 'pointer',
    } : {}),
  },
  ctaHover: {
    backgroundColor: '#1a1a1a',
  },
  ctaText: {
    color: '#1a1a1a',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  ctaTextHover: {
    color: '#ffffff',
  },
});


