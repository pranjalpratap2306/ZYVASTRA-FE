import React from 'react';
import { Platform, View, Text, StyleSheet, Pressable, Linking, ImageBackground } from 'react-native';
import { colors } from '../theme/colors';

interface BrandVideoProps {
  youtubeId?: string;
}

export const BrandVideo: React.FC<BrandVideoProps> = ({ youtubeId = 'aqz-KE-bpKQ' }) => {
  const url = `https://www.youtube.com/watch?v=${youtubeId}`;

  if (Platform.OS === 'web') {
    return (
      <View>
        <View style={styles.webWrap}>
          <iframe
            title="ZYVASTRA Brand Video"
            src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={styles.iframe as any}
          />
        </View>
        <Pressable onPress={() => window.open(url, '_blank')} style={styles.webHelp}>
          <Text style={styles.webHelpText}>Trouble playing? Watch on YouTube ↗</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1514996937319-344454492b37?q=80&w=1600&auto=format&fit=crop' }}
      style={styles.nativePoster}
      imageStyle={{ borderRadius: 12 }}
      resizeMode="cover"
    >
      <Pressable style={styles.playBtn} onPress={() => Linking.openURL(url)}>
        <Text style={styles.playText}>▶ Watch our brand story</Text>
      </Pressable>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  webWrap: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  iframe: {
    width: '100%',
    height: '100%',
    borderWidth: 0,
  },
  webHelp: { paddingTop: 6, alignItems: 'flex-end' },
  webHelpText: { color: colors.textSecondary, fontSize: 12 },
  nativePoster: {
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playBtn: {
    backgroundColor: colors.brandNavyHeader,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.brandGold,
  },
  playText: {
    color: colors.brandGold,
    fontWeight: '800',
  },
}); 