import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, Pressable, ScrollView, useWindowDimensions } from 'react-native';
import { colors } from '../theme/colors';

export interface ProductDetailParams {
  title: string;
  imageUrl: string;
}

export const ProductDetailScreen: React.FC<any> = ({ route }) => {
  const { title, imageUrl } = route.params as ProductDetailParams;
  const { width } = useWindowDimensions();
  const isNarrow = width < 900;

  const details = [
    { k: 'Size', v: 'S, M, L, XL, XXL' },
    { k: 'Technics', v: 'Machine Made' },
    { k: 'Occasion', v: 'Formal Wear' },
    { k: 'Feature', v: 'Impeccable Finish, Easily Washable, Comfortable, Anti‑Wrinkle' },
    { k: 'Pattern', v: 'Printed, Plain' },
    { k: 'Country of Origin', v: 'India' },
  ];

  return (
    <ScrollView style={styles.wrap} contentContainerStyle={{ paddingBottom: 28 }}>
      <View style={styles.headerBar} />
      <Text style={styles.title}>{title}</Text>

      <View style={[styles.heroRow, isNarrow && { flexDirection: 'column' }]}> 
        <View style={[styles.imageCard, isNarrow && { marginBottom: 12 }]}> 
          <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
        </View>
        <View style={styles.infoCard}>
          <View style={styles.badges}> 
            <Text style={styles.badge}>100% Cotton</Text>
            <Text style={styles.badge}>Eco</Text>
          </View>

          <View style={styles.specRow}><Text style={styles.specKey}>Business Type</Text><Text style={styles.specVal}>Manufacturer, Exporter, Supplier</Text></View>
          <View style={styles.specRow}><Text style={styles.specKey}>Material</Text><Text style={styles.specVal}>100% Cotton</Text></View>
          <View style={styles.specRow}><Text style={styles.specKey}>Color</Text><Text style={styles.specVal}>Multicolor</Text></View>
          <View style={styles.specRow}><Text style={styles.specKey}>Sleeve Type</Text><Text style={styles.specVal}>Full Sleeve</Text></View>

          <View style={{ flexDirection: 'row', gap: 12, marginTop: 16 }}>
            <Pressable style={styles.primaryBtn}><Text style={styles.primaryText}>Send Enquiry</Text></Pressable>
          </View>
        </View>
      </View>

      <View style={styles.table}> 
        <Text style={styles.sectionTitle}>Product Details</Text>
        {details.map((d, i) => (
          <View key={d.k} style={[styles.row, i % 2 === 1 && styles.rowAlt]}>
            <Text style={styles.cellKey}>{d.k}</Text>
            <Text style={styles.cellVal}>{d.v}</Text>
          </View>
        ))}
        <Text style={styles.note}>Available in: 100% Cotton, Polyester & Polly Cotton</Text>
      </View>

      <View style={styles.enquiry}> 
        <View style={styles.enquiryHeader}>
          <Text style={styles.enquiryTitle}>Looking for Customized {title}</Text>
        </View>
        <Text style={{ textAlign: 'center', color: colors.textSecondary, marginBottom: 12 }}>Share your requirement and we will get back to you quickly.</Text>
        <View style={[styles.formRow, isNarrow && { flexDirection: 'column' }]}>
          <View style={[styles.formCol, { flex: 1 }]}>
            <Text style={styles.label}>Name</Text>
            <TextInput placeholder="Your full name" style={styles.input} />
          </View>
          <View style={[styles.formCol, { flex: 1 }]}>
            <Text style={styles.label}>Email</Text>
            <TextInput placeholder="you@example.com" keyboardType="email-address" style={styles.input} />
          </View>
        </View>
        <View style={[styles.formRow, isNarrow && { flexDirection: 'column' }]}>
          <View style={[styles.formCol, { flex: 1 }]}>
            <Text style={styles.label}>Mobile No.</Text>
            <TextInput placeholder="Enter Mobile No." keyboardType="phone-pad" style={styles.input} />
          </View>
          <View style={[styles.formCol, { flex: 1 }]}>
            <Text style={styles.label}>Estimated Quantity</Text>
            <TextInput placeholder="e.g. 150 Pieces" keyboardType="numeric" style={styles.input} />
          </View>
        </View>
        <View style={styles.formRow}>
          <View style={[styles.formCol, { flex: 1 }]}>
            <Text style={styles.label}>Requirement Details</Text>
            <TextInput placeholder="Tell us about customization, sizes, colors…" style={[styles.input, { height: 120 }]} multiline />
          </View>
        </View>
        <Pressable style={[styles.primaryBtn, { alignSelf: 'center', paddingHorizontal: 28 }]}><Text style={styles.primaryText}>Send Enquiry</Text></Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.surfaceAlt },
  headerBar: { height: 4, width: 48, backgroundColor: colors.brandGold, borderRadius: 2, marginTop: 12, marginLeft: 16 },
  title: { color: colors.brandNavy, fontWeight: '900', fontSize: 24, paddingHorizontal: 16, paddingTop: 8, marginBottom: 8 },
  heroRow: { flexDirection: 'row', gap: 12, paddingHorizontal: 16 },
  imageCard: { flex: 1, backgroundColor: colors.surface, borderRadius: 12, borderWidth: 1, borderColor: colors.brandGold, alignItems: 'center', justifyContent: 'center', padding: 12, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 12, shadowOffset: { width: 0, height: 6 } },
  image: { width: '100%', height: 360, borderRadius: 10 },
  infoCard: { flex: 1, backgroundColor: colors.surface, borderRadius: 12, borderWidth: 1, borderColor: colors.border, padding: 16, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 12, shadowOffset: { width: 0, height: 6 } },
  badges: { flexDirection: 'row', gap: 8 },
  badge: { backgroundColor: '#F2E7D6', color: colors.brandNavy, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999, fontWeight: '800' } as any,
  specRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.border },
  specKey: { color: colors.textSecondary },
  specVal: { color: colors.textPrimary, fontWeight: '700' },
  primaryBtn: { backgroundColor: colors.brandNavyHeader, borderWidth: 1, borderColor: colors.brandGold, paddingVertical: 12, paddingHorizontal: 12, borderRadius: 12 },
  primaryText: { color: colors.brandGold, fontWeight: '800' },

  table: { backgroundColor: colors.surface, borderRadius: 12, borderWidth: 1, borderColor: colors.border, padding: 16, marginHorizontal: 16, marginTop: 12, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 10, shadowOffset: { width: 0, height: 4 } },
  sectionTitle: { color: colors.brandNavy, fontWeight: '900', fontSize: 18, marginBottom: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.border },
  rowAlt: { backgroundColor: '#F8FAFD', borderRadius: 8, paddingHorizontal: 8 },
  cellKey: { color: colors.textSecondary },
  cellVal: { color: colors.brandNavy, fontWeight: '800', flex: 1, textAlign: 'right', marginLeft: 8 },
  note: { color: colors.textSecondary, marginTop: 8 },

  enquiry: { backgroundColor: colors.surface, borderRadius: 12, borderWidth: 1, borderColor: colors.border, padding: 16, marginHorizontal: 16, marginTop: 12, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 10, shadowOffset: { width: 0, height: 4 } },
  enquiryHeader: { alignSelf: 'center', backgroundColor: colors.brandNavyHeader, borderWidth: 1, borderColor: colors.brandGold, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 8, marginBottom: 12 },
  enquiryTitle: { color: colors.brandGold, fontWeight: '900', fontSize: 18, textAlign: 'center' },
  formRow: { flexDirection: 'row', gap: 8, marginBottom: 8 },
  formCol: { gap: 6 },
  label: { color: colors.textSecondary, fontWeight: '700' },
  input: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 10, padding: 12 },
}); 