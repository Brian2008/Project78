import React from 'react'
import { StyleSheet, Text, View} from 'react-native';
import SignUpLoginScreen from './Screens/SignUpLoginScreen'
export default class App extends React.Component{
  render(){
    return (
      <View>
        <SignUpLoginScreen/>
       </View>
    )
  }
}