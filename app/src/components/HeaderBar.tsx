import React, { useState } from 'react';
import { View, StyleSheet, Pressable, Image, Text, TextInput, Linking, Alert, useWindowDimensions, Platform } from 'react-native';
import { colors } from '../theme/colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { Ionicons } from '@expo/vector-icons'; // Using Expo's vector icons

interface HeaderBarProps {
  onPostRequirement?: () => void;
  contactPhone?: string;
  contactEmail?: string;
  onSendSms?: () => void; // kept for backward compatibility, unused
  onSendEmail?: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({ onPostRequirement, contactPhone, contactEmail, onSendSms, onSendEmail }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const { width } = useWindowDimensions();
  const isNarrow = width < 768;
  const isDashboard = route.name === 'Dashboard';

  const goHome = () => navigation.navigate('Dashboard');
  const goContact = () => navigation.navigate('Contact');
  const goAbout = () => navigation.navigate('About');
  const goReviews = () => navigation.navigate('Reviews');

  const openCategory = (title: string, key: string) => {
    const imageUrl = imagesByKey[key] || '';
    navigation.navigate('ProductDetail', { title, imageUrl });
    setShowProducts(false);
    setMobileOpen(false);
  };

  const [showProducts, setShowProducts] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = React.useState(false);
  const [mobileSearch, setMobileSearch] = React.useState('');

  const productItems = [
    { label: 'ROUND NECK T‑SHIRTS', key: 'ROUND_NECK_TSHIRTS', title: 'Round Neck T‑Shirts' },
    { label: 'POLO T‑SHIRTS', key: 'POLO_TSHIRTS', title: 'Polo T‑Shirts' },
    { label: 'FULL SLEEVES SHIRTS', key: 'FULL_SLEEVES_SHIRTS', title: 'Full Sleeves Shirt' },
    { label: 'PRINTED T‑SHIRTS', key: 'PRINTED_TSHIRTS', title: 'Printed T‑Shirts' },
    { label: 'OVER SIZED T‑SHIRTS', key: 'OVER_SIZED_TSHIRTS', title: 'Over Sized T‑Shirts' },
    { label: 'ECO‑FRIENDLY T‑SHIRTS', key: 'ECO_FRIENDLY_TSHIRTS', title: 'Eco‑friendly T‑Shirt' },
  ];

  const imagesByKey: Record<string, string> = {
    ROUND_NECK_TSHIRTS: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1400&auto=format&fit=crop',
    POLO_TSHIRTS: 'https://images.unsplash.com/photo-1593030121785-62f27ff609f0?q=80&w=1400&auto=format&fit=crop',
    FULL_SLEEVES_SHIRTS: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?q=80&w=1400&auto=format&fit=crop',
    PRINTED_TSHIRTS: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?q=80&w=1400&auto=format&fit=crop',
    OVER_SIZED_TSHIRTS: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1400&auto=format&fit=crop',
    ECO_FRIENDLY_TSHIRTS: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1400&auto=format&fit=crop',
  };

  const openSocialLink = (url: string) => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    });
  };

  const socialLinks = {
    linkedin: 'https://www.linkedin.com/company/zyvastra',
    instagram: 'https://www.instagram.com/zyvastra?igsh=ZTR1em5lMWZ5N2tv',
    facebook: 'https://www.facebook.com/share/16pnzYYbcq/?mibextid=wwXIfr',
    youtube: 'https://www.youtube.com',
  };

  return (
    <View style={styles.headerOuterWrap}>
      {/* New Top Bar */}
      {!isNarrow && (
        <View style={styles.topBar}>
          <View style={styles.topBarItem}>
            <Ionicons name="globe-outline" size={16} color={colors.brandGold} />
            <Text style={styles.topBarText}>4+ years expertise in global trade</Text>
          </View>
          <View style={styles.topBarItem}>
            <Ionicons name="shield-checkmark-outline" size={16} color={colors.brandGold} />
            <Text style={styles.topBarText}>guaranteed purity, unmatched quality</Text>
          </View>
          <View style={styles.topBarItem}>
            <Ionicons name="headset-outline" size={16} color={colors.brandGold} />
            <Text style={styles.topBarText}>24/7 support</Text>
          </View>
        </View>
      )}

      <View style={styles.container}>
        {isNarrow ? (
          // Mobile Header with menu trigger
          <View style={styles.mobileHeaderContainer}>
            <Pressable style={styles.hamburger} onPress={() => setMobileOpen(true)}>
              <Text style={styles.hamburgerText}>☰</Text>
            </Pressable>
            <View style={styles.logoWrapMobile}>
              <Pressable onPress={goHome}>
                <Image
                  source={require('../../assets/download-removebg-preview.png')}
                  style={styles.logoImg as any}
                  resizeMode="contain"
                />
              </Pressable>
            </View>
            <View style={styles.mobileSpacer} />
          </View>
        ) : (
          // Desktop Header - original two-row layout
          <>
            <View style={styles.topRow}>
              <View style={styles.headerSide} />
              <View style={styles.logoWrap}>
                <Pressable onPress={goHome}>
                  <Image
                    source={require('../../assets/download-removebg-preview.png')}
                    style={styles.logoImg as any}
                    resizeMode="contain"
                  />
                </Pressable>
              </View>
              <View style={[styles.headerSide, styles.headerSideRight]}>
                <View style={styles.socialIconsRow}>
                  <Pressable style={styles.socialIconBtn} onPress={() => openSocialLink(socialLinks.linkedin)}>
                    <Ionicons name="logo-linkedin" size={20} color={colors.brandGold} />
                  </Pressable>
                  <Pressable style={styles.socialIconBtn} onPress={() => openSocialLink(socialLinks.instagram)}>
                    <Ionicons name="logo-instagram" size={20} color={colors.brandGold} />
                  </Pressable>
                  <Pressable style={styles.socialIconBtn} onPress={() => openSocialLink(socialLinks.facebook)}>
                    <Ionicons name="logo-facebook" size={20} color={colors.brandGold} />
                  </Pressable>
                  <Pressable style={styles.socialIconBtn} onPress={() => openSocialLink(socialLinks.youtube)}>
                    <Ionicons name="logo-youtube" size={20} color={colors.brandGold} />
                  </Pressable>
                </View>
              </View>
            </View>

            <View style={styles.linksRow}>
              <Pressable style={styles.linkBtn} onPress={goHome}>
                <Text style={styles.linkText}>Home</Text>
              </Pressable>
              <Pressable style={styles.linkBtn} onPress={goAbout}>
                <Text style={styles.linkText}>About us</Text>
              </Pressable>
              <View style={styles.menuWrap}>
                <Pressable
                  style={styles.linkBtn}
                  onPress={() => setShowProducts((v) => !v)}
                  onHoverIn={() => setShowProducts(true)}
                >
                  <Text style={styles.linkText}>Our offerings ▾</Text>
                </Pressable>
                {showProducts && (
                  <>
                    <View style={styles.dropdown}>
                      {productItems.map((it, i) => (
                        <Pressable
                          key={it.key}
                          style={({ pressed }) => [styles.dropItem, i < productItems.length - 1 && styles.dropDivider, pressed && { backgroundColor: '#F5F7FA' }]}
                          onPress={() => openCategory(it.title, it.key)}
                        >
                          <Text style={styles.dropText}>{it.title.toLowerCase()}</Text>
                        </Pressable>
                      ))}
                    </View>
                    <Pressable style={styles.clickAway} onPress={() => setShowProducts(false)} />
                  </>
                )}
              </View>
              <Pressable style={styles.linkBtn} onPress={goContact}>
                <Text style={styles.linkText}>Contact us</Text>
              </Pressable>
              <View style={styles.ctaRow}>
                <Pressable style={[styles.btn, styles.btnPrimary]} onPress={onPostRequirement}>
                  <Text style={styles.btnPrimaryText}>Enquiry</Text>
                </Pressable>
              </View>
            </View>
          </>
        )}

        {isNarrow && mobileOpen && (
          <View style={styles.mobileSheet}>
            <View style={styles.mobileMenuHeader}>
              <Pressable onPress={() => setMobileOpen(false)}>
                <Text style={styles.mobileClose}>✕</Text>
              </Pressable>
            </View>
            <Pressable style={styles.mobileItem} onPress={() => { setMobileOpen(false); goHome(); }}>
              <Text style={styles.mobileText}>HOME</Text>
            </Pressable>
            <Pressable style={styles.mobileItem} onPress={() => { setMobileOpen(false); goAbout(); }}>
              <Text style={styles.mobileText}>ABOUT US</Text>
            </Pressable>
            <Pressable style={styles.mobileItem} onPress={() => setMobileProductsOpen((v) => !v)}>
              <Text style={styles.mobileText}>OUR OFFERINGS {mobileProductsOpen ? '▾' : '▸'}</Text>
            </Pressable>
            {mobileProductsOpen && (
              <View style={styles.mobileSubList}>
                {productItems.map((it) => (
                  <Pressable key={it.key} style={styles.mobileSubItem} onPress={() => openCategory(it.title, it.key)}>
                    <Text style={styles.mobileSubText}>{it.title.toLowerCase()}</Text>
                  </Pressable>
                ))}
              </View>
            )}
            <Pressable style={styles.mobileItem} onPress={() => { setMobileOpen(false); goContact(); }}>
              <Text style={styles.mobileText}>CONTACT US</Text>
            </Pressable>
          </View>
        )}
        {mobileOpen && (
          <Pressable style={styles.mobileBackdrop} onPress={() => setMobileOpen(false)} />
        )}
      </View>

      {/* Side panel removed */}
    </View>
  );
};

const styles = StyleSheet.create({
  headerOuterWrap: {
    width: '100%',
    backgroundColor: colors.brandNavyHeader,
    zIndex: 5000,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#000000',
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
  topBarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  topBarText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  container: {
    width: '100%',
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 12,
    position: 'relative',
  },
  navLinksRow: { flexDirection: 'row', alignItems: 'center', gap: 24 },
  headerSide: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center', // Align items vertically
  },
  headerSideRight: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  logoWrap: {
    flex: 0,
    alignItems: 'flex-start',
    paddingLeft: 0,
  },
  logoImg: {
    width: 340,
    height: 108,
  },
  linksRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    marginTop: 0,
  },
  ctaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginLeft: 16,
  },
  btn: { paddingHorizontal: 18, paddingVertical: 10, borderRadius: 24, borderWidth: 1 },
  btnPrimary: { backgroundColor: colors.brandGold, borderColor: colors.brandGold },
  btnGhost: { backgroundColor: 'transparent', borderColor: colors.brandGold },
  btnPrimaryText: { color: colors.brandNavy, fontWeight: '800' },
  btnGhostText: { color: colors.brandGold, fontWeight: '800' },
  linkBtn: {
    paddingVertical: 6,
  },
  linkText: {
    color: colors.brandGold, // Gold link color
    fontSize: 14,
    fontWeight: '600',
  },
  enquiryBtn: {
    backgroundColor: 'transparent',
    borderColor: colors.brandGold,
    borderWidth: 1,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 30, // For a pill shape
    marginLeft: 16,
  },
  enquiryBtnText: {
    color: colors.brandGold, // Changed to match other links
    fontWeight: 'bold',
    fontSize: 16,
  },
  backButton: {
    position: 'absolute',
    left: 24,
    top: '50%',
    transform: [{ translateY: -16 }],
    zIndex: 10,
  },
  backButtonText: {
    fontSize: 32,
    color: colors.brandGold, // Gold back button color
    fontWeight: 'bold',
  },
  menuWrap: {
    position: 'relative',
    zIndex: 6000,
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: '50%',
    transform: [{ translateX: '-50%' }],
    marginTop: 8,
    backgroundColor: colors.surface,
    borderColor: colors.brandGold,
    borderWidth: 1,
    borderRadius: 12,
    overflow: 'hidden',
    zIndex: 7000,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 16,
    minWidth: 220,
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
    paddingVertical: 12,
    ...(Platform.OS === 'web' ? { cursor: 'pointer' } as any : {}),
  },
  dropDivider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  dropText: { color: colors.textPrimary, fontWeight: '700' },
  // Mobile Styles
  mobileHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
    height: 68,
    backgroundColor: colors.brandNavyHeader,
  },
  hamburger: { 
    padding: 12,
    marginRight: 8,
  },
  hamburgerText: { 
    fontSize: 28, 
    color: colors.brandGold,
    lineHeight: 28,
  },
  logoWrapMobile: {
    flex: 1,
    alignItems: 'center',
  },
  mobileSpacer: { 
    width: 48, // Same as hamburger width for balance
  },
  socialIconsMobile: {
    flex: 1,
  },
  mobileSheet: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Math.min(320, typeof window !== 'undefined' ? window.innerWidth * 0.9 : 320),
    bottom: 0,
    backgroundColor: colors.brandNavyHeader,
    zIndex: 8001,
    padding: 20,
    paddingTop: 50,
    borderRightWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 16,
    shadowOffset: { width: 4, height: 0 },
  },
  mobileBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 999,
  },
  mobileMenuHeader: {
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  mobileClose: { 
    fontSize: 24, 
    color: colors.textPrimary 
  },
  mobileItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  mobileText: { 
    color: colors.textPrimary, 
    fontSize: 18, 
    fontWeight: '600' 
  },
  mobileSubList: { paddingLeft: 16 },
  mobileSearchInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    color: colors.textPrimary,
    backgroundColor: '#F7FAFC',
  },
  mobileSubItem: { 
    paddingVertical: 12, 
    borderBottomWidth: 1, 
    borderBottomColor: '#eee' 
  },
  mobileSubText: { color: colors.textSecondary, fontSize: 16 },
  // Side Panel Styles removed
  socialIconsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  socialIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.brandGold,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});