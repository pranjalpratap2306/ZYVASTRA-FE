import React from 'react';
import { View, StyleSheet, Animated, Platform, useWindowDimensions } from 'react-native';

interface SectionProps {
  children: React.ReactNode;
  background?: string;
  paddingTop?: number;
  paddingBottom?: number;
}

export const Section: React.FC<SectionProps> = ({ children, background = '#FFFFFF', paddingTop = 24, paddingBottom = 24 }) => {
  const { width } = useWindowDimensions();

  const opacity = React.useRef(new Animated.Value(0)).current;
  const translateY = React.useRef(new Animated.Value(10)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 400, useNativeDriver: Platform.OS !== 'web' }),
      Animated.timing(translateY, { toValue: 0, duration: 400, useNativeDriver: Platform.OS !== 'web' }),
    ]).start();
  }, [opacity, translateY]);

  return (
    <View style={[styles.wrap, { backgroundColor: background, paddingTop, paddingBottom }]}> 
      <Animated.View style={[styles.container, { opacity, transform: [{ translateY }] }]}> 
        {children}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: { width: '100%' },
  container: { width: '100%', alignSelf: 'center', paddingHorizontal: 0 },
});


