import React from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet, useWindowDimensions, Alert, Image, Pressable, Text } from 'react-native';
import { HeaderBar } from '../components/HeaderBar';
// import { HeroBanner } from '../components/HeroBanner';
import { CategoryCard } from '../components/CategoryCard';
import { PostRequirementModal, PostRequirementFormData } from '../components/PostRequirementModal';
import { colors } from '../theme/colors';
import { ContactEnquiryModal } from '../components/ContactEnquiryModal';
import { ChatbotWidget } from '../components/ChatbotWidget';
import { SiteFooter } from '../components/SiteFooter';
import { WelcomeSection } from '../components/WelcomeSection';
import { CompanyHighlights } from '../components/CompanyHighlights';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { QuickQuoteModal } from '../components/QuickQuoteModal';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { Video } from 'expo-av';

// Split banner images: left and right
const leftBannerImg = require('../../assets/dashboard_2.png');
const rightBannerImg = require('../../assets/dashboard_4.png');
const leftBannerImgAlt = require('../../assets/dashboard_5.png');
const rightBannerImgAlt = require('../../assets/dashboard_6.png');

const CATEGORIES = [
  { key: 'ROUND_NECK_TSHIRTS', title: 'Round Neck T‑Shirts', imageUrl: require('../../assets/round-neck-tshirt.png') },
  { key: 'POLO_TSHIRTS', title: 'Polo T‑Shirts', imageUrl: require('../../assets/Polo-Tshirt.jpg') },
  { key: 'FULL_SLEEVES_SHIRTS', title: 'Full Sleeves Shirt', imageUrl: require('../../assets/Full-sleeve-shirt.png') },
  { key: 'PRINTED_TSHIRTS', title: 'Printed T‑Shirts', imageUrl: require('../../assets/Printed-Tshirt.png') },
  { key: 'OVER_SIZED_TSHIRTS', title: 'Over Sized T‑Shirts', imageUrl: require('../../assets/over-sized-tshirt.png') },
  { key: 'ECO_FRIENDLY_TSHIRTS', title: 'Eco‑friendly T‑Shirt', imageUrl: require('../../assets/eco-friendly-card-category.png') },
];

export const DashboardScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { width } = useWindowDimensions();
  const numColumns = width >= 900 ? 3 : width >= 640 ? 2 : 1;
  const cardAspectRatio = width >= 900 ? 2.6 : width >= 640 ? 2.2 : 1.2;

  const [isPostRequirementOpen, setIsPostRequirementOpen] = React.useState(false);
  const [isSmsOpen, setIsSmsOpen] = React.useState(false);
  const [isEmailOpen, setIsEmailOpen] = React.useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<{ title: string; imageUrl: string } | null>(null);

  // banner rotation state
  const [bannerIndex, setBannerIndex] = React.useState(0); // 0 => first set, 1 => second set
  React.useEffect(() => {
    const id = setInterval(() => setBannerIndex((i) => (i === 0 ? 1 : 0)), 6000);
    return () => clearInterval(id);
  }, []);

  const contactPhone = '+91 7428073088';
  const contactEmail = 'support@zyvastra.com';

  const handleSubmitRequirement = (data: PostRequirementFormData) => {
    setIsPostRequirementOpen(false);
    Alert.alert('Submitted', 'Your requirement has been submitted. We will contact you soon.');
  };

  const handleEnquirySubmit = (payload: Record<string, string>) => {
    setIsSmsOpen(false);
    setIsEmailOpen(false);
    Alert.alert('Thank you', `${payload.mode === 'sms' ? 'SMS' : 'Email'} enquiry ready. Please finish sending in your app.`);
  };

  const openCategory = (title: string, key: string) => {
    const found = CATEGORIES.find((c) => c.key === key);
    navigation.navigate('ProductDetail', { title, imageUrl: found?.imageUrl || 'https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1400&auto=format&fit=crop' });
  };

  const leftSrc = bannerIndex === 0 ? leftBannerImg : leftBannerImgAlt;
  const rightSrc = bannerIndex === 0 ? rightBannerImg : rightBannerImgAlt;

  return (
    <SafeAreaView style={styles.safe}>
      <HeaderBar
        onPostRequirement={() => setIsPostRequirementOpen(true)}
        contactPhone={contactPhone}
        contactEmail={contactEmail}
        onSendSms={() => setIsSmsOpen(true)}
        onSendEmail={() => setIsEmailOpen(true)}
      />
      <ScrollView contentContainerStyle={styles.content}>
        {/* Split banner: rotates every 7 seconds; aspect-ratio wrappers keep consistent look */}
        <View style={styles.bannerWrap}>
          <View style={[styles.heroRow, width < 900 && { flexDirection: 'column' }]}> 
            <View style={styles.bannerCell}> 
              <View style={styles.bannerAspect}> 
                <Image source={leftSrc} style={styles.heroImg} resizeMode="cover" />
              </View>
            </View>
            <View style={styles.bannerCell}> 
              <View style={styles.bannerAspect}> 
                <Image source={rightSrc as any} style={styles.heroImg} resizeMode="cover" />
              </View>
            </View>
          </View>
          <Pressable
            style={styles.viewMore}
            onPress={() => openCategory('Round Neck T‑Shirts', 'ROUND_NECK_TSHIRTS')}
          >
            <Text style={styles.viewMoreText}>View more</Text>
          </Pressable>
        </View>

        <View style={styles.section}>
          {/* Categories grid directly below banner */}
          <View style={styles.gridWrap}>
            {CATEGORIES.map((item) => (
              <View key={item.key} style={[styles.cardWrap, { width: `${100 / numColumns}%`, flexBasis: `${100 / numColumns}%` }]}> 
                <View style={[styles.cardAspect, { aspectRatio: cardAspectRatio }]}> 
                  <CategoryCard
                    title={item.title}
                    imageUrl={item.imageUrl}
                    onPress={() => openCategory(item.title, item.key)}
                    onViewMore={() => openCategory(item.title, item.key)}
                    onEnquiry={() => { setSelectedProduct({ title: item.title, imageUrl: item.imageUrl }); setIsQuoteOpen(true); }}
                  />
                </View>
              </View>
            ))}
          </View>
        </View>

        <WelcomeSection />
        <CompanyHighlights showFeatures={true} showFacts={false} />

        <TestimonialsSection />

        <View style={{ marginTop: 28 }}>
          <SiteFooter />
        </View>
      </ScrollView>

      <PostRequirementModal
        visible={isPostRequirementOpen}
        onClose={() => setIsPostRequirementOpen(false)}
        onSubmit={handleSubmitRequirement}
      />

      <QuickQuoteModal
        visible={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        onSubmit={() => { setIsQuoteOpen(false); Alert.alert('Thank you', 'Enquiry submitted.'); }}
        productTitle={selectedProduct?.title}
        productImageUrl={selectedProduct?.imageUrl}
      />

      <ContactEnquiryModal
        visible={isSmsOpen}
        mode={'sms'}
        onClose={() => setIsSmsOpen(false)}
        onSubmit={handleEnquirySubmit}
        smsRecipientPhone={contactPhone}
      />
      <ContactEnquiryModal
        visible={isEmailOpen}
        mode={'email'}
        onClose={() => setIsEmailOpen(false)}
        onSubmit={handleEnquirySubmit}
        emailRecipient={contactEmail}
      />

      <ChatbotWidget businessName={'ZYVASTRA'} whatsappPhone={contactPhone} contactEmail={contactEmail} contactPhone={contactPhone} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.surfaceAlt,
  },
  content: {
    paddingBottom: 24,
    backgroundColor: colors.surfaceAlt,
  },
  bannerWrap: {
    marginTop: 0,
    marginBottom: 0,
    position: 'relative',
  },
  heroRow: {
    flexDirection: 'row',
    width: '100%',
  },
  bannerCell: { flex: 1, paddingHorizontal: 2 },
  bannerAspect: { aspectRatio: 3/4, backgroundColor: colors.surfaceAlt },
  heroCol: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroImg: {
    width: '100%',
    height: '100%',
  },
  viewMore: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: colors.brandNavyHeader,
    borderWidth: 1,
    borderColor: colors.brandGold,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  viewMoreText: { color: colors.brandGold, fontWeight: '800' },
  section: {
    paddingHorizontal: 2,
    paddingTop: 0,
    marginTop: 0,
    gap: 4,
  },
  gridWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -2,
  },
  cardWrap: {
    padding: 2,
  },
  cardAspect: {
    aspectRatio: 2.6,
  },
}); 