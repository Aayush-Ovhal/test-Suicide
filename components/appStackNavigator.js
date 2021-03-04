import * as React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import AllEntries from '../screens/allEntries';
import EntireEntry from '../screens/entireEntry';

export const AppStackNavigator = createStackNavigator({
  allEntries: {
      screen: AllEntries,
      navigationOptions: {headerShown: false}
  },
  entireEntry: {
      screen: EntireEntry,
      navigationOptions: {headerShown: false}
  }
})