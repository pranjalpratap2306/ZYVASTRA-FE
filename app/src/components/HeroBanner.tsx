import React from 'react';
import { ImageBackground, View, Text, StyleSheet, Animated, Easing, ImageSourcePropType } from 'react-native';
import { colors } from '../theme/colors';

interface HeroBannerProps {
  title?: string;
  images: (string | ImageSourcePropType)[]; // list of background image URLs or local assets
  showOverlay?: boolean;
  showText?: boolean;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ title, images, showOverlay = true, showText = true }) => {
  const [index, setIndex] = React.useState(0);
  const fade = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    const id = setInterval(() => {
      Animated.timing(fade, { toValue: 0, duration: 400, easing: Easing.out(Easing.quad), useNativeDriver: true }).start(() => {
        setIndex((i) => (i + 1) % images.length);
        Animated.timing(fade, { toValue: 1, duration: 400, easing: Easing.in(Easing.quad), useNativeDriver: true }).start();
      });
    }, 5000);
    return () => clearInterval(id);
  }, [fade, images.length]);

  const image = images[index];
  const src = typeof image === 'string' ? { uri: image } : image;

  return (
    <Animated.View style={[styles.root, { opacity: fade }]}> 
      <ImageBackground source={src} style={styles.fill}>
        {showOverlay && <View style={styles.backdrop} />}
        {showText && (
        <View style={styles.center}>
            {!!title && <Text style={styles.title}>{title}</Text>}
          <Text style={styles.subtitle}>Crafted to define</Text>
        </View>
        )}
      </ImageBackground>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  root: {
    height: 320,
    width: '100%',
    justifyContent: 'center',
  },
  fill: {
    flex: 1,
    justifyContent: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(11,29,42,0.55)',
  },
  center: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 32,
    color: colors.brandGold,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: 1,
  },
  subtitle: {
    marginTop: 8,
    fontSize: 16,
    color: colors.textOnDark,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
}); 