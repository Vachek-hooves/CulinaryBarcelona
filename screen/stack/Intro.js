import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const Intro = () => {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/image/logo/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  )
}

export default Intro

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '100%',
    height: 100,
  }
})