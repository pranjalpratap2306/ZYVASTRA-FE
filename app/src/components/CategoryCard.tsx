import React from 'react';
import { View, Text, ImageBackground, StyleSheet, Pressable } from 'react-native';
import { colors } from '../theme/colors';

interface CategoryCardProps {
  title: string;
  imageUrl: any;
  onPress?: () => void; // kept for compatibility, but not used
  onEnquiry?: () => void;
  onViewMore?: () => void;
  imageResizeMode?: 'cover' | 'contain' | 'stretch' | 'center' | 'repeat';
  details?: {
    material?: string;
    color?: string;
    sleeve?: string;
    sizes?: string;
    pattern?: string;
  };
  hideTitle?: boolean;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ title, imageUrl, onEnquiry, onViewMore, hideTitle, imageResizeMode }) => {
  const [hover, setHover] = React.useState(false);

  const handleViewMorePress = (e: any) => {
    e?.stopPropagation?.();
    e?.preventDefault?.();
    onViewMore?.();
  };

  const src = typeof imageUrl === 'string' ? ({ uri: imageUrl } as any) : imageUrl;

  return (
    <View
      style={[styles.container, hover && styles.containerHover]}
      {...({ onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false) } as any)}
    >
      <ImageBackground
        source={src}
        style={[styles.image, { backgroundColor: colors.surface }]}
        imageStyle={styles.imageRadius}
        resizeMode={imageResizeMode || 'cover'}
      >
        <View style={[styles.overlay, hover ? styles.visible : styles.hidden]} />
        {!hideTitle && (
          <View style={styles.titleBadgeWrap}>
            <Pressable onPress={handleViewMorePress}>
              <Text style={styles.title}>{title}</Text>
            </Pressable>
          </View>
        )}

        <View style={[styles.actionsWrap, hover ? styles.visible : styles.hidden]} pointerEvents={hover ? 'auto' : 'none'}>
          <View style={styles.actions}>
            <Pressable style={[styles.btn, styles.primary]} onPress={handleViewMorePress}>
              <Text style={styles.btnTextPrimary}>View</Text>
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
    minHeight: 140,
    overflow: 'hidden',
    borderRadius: 10,
    transitionProperty: 'transform, box-shadow',
    transitionDuration: '160ms',
  } as any,
  containerHover: {
    transform: [{ scale: 1.01 }],
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  imageRadius: {
    borderRadius: 10,
  },
  imageZoom: {
    transform: [{ scale: 1.06 }],
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderRadius: 10,
    pointerEvents: 'none',
    transitionProperty: 'opacity',
    transitionDuration: '120ms',
  } as any,
  titleBadgeWrap: {
    padding: 12,
  },
  title: {
    color: colors.brandGold,
    fontWeight: '800',
    fontSize: 16,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: colors.brandNavyHeader,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.brandGold,
    alignSelf: 'flex-start',
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
  btn: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 12, borderWidth: 1, cursor: 'pointer' } as any,
  primary: { backgroundColor: colors.brandNavyHeader, borderColor: colors.brandGold },
  ghost: { backgroundColor: 'rgba(0,0,0,0.45)', borderColor: colors.borderOnDark },
  btnTextPrimary: { color: colors.brandGold, fontWeight: '800' },
  btnTextGhost: { color: colors.textOnDark, fontWeight: '800' },

  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}); 