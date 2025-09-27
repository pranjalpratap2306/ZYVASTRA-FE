import React from 'react';
import { Modal, View, Text, StyleSheet, Pressable, TextInput, ScrollView } from 'react-native';
import { COUNTRY_DIALS, iso2ToFlag } from '../data/countryDialCodes';
import { colors } from '../theme/colors';

export interface PostRequirementFormData {
  companyName?: string;
  name: string;
  email: string;
  phone: string;
  quantity: string;
  productService: string;
  orderNotes?: string;
}

interface PostRequirementModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: PostRequirementFormData) => void;
}

export const PostRequirementModal: React.FC<PostRequirementModalProps> = ({ visible, onClose, onSubmit }) => {
  const [form, setForm] = React.useState<PostRequirementFormData>({
    companyName: '',
    name: '',
    email: '',
    phone: '',
    quantity: '',
    productService: '',
    orderNotes: '',
  });

  const [showErrors, setShowErrors] = React.useState(false);

  // Country dial code state (mirrors QuickQuoteModal)
  const [countryCode, setCountryCode] = React.useState('+91');
  const [countryIso2, setCountryIso2] = React.useState('IN');
  const [showCodes, setShowCodes] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const phoneRef = React.useRef<TextInput>(null as any);
  const searchRef = React.useRef<TextInput>(null as any);

  const filteredCountries = React.useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return COUNTRY_DIALS;
    return COUNTRY_DIALS.filter(c => c.name.toLowerCase().includes(q) || c.dial.includes(q));
  }, [search]);

  const selectCountry = (c: { name: string; iso2: string; dial: string }) => {
    setCountryCode(c.dial);
    setCountryIso2(c.iso2);
    setShowCodes(false);
    searchRef.current?.blur?.();
    phoneRef.current?.focus?.();
  };

  const updateField = (key: keyof PostRequirementFormData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const requiredFields: (keyof PostRequirementFormData)[] = [
    'name',
    'email',
    'phone',
    'quantity',
    'productService',
  ];

  const getFieldError = (key: keyof PostRequirementFormData) => {
    if (!showErrors) return '';
    const value = (form[key] as string) ?? '';
    if (requiredFields.includes(key) && !value.trim()) {
      return 'This field is required';
    }
    if (key === 'email' && value.trim()) {
      const valid = /[^\s@]+@[^\s@]+\.[^\s@]+/.test(value.trim());
      return valid ? '' : 'Enter a valid email';
    }
    if (key === 'phone' && value.trim()) {
      const valid = /[0-9\-+()\s]{7,}/.test(value.trim());
      return valid ? '' : 'Enter a valid phone';
    }
    return '';
  };

  const isFormValid = () => {
    for (const key of requiredFields) {
      const value = (form[key] as string) ?? '';
      if (!value.trim()) return false;
    }
    if (getFieldError('email')) return false;
    if (getFieldError('phone')) return false;
    return true;
  };

  const handleSubmit = () => {
    const valid = isFormValid();
    if (typeof console !== 'undefined') {
      try { console.debug('[PostRequirementModal] submit clicked, valid=', valid, 'form=', form); } catch {}
    }
    if (!valid) {
      setShowErrors(true);
      return;
    }
    const fullPhone = `${countryCode} ${(form.phone || '').trim()}`.trim();
    onSubmit({ ...form, phone: fullPhone });
  };

  const renderInput = (
    label: string,
    key: keyof PostRequirementFormData,
    props?: Partial<React.ComponentProps<typeof TextInput>>, 
  ) => {
    const errorText = getFieldError(key);
    return (
      <View style={styles.fieldWrap}>
        <Text style={styles.label}>
          {label}
          {requiredFields.includes(key) ? ' *' : ''}
        </Text>
        <TextInput
          value={(form[key] as string) ?? ''}
          onChangeText={(t) => updateField(key, t)}
          placeholder={label}
          placeholderTextColor={colors.textSecondary}
          style={[styles.input, !!errorText && styles.inputError]}
          {...props}
        />
        {!!errorText && <Text style={styles.errorText}>{errorText}</Text>}
      </View>
    );
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>Enquiry</Text>
            <Pressable onPress={onClose} style={styles.closeBtn}>
              <Text style={styles.closeText}>×</Text>
            </Pressable>
          </View>
          <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
            <Text style={styles.sectionTitle}>Let Us Know What You Need</Text>

            {renderInput('Company Name', 'companyName')}
            {renderInput('Name', 'name')}

            <View style={[styles.row, styles.rowRaised]}>
              <View style={styles.col}>
                {renderInput('Email Address', 'email', { keyboardType: 'email-address', autoCapitalize: 'none' })}
              </View>
              <View style={styles.gap} />
              <View style={styles.col}>
                <Text style={styles.label}>Mobile No.</Text>
                <View style={styles.phoneRow}>
                  <View style={styles.flagBoxWrap}>
                    <Pressable style={styles.flagBox} onPress={() => { setShowCodes((s) => !s); setTimeout(() => searchRef.current?.focus?.(), 0); }}>
                      <Text style={styles.flag}>{iso2ToFlag(countryIso2)}</Text>
                      <Text style={styles.caret}>▾</Text>
                    </Pressable>
                    {showCodes && (
                      <View style={styles.dropdownWide}>
                        <TextInput
                          ref={searchRef}
                          style={styles.search}
                          value={search}
                          onChangeText={setSearch}
                          placeholder="Search country"
                          placeholderTextColor={colors.textSecondary}
                        />
                        <ScrollView style={{ maxHeight: 260 }} nestedScrollEnabled>
                          {filteredCountries.map((c) => (
                            <Pressable key={c.iso2} style={styles.optionRow} onPress={() => selectCountry(c)}>
                              <Text style={styles.optionFlag}>{iso2ToFlag(c.iso2)}</Text>
                              <Text style={styles.optionName}>{c.name}</Text>
                              <Text style={styles.optionDial}>{c.dial}</Text>
                            </Pressable>
                          ))}
                        </ScrollView>
                      </View>
                    )}
                  </View>
                  <View style={styles.codeBoxReadonly}><Text style={styles.codeReadonlyText}>{countryCode}</Text></View>
                  <TextInput
                    ref={phoneRef}
                    value={form.phone}
                    onChangeText={(t) => updateField('phone', t)}
                    placeholder="Enter Mobile No."
                    placeholderTextColor={colors.textSecondary}
                    style={[styles.input, { flex: 1 }]}
                    keyboardType="phone-pad"
                  />
                </View>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.col}>
                {renderInput('Quantity', 'quantity', { keyboardType: 'numeric' })}
              </View>
              <View style={styles.gap} />
              <View style={styles.col}>
                {renderInput('Product', 'productService')}
              </View>
            </View>

            <View style={styles.fieldWrap}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                value={form.orderNotes ?? ''}
                onChangeText={(t) => updateField('orderNotes', t)}
                placeholder="Describe your requirement"
                placeholderTextColor={colors.textSecondary}
                style={[styles.input, styles.multiline]}
                multiline
                numberOfLines={4}
              />
            </View>

            <View style={styles.actionsRow}>
              <Pressable onPress={onClose} style={[styles.button, styles.secondaryBtn]}>
                <Text style={styles.secondaryBtnText}>Cancel</Text>
              </Pressable>
              <Pressable onPress={handleSubmit} style={[styles.button, styles.primaryBtn]}>
                <Text style={styles.primaryBtnText}>Submit Enquiry</Text>
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
    zIndex: 99999,
  },
  modalCard: {
    backgroundColor: colors.surface,
    width: '100%',
    maxWidth: 900,
    borderRadius: 12,
    overflow: 'visible',
    maxHeight: '90%'
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    backgroundColor: colors.brandNavyHeader,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.brandGold,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    fontSize: 24,
    color: colors.brandGold,
    lineHeight: 24,
    marginTop: -2,
  },
  content: {
    padding: 16,
    overflow: 'visible' as any,
  },
  scroll: {
    overflow: 'visible' as any,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 10,
  },
  fieldWrap: {
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    color: colors.textPrimary,
    marginBottom: 6,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: colors.textPrimary,
    backgroundColor: colors.inputBgOnLight,
  },
  multiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: '#ef4444',
  },
  errorText: {
    color: '#ef4444',
    marginTop: 6,
    fontSize: 12,
  },
  row: {
    flexDirection: 'row',
    zIndex: 0,
  },
  rowRaised: {
    zIndex: 50000,
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
    paddingTop: 4,
  },
  button: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 8,
  },
  primaryBtn: {
    backgroundColor: colors.brandNavyHeader,
  },
  primaryBtnText: {
    color: colors.brandGold,
    fontWeight: '700',
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
  // Dial code styles (ported from QuickQuoteModal)
  phoneRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  flagBoxWrap: { position: 'relative', zIndex: 2000 },
  flagBox: { width: 64, paddingHorizontal: 8, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  flag: { fontSize: 20 },
  caret: { color: colors.textSecondary, marginLeft: 6 },
  codeBoxReadonly: { minWidth: 72, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 8, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface },
  codeReadonlyText: { color: colors.textPrimary, fontWeight: '700' },

  dropdownWide: { position: 'absolute', top: 50, left: 0, width: 380, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 8, zIndex: 100000, shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, padding: 10 },
  search: { borderWidth: 1, borderColor: colors.border, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8, marginBottom: 8, color: colors.textPrimary },
  optionRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 8, borderBottomWidth: 1, borderBottomColor: colors.border },
  optionFlag: { fontSize: 18, marginRight: 10 },
  optionName: { flex: 1, color: colors.textPrimary },
  optionDial: { color: colors.textSecondary, fontWeight: '700' },
}); 