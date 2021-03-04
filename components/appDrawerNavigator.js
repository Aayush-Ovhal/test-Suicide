import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {BottomTabNavigator} from './bottomTabNavigator';
import Question from '../screens/question';
import CommunityScreen from '../screens/communityScreen';
import CustomSideBarMenu from './customSideBarMenu';
import FinalAnswers from '../screens/finalAnswers';
import Diary from '../screens/diary';
import AllEntries from '../screens/allEntries';
import { AppStackNavigator } from './appStackNavigator';

export const DrawerNavigator = createDrawerNavigator({
    "Question": {
        screen: Question
    },
    "Community Screen": {
        screen: CommunityScreen
    },
    "All Answers": {
        screen: FinalAnswers
    },
    "Diary": {
        screen: BottomTabNavigator
    }
},
{
  contentComponent: CustomSideBarMenu
}
)