import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { HeaderBar } from '../components/HeaderBar';
import { SiteFooter } from '../components/SiteFooter';

export const PrivacyPolicyScreen: React.FC = () => {
  return (
    <ScrollView style={styles.shell}>
      <HeaderBar />
      <View style={styles.container}>
        <Text style={styles.title}>Privacy Policy</Text>
        <Text style={styles.body}>
          We value your privacy. Any personal information collected through forms or interactions on this
          website will be used solely to provide services and respond to your enquiries. We do not sell or
          share your data with third parties except as required to deliver our services or comply with law.
        </Text>
        <Text style={styles.subhead}>Information We Collect</Text>
        <Text style={styles.body}>
          Contact details such as name, email, phone, business name and any additional information you
          provide. We may also collect technical data like device and browser information for analytics.
        </Text>
        <Text style={styles.subhead}>How We Use Information</Text>
        <Text style={styles.body}>
          To communicate with you, process enquiries, improve user experience, and provide customer support.
        </Text>
      </View>
      <SiteFooter />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  shell: { flex: 1, backgroundColor: '#FFFBF7' },
  container: { paddingHorizontal: 24, paddingVertical: 48, alignItems: 'center' },
  title: { fontSize: 32, fontWeight: '800', color: colors.brandNavy, marginBottom: 16 },
  subhead: { fontSize: 18, fontWeight: '800', color: colors.brandNavy, marginTop: 16, marginBottom: 6 },
  body: { color: colors.textPrimary, lineHeight: 22, maxWidth: 900, textAlign: 'center' },
});


