import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
import { DashboardScreen } from '../screens/DashboardScreen';
import { ContactScreen } from '../screens/ContactScreen';
import { CategoryScreen } from '../screens/CategoryScreen';
import { AboutScreen } from '../screens/AboutScreen';
import { ReviewsScreen } from '../screens/ReviewsScreen';
import { ProductDetailScreen } from '../screens/ProductDetailScreen';

export type RootStackParamList = {
  Dashboard: undefined;
  Home: undefined;
  Contact: undefined;
  Category: { title: string; categoryKey: string };
  About: undefined;
  Reviews: undefined;
  ProductDetail: { title: string; imageUrl: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
        <Stack.Screen name="About" component={AboutScreen} options={{ title: 'About Us' }} />
        <Stack.Screen name="Contact" component={ContactScreen} options={{ title: 'Contact Us' }} />
        <Stack.Screen name="Category" component={CategoryScreen} options={({ route }) => ({ title: route.params.title })} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={({ route }) => ({ title: route.params.title })} />
        <Stack.Screen name="Reviews" component={ReviewsScreen} options={{ title: 'Testimonials' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}; 