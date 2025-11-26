import { View, Text, FlatList, Image } from 'react-native'
import React, { useEffect } from 'react'

import { SafeAreaView } from 'react-native-safe-area-context';

import MovieCard from '@/components/MoviesCard';
import SearchBar from '@/components/SearchBar';

import useFetch from '@/services/useFetch';
import { fetchMovies } from '@/services/api';

import {icons} from '@/constants/icons';
import { useColorTheme } from '@/contexts/ColorThemeContext';
import { ActivityIndicator } from 'react-native-paper';




const Search = () => {

    const [searchQuery, setSearchQuery] = React.useState('');
  const { theme, isDark } = useColorTheme();
  const logo = isDark ? icons.logo2 : icons.logo1;
  const {
    data: movies, 
    loading: moviesLoading, 
    refetch: loadMovies,
    error: moviesError} = useFetch(()=>fetchMovies({
    query: searchQuery,
  }), false);

  useEffect(()=>{
    const moviesearch= setTimeout(async()=>{
    if (searchQuery.trim()){
        // Fetch movies when searchQuery changes and is not empty
        await loadMovies();
    } 
    }, 500);
    return () => clearTimeout(moviesearch);
  }, [searchQuery])

  return (
    <SafeAreaView className=" flex-1" style={{ backgroundColor: theme.background }}>
    <View >
      <FlatList 
        
        data={movies}
        renderItem={({item}) => <MovieCard {...item} />}
        keyExtractor={(item)=>item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
            justifyContent: 'center',
            gap: 16, 
            marginVertical: 16,
            
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
            <>
                <View className=" w-full flex-row justify-center mt-20 items-center">
                    <Image source={logo} className=" w-12 h-10"></Image>
                </View>
                <View className='my-5'>
                    <SearchBar 
                    onPress={() => {}} 
                    placeholder="Search For A Movie"
                    value={searchQuery}
                    onChangeText={(text:string) => setSearchQuery(text)}
                    />
                </View>
                { moviesLoading && (
                    <ActivityIndicator size = "large" color = "#8C00FF" className="mt-10"/>
                )}
                { moviesError && (
                    <Text style={{ color: 'red', textAlign: 'center', marginTop: 10 }}>Error{moviesError.message}</Text>
                )}

                {!moviesLoading && !moviesError && searchQuery.trim() && movies?.length > 0 && (
                    <Text style={{ color: theme.secondary, fontWeight: 'bold', fontSize: 18, marginBottom: 12 }}>
                        search results for {''}
                        <Text className="text-accent">{searchQuery}</Text>
                    </Text>
                )}
            </>
        }
        ListEmptyComponent={
            !moviesLoading && !moviesError ? (
                <View>
                    <Text style={{ color: theme.secondary, fontSize: 16, textAlign: 'center', marginTop: 20 }}>
                        {searchQuery.trim() ? 'No results found' : 'Start typing to search for movies'}
                    </Text>
                </View>
            ) : null
        }

        />
    </View>
    </SafeAreaView>
  )
}

export default Search