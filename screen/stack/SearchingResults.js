import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SearchingResults = ({route}) => {
  const {category} = route.params;
  console.log(category);
  return (
    <View>
      <Text>SearchingResults</Text>
    </View>
  )
}

export default SearchingResults

const styles = StyleSheet.create({})