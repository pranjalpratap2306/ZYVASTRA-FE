import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image, useWindowDimensions } from 'react-native';
import { colors } from '../theme/colors';
import { HeaderBar } from '../components/HeaderBar';
import { SiteFooter } from '../components/SiteFooter';
import { Ionicons } from '@expo/vector-icons';

export const PrivacyPolicyScreen: React.FC = () => {
  const { width } = useWindowDimensions();
  const isNarrow = width < 900;

  return (
    <ScrollView style={styles.shell}>
      <HeaderBar />

      {/* Hero with background image and breadcrumb */}
      <View style={styles.heroWrap}>
        <Image source={require('../../assets/dashboard_4.png')} resizeMode="cover" style={styles.heroImg} />
        <View style={styles.heroOverlay} />
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>Privacy Policy</Text>
          <Text style={styles.heroCrumb}>Home  /  Privacy Policy</Text>
        </View>
      </View>

      {/* Intro blurb */}
      <View style={styles.introSection}>
        <Text style={styles.introText}>
          At Anand Meena Enterprises, we respect your privacy and are committed to protecting the personal
          information you share with us when you use our website. This Privacy Policy explains what
          information we collect, how we use it, and how we keep it secure.
        </Text>
      </View>

      {/* Information we collect + image side by side */}
      <View style={[styles.split, isNarrow && styles.splitNarrow]}>
        <View style={[styles.splitCol, isNarrow ? styles.colFull : styles.colHalf]}>
          <Text style={styles.sectionTitle}>Information We Collect</Text>
          <View style={styles.bulletRow}>
            <Ionicons name="checkmark-circle" size={18} color={colors.brandNavy} style={styles.bulletIcon} />
            <Text style={styles.liText}>Personal Information: name, email address, phone number, delivery address, and other details you voluntarily provide.</Text>
          </View>
          <View style={styles.bulletRow}>
            <Ionicons name="checkmark-circle" size={18} color={colors.brandNavy} style={styles.bulletIcon} />
            <Text style={styles.liText}>Non‑Personal Information: IP address, browser, device, and general location for analytics and website functionality.</Text>
          </View>
        </View>
        <Image source={require('../../assets/premium_tshirt.png')} resizeMode="cover" style={[styles.splitImg, isNarrow ? styles.imgFull : styles.imgHalf]} />
      </View>

      {/* How we use your information + image alternating */}
      <View style={[styles.split, isNarrow && styles.splitNarrow]}> 
        <Image source={require('../../assets/Printed-Tshirt.png')} resizeMode="cover" style={[styles.splitImg, isNarrow ? styles.imgFull : styles.imgHalf]} />
        <View style={[styles.splitCol, isNarrow ? styles.colFull : styles.colHalf]}>
          <Text style={styles.sectionTitle}>How We Use Your Information</Text>
          <View style={styles.bulletRow}><Ionicons name="checkmark-circle" size={18} color={colors.brandNavy} style={styles.bulletIcon} /><Text style={styles.liText}>Provide and process your orders and enquiries.</Text></View>
          <View style={styles.bulletRow}><Ionicons name="checkmark-circle" size={18} color={colors.brandNavy} style={styles.bulletIcon} /><Text style={styles.liText}>Communicate with you about your orders or service requests.</Text></View>
          <View style={styles.bulletRow}><Ionicons name="checkmark-circle" size={18} color={colors.brandNavy} style={styles.bulletIcon} /><Text style={styles.liText}>Improve our products, services, and website functionality.</Text></View>
          <View style={styles.bulletRow}><Ionicons name="checkmark-circle" size={18} color={colors.brandNavy} style={styles.bulletIcon} /><Text style={styles.liText}>Send promotions or newsletters (with your consent).</Text></View>
          <View style={styles.bulletRow}><Ionicons name="checkmark-circle" size={18} color={colors.brandNavy} style={styles.bulletIcon} /><Text style={styles.liText}>Prevent fraud and enhance the security of our website.</Text></View>
        </View>
      </View>

      

      <View style={styles.contactSection}>
        <Text style={styles.contactHeading}>Contact Us</Text>
        <Text style={styles.contactText}>If you have any questions about this Privacy Policy or your personal data, please contact us at:</Text>
        <Text style={styles.contactText}>Email: zyvastra-support@gmail.com</Text>
        <Text style={styles.contactText}>Phone: +91 9993305646</Text>
      </View>

      <SiteFooter />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  shell: { flex: 1, backgroundColor: '#FFFBF7' },

  heroWrap: { position: 'relative', height: 220, width: '100%' },
  heroImg: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' },
  heroOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.35)' },
  heroContent: { flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center' },
  heroTitle: { color: 'white', fontSize: 36, fontWeight: '800', fontFamily: 'serif' },
  heroCrumb: { color: 'white', marginTop: 8, opacity: 0.9 },

  introSection: { paddingHorizontal: 24, paddingVertical: 28, alignItems: 'center', backgroundColor: '#EFE7D8' },
  introText: { color: colors.textPrimary, maxWidth: 1000, textAlign: 'center' },

  split: { flexDirection: 'row', alignItems: 'center', gap: 24, paddingHorizontal: 24, paddingVertical: 32, backgroundColor: '#F8F7F3' },
  splitNarrow: { flexDirection: 'column', alignItems: 'stretch' },
  splitCol: { flexGrow: 1 },
  colHalf: { width: '50%' },
  colFull: { width: '100%' },
  splitImg: { borderRadius: 12 },
  imgHalf: { width: '50%', height: 260 },
  imgFull: { width: '100%', height: 220 },

  sectionTitle: { fontSize: 22, fontWeight: '800', color: colors.brandNavy, marginBottom: 12, fontFamily: 'serif' },
  li: { color: colors.textPrimary, marginBottom: 8 },

  sectionPlain: { paddingHorizontal: 24, paddingVertical: 32, backgroundColor: '#F3EAD9' },

  contactSection: { paddingVertical: 36, paddingHorizontal: 24, alignItems: 'center', backgroundColor: '#EDE3D2' },
  contactHeading: { fontSize: 24, fontWeight: '700', color: colors.brandNavy, marginBottom: 8, fontFamily: 'serif' },
  contactText: { color: colors.textPrimary, marginBottom: 4, textAlign: 'center' },

  bulletRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginBottom: 8 },
  bulletIcon: { marginTop: 2 },
  liText: { color: colors.textPrimary, flex: 1 },
});


