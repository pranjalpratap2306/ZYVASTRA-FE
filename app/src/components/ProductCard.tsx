import React from 'react';
import { Platform, View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { colors } from '../theme/colors';

export interface ProductCardProps {
  title: string;
  imageUrl: string;
  material?: string;
  color?: string;
  sleeve?: string;
  sizes?: string;
  pattern?: string;
  eco?: boolean;
  onViewMore?: () => void;
  onEnquiry?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ title, imageUrl, material = 'Cotton', color = 'Red', sleeve = 'Half Sleeves', sizes = 'S, M, L, XL, XXL', pattern = 'Printed', eco = true, onViewMore, onEnquiry }) => {
  const [show, setShow] = React.useState(false);

  const Overlay = (
    <View style={[styles.overlay, { opacity: show ? 1 : 0 }]} pointerEvents="none">
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.line}>Material: <Text style={styles.bold}>{material}</Text></Text>
      <Text style={styles.line}>Color: <Text style={styles.bold}>{color}</Text></Text>
      <Text style={styles.line}>Sleeve Type: <Text style={styles.bold}>{sleeve}</Text></Text>
      <Text style={styles.line}>Size: <Text style={styles.bold}>{sizes}</Text></Text>
      <Text style={styles.line}>Pattern: <Text style={styles.bold}>{pattern}</Text></Text>
      <View style={styles.actions} pointerEvents="auto">
        <Pressable style={styles.primary} onPress={onEnquiry}><Text style={styles.primaryText}>Enquiry Now</Text></Pressable>
        <Pressable style={styles.secondary} onPress={onViewMore}><Text style={styles.secondaryText}>View More</Text></Pressable>
      </View>
    </View>
  );

  return (
    <Pressable
      style={styles.wrap}
      onHoverIn={() => setShow(true)}
      onHoverOut={() => setShow(false)}
      onPress={onViewMore}
    >
      <View>
        <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
        {eco && (
          <View style={styles.badge}><Text style={styles.badgeText}>ECO</Text></View>
        )}
      </View>
      {Overlay}
      <Text style={styles.caption}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrap: { 
    backgroundColor: colors.surface, 
    borderWidth: 1, 
    borderColor: colors.border, 
    borderRadius: 10, 
    overflow: 'hidden',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  image: { 
    width: '100%',
    aspectRatio: 3/4, // Standard aspect ratio for product images
    resizeMode: 'contain',
    backgroundColor: '#f8fafc',
  },
  caption: { 
    padding: 12, 
    textAlign: 'center', 
    color: colors.textPrimary, 
    fontWeight: '800',
    flexShrink: 0,
    backgroundColor: colors.surface,
    fontSize: 14,
    lineHeight: 20,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 12,
    gap: 4,
    transitionProperty: 'opacity',
    transitionDuration: '200ms',
    justifyContent: 'flex-end',
    paddingBottom: 60,
    opacity: 0, // Start hidden, will be shown on hover/tap
  } as any,
  title: { color: '#fff', fontWeight: '800', marginBottom: 6 },
  line: { color: '#e5e7eb' },
  bold: { fontWeight: '800', color: '#fff' },
  actions: { 
    flexDirection: 'row', 
    gap: 8, 
    marginTop: 8,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  primary: { backgroundColor: colors.brandGold, paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 },
  primaryText: { color: colors.brandNavy, fontWeight: '800' },
  secondary: { borderWidth: 1, borderColor: '#e5e7eb', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 },
  secondaryText: { color: '#e5e7eb', fontWeight: '700' },
  badge: { position: 'absolute', top: 8, left: 8, backgroundColor: '#14532d', borderRadius: 6, paddingHorizontal: 6, paddingVertical: 3 },
  badgeText: { color: '#bbf7d0', fontWeight: '800', fontSize: 10 },
}); 