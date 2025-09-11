import React from 'react';
import { View, Text, StyleSheet, Pressable, useWindowDimensions, ScrollView } from 'react-native';
import { colors } from '../theme/colors';
import { REVIEWS, getAverageRating } from '../data/reviews';
import { useNavigation } from '@react-navigation/native';

const Stars: React.FC<{ value: number }> = ({ value }) => {
  const full = Math.floor(value);
  const hasHalf = value - full >= 0.5;
  return (
    <View style={{ flexDirection: 'row', gap: 2 }}>
      {Array.from({ length: 5 }).map((_, i) => {
        const on = i < full || (i === full && hasHalf);
        return <Text key={i} style={{ color: on ? colors.brandGold : colors.borderOnDark, fontSize: 14 }}>★</Text>;
      })}
    </View>
  );
};

export const TestimonialsSection: React.FC = () => {
  const navigation = useNavigation<any>();
  const { width } = useWindowDimensions();
  const avg = getAverageRating();

  const perView = width >= 1100 ? 3 : width >= 720 ? 2 : 1;
  const gap = 12;
  const horizontalPadding = 16;
  const cardWidth = Math.floor((width - horizontalPadding * 2 - gap * (perView - 1)) / perView);

  const scrollRef = React.useRef<ScrollView>(null as any);
  const [index, setIndex] = React.useState(0);

  const items = REVIEWS.slice(0, 10);
  const maxIndex = Math.max(0, items.length - perView);

  React.useEffect(() => {
    const id = setInterval(() => goTo(index + 1), 3500);
    return () => clearInterval(id);
  }, [index, perView, cardWidth, items.length]);

  const goTo = (nextIdx: number) => {
    const clamped = nextIdx > maxIndex ? 0 : nextIdx < 0 ? maxIndex : nextIdx;
    setIndex(clamped);
    const x = clamped * (cardWidth + gap);
    scrollRef.current?.scrollTo?.({ x, animated: true });
  };

  return (
    <View style={styles.wrap}>
      <View style={[styles.header, { alignItems: 'center' }]}> 
        <View style={styles.headerBar} />
        <Text style={styles.headerTitle}>Testimonials</Text>
        <View style={styles.avgWrap}>
          <Stars value={avg} />
          <Text style={styles.avgText}>{avg} / 5</Text>
        </View>
      </View>

      <View style={{ position: 'relative' }}>
        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ paddingHorizontal: horizontalPadding }}
          contentContainerStyle={{ alignItems: 'stretch' }}
          scrollEventThrottle={16}
          snapToInterval={cardWidth + gap}
          decelerationRate="fast"
          snapToAlignment="start"
          onMomentumScrollEnd={(e) => {
            const x = e.nativeEvent.contentOffset.x;
            const newIndex = Math.round(x / (cardWidth + gap));
            setIndex(newIndex);
          }}
        >
          <View style={{ flexDirection: 'row', gap }}>
            {items.map((r) => (
              <View key={r.id} style={[styles.card, { width: cardWidth }]}> 
                <Text style={styles.quoteMark}>❝</Text>
                <Text style={styles.text}>{r.text}</Text>
                <Pressable onPress={() => navigation.navigate('Reviews')}><Text style={styles.link}>Read More</Text></Pressable>
                <Text style={styles.author}>{r.name}</Text>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Arrows */}
        <Pressable style={[styles.arrow, styles.arrowLeft]} onPress={() => goTo(index - 1)}>
          <Text style={styles.arrowText}>‹</Text>
        </Pressable>
        <Pressable style={[styles.arrow, styles.arrowRight]} onPress={() => goTo(index + 1)}>
          <Text style={styles.arrowText}>›</Text>
        </Pressable>
      </View>

      {/* Dots */}
      <View style={styles.dotsRow}>
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <Pressable key={i} onPress={() => goTo(i)} style={[styles.dot, i === index && styles.dotActive]} />
        ))}
      </View>

      <View style={{ alignItems: 'center', marginTop: 8 }}>
        <Pressable style={styles.cta} onPress={() => navigation.navigate('Reviews')}>
          <Text style={styles.ctaText}>Post Your Testimonials</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: { backgroundColor: colors.surfaceAlt, paddingTop: 8, paddingBottom: 16 },
  header: { marginBottom: 8 },
  headerBar: { width: 36, height: 4, backgroundColor: colors.brandGold, borderRadius: 2, marginBottom: 8 },
  headerTitle: { color: colors.brandNavy, fontWeight: '900', fontSize: 18 },
  avgWrap: { flexDirection: 'row', gap: 8, alignItems: 'center', marginTop: 6 },
  avgText: { color: colors.textSecondary, fontWeight: '700' },
  card: { backgroundColor: colors.surface, borderRadius: 12, borderWidth: 1, borderColor: colors.border, padding: 18, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 10, shadowOffset: { width: 0, height: 4 } },
  quoteMark: { fontSize: 24, color: colors.brandNavyHeader, opacity: 0.6, marginBottom: 8 },
  text: { color: colors.textPrimary, textAlign: 'center', lineHeight: 20, marginBottom: 8 },
  link: { color: colors.brandNavyHeader, textDecorationLine: 'underline', marginBottom: 8 },
  author: { color: colors.textSecondary, fontWeight: '800' },
  cta: { backgroundColor: colors.brandNavyHeader, borderColor: colors.brandGold, borderWidth: 1, paddingHorizontal: 24, paddingVertical: 12, borderRadius: 12 },
  ctaText: { color: colors.brandGold, fontWeight: '800' },
  dotsRow: { flexDirection: 'row', justifyContent: 'center', gap: 6, marginTop: 10 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#D2D7DE' },
  dotActive: { backgroundColor: colors.brandNavyHeader },
  arrow: { position: 'absolute', top: '40%', backgroundColor: colors.brandNavyHeader, borderColor: colors.brandGold, borderWidth: 1, width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 6, shadowOffset: { width: 0, height: 2 } },
  arrowLeft: { left: 8 },
  arrowRight: { right: 8 },
  arrowText: { color: colors.brandGold, fontSize: 18, fontWeight: '900', lineHeight: 18 },
}); 