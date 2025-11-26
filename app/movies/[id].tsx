import { View, Text, ScrollView, Image, TouchableOpacity  } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useColorTheme } from '@/contexts/ColorThemeContext';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import useFetch from '@/services/useFetch';
import { fetchMovieDetails } from '@/services/api';
import { icons } from '@/constants/icons';
import { useFavorites } from '@/contexts/FavouriteContext';
import type { Movie as FavMovie } from "@/contexts/FavouriteContext";
import { Alert } from 'react-native';


const MovieDetails = () => {
  const { theme } = useColorTheme();
  
  const { id } = useLocalSearchParams();
  //@ts-ignore
  const {data: movies} = useFetch(()=>fetchMovieDetails(id as string)) ;
  const { toggleFavorite, isFavorite } = useFavorites();

 const navigation = useNavigation();
  useEffect(() => {
    if (movies?.title) {
      navigation.setOptions({
        title: movies.title,
      });
    }
  }, [movies])

    // helper to cast the fetched movie to the stored Movie shape
  const movieForFavorites = (): FavMovie | null => {
    if (!movies) return null;
    return {
      //@ts-ignore
      id: movies.id,
      title: movies.title,
      poster_path: movies.poster_path,
      vote_average: movies.vote_average,
      release_date: movies.release_date,
    };
  };

  const onToggleFav = async () => {
    const m = movieForFavorites();
    if (!m) {
      Alert.alert('Info', 'Movie data not loaded yet.');
      return;
    }
    await toggleFavorite(m);
  };
  //@ts-ignore
  const favState = movies ? isFavorite(movies.id) : false;
  

  return (
    <View style={{ backgroundColor: theme.background, flex: 1 }}>
      <ScrollView>
        <View>
          <Image 
          source={{ uri: `https://image.tmdb.org/t/p/w500${movies?.poster_path}` }} 
          className=' w-[90%] h-[550px] mx-auto my-5 '
          style={{ borderRadius: 10,  borderWidth: 10, borderColor: theme.border }} 
          resizeMode='stretch'
          />
          <TouchableOpacity 
          onPress={onToggleFav}
            className='absolute top-5 right-5 p-2 bg-white rounded-full'
          > 
            <Image source={ favState ? icons.fillheart : icons.heart } style={{ width: 28, height: 28 }} />
          </TouchableOpacity>
        </View>
        <View className='flex items-start justify-center mt-5 px-5'>
          <Text className='text-3xl font-bold mb-3' style={{ color: theme.textPrimary }}>{movies?.title}</Text>
          <Text className='text-base font-medium mb-1' style={{ color: theme.textSecondary }}>Release Date: {movies?.release_date}</Text>          
          <Text className='text-base font-medium mb-1' style={{ color: theme.textSecondary }}>Duration: {movies?.runtime} minutes</Text>

    
        </View>
        <View 
          className='flex-row px-2 py-1 mt-2' 
          style={{ backgroundColor: theme.card, alignSelf: 'flex-start', borderRadius: 5, marginLeft: 20 }}>
            <Image 
              source={icons.star}
            />
             <Text 
              className='text-base font-medium mb-1' 
              style={{ color: theme.textSecondary }}>Rating: {movies?.vote_average} / 10</Text>
        </View>
        <View className='px-5 mt-5 mb-10'>
          <Text className='text-xl font-bold mb-3' style={{ color: theme.textPrimary }}>Overview</Text>
          <Text className='text-base font-medium' style={{ color: theme.textSecondary }}>{movies?.overview}</Text>
        </View>
      </ScrollView>
                
    </View>
  )
}

export default MovieDetails