import React from 'react';
import { Modal, View, Text, StyleSheet, Pressable, TextInput, ScrollView } from 'react-native';
import { colors } from '../theme/colors';

export interface PostRequirementFormData {
  companyName?: string;
  name: string;
  email: string;
  phone: string;
  quantity: string;
  productService: string;
  targetPrice: string;
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
    targetPrice: '',
    orderNotes: '',
  });

  const [showErrors, setShowErrors] = React.useState(false);

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
    if (!valid) {
      setShowErrors(true);
      return;
    }
    onSubmit(form);
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
            <Text style={styles.title}>Post Your Requirement</Text>
            <Pressable onPress={onClose} style={styles.closeBtn}>
              <Text style={styles.closeText}>×</Text>
            </Pressable>
          </View>
          <ScrollView contentContainerStyle={styles.content}>
            <Text style={styles.sectionTitle}>Let Us Know What You Need</Text>

            {renderInput('Company Name', 'companyName')}
            {renderInput('Name', 'name')}

            <View style={styles.row}>
              <View style={styles.col}>
                {renderInput('Email Address', 'email', { keyboardType: 'email-address', autoCapitalize: 'none' })}
              </View>
              <View style={styles.gap} />
              <View style={styles.col}>
                {renderInput('Phone', 'phone', { keyboardType: 'phone-pad' })}
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

            {renderInput('Target Price', 'targetPrice', { keyboardType: 'numeric' })}

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
                <Text style={styles.primaryBtnText}>Submit Requirement</Text>
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
  modalCard: {
    backgroundColor: colors.surface,
    width: '100%',
    maxWidth: 900,
    borderRadius: 12,
    overflow: 'hidden',
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
}); 