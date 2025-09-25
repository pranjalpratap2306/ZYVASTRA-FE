import React from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import { Video } from 'expo-av';

interface VideoHeroProps {
  sourceUri: string;
}

export const VideoHero: React.FC<VideoHeroProps> = ({ sourceUri }) => {
  if (Platform.OS !== 'web') {
    return (
      <View style={styles.aspect}> 
        <Video
          source={{ uri: sourceUri }}
          rate={1.0}
          volume={1.0}
          isMuted
          shouldPlay
          isLooping
          resizeMode={Video.RESIZE_MODE_COVER as any}
          style={StyleSheet.absoluteFill}
        />
      </View>
    );
  }

  // Web: use native video tag for better performance
  return (
    <View style={styles.aspect}>
      <video
        playsInline
        autoPlay
        muted
        loop
        style={styles.fill as any}
      >
        <source src={sourceUri} />
      </video>
    </View>
  );
};

const styles = StyleSheet.create({
  aspect: { width: '100%', aspectRatio: 16/6, backgroundColor: '#000', position: 'relative', overflow: 'hidden' },
  fill: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%', objectFit: 'cover' },
});




