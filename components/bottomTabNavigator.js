import * as React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {Image} from 'react-native';
import Diary from '../screens/diary';
import { AppStackNavigator } from './appStackNavigator';

export const BottomTabNavigator  = createBottomTabNavigator({
    Diary: {
        screen: Diary,
        navigationOptions: {
            tabBarLabel: "Diary",
            tabBarIcon: 
            <Image 
              source={require("../assets/diary.png")} 
              style={{width: 40, height: 40}}
            />
        }
    },
    ASN: {
        screen: AppStackNavigator,
        navigationOptions: {
            tabBarLabel: "All Entries",
            tabBarIcon: 
            <Image 
             source={require("../assets/pencil.png")} 
             style={{width: 40, height: 40}}
            />
        }
    }
})