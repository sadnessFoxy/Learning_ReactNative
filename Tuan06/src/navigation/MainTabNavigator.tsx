import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackNavigator from './HomeStackNavigator';
import CartStackNavigator from './CartStackNavigator';
import CategoryScreen from '../screens/CategoryScreen';
import AccountScreen from '../screens/AccountScreen';
import CustomTabBar from '../components/CustomTabBar';

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{ title: 'Trang chủ' }}
      />
      <Tab.Screen
        name="CategoryTab"
        component={CategoryScreen}
        options={{ title: 'Danh mục' }}
      />
      <Tab.Screen
        name="CartTab"
        component={CartStackNavigator}
        options={{ title: 'Giỏ hàng' }}
      />
      <Tab.Screen
        name="AccountTab"
        component={AccountScreen}
        options={{ title: 'Tài khoản' }}
      />
    </Tab.Navigator>
  );
}
