import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, useWindowDimensions, Alert } from 'react-native';
import { colors } from '../theme/colors';

export const LetsTalkBusinessSection: React.FC = () => {
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 768;

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    businessName: '',
    country: '',
    countryCode: '+91',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      Alert.alert('Validation Error', 'Please fill in all required fields (Name, Email, Phone).');
      return;
    }
    Alert.alert('Thank You!', 'Your message has been sent. We will get back to you shortly.');
    setFormData({
      name: '',
      phone: '',
      email: '',
      businessName: '',
      country: '',
      countryCode: '+91',
    });
  };

  const styles = getStyles(isSmallScreen);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Let's Talk Business!</Text>
        <Text style={styles.subtitle}>We'll get back to you within a day.</Text>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.row}>
          <TextInput
            placeholder="Name"
            style={styles.input}
            value={formData.name}
            onChangeText={(value) => handleInputChange('name', value)}
            placeholderTextColor={colors.textSecondary}
          />
          <View style={styles.phoneInputContainer}>
            <TextInput
              placeholder="+91"
              style={styles.countryCodeInput}
              value={formData.countryCode}
              onChangeText={(value) => handleInputChange('countryCode', value)}
              placeholderTextColor={colors.textSecondary}
              keyboardType="phone-pad"
            />
            <TextInput
              placeholder="Phone/WhatsApp"
              style={styles.phoneInput}
              value={formData.phone}
              onChangeText={(value) => handleInputChange('phone', value)}
              placeholderTextColor={colors.textSecondary}
              keyboardType="phone-pad"
            />
          </View>
        </View>
        <View style={styles.row}>
          <TextInput
            placeholder="Email"
            style={styles.input}
            value={formData.email}
            onChangeText={(value) => handleInputChange('email', value)}
            placeholderTextColor={colors.textSecondary}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Business Name"
            style={styles.input}
            value={formData.businessName}
            onChangeText={(value) => handleInputChange('businessName', value)}
            placeholderTextColor={colors.textSecondary}
          />
        </View>
        <TextInput
          placeholder="Country"
          style={[styles.input, styles.fullWidthInput]}
          value={formData.country}
          onChangeText={(value) => handleInputChange('country', value)}
          placeholderTextColor={colors.textSecondary}
        />
        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>SEND</Text>
        </Pressable>
      </View>
    </View>
  );
};

const getStyles = (isSmallScreen: boolean) => StyleSheet.create({
  container: {
    backgroundColor: '#F5F0E5',
    paddingVertical: 60,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  header: {
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: isSmallScreen ? 32 : 40,
    color: colors.brandNavy,
    fontWeight: '600',
    fontFamily: 'serif',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  formContainer: {
    width: '100%',
    maxWidth: 800,
  },
  row: {
    flexDirection: isSmallScreen ? 'column' : 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: colors.textPrimary,
    width: isSmallScreen ? '100%' : '48%',
    marginBottom: isSmallScreen ? 20 : 0,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    width: isSmallScreen ? '100%' : '48%',
  },
  countryCodeInput: {
    paddingVertical: 14,
    paddingLeft: 16,
    fontSize: 16,
    color: colors.textPrimary,
    width: 60,
  },
  phoneInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: colors.textPrimary,
  },
  fullWidthInput: {
    width: '100%',
    marginBottom: 30,
  },
  button: {
    backgroundColor: colors.brandNavyHeader,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
