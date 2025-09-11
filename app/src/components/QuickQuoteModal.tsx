import React from 'react';
import { Modal, View, Text, TextInput, StyleSheet, Pressable, Image, ScrollView } from 'react-native';
import { colors } from '../theme/colors';
import { COUNTRY_DIALS, iso2ToFlag } from '../data/countryDialCodes';

interface QuickQuoteModalProps {
  visible: boolean;
  title?: string;
  onClose: () => void;
  onSubmit: (payload: { quantity: string; unit: string; phone: string }) => void;
  productTitle?: string;
  productImageUrl?: string;
}

export const QuickQuoteModal: React.FC<QuickQuoteModalProps> = ({ visible, title = 'Get a Quick Quote', onClose, onSubmit, productTitle, productImageUrl }) => {
  const [quantity, setQuantity] = React.useState('');
  const [unit, setUnit] = React.useState('Piece');
  const [phone, setPhone] = React.useState('');
  const [countryCode, setCountryCode] = React.useState('+91');
  const [countryIso2, setCountryIso2] = React.useState('IN');
  const [showCodes, setShowCodes] = React.useState(false);
  const [search, setSearch] = React.useState('');

  const phoneRef = React.useRef<TextInput>(null as any);
  const searchRef = React.useRef<TextInput>(null as any);

  React.useEffect(() => {
    if (visible) {
      // Defer focus until modal mounts
      const id = setTimeout(() => {
        phoneRef.current?.focus?.();
      }, 0);
      return () => clearTimeout(id);
    }
  }, [visible]);

  const filteredCountries = React.useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return COUNTRY_DIALS;
    return COUNTRY_DIALS.filter(c => c.name.toLowerCase().includes(q) || c.dial.includes(q));
  }, [search]);

  const submit = () => {
    const fullPhone = `${countryCode} ${phone}`.trim();
    onSubmit({ quantity, unit, phone: fullPhone });
  };

  const selectCountry = (c: { name: string; iso2: string; dial: string }) => {
    setCountryCode(c.dial);
    setCountryIso2(c.iso2);
    setShowCodes(false);
    // Move focus back to the main input to avoid focusing a hidden element
    searchRef.current?.blur?.();
    phoneRef.current?.focus?.();
  };

  const currentFlag = iso2ToFlag(countryIso2);

  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{title}</Text>
            <Pressable onPress={onClose}><Text style={styles.close}>✕</Text></Pressable>
          </View>

          <View style={styles.bodyRow}>
            {/* Left: Product preview */}
            <View style={styles.leftCol}>
              {productTitle ? (
                <View style={styles.productHeader}><Text style={styles.productHeaderText}>{productTitle}</Text></View>
              ) : null}
              {productImageUrl ? (
                <View style={styles.imageWrap}>
                  <Image source={{ uri: productImageUrl }} style={styles.productImage} resizeMode="contain" />
                </View>
              ) : null}
              {/* MOQ removed as per requirement */}
            </View>

            {/* Right: Form */}
            <View style={styles.rightCol}>
              <View style={styles.inlineRow}>
                <View style={styles.col}>
                  <Text style={styles.label}>Quantity</Text>
                  <TextInput style={styles.input} keyboardType="numeric" value={quantity} onChangeText={setQuantity} placeholder="Quantity" placeholderTextColor={colors.textSecondary} />
                </View>
                <View style={styles.col}>
                  <Text style={styles.label}>Measurement Units</Text>
                  <TextInput style={styles.input} value={unit} onChangeText={setUnit} placeholder="Piece" placeholderTextColor={colors.textSecondary} />
                </View>
              </View>

              <View style={{ marginTop: 12 }}>
                <Text style={styles.label}>Mobile No.</Text>
                <View style={styles.phoneRow}>
                  {/* Flag dropdown */}
                  <View style={styles.flagBoxWrap}>
                    <Pressable style={styles.flagBox} onPress={() => {
                      setShowCodes((s) => !s);
                      setTimeout(() => searchRef.current?.focus?.(), 0);
                    }}>
                      <Text style={styles.flag}>{currentFlag}</Text>
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
                        <ScrollView style={{ maxHeight: 260 }}>
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
                  {/* Dial code */}
                  <View style={styles.codeBoxReadonly}><Text style={styles.codeReadonlyText}>{countryCode}</Text></View>
                  {/* Phone input */}
                  <TextInput ref={phoneRef} style={[styles.input, { flex: 1 }]} keyboardType="phone-pad" value={phone} onChangeText={setPhone} placeholder="Enter Mobile No." placeholderTextColor={colors.textSecondary} />
                </View>
              </View>

              <View style={styles.actions}>
                <Pressable style={styles.submit} onPress={submit}>
                  <Text style={styles.submitText}>Send Enquiry</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', alignItems: 'center', justifyContent: 'center', padding: 16 },
  sheet: { width: '100%', maxWidth: 1100, backgroundColor: colors.surface, borderRadius: 10, borderWidth: 1, borderColor: colors.border, padding: 0 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border, backgroundColor: colors.brandNavyHeader },
  headerTitle: { color: colors.surface, fontWeight: '900', fontSize: 18 },
  close: { color: colors.surface, fontSize: 20 },

  bodyRow: { flexDirection: 'row' },
  leftCol: { width: 420, padding: 16, borderRightWidth: 1, borderRightColor: colors.border, backgroundColor: '#F5F7FA' },
  rightCol: { flex: 1, padding: 16 },

  productHeader: { backgroundColor: '#5A6B7B', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 4, marginBottom: 12 },
  productHeaderText: { color: colors.surface, fontWeight: '800' },
  imageWrap: { width: '100%', aspectRatio: 1, backgroundColor: colors.surface, borderRadius: 6, borderWidth: 1, borderColor: colors.border, overflow: 'hidden', alignItems: 'center', justifyContent: 'center' },
  productImage: { width: '100%', height: '100%' },
  // moq: removed

  inlineRow: { flexDirection: 'row', gap: 12 },
  col: { flex: 1 },
  label: { color: colors.textPrimary, fontWeight: '700', marginBottom: 4 },
  input: { borderWidth: 1, borderColor: colors.border, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, color: colors.textPrimary },

  phoneRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  flagBoxWrap: { position: 'relative' },
  flagBox: { width: 64, paddingHorizontal: 8, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  flag: { fontSize: 20 },
  caret: { color: colors.textSecondary, marginLeft: 6 },
  codeBoxReadonly: { minWidth: 72, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 8, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface },
  codeReadonlyText: { color: colors.textPrimary, fontWeight: '700' },

  dropdownWide: { position: 'absolute', top: 50, left: 0, width: 380, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 8, zIndex: 20, shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, padding: 10 },
  search: { borderWidth: 1, borderColor: colors.border, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8, marginBottom: 8, color: colors.textPrimary },
  optionRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 8, borderBottomWidth: 1, borderBottomColor: colors.border },
  optionFlag: { fontSize: 18, marginRight: 10 },
  optionName: { flex: 1, color: colors.textPrimary },
  optionDial: { color: colors.textSecondary, fontWeight: '700' },

  actions: { alignItems: 'flex-start', marginTop: 16 },
  submit: { backgroundColor: '#333', paddingHorizontal: 18, paddingVertical: 12, borderRadius: 6 },
  submitText: { color: colors.surface, fontWeight: '800' },
}); 