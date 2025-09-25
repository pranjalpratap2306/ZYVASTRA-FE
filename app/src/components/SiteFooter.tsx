import React from 'react';
import { View, Text, StyleSheet, Linking, Pressable, Image, useWindowDimensions } from 'react-native';
import { colors } from '../theme/colors';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';

export const SiteFooter: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { width } = useWindowDimensions();
  const isNarrow = width < 768;

  const open = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) await Linking.openURL(url);
  };

  const socialLinks = {
    linkedin: 'https://www.linkedin.com/company/zyvastra',
    instagram: 'https://www.instagram.com/zyvastra?igsh=ZTR1em5lMWZ5N2tv',
    facebook: 'https://www.facebook.com/share/16pnzYYbcq/?mibextid=wwXIfr',
    youtube: 'https://www.youtube.com',
  };

  const styles = getStyles(isNarrow);

  type QuickRoute = 'Dashboard' | 'About' | 'Contact' | 'ShippingPolicy' | 'PrivacyPolicy';
  const quickLinks: Array<{ label: string; route: QuickRoute }> = [
    { label: 'Home', route: 'Dashboard' },
    { label: 'About Us', route: 'About' },
    { label: 'Contact Us', route: 'Contact' },
    { label: 'Shipping Policy', route: 'ShippingPolicy' },
    { label: 'Privacy Policy', route: 'PrivacyPolicy' },
  ];

  return (
    <View style={styles.wrap}>
      <View style={styles.container}>
        {isNarrow ? (
          // Single Column Layout for Mobile
          <View>
            <View style={styles.brandRow}>
              <Image 
                source={require('../../assets/download-removebg-preview.png')} 
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.tagline}>crafted to define..</Text>

            <Text style={[styles.colTitle, { marginTop: 32 }]}>CONTACT US</Text>
            <Text style={styles.contactText}>+91 9993305646</Text>
            <Text style={styles.contactText}>zyvastra-support@gmail.com</Text>

            <Text style={[styles.colTitle, { marginTop: 32 }]}>QUICK LINKS</Text>
            {quickLinks.map(({ label, route }) => (
              <Pressable key={label} onPress={() => navigation.navigate(route)}>
                <Text style={styles.link}>{label}</Text>
              </Pressable>
            ))}

            <Text style={[styles.colTitle, { marginTop: 24 }]}>SOCIAL LINKS</Text>
            <View style={styles.socialRow}>
              <Pressable style={styles.socialBtn} onPress={() => open(socialLinks.linkedin)}>
                <Ionicons name="logo-linkedin" size={20} color={colors.brandGold} />
              </Pressable>
              <Pressable style={styles.socialBtn} onPress={() => open(socialLinks.instagram)}>
                <Ionicons name="logo-instagram" size={20} color={colors.brandGold} />
              </Pressable>
              <Pressable style={styles.socialBtn} onPress={() => open(socialLinks.facebook)}>
                <Ionicons name="logo-facebook" size={20} color={colors.brandGold} />
              </Pressable>
              <Pressable style={styles.socialBtn} onPress={() => open(socialLinks.youtube)}>
                <Ionicons name="logo-youtube" size={20} color={colors.brandGold} />
              </Pressable>
            </View>
          </View>
        ) : (
          // Multi-Column Layout for Desktop
          <>
            <View style={styles.col1}>
              <View style={styles.brandRow}>
                <Image 
                  source={require('../../assets/download-removebg-preview.png')} 
                  style={styles.logo}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.tagline}>crafted to define..</Text>
            </View>
            <View style={styles.col2}>
              <Text style={styles.colTitle}>QUICK LINKS</Text>
              {quickLinks.map(({ label, route }) => (
                <Pressable key={label} onPress={() => navigation.navigate(route)}>
                  <Text style={styles.link}>{label}</Text>
                </Pressable>
              ))}
            </View>
            <View style={styles.col3}>
              <Text style={styles.colTitle}>CONTACT US</Text>
              <Text style={styles.contactText}>+91 9993305646</Text>
              <Text style={styles.contactText}>zyvastra-support@gmail.com</Text>
            </View>
            <View style={styles.col4}>
              <Text style={styles.colTitle}>SOCIAL LINKS</Text>
              <View style={styles.socialRow}>
                <Pressable style={styles.socialBtn} onPress={() => open(socialLinks.linkedin)}>
                  <Ionicons name="logo-linkedin" size={20} color={colors.brandGold} />
                </Pressable>
                <Pressable style={styles.socialBtn} onPress={() => open(socialLinks.instagram)}>
                  <Ionicons name="logo-instagram" size={20} color={colors.brandGold} />
                </Pressable>
                <Pressable style={styles.socialBtn} onPress={() => open(socialLinks.facebook)}>
                  <Ionicons name="logo-facebook" size={20} color={colors.brandGold} />
                </Pressable>
                <Pressable style={styles.socialBtn} onPress={() => open(socialLinks.youtube)}>
                  <Ionicons name="logo-youtube" size={20} color={colors.brandGold} />
                </Pressable>
              </View>
            </View>
          </>
        )}
      </View>
      <View style={styles.bottomBar}>
        <Text style={styles.bottomText}>
          2025 ZYVASTRA. All rights reserved.
        </Text>
      </View>
    </View>
  );
};

const getStyles = (isNarrow: boolean) => StyleSheet.create({
  wrap: { 
    backgroundColor: colors.brandNavyHeader, 
    borderTopWidth: 1, 
    borderTopColor: colors.borderOnDark, 
    alignItems: 'center',
  },
  container: { 
    flexDirection: isNarrow ? 'column' : 'row', 
    paddingHorizontal: 24, 
    paddingVertical: 32,
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 1200,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  col1: { width: isNarrow ? '100%' : '30%', marginBottom: isNarrow ? 32 : 0 },
  col2: { width: isNarrow ? '100%' : '20%', marginBottom: isNarrow ? 32 : 0 },
  col3: { width: isNarrow ? '100%' : '25%', marginBottom: isNarrow ? 32 : 0 },
  col4: { width: isNarrow ? '100%' : '20%', marginBottom: isNarrow ? 32 : 0 },
  logo: {
    width: 180,
    height: 90,
    marginBottom: 8,
  },
  tagline: {
    fontStyle: 'italic',
    color: colors.textOnDark, 
    opacity: 0.8,
    fontSize: 14,
  },
  brandTitle: { 
    color: colors.brandGold, 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 4, 
  },
  colTitle: { 
    color: colors.brandGold, 
    fontSize: 14, 
    fontWeight: 'bold', 
    marginBottom: 16, 
    textTransform: 'uppercase' 
  },
  link: { 
    color: colors.textOnDark, 
    marginBottom: 12, 
    fontSize: 14 
  },
  contactText: {
    color: colors.textOnDark,
    marginBottom: 8,
    fontSize: 14,
  },
  socialRow: { 
    flexDirection: 'row', 
    gap: 12 
  },
  socialBtn: { 
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    alignItems: 'center', 
    justifyContent: 'center', 
    borderWidth: 1, 
    borderColor: colors.brandGold 
  },
  bottomBar: { 
    width: '100%',
    borderTopWidth: 1, 
    borderTopColor: colors.borderOnDark, 
    paddingHorizontal: 24, 
    paddingVertical: 16, 
    alignItems: 'center', 
  },
  bottomText: { 
    color: colors.textOnDark, 
    textAlign: 'center', 
    fontSize: 12 
  },
});