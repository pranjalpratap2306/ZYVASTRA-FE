import React from 'react';
import { View, Text, StyleSheet, Pressable, useWindowDimensions, ScrollView, Modal, TextInput, Alert, Image } from 'react-native';
import { colors } from '../theme/colors';
import { REVIEWS, getAverageRating } from '../data/reviews';
import { useNavigation } from '@react-navigation/native';

const Stars: React.FC<{ value: number; onChange?: (n: number) => void }> = ({ value, onChange }) => {
  const full = Math.floor(value);
  const hasHalf = value - full >= 0.5;
  return (
    <View style={{ flexDirection: 'row', gap: 6 }}>
      {Array.from({ length: 5 }).map((_, i) => {
        const index = i + 1;
        const on = index <= value || (index === Math.ceil(value) && hasHalf);
        return (
          <Pressable key={i} onPress={() => onChange?.(index)}>
            <Text style={{ color: on ? colors.brandGold : colors.borderOnDark, fontSize: 18 }}>★</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const getInitials = (name: string) => {
  const names = name.split(' ');
  if (names.length > 1) {
    return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

export const TestimonialsSection: React.FC = () => {
  const navigation = useNavigation<any>();
  const { width } = useWindowDimensions();
  const [userReviews, setUserReviews] = React.useState(REVIEWS);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [text, setText] = React.useState('');
  const [rating, setRating] = React.useState(5);
  const SUGGESTIONS = [
    'Quality is excellent, delivery was on time.',
    'Great fabric and fit – will reorder soon!',
    'Value for money and very responsive support.',
    'Comfortable, durable and looks premium.',
  ];
  const [sugIdx, setSugIdx] = React.useState(0);

  const itemsAll = userReviews.slice(0, 10);
  const avg = getAverageRating(itemsAll);

  const perView = width >= 1100 ? 3 : width >= 720 ? 2 : 1;
  const gap = 12;
  const horizontalPadding = 16;
  const cardWidth = Math.floor((width - horizontalPadding * 2 - gap * (perView - 1)) / perView);

  const scrollRef = React.useRef<ScrollView>(null as any);
  const [index, setIndex] = React.useState(0);

  const items = itemsAll;
  const maxIndex = Math.max(0, itemsAll.length - perView);

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
      <View style={styles.header}>
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
                <View style={styles.authorContainer}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{getInitials(r.name)}</Text>
                  </View>
                  <View>
                    <Text style={styles.author}>{r.name}</Text>
                    <Stars value={r.rating} />
                  </View>
                </View>
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
        <Pressable style={styles.cta} onPress={() => setIsModalOpen(true)}>
          <Text style={styles.ctaText}>Post Your Testimonials</Text>
        </Pressable>
      </View>

      {/* Post Testimonial Modal */}
      <Modal transparent animationType="fade" visible={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
        <View style={styles.backdrop}>
          <View style={styles.sheet}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Write a Review</Text>
              <Pressable onPress={() => setIsModalOpen(false)}><Text style={styles.modalClose}>✕</Text></Pressable>
            </View>
            <View style={{ padding: 16, gap: 10 }}>
              <TextInput value={name} onChangeText={setName} placeholder="Your Name" placeholderTextColor={colors.textSecondary} style={styles.input} />
              <TextInput value={text} onChangeText={setText} placeholder="Your Review" placeholderTextColor={colors.textSecondary} style={[styles.input, { height: 100 }]} multiline />
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Text style={{ color: colors.textSecondary, fontWeight: '700' }}>Your rating:</Text>
                <Stars value={rating} onChange={(n) => setRating(n)} />
              </View>
              <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                <Pressable style={styles.suggestionBtn} onPress={() => { setText(SUGGESTIONS[sugIdx]); setSugIdx((i) => (i + 1) % SUGGESTIONS.length); }}>
                  <Text style={styles.suggestionText}>Try a sample</Text>
                </Pressable>
                {SUGGESTIONS.map((s, i) => (
                  <Pressable key={i} style={[styles.chip]} onPress={() => setText(s)}>
                    <Text style={styles.chipText}>“{s.slice(0, 24)}...”</Text>
                  </Pressable>
                ))}
              </View>
              <Pressable
                style={[styles.cta, { alignSelf: 'flex-start', paddingVertical: 10, paddingHorizontal: 18 }]}
                onPress={() => {
                  const n = name.trim();
                  const t = text.trim();
                  const r = Math.max(1, Math.min(5, rating));
                  if (!n || !t) {
                    Alert.alert('Please fill your name and review');
                    return;
                  }
                  const item = { id: `u${Date.now()}`, name: n, text: t, rating: r } as any;
                  setUserReviews([item, ...userReviews]);
                  setName(''); setText(''); setRating(5);
                  setIsModalOpen(false);
                }}
              >
                <Text style={styles.ctaText}>Submit</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: { backgroundColor: colors.surfaceAlt, paddingTop: 48, paddingBottom: 48 },
  header: { marginBottom: 32, paddingHorizontal: 16 },
  headerBar: { width: 48, height: 4, backgroundColor: colors.brandGold, borderRadius: 2, marginBottom: 12 },
  headerTitle: { color: colors.brandNavy, fontWeight: '900', fontSize: 28, textAlign: 'center', fontFamily: 'serif' },
  avgWrap: { flexDirection: 'row', gap: 10, alignItems: 'center', justifyContent: 'center', marginTop: 12 },
  avgText: { color: colors.textSecondary, fontWeight: '700', fontSize: 16, fontFamily: 'serif' },
  card: { backgroundColor: colors.surface, borderRadius: 16, padding: 24, justifyContent: 'space-between', minHeight: 280, borderWidth: 1, borderColor: colors.border, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 14, shadowOffset: { width: 0, height: 6 }, elevation: 4 },
  quoteMark: { fontSize: 48, color: colors.brandGold, opacity: 0.5, position: 'absolute', top: 10, left: 15 },
  text: { color: colors.textPrimary, textAlign: 'left', lineHeight: 24, fontSize: 16, fontStyle: 'italic', flex: 1, marginTop: 40 },
  authorContainer: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 16 },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.brandGold, justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: colors.brandNavy, fontWeight: '800', fontSize: 16 },
  author: { color: colors.brandNavy, fontWeight: '800', fontSize: 16, marginBottom: 4 },
  cta: { backgroundColor: colors.brandNavyHeader, borderColor: colors.brandGold, borderWidth: 2, paddingHorizontal: 28, paddingVertical: 14, borderRadius: 8 },
  ctaText: { color: colors.surface, fontWeight: '800', fontSize: 16 },
  dotsRow: { flexDirection: 'row', justifyContent: 'center', gap: 10, marginTop: 24 },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#D2D7DE' },
  dotActive: { backgroundColor: colors.brandNavyHeader, transform: [{ scale: 1.1 }] },
  arrow: { position: 'absolute', top: '50%', marginTop: -22, backgroundColor: 'rgba(255, 255, 255, 0.9)', width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 5 },
  arrowLeft: { left: 12 },
  arrowRight: { right: 12 },
  arrowText: { color: colors.brandNavy, fontSize: 24, fontWeight: 'bold', lineHeight: 24 },
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', alignItems: 'center', justifyContent: 'center', padding: 16 },
  sheet: { width: '100%', maxWidth: 500, backgroundColor: colors.surface, borderRadius: 12, borderWidth: 1, borderColor: colors.border, overflow: 'hidden', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 20, shadowOffset: { width: 0, height: -5 } },
  modalHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: colors.border },
  modalTitle: { color: colors.brandNavy, fontWeight: '900', fontSize: 20 },
  modalClose: { color: colors.textSecondary, fontSize: 24 },
  input: { borderWidth: 1, borderColor: colors.border, borderRadius: 8, paddingHorizontal: 16, paddingVertical: 12, color: colors.textPrimary, backgroundColor: '#F7FAFC' },
  chip: { borderWidth: 1, borderColor: colors.border, borderRadius: 999, paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#F7FAFC' },
  chipText: { color: colors.textSecondary },
  suggestionBtn: { backgroundColor: colors.brandGold, borderRadius: 999, paddingHorizontal: 14, paddingVertical: 8 },
  suggestionText: { color: colors.brandNavy, fontWeight: '800' },
});