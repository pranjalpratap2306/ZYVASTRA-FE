import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { HeaderBar } from '../components/HeaderBar';
import { SiteFooter } from '../components/SiteFooter';

export const ShippingPolicyScreen: React.FC = () => {
  return (
    <ScrollView style={styles.shell}>
      <HeaderBar />
      <View style={styles.container}>
        <Text style={styles.title}>Shipping Policy</Text>
        <Text style={styles.body}>
          Orders are typically dispatched within 7-10 business days after confirmation. Delivery timelines
          depend on destination and logistics partners. You will receive tracking details once your order is
          shipped. For urgent timelines, please contact us before placing the order.
        </Text>
        <Text style={styles.subhead}>International Shipping</Text>
        <Text style={styles.body}>
          We ship to multiple countries via trusted carriers. Customs duties, taxes, and fees are the
          responsibility of the recipient.
        </Text>
        <Text style={styles.subhead}>Damages & Issues</Text>
        <Text style={styles.body}>
          Please inspect your order upon receipt and contact us immediately if the item is defective,
          damaged, or if you receive the wrong item, so that we can evaluate the issue and make it right.
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


