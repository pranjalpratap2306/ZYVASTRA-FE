import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, useWindowDimensions } from 'react-native';
import { colors } from '../theme/colors';

interface AboutSpizzestSectionProps {
  onKnowUsBetter?: () => void;
}

const Badge: React.FC<{ text: string }> = ({ text }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Pressable 
      onHoverIn={() => setIsHovered(true)} 
      onHoverOut={() => setIsHovered(false)} 
      style={[getStyles(false).badge, isHovered && getStyles(false).badgeHover]}
    >
      <Text style={[getStyles(false).badgeText, isHovered && getStyles(false).badgeTextHover]}>{text}</Text>
    </Pressable>
  );
};

export const AboutSpizzestSection: React.FC<AboutSpizzestSectionProps> = ({ onKnowUsBetter }) => {
  const { width } = useWindowDimensions();
  const isNarrow = width < 768;
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const styles = getStyles(isNarrow);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('../../assets/dashboard_4.png')}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>About Zyvastra</Text>
          <Text style={styles.body}>
            Zyvastra is a flagship of <Text style={{fontWeight: 'bold'}}>Shrianikrat export ventures llp</Text>. We believe that style is a personal statement. Rooted in India’s rich textile heritage, we bring you premium, custom-designed apparel that transforms your wardrobe. Our mission is simple – to deliver quality, comfort, and style, one garment at a time.
          </Text>
          <View style={styles.badgeContainer}>
            {['Premium Fabrics', 'Ethical Sourcing', 'Quality Stitching', 'Custom Designs', 'Eco-Friendly Options', 'On-Time Delivery'].map((text, index) => (
              <Badge key={index} text={text} />
            ))}
          </View>
          <Pressable 
            style={[styles.button, isButtonHovered && styles.buttonHover]} 
            onPress={onKnowUsBetter}
            onHoverIn={() => setIsButtonHovered(true)}
            onHoverOut={() => setIsButtonHovered(false)}
          >
            <Text style={styles.buttonText}>KNOW US BETTER</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const getStyles = (isNarrow: boolean) => StyleSheet.create({
  container: {
    backgroundColor: '#F5F0E5',
    paddingVertical: isNarrow ? 32 : 64,
    paddingHorizontal: 24,
    marginVertical: 24, 
  },
  content: {
    flexDirection: isNarrow ? 'column' : 'row',
    alignItems: 'center',
    maxWidth: 1200,
    alignSelf: 'center',
    gap: isNarrow ? 32 : 48,
  },
  image: {
    width: isNarrow ? '100%' : 400,
    height: isNarrow ? 300 : 400,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    alignItems: isNarrow ? 'center' : 'flex-start',
  },
  title: {
    fontSize: isNarrow ? 32 : 40,
    fontWeight: '600',
    color: colors.textPrimary,
    fontFamily: 'serif',
    marginBottom: 16,
    textAlign: isNarrow ? 'center' : 'left',
  },
  body: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
    marginBottom: 24,
    textAlign: isNarrow ? 'center' : 'left',
  },
  badgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 32,
    justifyContent: isNarrow ? 'center' : 'flex-start',
  },
  badge: {
    borderWidth: 1,
    borderColor: '#B0B0B0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    transitionDuration: '300ms',
  },
  badgeHover: {
    backgroundColor: colors.brandNavyHeader,
    borderColor: colors.brandNavyHeader,
  },
  badgeText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  badgeTextHover: {
    color: 'white',
  },
  button: {
    backgroundColor: colors.brandNavy,
    paddingHorizontal: 24,
    paddingVertical: 12,
    transitionDuration: '300ms', 
  },
  buttonHover: {
    backgroundColor: colors.brandNavyHeader,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
});
