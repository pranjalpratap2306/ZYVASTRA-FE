import React from 'react';
import { View, Text, StyleSheet, Linking, Pressable } from 'react-native';
import { colors } from '../theme/colors';

export const SiteFooter: React.FC = () => {
  const open = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) await Linking.openURL(url);
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.container}>
        <View style={styles.colWide}>
          <Text style={styles.brandTitle}>About ZYVASTRA</Text>
          <Text style={styles.muted}>At our custom t‑shirt company, we believe that every individual deserves to express their unique style. We offer high‑quality, custom‑designed t‑shirts tailored to your preferences.</Text>
          <View style={styles.socialRow}>
            <Pressable onPress={() => open('https://www.instagram.com/zyvastra?igsh=ZTR1em5lMWZ5N2tv')} style={[styles.socialIcon, { backgroundColor: '#E1306C' }]}>
              <Text style={styles.socialText}>IG</Text>
            </Pressable>
            <Pressable onPress={() => open('https://www.facebook.com/share/16pnzYYbcq/?mibextid=wwXIfr')} style={[styles.socialIcon, { backgroundColor: '#1877F2' }]}>
              <Text style={styles.socialText}>f</Text>
            </Pressable>
            <Pressable onPress={() => open('https://linkedin.com/company/zyvastra')} style={[styles.socialIcon, { backgroundColor: '#0A66C2' }]}>
              <Text style={styles.socialText}>in</Text>
            </Pressable>
            <Pressable onPress={() => open('https://twitter.com/zyvastra')} style={[styles.socialIcon, { backgroundColor: '#1DA1F2' }]}>
              <Text style={styles.socialText}>X</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.col}>
          <Text style={styles.colTitle}>Quick Links</Text>
          {['Custom Products', 'Price Quote', 'Design Your Own', 'Size Chart', 'FAQ’s'].map((t) => (
            <Text key={t} style={styles.link}>{t}</Text>
          ))}
        </View>

        <View style={styles.col}>
          <Text style={styles.colTitle}>What We Do</Text>
          {['Screen Printing', 'Embroidery', 'Heat Transfer', 'DTF & DTG', 'Plain T‑Shirts'].map((t) => (
            <Text key={t} style={styles.link}>{t}</Text>
          ))}
        </View>

        <View style={styles.col}>
          <Text style={styles.colTitle}>Contact us</Text>
          <Text style={styles.kv}>CONTACT</Text>
          <Text style={styles.value}>+91 7428073088</Text>
          <Text style={[styles.kv, { marginTop: 12 }]}>MON – SAT</Text>
          <Text style={styles.value}>10am – 7pm</Text>
          <Text style={[styles.kv, { marginTop: 12 }]}>EMAIL</Text>
          <Pressable onPress={() => open('mailto:support@zyvastra.com')}><Text style={styles.value}>support@zyvastra.com</Text></Pressable>
        </View>
      </View>
      <View style={styles.bottomBar}>
        <Text style={styles.bottomText}>© {new Date().getFullYear()} ZYVASTRA. All rights reserved.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: { backgroundColor: colors.brandNavyHeader, marginTop: 24 },
  container: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, paddingTop: 24, paddingBottom: 12, gap: 16, justifyContent: 'space-between' },
  colWide: { flexBasis: 320, flexGrow: 1 },
  col: { flexBasis: 200, flexGrow: 1 },
  brandTitle: { color: colors.brandGold, fontSize: 16, fontWeight: '800', marginBottom: 10 },
  colTitle: { color: colors.brandGold, fontSize: 16, fontWeight: '800', marginBottom: 10 },
  muted: { color: colors.textOnDark, opacity: 0.9, lineHeight: 20 },
  link: { color: colors.textOnDark, marginBottom: 8 },
  kv: { color: colors.textMutedOnDark, fontSize: 12 },
  value: { color: colors.textOnDark },
  socialRow: { flexDirection: 'row', gap: 10, marginTop: 12, alignItems: 'center' },
  socialIcon: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  socialText: { color: '#fff', fontWeight: '800' },
  bottomBar: { borderTopWidth: 1, borderTopColor: colors.borderOnDark, paddingHorizontal: 16, paddingVertical: 12 },
  bottomText: { color: colors.textOnDark, textAlign: 'center' },
}); 