import React from 'react';
import { View, Text, Pressable, StyleSheet, Animated, Platform } from 'react-native';

interface ScrollTopFabProps {
  scrollRef: React.MutableRefObject<any>;
}

export const ScrollTopFab: React.FC<ScrollTopFabProps> = ({ scrollRef }) => {
  const visible = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const sub = scrollRef.current?.addListener?.((e: any) => {
      const y = e?.nativeEvent?.contentOffset?.y ?? 0;
      const to = y > 480 ? 1 : 0;
      Animated.timing(visible, { toValue: to, duration: 200, useNativeDriver: Platform.OS !== 'web' }).start();
    });
    return () => sub && scrollRef.current?.removeListener?.(sub);
  }, [scrollRef, visible]);

  const onPress = () => {
    try {
      scrollRef.current?.scrollTo?.({ y: 0, animated: true });
    } catch {}
  };

  return (
    <Animated.View style={[styles.fab, { opacity: visible, transform: [{ scale: visible.interpolate({ inputRange: [0,1], outputRange: [0.9, 1] }) }] }]}> 
      <Pressable style={styles.btn} onPress={onPress} accessibilityLabel={'Back to top'}>
        <Text style={styles.txt}>↑</Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  fab: { position: 'absolute', right: 16, bottom: 20 },
  btn: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#2A4E6A', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#E6C89D' },
  txt: { color: '#E6C89D', fontWeight: '900', fontSize: 18 },
});




