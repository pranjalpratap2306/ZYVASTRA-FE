import React from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, Linking, Platform, ScrollView } from 'react-native';
import { colors } from '../theme/colors';

interface ChatbotWidgetProps {
  businessName?: string;
  whatsappPhone?: string;
  contactEmail?: string;
  contactPhone?: string;
}

type Step =
  | 'welcome'
  | 'name'
  | 'email'
  | 'phone'
  | 'looking'
  | 'volume'
  | 'style'
  | 'notes'
  | 'share';

type Msg = { id: string; from: 'bot' | 'user'; text: string };

export const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({
  businessName = 'ZYVASTRA',
  whatsappPhone,
  contactEmail,
  contactPhone,
}) => {
  const [open, setOpen] = React.useState(false);
  const [step, setStep] = React.useState<Step>('welcome');
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [looking, setLooking] = React.useState('');
  const [volume, setVolume] = React.useState('');
  const [style, setStyle] = React.useState<string[]>([]);
  const [notes, setNotes] = React.useState('');
  const [msgs, setMsgs] = React.useState<Msg[]>([]);
  const scrollRef = React.useRef<ScrollView>(null);

  const scrollToEnd = () => setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 0);

  const addBot = (text: string) => {
    setMsgs((m) => [...m, { id: String(Date.now() + Math.random()), from: 'bot', text }]);
    scrollToEnd();
  };
  const addUser = (text: string) => {
    setMsgs((m) => [...m, { id: String(Date.now() + Math.random()), from: 'user', text }]);
    scrollToEnd();
  };

  const toggle = () => {
    setOpen((v) => {
      const nv = !v;
      if (nv) {
        setMsgs([]);
        addBot(`👋 Hi! Welcome to ${businessName} – India’s Smartest T‑shirt Business Hub.`);
        setStep('name');
        addBot('Your Name (or) Company Name');
      }
      return nv;
    });
  };

  const pushStyle = (s: string) => {
    setStyle((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  };

  const next = (to: Step) => setStep(to);

  const openEmail = async () => {
    if (!contactEmail) return;
    const subject = `${businessName} enquiry – ${looking || 'T‑shirts'}`;
    const body = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nLooking for: ${looking}\nStart volume: ${volume}\nStyles: ${style.join(', ') || '-'}\nNotes: ${notes || '-'}`;
    const url = `mailto:${encodeURIComponent(contactEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const supported = await Linking.canOpenURL(url);
    if (supported) await Linking.openURL(url);
  };

  const openWhatsApp = async () => {
    if (!whatsappPhone) return;
    const text = `Hi ${businessName},\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nLooking for: ${looking}\nVolume: ${volume}\nStyles: ${style.join(', ') || '-'}\nNotes: ${notes || '-'}`;
    const normalized = whatsappPhone.replace(/\s+/g, '');
    const url = `https://wa.me/${normalized}?text=${encodeURIComponent(text)}`;
    const supported = await Linking.canOpenURL(url);
    if (supported) await Linking.openURL(url);
  };

  const openCall = async () => {
    if (!contactPhone) return;
    const url = Platform.select({ ios: `telprompt:${contactPhone}`, android: `tel:${contactPhone}` }) as string;
    const supported = await Linking.canOpenURL(url);
    if (supported) await Linking.openURL(url);
  };

  if (!open) {
    return (
      <Pressable onPress={toggle} style={styles.fab}>
        <Text style={styles.fabText}>Chat with us</Text>
      </Pressable>
    );
  }

  return (
    <View style={styles.wrap}>
      <View style={styles.sheet}>
        <View style={styles.header}>
          <Text style={styles.title}>{businessName}</Text>
          <Text style={styles.subtitle}>T‑Shirt Manufacturer</Text>
          <Pressable onPress={() => setOpen(false)} style={styles.close}><Text style={styles.closeText}>×</Text></Pressable>
        </View>

        {/* transcript */}
        <ScrollView ref={scrollRef} style={styles.transcript} contentContainerStyle={{ padding: 16, gap: 10 }}>
          {msgs.map((m) => (
            <View key={m.id} style={[styles.msg, m.from === 'user' ? styles.msgUser : styles.msgBot]}>
              <Text style={m.from === 'user' ? styles.msgUserText : styles.msgBotText}>{m.text}</Text>
            </View>
          ))}
        </ScrollView>

        {/* current step card */}
        {step === 'name' && (
          <View style={styles.card}> 
            <Text style={styles.question}>Your Name (or) Company Name</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
              style={styles.input}
              returnKeyType="next"
              onSubmitEditing={() => { if (!name.trim()) return; addUser(name.trim()); addBot('Email Address'); next('email'); }}
            />
          </View>
        )}

        {step === 'email' && (
          <View style={styles.card}> 
            <Text style={styles.question}>Email Address</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="Enter your email"
              style={styles.input}
              returnKeyType="next"
              onSubmitEditing={() => { if (!email.trim()) return; addUser(email.trim()); addBot('Phone Number'); next('phone'); }}
            />
          </View>
        )}

        {step === 'phone' && (
          <View style={styles.card}> 
            <Text style={styles.question}>Phone Number</Text>
            <TextInput
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              placeholder="Enter your phone"
              style={styles.input}
              returnKeyType="next"
              onSubmitEditing={() => { if (!phone.trim()) return; addUser(phone.trim()); addBot('What Are You Looking For?'); next('looking'); }}
            />
          </View>
        )}

        {step === 'looking' && (
          <View style={styles.card}> 
            <Text style={styles.question}>What Are You Looking For?</Text>
            {['Plain T‑shirts (Wholesale)', 'Custom Printing', 'Private Label / Branding', 'Bulk Fabric'].map((opt) => (
              <Pressable key={opt} onPress={() => { setLooking(opt); addUser(opt); addBot('How many T‑shirts to start with?'); next('volume'); }} style={styles.option}><Text style={styles.optionText}>{opt}</Text></Pressable>
            ))}
          </View>
        )}

        {step === 'volume' && (
          <View style={styles.card}> 
            <Text style={styles.question}>How many T‑shirts to start with?</Text>
            {['100+ pcs', '200+ pcs', '500+ pcs', '1000+ pcs'].map((opt) => (
              <Pressable key={opt} onPress={() => { setVolume(opt); addUser(opt); addBot('What type/style are you looking for?'); next('style'); }} style={styles.chip}><Text style={styles.chipText}>{opt}</Text></Pressable>
            ))}
          </View>
        )}

        {step === 'style' && (
          <View style={styles.card}> 
            <Text style={styles.question}>What type/style are you looking for?</Text>
            {['Men’s', 'Women’s', 'Kids', 'Round Neck', 'Polo', 'Oversize', 'Cotton', 'Supima', 'Polyester', 'Bamboo'].map((opt) => (
              <Pressable key={opt} onPress={() => pushStyle(opt)} style={[styles.multiChip, style.includes(opt) && styles.multiChipActive]}>
                <Text style={[styles.multiChipText, style.includes(opt) && styles.multiChipTextActive]}>{opt}</Text>
              </Pressable>
            ))}
            <Pressable style={styles.nextBtn} onPress={() => { const summary = style.join(', ') || '-'; addUser(summary); addBot('Type your enquiry or special request'); next('notes'); }}><Text style={styles.nextText}>Next</Text></Pressable>
          </View>
        )}

        {step === 'notes' && (
          <View style={styles.card}> 
            <Text style={styles.question}>Type your enquiry or special request</Text>
            <TextInput
              value={notes}
              onChangeText={setNotes}
              placeholder="We are here to help you"
              style={[styles.input, styles.multiline]}
              multiline
              numberOfLines={3}
              returnKeyType="send"
              onSubmitEditing={() => { addUser(notes || '-'); addBot('We’ll now share your catalogue with pricing.'); next('share'); }}
            />
          </View>
        )}

        {step === 'share' && (
          <View style={styles.card}> 
            <Text style={styles.bot}>We’ll now share your catalogue with pricing.</Text>
            <View style={styles.row}>
              <Pressable style={styles.ghost} onPress={openEmail}><Text style={styles.ghostText}>✉️ Email</Text></Pressable>
              <Pressable style={styles.ghost} onPress={openWhatsApp}><Text style={styles.ghostText}>📲 WhatsApp</Text></Pressable>
            </View>
            <Pressable style={styles.ghost} onPress={openCall}><Text style={styles.ghostText}>📞 Direct Call</Text></Pressable>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'fixed' as any,
    right: 20,
    bottom: 24,
    zIndex: 9999,
    backgroundColor: colors.brandNavyHeader,
    borderRadius: 28,
    paddingHorizontal: 16,
    paddingVertical: 10,
    shadowColor: '#000', shadowOpacity: 0.2, shadowOffset: { width: 0, height: 2 }, shadowRadius: 6,
  },
  fabText: { color: colors.brandGold, fontWeight: '800' },
  wrap: { position: 'fixed' as any, right: 20, bottom: 24, width: 420, maxWidth: '95%', zIndex: 9999 },
  sheet: { backgroundColor: colors.surface, borderRadius: 16, overflow: 'hidden', borderWidth: 1, borderColor: colors.border },
  header: { backgroundColor: colors.brandNavyHeader, paddingHorizontal: 16, paddingVertical: 12 },
  title: { color: colors.brandGold, fontSize: 16, fontWeight: '900' },
  subtitle: { color: colors.textOnDark, marginTop: 4 },
  close: { position: 'absolute', right: 10, top: 8 },
  closeText: { color: colors.brandGold, fontSize: 22 },
  transcript: { maxHeight: 260, borderBottomWidth: 1, borderBottomColor: colors.border },
  msg: { maxWidth: '85%', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 12 },
  msgBot: { backgroundColor: '#EEF2F6', alignSelf: 'flex-start' },
  msgBotText: { color: colors.textPrimary },
  msgUser: { backgroundColor: '#E9EEF3', alignSelf: 'flex-end', borderWidth: 1, borderColor: colors.brandNavyHeader },
  msgUserText: { color: colors.brandNavyHeader, fontWeight: '700' },
  card: { padding: 16, gap: 10 },
  bot: { color: colors.textPrimary },
  question: { fontWeight: '800', color: colors.textPrimary },
  input: { borderWidth: 1, borderColor: colors.border, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, color: colors.textPrimary },
  multiline: { minHeight: 80, textAlignVertical: 'top' },
  nextBtn: { alignSelf: 'flex-end', backgroundColor: colors.brandNavyHeader, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10 },
  nextText: { color: colors.brandGold, fontWeight: '800' },
  option: { paddingVertical: 10, paddingHorizontal: 12, borderRadius: 10, borderWidth: 1, borderColor: colors.border },
  optionText: { color: colors.textPrimary },
  chip: { paddingVertical: 10, paddingHorizontal: 12, borderRadius: 999, borderWidth: 1, borderColor: colors.brandNavyHeader, alignSelf: 'flex-start', marginRight: 10, marginTop: 8 },
  chipText: { color: colors.brandNavyHeader, fontWeight: '700' },
  multiChip: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 999, borderWidth: 1, borderColor: colors.border, alignSelf: 'flex-start', marginRight: 10, marginTop: 8 },
  multiChipActive: { borderColor: colors.brandNavyHeader, backgroundColor: '#E9EEF3' },
  multiChipText: { color: colors.textPrimary },
  multiChipTextActive: { color: colors.brandNavyHeader, fontWeight: '800' },
  primary: { backgroundColor: colors.brandNavyHeader, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10, alignSelf: 'flex-start' },
  primaryText: { color: colors.brandGold, fontWeight: '800' },
  row: { flexDirection: 'row', gap: 10 },
  ghost: { paddingVertical: 10, paddingHorizontal: 12, borderRadius: 999, borderWidth: 1, borderColor: colors.border, alignSelf: 'flex-start' },
  ghostText: { color: colors.textPrimary, fontWeight: '700' },
}); 