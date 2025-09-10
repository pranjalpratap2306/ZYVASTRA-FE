import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { colors } from '../theme/colors';
import { useNavigation } from '@react-navigation/native';

export const WelcomeSection: React.FC = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        <View style={styles.left}> 
          <View style={styles.imageCard}>
            <Image
              source={require('../../assets/welcome_website_2.png')}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        </View>
        <View style={styles.right}>
          <Text style={styles.heading}>Welcome to Our Website</Text>
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
  row: { flexDirection: 'row', gap: 16, alignItems: 'flex-start' },
  left: { flex: 1, minWidth: 280 },
  right: { flex: 1, backgroundColor: colors.surface, borderRadius: 12, padding: 20, borderWidth: 1, borderColor: colors.border, justifyContent: 'flex-start' },
  imageCard: { backgroundColor: colors.surface, borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: colors.border, alignSelf: 'stretch' },
  image: { width: '100%', aspectRatio: 16/11, maxHeight: 360 },
  heading: { color: colors.brandNavy, fontSize: 28, fontWeight: '900', marginBottom: 12 },
  copy: { color: colors.textPrimary, lineHeight: 22, marginBottom: 10 },
  viewMore: { marginTop: 8, flexDirection: 'row', alignItems: 'center', gap: 8 },
  viewMoreIcon: { backgroundColor: colors.brandNavyHeader, color: colors.surface, width: 34, height: 34, textAlign: 'center', textAlignVertical: 'center', borderRadius: 17, lineHeight: 34 },
  viewMoreText: { color: colors.textPrimary, fontWeight: '700' },
}); 