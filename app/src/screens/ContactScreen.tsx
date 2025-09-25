import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable, Alert, useWindowDimensions, Platform, Linking, Image } from 'react-native';
import { colors } from '../theme/colors';
import { HeaderBar } from '../components/HeaderBar';
import { SiteFooter } from '../components/SiteFooter';

export const ContactScreen: React.FC = () => {
  const { width } = useWindowDimensions();
  const isNarrow = width < 768;

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    businessName: '',
    additionalInfo: '',
  });

  const OFFICE_LAT = 23.317322;
  const OFFICE_LNG = 77.317551;
  const OFFICE_ADDR = 'Shop no 01 In front of Aman Hospital, Shantinagar Bhopal';

  const openInMaps = async () => {
    const url = Platform.select({
      ios: `http://maps.apple.com/?q=${encodeURIComponent(OFFICE_ADDR)}&ll=${OFFICE_LAT},${OFFICE_LNG}`,
      android: `geo:${OFFICE_LAT},${OFFICE_LNG}?q=${encodeURIComponent(OFFICE_ADDR)}`,
      default: `https://maps.google.com/?q=${encodeURIComponent(OFFICE_ADDR)}&ll=${OFFICE_LAT},${OFFICE_LNG}`,
    }) as string;
    const supported = await Linking.canOpenURL(url);
    if (supported) await Linking.openURL(url);
  };

  const googleEmbed = `https://www.google.com/maps?q=${OFFICE_LAT},${OFFICE_LNG}&output=embed`;

  const updateField = (key: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    // Basic validation
    if (!form.name || !form.email || !form.phone || !form.country || !form.businessName) {
      Alert.alert('Validation Error', 'Please fill in all required fields.');
      return;
    }
    // Handle form submission logic here
    Alert.alert('Success', 'Your message has been sent!');
    setForm({ name: '', email: '', phone: '', country: '', businessName: '', additionalInfo: '' });
  };

  return (
    <ScrollView style={styles.shell}>
      <HeaderBar />
      <View style={styles.detailsBar}>
        <Text style={styles.detailsTitle}>Our Contact Details!</Text>
        <View style={[styles.detailsContent, isNarrow && styles.detailsContentNarrow]}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>PHONE NO.</Text>
            <Text style={styles.detailValue}>+91 9993305646</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>ADDRESS</Text>
            <Text style={styles.detailValue}>{OFFICE_ADDR}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>EMAIL ID</Text>
            <Text style={styles.detailValue}>zyvastra-support@gmail.com</Text>
          </View>
        </View>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>lets talk business !</Text>
        <Text style={styles.formSubtitle}>We'll get back to you within a day.</Text>

        <View style={[styles.form, isNarrow && styles.formNarrow]}>
          <View style={[styles.formRow, isNarrow && styles.formRowNarrow]}>
            <TextInput placeholder="Name" style={styles.input} value={form.name} onChangeText={v => updateField('name', v)} />
            <TextInput placeholder="Email" style={styles.input} value={form.email} onChangeText={v => updateField('email', v)} keyboardType="email-address" />
          </View>
          <View style={[styles.formRow, isNarrow && styles.formRowNarrow]}>
            <TextInput placeholder="Phone/Whatsapp*" style={styles.input} value={form.phone} onChangeText={v => updateField('phone', v)} keyboardType="phone-pad" />
            <TextInput placeholder="Country*" style={styles.input} value={form.country} onChangeText={v => updateField('country', v)} />
          </View>
          <TextInput placeholder="Business Name*" style={styles.inputFull} value={form.businessName} onChangeText={v => updateField('businessName', v)} />
          <TextInput placeholder="Additional Info." style={[styles.inputFull, styles.multiline]} value={form.additionalInfo} onChangeText={v => updateField('additionalInfo', v)} multiline />
          <Pressable style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.mapSection}>
        <Text style={styles.mapTitle}>Find us on the map</Text>
        <View style={styles.mapCard}>
          {Platform.OS === 'web' ? (
            // @ts-ignore - iframe allowed on web build
            <iframe src={googleEmbed} style={styles.iframe as any} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          ) : (
            <Image source={{ uri: `https://maps.googleapis.com/maps/api/staticmap?center=${OFFICE_LAT},${OFFICE_LNG}&zoom=14&size=600x400&maptype=roadmap&markers=color:red%7Clabel:S%7C${OFFICE_LAT},${OFFICE_LNG}&key=YOUR_API_KEY` }} style={styles.mapImg} />
          )}
          <Pressable style={styles.mapBtn} onPress={openInMaps}>
            <Text style={styles.mapBtnText}>Open in Google Maps</Text>
          </Pressable>
        </View>
      </View>

      <SiteFooter />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  shell: {
    flex: 1,
    backgroundColor: '#FFFBF7',
  },
  detailsBar: {
    backgroundColor: '#F5F0E5',
    paddingVertical: 48,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  detailsTitle: {
    fontSize: 32,
    fontWeight: '600',
    fontFamily: 'serif',
    marginBottom: 32,
  },
  detailsContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    maxWidth: 1000,
  },
  detailsContentNarrow: {
    flexDirection: 'column',
    gap: 24,
  },
  detailItem: {
    alignItems: 'center',
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 8,
  },
  detailValue: {
    fontSize: 16,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  formContainer: {
    paddingVertical: 64,
    paddingHorizontal: 24,
    alignItems: 'center',
    // Add subtle background pattern if available
  },
  formTitle: {
    fontSize: 40,
    fontWeight: '600',
    fontFamily: 'serif',
    fontStyle: 'italic',
    marginBottom: 8,
  },
  formSubtitle: {
    color: colors.textSecondary,
    marginBottom: 48,
  },
  form: {
    width: '100%',
    maxWidth: 800,
  },
  formNarrow: {
    maxWidth: 400,
  },
  formRow: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 24,
  },
  formRowNarrow: {
    flexDirection: 'column',
    gap: 24,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    backgroundColor: 'white',
  },
  inputFull: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    marginBottom: 24,
    backgroundColor: 'white',
  },
  multiline: {
    height: 120,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: colors.brandNavy,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  mapSection: {
    padding: 24,
    alignItems: 'center',
  },
  mapTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 24,
    fontFamily: 'serif',
  },
  mapCard: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    overflow: 'hidden',
    width: '100%',
    maxWidth: 800,
  },
  mapImg: {
    width: '100%',
    height: 400,
  },
  iframe: {
    width: '100%',
    height: 400,
    borderWidth: 0,
  },
  mapBtn: {
    paddingVertical: 12,
    backgroundColor: colors.brandNavyHeader,
    alignItems: 'center',
  },
  mapBtnText: {
    color: colors.brandGold,
    fontWeight: 'bold',
  },
});