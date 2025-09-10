import React from 'react';
import { View, Text, StyleSheet, Pressable, Linking, Platform, Image } from 'react-native';
import { colors } from '../theme/colors';

interface WhatsAppWidgetProps {
  phone: string; // e.g., +917428073088
  businessName?: string;
}

export const WhatsAppWidget: React.FC<WhatsAppWidgetProps> = ({ phone, businessName = 'ZYVASTRA' }) => {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(false);
  }, []);

  const handleChat = async () => {
    const text = encodeURIComponent('Hi! I have a query about your products.');
    const normalized = phone.replace(/\s+/g, '');
    const url = Platform.select({
      ios: `https://wa.me/${normalized}?text=${text}`,
      android: `https://wa.me/${normalized}?text=${text}`,
      default: `https://wa.me/${normalized}?text=${text}`,
    }) as string;
    const supported = await Linking.canOpenURL(url);
    if (supported) await Linking.openURL(url);
  };

  if (!open) {
    return (
      <Pressable onPress={() => setOpen(true)} style={styles.fab}>
        <Image source={require('../../assets/whatsapp-logo.png')} style={styles.logo} resizeMode="contain" />
        <Text style={styles.fabText}>WhatsApp Us</Text>
      </Pressable>
    );
  }

  return (
    <View style={styles.popupWrap}>
      <View style={styles.popup}>
        <View style={styles.popupHeader}>
          <Text style={styles.popupTitle}>Raise your Query</Text>
          <Pressable onPress={() => setOpen(false)}><Text style={styles.close}>×</Text></Pressable>
        </View>
        <Text style={styles.popupSubtitle}>Hi! Simply click below and type your query.</Text>
        <Pressable onPress={handleChat} style={styles.chatBtn}>
          <Image source={require('../../assets/whatsapp-logo.png')} style={styles.logoSmall} resizeMode="contain" />
          <Text style={styles.chatBtnText}>Click Here to Chat · {businessName}</Text>
        </Pressable>
      </View>
      <Pressable onPress={() => setOpen(true)} style={[styles.fab, styles.fabCompact]}>
        <Image source={require('../../assets/whatsapp-logo.png')} style={styles.logo} resizeMode="contain" />
        <Text style={styles.fabText}>WhatsApp Us</Text>
      </Pressable>
    </View>
  );
};

const DARK_GREEN = '#0C8A43';

const styles = StyleSheet.create({
  fab: {
    position: 'fixed' as any,
    right: 20,
    bottom: 20,
    backgroundColor: DARK_GREEN,
    borderRadius: 40,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  logo: {
    width: 20,
    height: 20,
  },
  logoSmall: {
    width: 18,
    height: 18,
    marginRight: 8,
  },
  fabCompact: {
    bottom: 20,
  },
  fabText: {
    color: '#fff',
    fontWeight: '800',
  },
  popupWrap: {
    position: 'fixed' as any,
    right: 20,
    bottom: 20,
    alignItems: 'flex-end',
    gap: 12,
  },
  popup: {
    width: 360,
    backgroundColor: colors.surface,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  popupHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: DARK_GREEN,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  popupTitle: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 18,
  },
  close: {
    color: '#fff',
    fontSize: 24,
    lineHeight: 24,
  },
  popupSubtitle: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: colors.textPrimary,
  },
  chatBtn: {
    margin: 16,
    backgroundColor: '#E7F6ED',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#BEE3CD',
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatBtnText: {
    color: DARK_GREEN,
    fontWeight: '800',
  },
}); 