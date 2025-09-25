import React from 'react';
import { View, Image, StyleSheet, useWindowDimensions, Animated, LayoutChangeEvent, Platform } from 'react-native';
import { colors } from '../theme/colors';

type Props = { scrollY?: Animated.Value };

export const WelcomeSection: React.FC<Props> = ({ scrollY }) => {
  const { width } = useWindowDimensions();
  const cardHeight = Math.max(360, Math.min(600, Math.round(width * 0.6)));

  // Scroll-reveal animation
  const opacity = React.useRef(new Animated.Value(0)).current;
  const translateY = React.useRef(new Animated.Value(20)).current;
  const sectionTopRef = React.useRef<number>(0);
  const hasAnimatedRef = React.useRef(false);

  const runReveal = React.useCallback(() => {
    if (hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 500, useNativeDriver: Platform.OS !== 'web' }),
      Animated.timing(translateY, { toValue: 0, duration: 500, useNativeDriver: Platform.OS !== 'web' })
    ]).start();
  }, [opacity, translateY]);

  const onLayout = (e: LayoutChangeEvent) => {
    sectionTopRef.current = e.nativeEvent.layout.y;
  };

  React.useEffect(() => {
    // Immediate reveal if no scroll position is wired (fallback)
    if (!scrollY) {
      runReveal();
      return;
    }
    const windowHeight = width > 0 ? (typeof window !== 'undefined' ? window.innerHeight : 700) : 700;
    const id = scrollY.addListener(({ value }) => {
      const threshold = 120; // start slightly before fully in view
      if (value + windowHeight - threshold >= sectionTopRef.current) {
        runReveal();
      }
    });
    return () => {
      scrollY.removeListener(id);
    };
  }, [scrollY, runReveal, width]);

  return (
    <View style={styles.wrap}>
      <Animated.View 
        style={[
          styles.featureCard, 
          { 
            width: '100%', 
            height: cardHeight,
            opacity,
            transform: [{ translateY }] 
          }
        ]} 
        onLayout={onLayout}
      >
        <Image
          source={require('../../assets/welcome_website_2.png')}
          style={styles.image}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: { 
    backgroundColor: '#FFFFFF', 
    paddingHorizontal: 0, 
    paddingVertical: 0
  },
  featureCard: { 
    backgroundColor: '#FFFFFF', 
    overflow: 'hidden',
    width: '100%',
    borderBottomWidth: 1, 
    borderColor: colors.border 
  },
  image: { 
    width: '100%', 
    height: '100%', 
    resizeMode: 'cover' 
  }
}); 