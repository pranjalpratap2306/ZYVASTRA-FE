import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, useWindowDimensions, Image, Pressable, Platform } from 'react-native';
import { colors } from '../theme/colors';
import { HeaderBar } from '../components/HeaderBar';
import { SiteFooter } from '../components/SiteFooter';
import { Ionicons } from '@expo/vector-icons';

export const AboutZVASTRAScreen: React.FC = () => {
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 768;

  const styles = getStyles(isSmallScreen);

  return (
    <ScrollView style={styles.shell}>
      <HeaderBar />
      <ImageBackground
        source={require('../../assets/export_section_bg.png')}
        style={styles.hero}
        resizeMode="cover"
      >
        <View style={styles.heroOverlay}>
          <Text style={styles.heroTitle}>About Us</Text>
          <Text style={styles.breadcrumbs}>Home / About</Text>
        </View>
      </ImageBackground>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Crafted to define — ZYVASTRA</Text>
        <Text style={styles.bodyText}>
          ZYVASTRA is a home‑grown T‑shirt brand and private‑label manufacturer committed to everyday luxury. From round‑neck and polos to oversized and eco‑friendly tees, we design and produce garments that feel great, fit right and last longer. Our foundation is simple: thoughtful fabrics, meticulous finishing and honest workmanship.
        </Text>
        <Text style={styles.bodyText}>
          With 3–4 years of export experience and a growing partner network, we supply brands, corporates and events across India and overseas. Every order follows a clear, dependable process—from sampling and patterning to bulk production, quality checks and on‑time dispatch—so your team always knows what’s happening and when.
        </Text>
        <Text style={styles.bodyText}>
          We champion responsible manufacturing: organic cotton and recycled blends, skin‑safe dyes, water‑based prints, precision sizing and careful packing. Whether you need premium basics, promotional tees or private‑label collections, ZYVASTRA builds comfort, consistency and credibility into every piece.
        </Text>
      </View>

      {/* Founder & CEO Section */}
      <View style={styles.founderWrap}>
        <View style={[styles.founderRow, isSmallScreen && { flexDirection: 'column' }]}> 
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c57?q=80&w=1200&auto=format&fit=crop' }}
            style={[styles.founderImage, isSmallScreen && { width: '90%', height: 420, marginBottom: 16 }]}
            resizeMode="cover"
          />
          <View style={styles.founderTextCol}>
            <Text style={styles.sectionHeading}>Founder & C.E.O.</Text>
            <Text style={styles.founderBody}><Text style={styles.bold}>Mr. Anand Meena</Text> comes from a strong business family and leads ZYVASTRA with a builder’s mindset—hands‑on, transparent and quality first. With 3–4 years of direct export experience, he has successfully collaborated with buyers in 5+ countries, including key markets across Africa and Europe. His deep understanding of international trade and commitment to quality drive <Text style={styles.bold}>ZYVASTRA’s</Text> mission to deliver excellence in every shipment.</Text>
          </View>
        </View>
      </View>

      {/* Mission & Vision Section */}
      <View style={styles.missionWrap}>
        <View style={[styles.missionRow, isSmallScreen && { flexDirection: 'column' }]}> 
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1400&auto=format&fit=crop' }}
            style={[styles.missionImage, isSmallScreen && { width: '100%', height: 320, marginBottom: 16 }]}
            resizeMode="cover"
          />
          <View style={styles.missionTextCol}>
            <Text style={styles.mvTitle}>Our Mission:</Text>
            <Text style={styles.mvBody}>To craft premium, comfortable and durable T‑shirts—responsibly made in India. We obsess over fabric hand‑feel, fit and finishing, pairing ethical sourcing with rigorous quality checks and skin‑safe prints.</Text>
            <Text style={[styles.mvTitle, { marginTop: 18 }]}>Our Vision:</Text>
            <Text style={styles.mvBody}>To become the most trusted apparel partner for brands worldwide by delivering reliable timelines, seamless customization and sustainable options—building long‑term partnerships on consistency and care.</Text>
            <Pressable style={styles.mvCta} onPress={() => {}}>
              <Text style={styles.mvCtaText}>Know us better</Text>
            </Pressable>
          </View>
        </View>
      </View>

      {/* Stats Strip */}
      <View style={styles.statsStrip}>
        <View style={styles.statItem}>
          <Ionicons name="globe-outline" size={28} color={colors.brandNavyHeader} />
          <Text style={styles.statNumber}>4+</Text>
          <Text style={styles.statText}>Over 4+ years of{Platform.OS === 'web' ? ' ' : '\n'}expertise in global trade</Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="shield-checkmark-outline" size={28} color={colors.brandNavyHeader} />
          <Text style={styles.statNumber}>100%</Text>
          <Text style={styles.statText}>Guaranteed Purity,{Platform.OS === 'web' ? ' ' : '\n'}Unmatched Quality</Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="headset-outline" size={28} color={colors.brandNavyHeader} />
          <Text style={styles.statNumber}>24/7</Text>
          <Text style={styles.statText}>24/7 support for all your{Platform.OS === 'web' ? ' ' : '\n'}import export needs</Text>
        </View>
      </View>
      <SiteFooter />
    </ScrollView>
  );
};

const getStyles = (isSmallScreen: boolean) => StyleSheet.create({
  shell: {
    flex: 1,
    backgroundColor: '#F5F0E5',
  },
  container: {
    flex: 1,
  },
  hero: {
    width: '100%',
    height: isSmallScreen ? 200 : 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 8,
  },
  heroTitle: {
    fontSize: isSmallScreen ? 32 : 48,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    fontFamily: 'serif',
  },
  breadcrumbs: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginTop: 8,
  },
  contentContainer: {
    padding: isSmallScreen ? 24 : 48,
    alignItems: 'center',
  },
  title: {
    fontSize: isSmallScreen ? 28 : 36,
    fontWeight: '600',
    color: colors.textPrimary,
    fontFamily: 'serif',
    marginBottom: 24,
    textAlign: 'center',
  },
  bodyText: {
    fontSize: 16,
    color: colors.textPrimary,
    lineHeight: 24,
    textAlign: 'center',
    maxWidth: 800,
    marginBottom: 16,
  },
  // Founder
  founderWrap: { paddingHorizontal: isSmallScreen ? 16 : 24, paddingVertical: isSmallScreen ? 24 : 48 },
  founderRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 24 },
  founderImage: { width: 460, height: 640, borderRadius: 14, backgroundColor: colors.surface },
  founderTextCol: { flex: 1, paddingHorizontal: 8 },
  sectionHeading: { color: '#1F7A3D', fontSize: isSmallScreen ? 28 : 36, fontWeight: '800', marginBottom: 12, fontFamily: 'serif' },
  founderBody: { color: colors.textSecondary, lineHeight: 22, fontSize: 15 },
  bold: { fontWeight: '700', color: colors.textPrimary },

  // Mission & Vision
  missionWrap: { backgroundColor: '#EDE3D3', paddingHorizontal: isSmallScreen ? 16 : 24, paddingVertical: isSmallScreen ? 24 : 48 },
  missionRow: { flexDirection: 'row', alignItems: 'center', gap: 24, maxWidth: 1200, alignSelf: 'center' },
  missionImage: { width: 520, height: 340, borderRadius: 12, backgroundColor: colors.surface },
  missionTextCol: { flex: 1 },
  mvTitle: { color: '#0F172A', fontSize: isSmallScreen ? 24 : 28, fontWeight: '900', marginBottom: 8, fontFamily: Platform.OS === 'web' ? '"Playfair Display", serif' : undefined },
  mvBody: { color: colors.textSecondary, lineHeight: 24, marginBottom: 4 },
  mvCta: { alignSelf: 'flex-start', marginTop: 16, paddingVertical: 12, paddingHorizontal: 20, borderWidth: 1, borderColor: colors.brandNavyHeader, borderRadius: 6, backgroundColor: colors.brandNavyHeader },
  mvCtaText: { color: colors.brandGold, fontWeight: '800', letterSpacing: 1 },

  // Stats strip
  statsStrip: { backgroundColor: '#F6EFE6', flexDirection: 'row', justifyContent: 'space-around', paddingVertical: isSmallScreen ? 24 : 40, paddingHorizontal: 16, gap: 12, flexWrap: 'wrap' as any },
  statItem: { width: isSmallScreen ? '100%' : '33%', alignItems: 'center', gap: 6, paddingVertical: 8 },
  statNumber: { color: colors.textPrimary, fontSize: 18, fontWeight: '900' },
  statText: { color: colors.textSecondary, textAlign: 'center' },
});
