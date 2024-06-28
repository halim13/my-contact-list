import {View} from 'react-native'
import React from 'react'
import {Text} from 'react-native-paper'

const Header = () => {
  return <View style={{padding: 16, borderBottomWidth: 1}}>
    <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 20}}>My Contact List</Text>
  </View>
}

export default Header