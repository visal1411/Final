import { View, Text, Image, TextInput, Pressable } from 'react-native'
import React from 'react'
import {icons} from '../constants/icons'


interface Props{
  placeholder: String;
  onPress ?: () => void;
  value: string;
  onChangeText: (text: string)=> void;
}
//@ts-ignore
const SearchBar = ({ placeholder, onPress, value, onChangeText}) => {

  return (
    
    <View className="flex-row items-center bg-[#8C00FF] rounded-full px-5 py-2">
    <Image source={icons.search} className="w-5 h-5" resizeMode="contain" tintColor="#ab8bff" />
    <TextInput 
      onPress={onPress}
      placeholder={placeholder} 
      value={value}
      onChangeText={onChangeText}
      placeholderTextColor='#FFC400'
      className='flex-1 ml-2 text-white'
    />
    </View>
    
  )
}

export default SearchBar