import React from 'react';
import { View, Text, StyleSheet, Image, useWindowDimensions } from 'react-native';
import { colors } from '../theme/colors';
const EcoAdd1 = require('../../assets/eco-add-1.png');
const EcoAdd2 = require('../../assets/eco-add-2.jpeg');

export const NewArrivalsSection: React.FC = () => {
  const { width } = useWindowDimensions();
  const isNarrow = width < 992;
  const styles = getStyles(isNarrow);

  return (
    <View style={styles.wrap}>
      <View style={styles.container}>
        <View style={styles.imageCol}>
          <Image source={EcoAdd1} style={styles.image} resizeMode="contain" />
        </View>
        <View style={styles.imageCol}>
          <Image source={EcoAdd2} style={styles.image} resizeMode="contain" />
        </View>
      </View>
    </View>
  );
};

const getStyles = (isNarrow: boolean) => StyleSheet.create({
  wrap: { backgroundColor: '#FFFFFF', paddingHorizontal: 24, paddingTop: 0, paddingBottom: isNarrow ? 8 : 12, marginTop: -8, borderTopWidth: 8, borderTopColor: '#FFFFFF' },
  container: { flexDirection: isNarrow ? 'column' : 'row', gap: isNarrow ? 12 : 16, maxWidth: 1200, alignSelf: 'center' },
  imageCol: { flex: 1, borderRadius: 12, overflow: 'hidden', backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center' },
  image: { width: '100%', height: undefined, aspectRatio: isNarrow ? 3/4 : 4/5 },
});


