import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, Pressable, ScrollView, useWindowDimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { colors } from '../theme/colors';
import { HeaderBar } from '../components/HeaderBar';
import { SiteFooter } from '../components/SiteFooter';
import { sendEnquiry } from '../services/enquiries';

export interface ProductDetailParams {
  title: string;
  imageUrl: any;
}

export const ProductDetailScreen: React.FC<any> = ({ route }) => {
  const { title, imageUrl } = route.params as ProductDetailParams;
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { width } = useWindowDimensions();
  const isNarrow = width < 900;
  const [tab, setTab] = React.useState<'desc' | 'specs' | 'benefits'>('desc');
  const [productDropdownOpen, setProductDropdownOpen] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<string>(title);
  const [hoveredChip, setHoveredChip] = React.useState<number | null>(null);
  const [hoveredInterest, setHoveredInterest] = React.useState<number | null>(null);
  const [enquiry, setEnquiry] = React.useState({ name: '', email: '', phone: '', quantity: '', details: '' });

  // Product-specific meta (can be expanded or fetched in future)
  const productMeta: Record<string, any> = {
    'Round Neck T‑Shirts': {
      material: '100% Cotton, Polyester & Polly Cotton',
      color: 'All colours available',
      sleeve: 'Half / Full Sleeves (as per requirement)',
      sizes: 'S, M, L, XL, XXL',
      pattern: 'Printed / Plain / Embroidered',
      occasion: 'Casual Wear, Corporate Merchandise, Events',
      feature: 'Soft hand‑feel, Breathable, Colorfast, Anti‑Shrink, Easy Care',
    },
    'Polo T‑Shirts': {
      material: 'Cotton / Cotton‑Poly Pique',
      color: 'All colours available',
      sleeve: 'Half / Full Sleeves',
      sizes: 'S, M, L, XL, XXL',
      pattern: 'Solid / Stripes / Custom',
      occasion: 'Workwear, Promotions, Clubs',
      feature: 'Premium pique texture, Durable collar, Pilling‑resistant',
    },
    'Printed T‑Shirts': {
      material: '100% Cotton, Blends',
      color: 'All colours available',
      sleeve: 'Half / Full Sleeves',
      sizes: 'S, M, L, XL, XXL',
      pattern: 'DTF / Screen / Sublimation Prints',
      occasion: 'Branding, Campaigns, E‑commerce',
      feature: 'Vivid prints, Wash‑durable inks, Custom labels',
    },
    'Eco‑friendly T‑Shirt': {
      material: 'Organic Cotton / Bamboo Blends',
      color: 'Natural earthy palette + customs',
      sleeve: 'Half / Full Sleeves',
      sizes: 'S, M, L, XL, XXL',
      pattern: 'Solid / Minimal Print',
      occasion: 'Sustainable lines, Gifting',
      feature: 'Low‑impact dyes, Water‑based prints, Recyclable packaging',
    },
  };

  const meta = productMeta[title] || productMeta['Round Neck T‑Shirts'];

  const details = [
    { k: 'Material', v: meta.material },
    { k: 'Available Colors', v: meta.color },
    { k: 'Sizes', v: meta.sizes },
    { k: 'Sleeve', v: meta.sleeve },
    { k: 'Pattern', v: meta.pattern },
    { k: 'Occasion', v: meta.occasion },
    { k: 'Features', v: meta.feature },
    { k: 'Country of Origin', v: 'India' },
  ];

  const descriptionText = `${title} crafted with ${meta.material.toLowerCase()} in ${meta.color.toLowerCase()}. Ideal for ${meta.occasion.toLowerCase()}.`;
  const benefitList = String(meta.feature).split(',').map((s) => s.trim());

  const submitEnquiry = async () => {
    if (!enquiry.name || !enquiry.email || !enquiry.phone) {
      Alert.alert('Validation', 'Please fill Name, Email and Mobile No.');
      return;
    }
    try {
      await sendEnquiry({
        name: enquiry.name.trim(),
        email: enquiry.email.trim(),
        phone: enquiry.phone.trim(),
        quantity: enquiry.quantity ? enquiry.quantity.trim() : 'N/A',
        productService: selectedProduct || title,
        orderNotes: enquiry.details.trim(),
        companyName: '',
      });
      Alert.alert('Thank you!', 'Your enquiry has been submitted. We will contact you soon.');
      setEnquiry({ name: '', email: '', phone: '', quantity: '', details: '' });
    } catch (e: any) {
      Alert.alert('Submission failed', e?.message || 'Something went wrong. Please try again.');
    }
  };

  // Prefer using the same image as in the category cards
  // Normalize title to avoid hyphen/space variants
  const normalize = (s: string) => s
    .replace(/[‐‑–—−]/g, '-') // normalize hyphens/dashes
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

  const titleKey = normalize(title);
  const categoryImageByTitle: Record<string, any> = {
    [normalize('Round Neck T-Shirts')]: require('../../assets/over_sized_tshirt_product_category.jpeg'),
    [normalize('Polo T-Shirts')]: require('../../assets/polo_tshirt_product_category.jpeg'),
    [normalize('Printed T-Shirts')]: require('../../assets/Printed-Tshirt.png'),
    [normalize('Eco-friendly T-Shirt')]: require('../../assets/dashboard_2.png'),
  };

  const primaryImage = imageUrl ?? categoryImageByTitle[titleKey] ?? require('../../assets/round-neck-tshirt.png');

  // Simple gallery: primary image + a few fallbacks
  const gallery: any[] = [primaryImage || require('../../assets/over_sized_tshirt_product_category.jpeg')];

  const toImageSource = (img: any) => {
    if (typeof img === 'string') return { uri: img } as any;
    try {
      // resolveAssetSource returns a proper source object on web/native
      const resolved = (Image as any).resolveAssetSource?.(img);
      return resolved || img;
    } catch { return img; }
  };

  return (
    <ScrollView style={styles.shell}>
      <HeaderBar />
      <View style={styles.wrap}>
        <View style={styles.page}>
          <View style={styles.headerBar} />
          <Text style={styles.title}>{title}</Text>

          <View style={[styles.heroRow, isNarrow && { flexDirection: 'column' }]}> 
            <View style={[styles.imageCard, isNarrow && styles.imageCardNarrow]}> 
              <Image
                source={toImageSource(gallery[0])}
                style={[styles.image, isNarrow && styles.imageMobile]}
                resizeMode={isNarrow ? 'contain' : 'cover'}
              />
            </View>
            <View style={styles.infoCard}>
            {/* Availability + quick facts (like the turmeric layout) */}
            <View style={{ flexDirection:'row', alignItems:'center', gap:10, marginBottom:8 }}>
              <Text style={styles.specKey}>Availability:</Text>
              <Text style={styles.inStockPill}>In Stock</Text>
            </View>
            <View style={[styles.specRow, isNarrow && styles.specRowNarrow]}>
              <Text style={styles.specKey}>Product</Text>
              <Text style={[styles.specVal, isNarrow && styles.specValNarrow]}>{title.replace(/\s+/g,'-').toUpperCase()}</Text>
            </View>
            <View style={[styles.specRow, isNarrow && styles.specRowNarrow]}>
              <Text style={styles.specKey}>Category</Text>
              <Text style={[styles.specVal, isNarrow && styles.specValNarrow]}>{title}</Text>
            </View>
            <View style={[styles.specRow, isNarrow && styles.specRowNarrow]}>
              <Text style={styles.specKey}>Shelf Life</Text>
              <Text style={[styles.specVal, isNarrow && styles.specValNarrow]}>12–18 months</Text>
            </View>
            <View style={[styles.specRow, isNarrow && styles.specRowNarrow]}>
              <Text style={styles.specKey}>Packaging</Text>
              <Text style={[styles.specVal, isNarrow && styles.specValNarrow]}>Airtight, food‑grade</Text>
            </View>
            <View style={[styles.specRow, isNarrow && styles.specRowNarrow]}>
              <Text style={styles.specKey}>Purity</Text>
              <Text style={[styles.specVal, isNarrow && styles.specValNarrow]}>100% organic, chemical‑free</Text>
            </View>
            {/* Highlights chips - web only */}
            {!isNarrow && (
              <View style={[styles.chipsRow, { marginTop: 8, marginBottom: 16 }]}>
                {String(meta.feature)
                  .split(',')
                  .slice(0, 5)
                  .map((t: string, i: number) => (
                    <Pressable
                      key={i}
                      style={[
                        styles.chipBase,
                        hoveredChip === i && styles.chipHover,
                      ]}
                      // @ts-ignore web-only
                      onHoverIn={() => setHoveredChip(i)}
                      // @ts-ignore web-only
                      onHoverOut={() => setHoveredChip(null)}
                    >
                      <Text style={[styles.chipText, hoveredChip === i && styles.chipTextHover]}>
                        {t.trim()}
                      </Text>
                    </Pressable>
                  ))}
              </View>
            )}
          </View>
          </View>

          {/* Category tabs */}
          <View style={styles.tabsRow}>
            {(['desc','specs','benefits'] as const).map((t) => (
              <Pressable key={t} onPress={() => setTab(t)} style={[styles.tab, tab === t && styles.tabActive]}>
                <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>
                  {t === 'desc' ? 'Description' : t === 'specs' ? 'Specifications' : 'Benefits'}
                </Text>
              </Pressable>
            ))}
          </View>
          <View style={styles.table}> 
            {tab === 'desc' && (
              <Text style={{ color: colors.textSecondary }}>{descriptionText}</Text>
            )}
            {tab === 'specs' && (
              <View>
                <Text style={styles.sectionTitle}>Product Details</Text>
                {details.map((d, i) => (
                  <View key={d.k} style={[styles.row, i % 2 === 1 && styles.rowAlt]}>
                    <Text style={styles.cellKey}>{d.k}</Text>
                    <Text style={styles.cellVal}>{d.v}</Text>
                  </View>
                ))}
                <Text style={styles.note}>Note: Custom labels, packaging and branding available on request.</Text>
              </View>
            )}
            {tab === 'benefits' && (
              <View>
                {benefitList.map((b, idx) => (
                  <View key={idx} style={{ flexDirection:'row', alignItems:'center', gap:8, marginBottom:8 }}>
                    <Text style={{ color: colors.brandNavy, fontWeight:'900' }}>•</Text>
                    <Text style={{ color: colors.textSecondary }}>{b}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* You might be interested in */}
          <View style={[styles.table, { marginTop: 12 }]}> 
            <Text style={styles.interestedTitle}>You might be interested in</Text>
            <View style={{ flexDirection:'row', flexWrap:'wrap', gap:12 }}>
              {[{t:'Round Neck', img: require('../../assets/round-neck-tshirt.png')},
                {t:'Polo T‑Shirt', img: require('../../assets/Polo-Tshirt.jpg')},
                {t:'Printed Tee', img: require('../../assets/Printed-Tshirt.png')}].map((p, i) => (
                  <Pressable
                    key={i}
                    style={{
                      width: isNarrow ? '100%' : 280,
                      borderWidth: 1,
                      borderColor: colors.border,
                      borderRadius: 16,
                      overflow: 'hidden',
                      backgroundColor: '#ffffff',
                      transform: hoveredInterest === i ? [{ scale: 0.98 }] : [{ scale: 1 }],
                    } as any}
                    onPress={() => navigation.navigate('ProductDetail', { title: p.t, imageUrl: p.img })}
                    // @ts-ignore web-only
                    onHoverIn={() => setHoveredInterest(i)}
                    // @ts-ignore web-only
                    onHoverOut={() => setHoveredInterest(null)}
                  >
                    <Image source={p.img} style={{ width:'100%', height: isNarrow ? 220 : 180 } as any} resizeMode="cover" />
                    <View style={{ padding:12 }}>
                      <Text style={{ color: colors.brandNavy, fontWeight:'900', fontFamily:'serif', fontSize:18 }}>{p.t}</Text>
                      <Text style={{ color: colors.textSecondary, marginTop:4 }}>View details</Text>
                    </View>
                  </Pressable>
              ))}
            </View>
          </View>

          <View style={styles.enquiry}> 
          <View style={styles.enquiryHeader}>
            <Text style={styles.enquiryTitle}>Looking for Customized {title}</Text>
          </View>
          <Text style={{ textAlign: 'center', color: colors.textSecondary, marginBottom: 12 }}>Share your requirement and we will get back to you quickly.</Text>
          <View style={[styles.formRow, isNarrow && { flexDirection: 'column' }]}>
            <View style={[styles.formCol, { flex: 1 }]}>
              <Text style={styles.label}>Name</Text>
              <TextInput placeholder="Your full name" style={styles.input} value={enquiry.name} onChangeText={(t)=>setEnquiry((p)=>({ ...p, name: t }))} />
            </View>
            <View style={[styles.formCol, { flex: 1 }]}>
              <Text style={styles.label}>Email</Text>
              <TextInput placeholder="you@example.com" keyboardType="email-address" style={styles.input} value={enquiry.email} onChangeText={(t)=>setEnquiry((p)=>({ ...p, email: t }))} />
            </View>
          </View>
          <View style={[styles.formRow, isNarrow && { flexDirection: 'column' }]}>
            <View style={[styles.formCol, { flex: 1 }]}>
              <Text style={styles.label}>Mobile No.</Text>
              <TextInput placeholder="Enter Mobile No." keyboardType="phone-pad" style={styles.input} value={enquiry.phone} onChangeText={(t)=>setEnquiry((p)=>({ ...p, phone: t }))} />
            </View>
            <View style={[styles.formCol, { flex: 1, position: 'relative' as any }]}>
              <Text style={styles.label}>Product</Text>
              <Pressable onPress={() => setProductDropdownOpen((v) => !v)} style={[styles.input, { flexDirection:'row', alignItems:'center', justifyContent:'space-between' }]}> 
                <Text style={{ color: colors.textPrimary }}>{selectedProduct}</Text>
                <Text style={{ color: colors.textSecondary }}>▾</Text>
              </Pressable>
              {productDropdownOpen && (
                <View style={styles.dropdownMenu}>
                  {['Round Neck T‑Shirts','Polo T‑Shirts','Printed T‑Shirts','Eco‑friendly T‑Shirt'].map((opt, idx, arr) => (
                    <Pressable key={opt} onPress={() => { setSelectedProduct(opt); setProductDropdownOpen(false); }} style={[styles.dropdownItem, idx === arr.length - 1 ? { borderBottomWidth: 0 } : null]}>
                      <Text style={{ color: colors.textPrimary }}>{opt}</Text>
                    </Pressable>
                  ))}
                </View>
              )}
            </View>
          </View>
          <View style={styles.formRow}>
            <View style={[styles.formCol, { flex: 1 }]}>
              <Text style={styles.label}>Estimated Quantity</Text>
              <TextInput placeholder="e.g. 150 Pieces" keyboardType="numeric" style={styles.input} value={enquiry.quantity} onChangeText={(t)=>setEnquiry((p)=>({ ...p, quantity: t }))} />
            </View>
          </View>
          <View style={styles.formRow}>
            <View style={[styles.formCol, { flex: 1 }]}>
              <Text style={styles.label}>Requirement Details</Text>
              <TextInput placeholder="Tell us about customization, sizes, colors…" style={[styles.input, { height: 120 }]} multiline value={enquiry.details} onChangeText={(t)=>setEnquiry((p)=>({ ...p, details: t }))} />
            </View>
          </View>
          <Pressable style={[styles.primaryBtn, { alignSelf: 'center', paddingHorizontal: 28 }]} onPress={submitEnquiry}><Text style={styles.primaryText}>Send Enquiry</Text></Pressable>
          </View>
        </View>
      </View>
      <SiteFooter />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  shell: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  wrap: { flex: 1 },
  page: { width: '100%', maxWidth: 1280, alignSelf: 'center', paddingHorizontal: 16 },
  headerBar: { height: 4, width: 48, backgroundColor: colors.brandGold, borderRadius: 2, marginTop: 12 },
  title: { color: colors.brandNavy, fontWeight: '900', fontSize: 24, paddingTop: 8, marginBottom: 8, fontFamily: 'serif' },
  heroRow: { flexDirection: 'row', gap: 12 },
  imageCard: { flex: 1.1, backgroundColor: colors.surface, borderRadius: 12, borderWidth: 1, borderColor: colors.brandGold, overflow: 'hidden', shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 12, shadowOffset: { width: 0, height: 6 } },
  imageCardNarrow: { marginBottom: 12, flex: 0, width: '100%' },
  image: { width: '100%', height: '100%' as any },
  imageMobile: { height: 480 as any, aspectRatio: undefined as any },
  infoCard: { flex: 1, backgroundColor: colors.surface, borderRadius: 12, borderWidth: 1, borderColor: colors.border, padding: 20, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 12, shadowOffset: { width: 0, height: 6 }, marginBottom: 16 },
  chipsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  chipBase: { backgroundColor: '#F1F5F9', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 8 },
  chipHover: { backgroundColor: colors.brandNavyHeader },
  chipText: { color: colors.brandNavy, fontWeight: '700', fontSize: 12 } as any,
  chipTextHover: { color: colors.brandGold } as any,
  dropdownMenu: { position: 'absolute', top: 54, left: 0, right: 0, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 8, overflow: 'hidden', zIndex: 50 },
  dropdownItem: { paddingHorizontal: 12, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border },
  inStockPill: { backgroundColor: '#E6F6E6', color: '#2A7A2A', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999, fontWeight: '800' } as any,
  specRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.border },
  specRowNarrow: { flexDirection: 'column', alignItems: 'flex-start', gap: 4 },
  specKey: { color: colors.textSecondary, fontFamily: 'serif' },
  specVal: { color: colors.textPrimary, fontWeight: '700', fontFamily: 'serif' },
  specValNarrow: { textAlign: 'left' as any, width: '100%' },
  primaryBtn: { backgroundColor: colors.brandNavyHeader, borderWidth: 1, borderColor: colors.brandGold, paddingVertical: 12, paddingHorizontal: 12, borderRadius: 12 },
  primaryText: { color: colors.brandGold, fontWeight: '800' },

  table: { backgroundColor: colors.surface, borderRadius: 12, borderWidth: 1, borderColor: colors.border, padding: 16, marginTop: 12, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 10, shadowOffset: { width: 0, height: 4 } },
  sectionTitle: { color: colors.brandNavy, fontWeight: '900', fontSize: 18, marginBottom: 8, fontFamily: 'serif' },
  tabsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 20, marginBottom: 12 },
  interestedTitle: { color: colors.brandNavy, fontWeight: '900', fontSize: 22, marginBottom: 10, fontFamily: 'serif', letterSpacing: .3, textShadowColor: 'rgba(0,0,0,0.08)', textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 3 },
  tab: { paddingVertical: 8, paddingHorizontal: 12, borderWidth: 1, borderColor: colors.border, borderRadius: 999 },
  tabActive: { backgroundColor: colors.brandNavyHeader, borderColor: colors.brandNavyHeader },
  tabText: { color: colors.textSecondary, fontWeight: '700' },
  tabTextActive: { color: colors.brandGold },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border },
  rowAlt: { backgroundColor: colors.surface, borderRadius: 8 },
  cellKey: { color: colors.textSecondary, fontFamily: 'serif', width: 200 },
  cellVal: { color: colors.brandNavy, fontWeight: '800', flex: 1, textAlign: 'left', marginLeft: 8, fontFamily: 'serif' },
  note: { color: colors.textSecondary, marginTop: 8, fontFamily: 'serif' },

  enquiry: { backgroundColor: colors.surface, borderRadius: 12, borderWidth: 1, borderColor: colors.border, padding: 16, marginTop: 12, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 10, shadowOffset: { width: 0, height: 4 } },
  enquiryHeader: { alignSelf: 'center', backgroundColor: colors.brandNavyHeader, borderWidth: 1, borderColor: colors.brandGold, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 8, marginBottom: 12 },
  enquiryTitle: { color: colors.brandGold, fontWeight: '900', fontSize: 18, textAlign: 'center', fontFamily: 'serif' },
  formRow: { flexDirection: 'row', gap: 8, marginBottom: 8 },
  formCol: { gap: 6 },
  label: { color: colors.textSecondary, fontWeight: '700', fontFamily: 'serif' },
  input: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 10, padding: 12 },
}); 