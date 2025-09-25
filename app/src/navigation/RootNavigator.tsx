import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
import { DashboardScreen } from '../screens/DashboardScreen';
import { ContactScreen } from '../screens/ContactScreen';
import { CategoryScreen } from '../screens/CategoryScreen';
import { AboutZVASTRAScreen } from '../screens/AboutZVASTRA';
import { ReviewsScreen } from '../screens/ReviewsScreen';
import { ProductDetailScreen } from '../screens/ProductDetailScreen';
import { colors } from '../theme/colors';
import { PrivacyPolicyScreen } from '../screens/PrivacyPolicyScreen';
import { ShippingPolicyScreen } from '../screens/ShippingPolicyScreen';

export type RootStackParamList = {
  Dashboard: undefined;
  Home: undefined;
  Contact: undefined;
  Category: { title: string; categoryKey: string };
  About: undefined;
  Reviews: undefined;
  ProductDetail: { title: string; imageUrl: string };
  PrivacyPolicy: undefined;
  ShippingPolicy: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Dashboard"
        screenOptions={{
          headerShown: false,
          headerStyle: { backgroundColor: colors.brandNavyHeader },
          headerTitleStyle: { color: colors.brandGold, fontWeight: '800' },
          headerTintColor: colors.brandGold,
          headerBackTitleVisible: false,
        }}
      >
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="About" component={AboutZVASTRAScreen} />
        <Stack.Screen name="Contact" component={ContactScreen} />
        <Stack.Screen name="Category" component={CategoryScreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
        <Stack.Screen name="Reviews" component={ReviewsScreen} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
        <Stack.Screen name="ShippingPolicy" component={ShippingPolicyScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}; 