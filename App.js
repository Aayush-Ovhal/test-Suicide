import * as React from 'react';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';

import Signup from './screens/Signup';
import Login from './screens/Login'

import FinalAnswers from './screens/finalAnswers';

import {DrawerNavigator} from './components/appDrawerNavigator';

export default class App extends React.Component{
  render(){
    return(
      <AppContainer/>
    )
  }
}

const SwitchNavigator = createSwitchNavigator({
 WelcomeScreen: Signup,
 LogIn: Login,
 Question: DrawerNavigator,
 Answers: FinalAnswers
})

const AppContainer = createAppContainer(SwitchNavigator);