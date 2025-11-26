import { View, Text, Image } from 'react-native'
import React from 'react'
import {Tabs} from "expo-router"
import { ImageBackground } from 'react-native'
import { images } from '../../constants/images'
import { icons } from '@/constants/icons'

const TabBar = ({focused, icon, text}) => {
    
   if (focused){
    return (
    
       <>
            <ImageBackground 
                source={images.highlight}
                className="flex flex-row w-full flex-1 min-w-[112px] min-h-16 mt-5 justify-center items-center rounded-full overflow-hidden"
            >
                <Image source={icon} tintColor="#151312" className="size-5" />
                <Text className='text-secondary text-base font-semibold' >{text}</Text>
            </ImageBackground>
        </>
  )
}
    return (
             <View className='size-full justify-center items-center mt-4 rounded-full'>
                <Image  source={icon} tintColor="#A8B5DB" className="size-5" /> 
             </View>
    )
 
}

const _layout = () => {
  return (
    <Tabs
    
        screenOptions={{
            tabBarShowLabel: false,
            tabBarItemStyle: {
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',

            },
            tabBarStyle: {
                backgroundColor: '#450693',
                borderRadius: 50,
                marginHorizontal: 10,
                marginBottom: 37,
                height: 50,
                position: 'absolute',
                overflow: 'hidden',
                borderWidth: 1,
                borderColor: '#450693',
            }
        }}

    >
        <Tabs.Screen 
            name="index"
            options={{
                title: 'Home',
                headerShown: false,
                     tabBarIcon: ({focused}) => (
                    <TabBar 
                        focused={focused}
                        icon={icons.home}
                        text="Home"
                    />
                )
            }}
        />
        

        <Tabs.Screen 
            name="search"
            options={{
                title: 'Search',
                headerShown: false,
                         tabBarIcon: ({focused}) => (
                    <TabBar 
                        focused={focused}
                        icon={icons.search}
                        text="search"
                    />
                )
            }}
        />
        <Tabs.Screen 
            name="save"
            options={{
                title: 'Favorite',
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <TabBar 
                        focused={focused}
                        icon={icons.save}
                        text="save"
                    />
                )
            }}
        />
        <Tabs.Screen 
            name="profile"
            options={{
                title: 'Profile',
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <TabBar 
                        focused={focused}
                        icon={icons.person}
                        text="Profile"
                    />
                )
           
            }}
        />

    </Tabs>
  )
}

export default _layout