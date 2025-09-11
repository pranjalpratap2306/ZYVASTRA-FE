import React from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Pressable, Alert } from 'react-native';
import { colors } from '../theme/colors';
import { REVIEWS, getAverageRating, ReviewItem } from '../data/reviews';

const Stars: React.FC<{ value: number }> = ({ value }) => (
  <Text style={{ color: colors.brandGold }}>{'★★★★★☆☆☆☆☆'.slice(5 - Math.round(value), 10 - Math.round(value))}</Text>
);

export const ReviewsScreen: React.FC = () => {
  const [reviews, setReviews] = React.useState<ReviewItem[]>(REVIEWS);
  const [name, setName] = React.useState('');
  const [text, setText] = React.useState('');
  const [rating, setRating] = React.useState('5');

  const onSubmit = () => {
    if (!name || !text) {
      Alert.alert('Missing info', 'Please enter your name and review text.');
      return;
    }
    const item: ReviewItem = {
      id: `r${Date.now()}`,
      name,
      rating: Math.max(1, Math.min(5, parseInt(rating || '5', 10))) || 5,
      text,
      date: new Date().toISOString(),
    };
    setReviews([item, ...reviews]);
    setName('');
    setText('');
    setRating('5');
    Alert.alert('Thanks!', 'Your review has been added locally.');
  };

  const avg = getAverageRating(reviews);

  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>Testimonials</Text>
      <Text style={styles.subtitle}>Overall Rating: {avg} / 5</Text>

      <View style={styles.form}> 
        <Text style={styles.formTitle}>Write a Review</Text>
        <TextInput placeholder="Your Name" value={name} onChangeText={setName} style={styles.input} />
        <TextInput placeholder="Your Review" value={text} onChangeText={setText} multiline numberOfLines={4} style={[styles.input, { height: 100 }]} />
        <TextInput placeholder="Rating (1-5)" value={rating} onChangeText={setRating} keyboardType="numeric" style={styles.input} />
        <Pressable style={styles.submit} onPress={onSubmit}><Text style={styles.submitText}>Submit</Text></Pressable>
      </View>

      <FlatList
        data={reviews}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardText}>{item.text}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
              <Text style={styles.cardAuthor}>{item.name}</Text>
              <Text style={styles.cardRating}>{'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.surfaceAlt, padding: 16 },
  title: { color: colors.brandNavy, fontWeight: '900', fontSize: 22, marginBottom: 4 },
  subtitle: { color: colors.textSecondary, marginBottom: 12 },
  form: { backgroundColor: colors.surface, borderRadius: 12, borderWidth: 1, borderColor: colors.border, padding: 12, marginBottom: 12 },
  formTitle: { color: colors.brandNavy, fontWeight: '800', marginBottom: 8 },
  input: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 8, padding: 10, marginBottom: 8 },
  submit: { backgroundColor: colors.brandNavyHeader, borderWidth: 1, borderColor: colors.brandGold, paddingVertical: 10, borderRadius: 10, alignItems: 'center' },
  submitText: { color: colors.brandGold, fontWeight: '800' },
  card: { backgroundColor: colors.surface, borderRadius: 12, borderWidth: 1, borderColor: colors.border, padding: 12 },
  cardText: { color: colors.textPrimary, lineHeight: 20 },
  cardAuthor: { color: colors.textSecondary, fontWeight: '800' },
  cardRating: { color: colors.brandGold, fontWeight: '800' },
}); 