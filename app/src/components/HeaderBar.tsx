import React from 'react';
import { View, StyleSheet, Pressable, Image, Text, Linking, Alert, useWindowDimensions } from 'react-native';
import { colors } from '../theme/colors';
import { useNavigation } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/RootNavigator';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface HeaderBarProps {
  onPostRequirement?: () => void;
  contactPhone?: string;
  contactEmail?: string;
  onSendSms?: () => void; // kept for backward compatibility, unused
  onSendEmail?: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({ onPostRequirement, contactPhone, contactEmail, onSendSms, onSendEmail }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { width } = useWindowDimensions();
  const isNarrow = width < 768;

  const goHome = () => navigation.navigate('Dashboard');
  const goContact = () => navigation.navigate('Contact');
  const goAbout = () => navigation.navigate('About');

  const imagesByKey: Record<string, string> = {
    ROUND_NECK_TSHIRTS: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1400&auto=format&fit=crop',
    POLO_TSHIRTS: 'https://images.unsplash.com/photo-1593030121785-62f27ff609f0?q=80&w=1400&auto=format&fit=crop',
    FULL_SLEEVES_SHIRTS: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?q=80&w=1400&auto=format&fit=crop',
    PRINTED_TSHIRTS: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?q=80&w=1400&auto=format&fit=crop',
    OVER_SIZED_TSHIRTS: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1400&auto=format&fit=crop',
    ECO_FRIENDLY_TSHIRTS: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1400&auto=format&fit=crop',
  };

  const openCategory = (title: string, key: string) => {
    navigation.navigate('ProductDetail', { title, imageUrl: imagesByKey[key] || imagesByKey.ROUND_NECK_TSHIRTS });
    setShowProducts(false);
    setMobileOpen(false);
  };

  const [showProducts, setShowProducts] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = React.useState(false);

  const productItems = [
    { label: 'ROUND NECK T‑SHIRTS', key: 'ROUND_NECK_TSHIRTS', title: 'Round Neck T‑Shirts' },
    { label: 'POLO T‑SHIRTS', key: 'POLO_TSHIRTS', title: 'Polo T‑Shirts' },
    { label: 'FULL SLEEVES SHIRTS', key: 'FULL_SLEEVES_SHIRTS', title: 'Full Sleeves Shirt' },
    { label: 'PRINTED T‑SHIRTS', key: 'PRINTED_TSHIRTS', title: 'Printed T‑Shirts' },
    { label: 'OVER SIZED T‑SHIRTS', key: 'OVER_SIZED_TSHIRTS', title: 'Over Sized T‑Shirts' },
    { label: 'ECO‑FRIENDLY T‑SHIRTS', key: 'ECO_FRIENDLY_TSHIRTS', title: 'Eco‑friendly T‑Shirt' },
  ];

  const openEmail = async () => {
    const email = (contactEmail ?? '').trim();
    if (!email) {
      Alert.alert('No email configured', 'Contact email is not configured.');
      return;
    }
    const subject = 'Inquiry from ZYVASTRA website';
    const url = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}`;
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) await Linking.openURL(url);
      else Alert.alert('Not supported', 'Email is not supported on this device.');
    } catch (e) {
      Alert.alert('Failed to open Email client');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.brandRow}>
        <View style={styles.logoWrap}>
          <View style={styles.logoInner}> 
          <Image
            source={require('../../assets/zyvastra-logo.png')}
            style={styles.logoImg}
            resizeMode="contain"
          />
          </View>
        </View>
      </View>
      <View style={styles.linksRow}>
        {isNarrow ? (
          <>
            <Pressable style={styles.hamburger} onPress={() => setMobileOpen(true)}>
              <Text style={styles.linkText}>☰</Text>
            </Pressable>
            <Pressable style={styles.ctaBtn} onPress={onPostRequirement}>
              <Text style={styles.ctaText}>POST YOUR REQUIREMENT</Text>
            </Pressable>
          </>
        ) : (
          <>
            <Pressable style={styles.linkBtn} onPress={goHome}>
              <Text style={styles.linkText}>Home</Text>
            </Pressable>
            <Pressable style={styles.linkBtn} onPress={goAbout}>
              <Text style={styles.linkText}>About Us</Text>
            </Pressable>
            <View style={styles.menuWrap}>
              <Pressable
                style={styles.linkBtn}
                onPress={() => setShowProducts((v) => !v)}
                onHoverIn={() => setShowProducts(true)}
              >
                <Text style={styles.linkText}>Products ▾</Text>
              </Pressable>
              {showProducts && (
                <>
                <View style={styles.dropdown}>
                  {productItems.map((it, i) => (
                    <Pressable
                      key={it.key}
                      style={({ pressed }) => [styles.dropItem, i < productItems.length - 1 && styles.dropDivider, pressed && { backgroundColor: '#F5F7FA' }]}
                      onPress={() => openCategory(it.title, it.key)}
                      onHoverIn={(e) => { /* RNW hover handled via style state if needed */ }}
                    >
                      <Text style={styles.dropText}>{it.label}</Text>
                      <Text style={styles.chev}>›</Text>
                    </Pressable>
                  ))}
                </View>
                  <Pressable style={styles.clickAway} onPress={() => setShowProducts(false)} />
                </>
              )}
            </View>
            <Pressable style={styles.linkBtn} onPress={goContact}>
              <Text style={styles.linkText}>Contact Us</Text>
            </Pressable>
            {/* Removed Send SMS button */}
            <Pressable style={styles.actionBtn} onPress={onSendEmail ?? openEmail}>
              <Text style={styles.actionText}>Send Email</Text>
            </Pressable>
            <Pressable style={styles.ctaBtn} onPress={onPostRequirement}>
              <Text style={styles.ctaText}>POST YOUR REQUIREMENT</Text>
            </Pressable>
          </>
        )}
      </View>

      {isNarrow && mobileOpen && (
        <View style={styles.mobileSheet}>
          <View style={styles.mobileHeader}>
            <Text style={styles.mobileTitle}>Menu</Text>
            <Pressable onPress={() => setMobileOpen(false)}><Text style={styles.mobileClose}>✕</Text></Pressable>
          </View>
          <Pressable style={styles.mobileItem} onPress={() => { setMobileOpen(false); goHome(); }}>
            <Text style={styles.mobileText}>Home</Text>
          </Pressable>
          <Pressable style={styles.mobileItem} onPress={() => { setMobileOpen(false); goAbout(); }}>
            <Text style={styles.mobileText}>About Us</Text>
          </Pressable>
          <Pressable style={styles.mobileItem} onPress={() => setMobileProductsOpen((v) => !v)}>
            <Text style={styles.mobileText}>Products {mobileProductsOpen ? '▾' : '▸'}</Text>
          </Pressable>
          {mobileProductsOpen && (
            <View style={styles.mobileSubList}>
              {productItems.map((it) => (
                <Pressable key={it.key} style={styles.mobileSubItem} onPress={() => openCategory(it.title, it.key)}>
                  <Text style={styles.mobileSubText}>{it.label}</Text>
                </Pressable>
              ))}
            </View>
          )}
          <Pressable style={styles.mobileItem} onPress={() => { setMobileOpen(false); goContact(); }}>
            <Text style={styles.mobileText}>Contact Us</Text>
          </Pressable>
          {/* Removed Send SMS in mobile menu */}
          <Pressable style={styles.mobileItem} onPress={onSendEmail ?? openEmail}>
            <Text style={styles.mobileText}>Send Email</Text>
          </Pressable>
          <Pressable style={[styles.mobileItem, { marginTop: 8 }]} onPress={() => { setMobileOpen(false); onPostRequirement?.(); }}>
            <Text style={[styles.mobileText, { color: colors.brandGold }]}>POST YOUR REQUIREMENT</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

const HEADER_HEIGHT = 64;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingLeft: 0,
    paddingRight: 16,
    paddingVertical: 0,
    height: HEADER_HEIGHT,
    backgroundColor: colors.brandNavyHeader,
    borderBottomColor: colors.borderOnDark,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    zIndex: 5000,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  logoWrap: {
    height: '100%',
    width: 240,
    borderColor: colors.brandGold,
    borderWidth: 2,
    borderRadius: 0,
    overflow: 'hidden',
    marginLeft: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoInner: { width: '100%', height: '100%', paddingHorizontal: 4, paddingVertical: 2 },
  logoImg: {
    width: '100%',
    height: '100%',
  },
  linksRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  linkBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  linkText: {
    color: colors.brandGold,
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  hamburger: { paddingHorizontal: 8, paddingVertical: 6 },
  menuWrap: {
    position: 'relative',
    zIndex: 6000,
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    marginTop: 6,
    backgroundColor: colors.surface,
    borderColor: colors.brandGold,
    borderWidth: 1,
    borderRadius: 12,
    overflow: 'hidden',
    zIndex: 7000,
    elevation: 12,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    minWidth: 320,
  },
  clickAway: {
    position: 'fixed' as any,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 6500,
  },
  dropItem: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
  },
  dropDivider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  dropText: { color: colors.textPrimary, fontWeight: '800', letterSpacing: 0.3 },
  chev: { color: colors.brandGold, marginLeft: 12, fontWeight: '900' },
  actionBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.brandGold,
  },
  actionText: {
    color: colors.brandGold,
    fontSize: 14,
    fontWeight: '700',
  },
  ctaBtn: {
    marginLeft: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: colors.brandGold,
    borderRadius: 12,
  },
  ctaText: {
    color: colors.brandNavy,
    fontWeight: '800',
    fontSize: 12,
  },
  mobileSheet: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    padding: 16,
  },
  mobileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  mobileTitle: { color: colors.textPrimary, fontWeight: '800', fontSize: 18 },
  mobileClose: { color: colors.textSecondary, fontSize: 18 },
  mobileItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  mobileText: { color: colors.textPrimary, fontSize: 16, fontWeight: '700' },
  mobileSubList: { paddingLeft: 8 },
  mobileSubItem: { paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.border },
  mobileSubText: { color: colors.textSecondary, fontSize: 15 },
}); 