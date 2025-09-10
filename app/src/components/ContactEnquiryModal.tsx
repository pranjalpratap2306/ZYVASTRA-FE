import React from 'react';
import { Modal, View, Text, StyleSheet, Pressable, TextInput, ScrollView, Linking, Platform } from 'react-native';
import { colors } from '../theme/colors';

type Mode = 'sms' | 'email';

interface ContactEnquiryModalProps {
  visible: boolean;
  mode: Mode;
  onClose: () => void;
  onSubmit: (payload: Record<string, string>) => void;
  smsRecipientPhone?: string;
  emailRecipient?: string;
}

export const ContactEnquiryModal: React.FC<ContactEnquiryModalProps> = ({ visible, mode, onClose, onSubmit, smsRecipientPhone, emailRecipient }) => {
  const [product, setProduct] = React.useState('');
  const [details, setDetails] = React.useState('');
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [countryCode, setCountryCode] = React.useState('+91');
  const [phone, setPhone] = React.useState('');
  const [showErrors, setShowErrors] = React.useState(false);

  const isEmailValid = (v: string) => /[^\s@]+@[^\s@]+\.[^\s@]+/.test(v.trim());
  const isPhoneValid = (v: string) => /[0-9\-+()\s]{7,}/.test(v.trim());

  const validate = () => {
    if (!product.trim()) return false;
    if (!name.trim()) return false;
    if (mode === 'email' && !isEmailValid(email)) return false;
    if (mode === 'sms' && !isPhoneValid(phone)) return false;
    return true;
  };

  const submit = async () => {
    if (!validate()) {
      setShowErrors(true);
      return;
    }

    const body = `Product: ${product}\nDetails: ${details || '-'}\nName: ${name}\nEmail: ${email || '-'}\nPhone: ${countryCode} ${phone || '-'}`;

    try {
      if (mode === 'sms' && smsRecipientPhone) {
        const to = smsRecipientPhone.replace(/\s+/g, '');
        const url = Platform.select({ ios: `sms:${to}&body=${encodeURIComponent(body)}`, android: `sms:${to}?body=${encodeURIComponent(body)}`, default: `sms:${to}?body=${encodeURIComponent(body)}` }) as string;
        const supported = await Linking.canOpenURL(url);
        if (supported) await Linking.openURL(url);
      } else if (mode === 'email' && emailRecipient) {
        const subject = `Enquiry: ${product}`;
        const url = `mailto:${encodeURIComponent(emailRecipient)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        const supported = await Linking.canOpenURL(url);
        if (supported) await Linking.openURL(url);
      }
    } catch {}

    onSubmit({ product, details, name, email, countryCode, phone, mode });
  };

  const title = mode === 'sms' ? 'Send SMS Enquiry' : 'Send Email Enquiry';
  const primaryLabel = mode === 'sms' ? 'Send SMS' : 'Send Email';

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{title}</Text>
            <Pressable onPress={onClose} style={styles.closeBtn}>
              <Text style={styles.closeText}>×</Text>
            </Pressable>
          </View>

          <ScrollView contentContainerStyle={styles.content}>
            <View style={styles.fieldWrap}>
              <Text style={styles.label}>Product / Service Looking for *</Text>
              <TextInput
                value={product}
                onChangeText={setProduct}
                placeholder="Product / Service Looking for"
                placeholderTextColor={colors.textSecondary}
                style={[styles.input, showErrors && !product.trim() && styles.inputError]}
              />
            </View>

            <View style={styles.fieldWrap}>
              <Text style={styles.label}>Describe your requirement</Text>
              <TextInput
                value={details}
                onChangeText={setDetails}
                placeholder="Describe your requirement in detail. We will get back soon."
                placeholderTextColor={colors.textSecondary}
                style={[styles.input, styles.multiline]}
                multiline
                numberOfLines={4}
              />
            </View>

            <View style={styles.fieldWrap}>
              <Text style={styles.label}>Name *</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Enter Name"
                placeholderTextColor={colors.textSecondary}
                style={[styles.input, showErrors && !name.trim() && styles.inputError]}
              />
            </View>

            {mode === 'email' ? (
              <View style={styles.fieldWrap}>
                <Text style={styles.label}>Email *</Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter Email"
                  placeholderTextColor={colors.textSecondary}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  style={[styles.input, showErrors && !isEmailValid(email) && styles.inputError]}
                />
              </View>
            ) : (
              <View style={styles.row}>
                <View style={[styles.col, { flex: 0.4 }]}> 
                  <Text style={styles.label}>Code</Text>
                  <TextInput
                    value={countryCode}
                    onChangeText={setCountryCode}
                    placeholder="+91"
                    placeholderTextColor={colors.textSecondary}
                    style={styles.input}
                  />
                </View>
                <View style={styles.gap} />
                <View style={styles.col}> 
                  <Text style={styles.label}>Mobile No *</Text>
                  <TextInput
                    value={phone}
                    onChangeText={setPhone}
                    placeholder="Mobile No"
                    placeholderTextColor={colors.textSecondary}
                    keyboardType="phone-pad"
                    style={[styles.input, showErrors && !isPhoneValid(phone) && styles.inputError]}
                  />
                </View>
              </View>
            )}

            <View style={styles.actionsRow}>
              <Pressable onPress={onClose} style={[styles.button, styles.secondaryBtn]}>
                <Text style={styles.secondaryBtnText}>Cancel</Text>
              </Pressable>
              <Pressable onPress={submit} style={[styles.button, styles.primaryBtn]}>
                <Text style={styles.primaryBtnText}>{primaryLabel}</Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    backgroundColor: colors.surface,
    width: '100%',
    maxWidth: 720,
    borderRadius: 12,
    overflow: 'hidden',
    maxHeight: '92%'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    backgroundColor: colors.brandNavyHeader,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.brandGold,
  },
  closeBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    fontSize: 26,
    color: colors.brandGold,
  },
  content: {
    padding: 16,
  },
  fieldWrap: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: colors.textPrimary,
    marginBottom: 6,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    color: colors.textPrimary,
    backgroundColor: colors.inputBgOnLight,
  },
  multiline: {
    minHeight: 110,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: '#ef4444',
  },
  row: {
    flexDirection: 'row',
  },
  col: {
    flex: 1,
  },
  gap: {
    width: 12,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    paddingTop: 8,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
  },
  primaryBtn: {
    backgroundColor: colors.brandNavyHeader,
  },
  primaryBtnText: {
    color: colors.brandGold,
    fontWeight: '800',
  },
  secondaryBtn: {
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
  },
  secondaryBtnText: {
    color: colors.textPrimary,
    fontWeight: '700',
  },
}); 