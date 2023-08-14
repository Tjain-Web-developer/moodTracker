import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home} from './Home.screen';
import {History} from './History.screen';
import React from 'react';
import {Analytics} from './Analytics.screen';
import {AnalyticsIcon, HistoryIcon, HomeIcon} from '../Components/Icons';
import {theme} from '../theme';
const BottomTabs = createBottomTabNavigator();

export const BottomTabsNavigator: React.FC = () => {
  const getIcon = (route, color, size) => {
    if (route.name === 'Home') {
      return <HomeIcon color={color} size={size} />;
    }
    if (route.name === 'History') {
      return <HistoryIcon color={color} size={size} />;
    }
    if (route.name === 'Analytics') {
      return <AnalyticsIcon color={color} size={size} />;
    }
    return null;
  };
  return (
    <BottomTabs.Navigator
      screenOptions={({route}) => ({
        headerTitleStyle: {
          fontFamily: theme.fontFamilyBold
        },
        tabBarActiveTintColor: theme.colorBlue,
        tabBarInactiveTintColor: theme.colorGrey,
        tabBarShowLabel: false,
        tabBarIcon: ({color, size}) => getIcon(route, color, size),
      })}
    >
      <BottomTabs.Screen
        name="Home"
        component={Home}
        options={{title: "Today's Moods"}}
      />
      <BottomTabs.Screen
        name="History"
        component={History}
        options={{title: 'Past Moods'}}
      />
      <BottomTabs.Screen
        name="Analytics"
        component={Analytics}
        options={{title: 'Fancy Charts'}}
      />
    </BottomTabs.Navigator>
  );
};
