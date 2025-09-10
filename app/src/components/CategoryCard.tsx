import React from 'react';
import { View, Text, ImageBackground, StyleSheet, Pressable } from 'react-native';
import { colors } from '../theme/colors';

interface CategoryCardProps {
  title: string;
  imageUrl: string;
  onPress?: () => void; // kept for compatibility, but not used
  onEnquiry?: () => void;
  onViewMore?: () => void;
  details?: {
    material?: string;
    color?: string;
    sleeve?: string;
    sizes?: string;
    pattern?: string;
  };
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ title, imageUrl, onEnquiry, onViewMore }) => {
  const [hover, setHover] = React.useState(false);

  const handleEnquiryPress = (e: any) => {
    e?.stopPropagation?.();
    e?.preventDefault?.();
    onEnquiry?.();
  };
  const handleViewMorePress = (e: any) => {
    e?.stopPropagation?.();
    e?.preventDefault?.();
    onViewMore?.();
  };

  return (
    <View
      style={styles.container}
      {...({ onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false) } as any)}
    >
      <ImageBackground source={{ uri: imageUrl }} style={styles.image} imageStyle={styles.imageRadius}>
        <View style={[styles.overlay, hover ? styles.visible : styles.hidden]} />
        <Text style={styles.title}>{title}</Text>

        <View style={[styles.actionsWrap, hover ? styles.visible : styles.hidden]} pointerEvents={hover ? 'auto' : 'none'}>
          <View style={styles.actions}>
            <Pressable style={[styles.btn, styles.primary]} onPress={handleEnquiryPress}>
              <Text style={styles.btnTextPrimary}>Enquiry Now</Text>
            </Pressable>
            <Pressable style={[styles.btn, styles.ghost]} onPress={handleViewMorePress}>
              <Text style={styles.btnTextGhost}>View More</Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 120,
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  imageRadius: {
    borderRadius: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.55)',
    borderRadius: 10,
    pointerEvents: 'none',
    transitionProperty: 'opacity',
    transitionDuration: '120ms',
  } as any,
  title: {
    color: colors.brandGold,
    fontWeight: '800',
    fontSize: 16,
    padding: 12,
    textShadowColor: 'rgba(0,0,0,0.35)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  actionsWrap: {
    ...StyleSheet.absoluteFillObject,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    transitionProperty: 'opacity',
    transitionDuration: '120ms',
  } as any,
  actions: { flexDirection: 'row', gap: 12 },
  btn: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10, borderWidth: 1, cursor: 'pointer' } as any,
  primary: { backgroundColor: colors.brandNavyHeader, borderColor: colors.brandNavyHeader },
  ghost: { backgroundColor: 'rgba(0,0,0,0.45)', borderColor: colors.borderOnDark },
  btnTextPrimary: { color: colors.brandGold, fontWeight: '800' },
  btnTextGhost: { color: colors.textOnDark, fontWeight: '800' },

  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}); 