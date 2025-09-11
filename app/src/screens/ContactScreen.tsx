import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable, Alert, Image, Linking, Platform } from 'react-native';
import { colors } from '../theme/colors';

export const ContactScreen: React.FC = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [message, setMessage] = React.useState('');

  // Approximate coordinates for Uttam Nagar, New Delhi (edit to your exact office coordinates)
  const OFFICE_LAT = 23.317322;
  const OFFICE_LNG = 77.317551;
  const OFFICE_ADDR = 'Shop no 01 In front of Aman Hospital, Shantinagar, Bhopal, Madhya Pradesh, India - 462022';

  const openInMaps = async () => {
    const url = Platform.select({
      ios: `http://maps.apple.com/?q=${encodeURIComponent(OFFICE_ADDR)}&ll=${OFFICE_LAT},${OFFICE_LNG}`,
      android: `geo:${OFFICE_LAT},${OFFICE_LNG}?q=${encodeURIComponent(OFFICE_ADDR)}`,
      default: `https://maps.google.com/?q=${encodeURIComponent(OFFICE_ADDR)}&ll=${OFFICE_LAT},${OFFICE_LNG}`,
    }) as string;
    const supported = await Linking.canOpenURL(url);
    if (supported) await Linking.openURL(url);
  };

  const staticMapUrl = `https://staticmap.openstreetmap.de/staticmap.php?center=${OFFICE_LAT},${OFFICE_LNG}&zoom=14&size=700x300&markers=${OFFICE_LAT},${OFFICE_LNG},red-pushpin`;
  const googleEmbed = `https://www.google.com/maps?q=${OFFICE_LAT},${OFFICE_LNG}&output=embed`;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Contact Us</Text>
        <Text style={styles.heroSub}>We would love to hear from you</Text>
      </View>

      <View style={styles.grid}>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Get in touch</Text>
          <Text style={styles.muted}>Tell us about your business. Our team will call you back to help you get quotes.</Text>

          <View style={styles.divider} />

          <Text style={styles.label}>Office Address</Text>
          <Text style={styles.value}>{OFFICE_ADDR}</Text>

          <View style={styles.gap8} />
          <Text style={styles.label}>Call us</Text>
          <Text style={styles.value}>+91 7428073088</Text>

          <View style={styles.gap8} />
          <Text style={styles.label}>Mail us</Text>
          <Text style={styles.value}>support@zyvastra.com</Text>
        </View>

        {/* Map card placed below the previous form position */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Find us on the map</Text>
          <View style={styles.mapCard}>
            {Platform.OS === 'web' ? (
              // @ts-ignore - iframe allowed on web build
              <iframe src={googleEmbed} style={styles.iframe as any} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            ) : (
              <Image source={{ uri: staticMapUrl }} style={styles.mapImg} />
            )}
            <Pressable style={styles.mapBtn} onPress={openInMaps}>
              <Text style={styles.mapBtnText}>Open in Google Maps</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 24,
    backgroundColor: colors.surfaceAlt,
  },
  hero: {
    backgroundColor: colors.brandNavyHeader,
    paddingVertical: 36,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  heroTitle: {
    color: colors.brandGold,
    fontSize: 28,
    fontWeight: '900',
  },
  heroSub: {
    color: colors.textOnDark,
    marginTop: 6,
  },
  grid: {
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 16,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  muted: {
    color: colors.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 12,
  },
  label: {
    color: colors.textPrimary,
    fontWeight: '700',
  },
  value: {
    color: colors.textSecondary,
  },
  gap8: { height: 8 },
  mapCard: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    overflow: 'hidden',
  },
  mapImg: {
    width: '100%',
    height: 260,
  },
  iframe: {
    width: '100%',
    height: 260,
    borderWidth: 0,
  },
  mapBtn: {
    paddingVertical: 10,
    backgroundColor: colors.brandNavyHeader,
    alignItems: 'center',
  },
  mapBtnText: {
    color: colors.brandGold,
    fontWeight: '800',
  },
}); 