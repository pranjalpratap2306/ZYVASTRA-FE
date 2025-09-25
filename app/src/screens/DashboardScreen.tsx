import React from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet, useWindowDimensions, Alert, Image, Pressable, Text, Platform, Animated } from 'react-native';
import { HeaderBar } from '../components/HeaderBar';
import { HeroBanner } from '../components/HeroBanner';
import { PostRequirementModal, PostRequirementFormData } from '../components/PostRequirementModal';
import { colors } from '../theme/colors';
import { ContactEnquiryModal } from '../components/ContactEnquiryModal';
import { ChatbotWidget } from '../components/ChatbotWidget';
import { SiteFooter } from '../components/SiteFooter';
// import { WelcomeSection } from '../components/WelcomeSection';
import { CompanyHighlights } from '../components/CompanyHighlights';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { QuickQuoteModal } from '../components/QuickQuoteModal';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { Video } from 'expo-av';
import { PremiumSection } from '../components/PremiumSection';
import { AboutSpizzestSection } from '../components/AboutSpizzestSection';
import { ExportProcessSection } from '../components/ExportProcessSection';
import { EcoFriendlySection } from '../components/EcoFriendlySection';
import { Section } from '../components/Section';
import { ScrollTopFab } from '../components/ScrollTopFab';
import { VideoHero } from '../components/VideoHero';
import { AboutWideSection } from '../components/AboutWideSection';
import { CategorySection } from '../components/CategorySection';
import { LetsTalkBusinessSection } from '../components/LetsTalkBusinessSection';

// Mobile banners
const mobileBanners = [
  require('../../assets/dashboard_1_new_final.jpeg'),
  require('../../assets/dashboard_6.png'),
];

// Web banners
const webBanners = [
  require('../../assets/dashboard_2_new_final.jpeg'),
  require('../../assets/dashboard_1_new_final.jpeg'),
];

// Web split images: full visibility requested
const webLeftImage = require('../../assets/dashboard_1_new.jpeg');
const webRightImage = require('../../assets/dashboard_2_new_final.jpeg');

const contactPhone = '+91 9993305646';
const contactEmail = 'zyvastra-support@gmail.com';

export const DashboardScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { width, height } = useWindowDimensions();
  const isNarrow = width < 768;
  const isWeb = Platform.OS === 'web';
  const [bannerWidth, setBannerWidth] = React.useState(0);
  const [slideIndex, setSlideIndex] = React.useState(0);
  const sliderRef = React.useRef<ScrollView>(null as any);
  const scrollRef = React.useRef<ScrollView>(null as any);
  const categoriesAnchorY = React.useRef<number>(0);
  const floatAnim = React.useRef(new Animated.Value(0)).current;
  
  // Responsive layout calculations
  const isLargeScreen = width >= 1024;
  const isMediumScreen = width >= 768 && width < 1024;
  const isSmallScreen = width < 768;
  
  // Responsive spacing
  const horizontalPadding = isSmallScreen ? 12 : 24;
  const sectionGap = isSmallScreen ? 16 : 24;

  const [isPostRequirementOpen, setIsPostRequirementOpen] = React.useState(false);
  const [isSmsOpen, setIsSmsOpen] = React.useState(false);
  const [isEmailOpen, setIsEmailOpen] = React.useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<{ title: string; imageUrl: string } | null>(null);

  const banners = isNarrow ? mobileBanners : webBanners;
  
  // Responsive aspect ratio for hero; avoids awkward cropping across devices
  const bannerAspect = width >= 1200 ? 16/6 : width >= 768 ? 16/9 : 4/5;

  const handleSubmitRequirement = async (data: PostRequirementFormData) => {
    try {
      const resp = await fetch('http://localhost:8081/api/v1/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await resp.json().catch(() => ({}));
      if (!resp.ok) {
        const message = (json && (json.error || json.message)) || 'Failed to submit enquiry';
        throw new Error(message);
      }
      setIsPostRequirementOpen(false);
      Alert.alert('Submitted', 'Your requirement has been submitted. We will contact you soon.');
    } catch (e: any) {
      Alert.alert('Submission failed', e?.message || 'Something went wrong. Please try again.');
    }
  };

  const handleEnquirySubmit = (payload: Record<string, string>) => {
    setIsSmsOpen(false);
    setIsEmailOpen(false);
    Alert.alert('Thank you', `${payload.mode === 'sms' ? 'SMS' : 'Email'} enquiry ready. Please finish sending in your app.`);
  };

  const openCategory = (title: string, imageUrl: any) => {
    navigation.navigate('ProductDetail', { title, imageUrl });
  };

  // floating animation for content area
  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, { toValue: -4, duration: 1500, useNativeDriver: true }),
        Animated.timing(floatAnim, { toValue: 0, duration: 1500, useNativeDriver: true }),
      ])
    ).start();
  }, [floatAnim]);

  // Autoplay for carousel every 6s
  React.useEffect(() => {
    if (!bannerWidth) return;
    const id = setInterval(() => {
      setSlideIndex((i) => {
        const next = (i + 1) % banners.length;
        try {
          sliderRef.current?.scrollTo?.({ x: bannerWidth * next, animated: true });
        } catch {}
        return next;
      });
    }, 6000);
    return () => clearInterval(id);
  }, [bannerWidth, banners.length]);

  const scrollToCategories = () => {
    try {
      scrollRef.current?.scrollTo?.({ y: categoriesAnchorY.current - 20, animated: true });
    } catch {}
  };

  const getStyles = (width: number, height: number) => {
    const isSmallScreen = width < 768;
    const isLargeScreen = width >= 1024;
    const isMediumScreen = width >= 768 && width < 1024;
    const splitImageHeight = Math.max(380, Math.min(Math.round(height * 0.58), 720));

    return StyleSheet.create({
      safe: {
        flex: 1,
        backgroundColor: colors.surface,
      },
      content: {
        flexGrow: 1,
      },
      heroSection: {
        width: '100%',
      },
      bannerWrap: {
        width: '100%',
        position: 'relative',
      },
      splitRow: {
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 0,
      },
      splitCol: {
        flex: 1,
        overflow: 'hidden',
        paddingHorizontal: 0,
      },
      splitImage: {
        width: '100%',
        height: '100%',
        minHeight: 400, // Adjust as needed
      },
      splitImageWeb: {
        width: '100%',
        height: splitImageHeight,
      },
      dotsWrap: {
        position: 'absolute',
        bottom: 16,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
      },
      dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(255,255,255,0.5)',
      },
      dotActive: {
        backgroundColor: 'white',
      },
      bannerAspect: { aspectRatio: 3/4, backgroundColor: colors.surface },
      singleBannerCell: { width: '100%' },
      singleBannerAspect: { width: '100%', backgroundColor: colors.surface },
      heroCol: {
        flex: 1,
        overflow: 'hidden',
        backgroundColor: colors.surface,
        alignItems: 'center',
        justifyContent: 'center',
      },
      heroImg: {
        width: '100%',
        height: '100%',
      },
      heroTextCard: { backgroundColor: 'rgba(10,35,55,0.55)', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: colors.brandGold },
      heroTitleText: { color: colors.surface, fontWeight: '900', fontSize: 30, marginBottom: 8, fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial' },
      heroSubText: { color: colors.textOnDark, lineHeight: 20, fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial' },
      heroListRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
      heroBullet: { color: colors.brandGold, fontWeight: '900' },
      heroListText: { color: colors.textOnDark, fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial' },
      heroCTArow: { flexDirection: 'row', gap: 10 },
      heroBtn: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 12, borderWidth: 1 },
      heroBtnPrimary: { backgroundColor: colors.brandGold, borderColor: colors.brandNavyHeader },
      heroBtnGhost: { backgroundColor: 'transparent', borderColor: colors.brandGold },
      heroBtnTextPrimary: { color: colors.brandNavy, fontWeight: '800', fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial' },
      heroBtnTextGhost: { color: colors.surface, fontWeight: '800', fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial' },
      heroLeftCol: { padding: 22, alignItems: 'flex-start', justifyContent: 'center', height: '100%', backgroundColor: colors.brandNavyHeader },
      bannerDividerWrap: { paddingHorizontal: 0, marginTop: 12, marginBottom: 16 },
      bannerDivider: { height: 2, backgroundColor: colors.brandNavyHeader },
      bannerDividerShadow: { height: 2, backgroundColor: colors.surface, opacity: 0.2 },
      section: {
        paddingVertical: isSmallScreen ? 16 : 24,
        paddingHorizontal: isSmallScreen ? 12 : 24,
      },
      sectionHeader: {
        marginBottom: isSmallScreen ? 12 : 16,
      },
      sectionEyebrow: {
        fontSize: 12,
        textTransform: 'uppercase',
        color: colors.textSecondary,
        marginBottom: 4,
      },
      titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      sectionTitle: {
        fontSize: isSmallScreen ? 20 : 24,
        fontWeight: '900',
        color: colors.textPrimary,
      },
      titleAccent: {
        width: 40,
        height: 2,
        backgroundColor: colors.brandGold,
        borderRadius: 2,
      },
      sectionSub: {
        fontSize: 14,
        color: colors.textSecondary,
        marginBottom: isSmallScreen ? 12 : 16,
      },
    });
  };

  const styles = getStyles(width, height);

  return (
    <SafeAreaView style={styles.safe}>
      <HeaderBar
        onPostRequirement={() => setIsPostRequirementOpen(true)}
        contactPhone={contactPhone}
        contactEmail={contactEmail}
        onSendSms={() => setIsSmsOpen(true)}
        onSendEmail={() => setIsEmailOpen(true)}
      />
      <ScrollView ref={scrollRef} contentContainerStyle={styles.content}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          {isNarrow ? (
            // Mobile: Image Slideshow
            <View style={styles.bannerWrap} onLayout={(e) => setBannerWidth(e.nativeEvent.layout.width)}>
              <ScrollView
                ref={sliderRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={200}
                onScroll={(e) => {
                  const nextSlide = Math.round(e.nativeEvent.contentOffset.x / bannerWidth);
                  if (nextSlide !== slideIndex) setSlideIndex(nextSlide);
                }}
              >
                {banners.map((source, i) => (
                  <Image 
                    key={i} 
                    source={source} 
                    style={{ width: bannerWidth, height: bannerWidth / bannerAspect }} 
                    resizeMode="cover"
                  />
                ))}
              </ScrollView>
              <View style={styles.dotsWrap}>
                {banners.map((_, i) => (
                  <View key={i} style={[styles.dot, i === slideIndex && styles.dotActive]} />
                ))}
              </View>
            </View>
          ) : (
            // Web/Desktop: split left/right with full image visibility
            <View style={styles.splitRow}>
              <View style={styles.splitCol}>
                <Image 
                  source={webLeftImage} 
                  style={styles.splitImageWeb}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.splitCol}>
                <Image 
                  source={webRightImage} 
                  style={styles.splitImageWeb}
                  resizeMode="cover"
                />
              </View>
            </View>
          )}
        </View>

        {/* Decorative divider below banner */}
        <Section paddingTop={0} paddingBottom={0}>
          <View style={[styles.bannerDividerWrap, { marginTop: 12, marginBottom: 14 }]}> 
            <View style={styles.bannerDivider} />
            <View style={styles.bannerDividerShadow} />
          </View>
        </Section>

        {/* Premium hero-like text block */}
        <Section paddingTop={0} paddingBottom={0}>
          <PremiumSection
            onExplore={scrollToCategories}
            onContact={() => navigation.navigate('Contact')}
          />
        </Section>

        {/* Decorative divider below premium section */}
        <Section paddingTop={0} paddingBottom={0}>
          <View style={[styles.bannerDividerWrap, { marginTop: 12, marginBottom: 14 }]}> 
            <View style={styles.bannerDivider} />
            <View style={styles.bannerDividerShadow} />
          </View>
        </Section>

        {/* About Spizzest Section */}
        <Section paddingTop={0} paddingBottom={0}>
          <AboutSpizzestSection onKnowUsBetter={() => navigation.navigate('About')} />
        </Section>

        {/* EcoFriendly Section */}
        <Section paddingTop={0} paddingBottom={0}>
          <EcoFriendlySection onExplore={() => openCategory('Eco-Friendly T-Shirts', require('../../assets/eco-friendly_section_3.png'))} />
        </Section>

        {/* Process Section - Temporarily commented out
        <Section paddingTop={40} paddingBottom={40}>
          <ProcessSection />
        */}

        {/* Export process with background image and spacing */}
        <Section paddingTop={24} paddingBottom={isNarrow ? 60 : 100}>
          <ExportProcessSection />
        </Section>

        {/* Welcome image section removed per request */}

        <View onLayout={(e) => { categoriesAnchorY.current = e.nativeEvent.layout.y; }}>
          <CategorySection onCategoryPress={(title, _, imageUrl) => openCategory(title, imageUrl)} />
        </View>
        
        <Section background={'#F7FAFC'}>
          <CompanyHighlights showFeatures={true} showFacts={false} />
        </Section>

        <Section background={'#F7FAFC'}>
          <TestimonialsSection />
        </Section>

        <Section paddingTop={0} paddingBottom={0}>
          <LetsTalkBusinessSection />
        </Section>

        <Section paddingTop={20} paddingBottom={28}>
          <SiteFooter />
        </Section>
      </ScrollView>

      <ScrollTopFab scrollRef={scrollRef} />

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