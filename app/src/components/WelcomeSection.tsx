import React from 'react';
import { View, Text, Image, StyleSheet, Pressable, useWindowDimensions } from 'react-native';
import { colors } from '../theme/colors';
import { useNavigation } from '@react-navigation/native';

export const WelcomeSection: React.FC = () => {
  const navigation = useNavigation<any>();
  const { width } = useWindowDimensions();

  // Use fixed height on desktop to keep both feature cards equal; let mobile be auto
  const cardHeight = width >= 900 ? 360 : undefined;
  const cardDimStyle = cardHeight ? { height: cardHeight } : {};

  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        <View style={styles.left}> 
          <View style={[styles.imageCard, cardDimStyle]}>
            <Image
              source={require('../../assets/welcome_website_2.png')}
              style={[styles.image, cardHeight ? { height: '100%' } : {}]}
              resizeMode="cover"
            />
          </View>
        </View>
        <View style={[styles.right, cardDimStyle]}>
          <Text style={styles.heading}>Welcome to Our Website</Text>
          <View style={styles.headingAccent} />
          <Text style={styles.copy}>Designer T‑Shirts are the one product that never goes out of style and suits every age group. At ZYVASTRA, we bring a dependable, premium range of products for brands, corporates and events across India and overseas.</Text>
          <Text style={styles.copy}>Our assortment includes custom T‑Shirts, Polo Shirts, Non‑Woven and Promotional Bags, Uniforms and more. We offer multiple fabrics, colors, sizes and finishing options to meet varied requirements, and we manufacture to your specification with on‑time delivery.</Text>
          <Pressable style={styles.viewMore} onPress={() => navigation.navigate('About')}> 
            <Text style={styles.viewMoreIcon}>➜</Text>
            <Text style={styles.viewMoreText}>View more</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: { backgroundColor: colors.surfaceAlt, paddingHorizontal: 8, paddingVertical: 8 },
  row: { flexDirection: 'row', gap: 8, alignItems: 'stretch' },
  left: { flex: 1, minWidth: 280 },
  right: { flex: 1, backgroundColor: colors.surface, borderRadius: 12, padding: 20, borderWidth: 1, borderColor: colors.brandGold, justifyContent: 'flex-start', shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 10, shadowOffset: { width: 0, height: 6 } },
  imageCard: { backgroundColor: colors.surface, borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: colors.brandGold, alignSelf: 'stretch', shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 10, shadowOffset: { width: 0, height: 6 } },
  image: { width: '100%', aspectRatio: 16/11 },
  heading: { color: colors.brandNavy, fontSize: 28, fontWeight: '900', marginBottom: 8 },
  headingAccent: { width: 64, height: 4, backgroundColor: colors.brandGold, borderRadius: 2, marginBottom: 12 },
  copy: { color: colors.textPrimary, lineHeight: 22, marginBottom: 10 },
  viewMore: { marginTop: 'auto', flexDirection: 'row', alignItems: 'center', gap: 8 },
  viewMoreIcon: { backgroundColor: colors.brandNavyHeader, color: colors.surface, width: 34, height: 34, textAlign: 'center', textAlignVertical: 'center', borderRadius: 17, lineHeight: 34, borderWidth: 1, borderColor: colors.brandGold },
  viewMoreText: { color: colors.textPrimary, fontWeight: '800' },
}); 