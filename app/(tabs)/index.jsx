import { Link } from "expo-router";
import { Text, View, Image, ScrollView, FlatList } from "react-native";

import { icons } from "@/constants/icons";

import { useColorTheme } from '@/contexts/ColorThemeContext';
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import { ActivityIndicator } from "react-native-paper";
import MovieCard from "@/components/MoviesCard";

export default function Index() {
  const { theme, isDark } = useColorTheme();
  const logo = isDark ? icons.logo2 : icons.logo1;


  const {
    data: movies, 
    loading: moviesLoading, 
    error: moviesError} = useFetch(()=>fetchMovies({
    query: '',
  }));

  return (
    <View className="flex-1 " style={{ backgroundColor: theme.background }}>
      
      <ScrollView className="flex-1 px-5 " showsVerticalScrollIndicator={false} contentContainerStyle={{minHeight:"100%" , paddingBottom: 10}}>
          <Image source={logo} className="flex-row w-12 h-10 mt-20 mb-5 mx-auto"/> 
           <Text style={{ color: theme.textPrimary, textAlign: 'center', marginBottom: 20, fontSize: 18, fontWeight: 'bold' }}>The SunSet Movies</Text>
          {moviesLoading ? (
            <ActivityIndicator 
            size="large" 
            color={theme.textPrimary}
            className="mt-20" />
          ) : moviesError ? (
            <Text style={{ color: theme.textPrimary, textAlign: 'center', marginTop: 20 }}>
              Something went wrong: {moviesError.message}
            </Text>
          ) : (
          <View className="flex-1 mt-5 justify-center">
            {/* <SearchBar
              onPress={()=>router.push("/search")}
              placeholder="Search For A Movie"
            /> */}
          <>
            <Text className="mb-3 text-lg font-bold" style={{ color: theme.textPrimary }}>Latest Movies</Text>
            <FlatList 
              data={movies}
              renderItem={({ item })=>(
                <MovieCard    
                  id={item.id}
                  poster_path={item.poster_path}
                  title={item.title}
                  vote_average={item.vote_average}
                  release_date={item.release_date}
                /> )}
              numColumns={3}
              columnWrapperStyle={{ 
                justifyContent: 'flex-start', 
                gap: 16, 
                marginVertical: 16,
                }}
                
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
            
            />
           

          </>
          </View>
     
          )}
    
      </ScrollView>

    </View>
  );
}
