import React from 'react';
import { ScrollView, View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { colors } from '../theme/colors';
import { HeaderBar } from '../components/HeaderBar';
import { SiteFooter } from '../components/SiteFooter';
import { Ionicons } from '@expo/vector-icons';

export const ShippingPolicyScreen: React.FC = () => {
  const { width } = useWindowDimensions();
  const isNarrow = width < 900;

  return (
    <ScrollView style={styles.shell}>
      <HeaderBar />

      {/* Hero */}
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Global Shipping Solutions</Text>
        <Text style={styles.heroSubtitle}>
          Reliable worldwide delivery for your premium T‑shirt orders with comprehensive logistics support
        </Text>
      </View>

      {/* Policies overview */}
      <View style={[styles.section, { paddingTop: 24 }]}> 
        <View style={[styles.cardGrid, isNarrow && styles.cardGridNarrow]}> 
          <View style={[styles.card, isNarrow && styles.cardNarrow]}> 
            <Text style={styles.cardTitle}>Domestic Shipping</Text>
            <Text style={styles.cardText}>Fast and reliable delivery across the country with multiple shipping options to meet your timeline requirements.</Text>
            <View style={styles.bullet}> 
              <Text style={styles.bulletText}>• Express delivery: 1‑2 business days</Text>
              <Text style={styles.bulletText}>• Standard delivery: 3‑5 business days</Text>
              <Text style={styles.bulletText}>• Free shipping on orders over $500</Text>
            </View>
          </View>
          <View style={[styles.card, isNarrow && styles.cardNarrow]}> 
            <Text style={styles.cardTitle}>International Shipping</Text>
            <Text style={styles.cardText}>Comprehensive global coverage with dedicated logistics partners ensuring secure international delivery.</Text>
            <View style={styles.bullet}> 
              <Text style={styles.bulletText}>• Air freight: 5‑10 business days</Text>
              <Text style={styles.bulletText}>• Sea freight: 15‑30 business days</Text>
              <Text style={styles.bulletText}>• Complete customs documentation</Text>
            </View>
          </View>
        </View>
      </View>


      {/* Logistics support */}
      <View style={styles.section}> 
        <Text style={styles.sectionTitle}>Logistics Support Services</Text>
        <View style={[styles.features, isNarrow && styles.featuresNarrow]}> 
          <View style={styles.featureCard}> 
            <Ionicons name="document-text-outline" size={24} color={colors.brandNavy} />
            <Text style={styles.featureTitle}>Customs Documentation</Text>
            <Text style={styles.featureText}>Complete customs paperwork and documentation handling for seamless international shipping.</Text>
          </View>
          <View style={styles.featureCard}> 
            <Ionicons name="locate-outline" size={24} color={colors.brandNavy} />
            <Text style={styles.featureTitle}>Real‑Time Tracking</Text>
            <Text style={styles.featureText}>Advanced tracking providing real‑time updates on your order's journey from factory to destination.</Text>
          </View>
          <View style={styles.featureCard}> 
            <Ionicons name="shield-checkmark-outline" size={24} color={colors.brandNavy} />
            <Text style={styles.featureTitle}>Cargo Insurance</Text>
            <Text style={styles.featureText}>Comprehensive cargo insurance options to protect your valuable shipments during transit.</Text>
          </View>
        </View>
      </View>

      <SiteFooter />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  shell: { flex: 1, backgroundColor: '#FFFBF7' },
  hero: {
    backgroundColor: 'transparent',
    paddingVertical: 40,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  heroTitle: { color: colors.brandNavy, fontSize: 36, fontWeight: '800', fontFamily: 'serif', marginBottom: 6, textAlign: 'center' },
  heroSubtitle: { color: colors.textSecondary, opacity: 0.9, textAlign: 'center', maxWidth: 900 },

  section: { paddingHorizontal: 24, paddingVertical: 32, alignItems: 'center' },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: colors.brandNavy, marginBottom: 16, fontFamily: 'serif' },

  cardGrid: { flexDirection: 'row', gap: 24, width: '100%', maxWidth: 1200 },
  cardGridNarrow: { flexDirection: 'column' },
  card: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  cardNarrow: { width: '100%' },
  cardTitle: { fontWeight: '700', color: colors.brandNavy, marginBottom: 8, fontSize: 16 },
  cardText: { color: colors.textSecondary, marginBottom: 12 },
  bullet: { gap: 6 },
  bulletText: { color: colors.textPrimary },

  features: { flexDirection: 'row', gap: 24, width: '100%', maxWidth: 1200 },
  featuresNarrow: { flexDirection: 'column' },
  featureCard: { flex: 1, backgroundColor: 'white', borderWidth: 1, borderColor: colors.border, borderRadius: 12, padding: 16, alignItems: 'flex-start', gap: 8 },
  featureTitle: { fontWeight: '700', color: colors.brandNavy },
  featureText: { color: colors.textSecondary },
});


