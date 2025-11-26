import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { useColorTheme } from '@/contexts/ColorThemeContext';
import React from 'react';
import { useFavorites } from '@/contexts/FavouriteContext';
import { icons } from '@/constants/icons';
import { useNavigation } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const SaveScreen = () => {
  const { theme } = useColorTheme();
  const { favorites, removeFavorite } = useFavorites();
  const navigation = useNavigation();

  if (favorites.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.background }}>
        <Text style={{ color: theme.textSecondary, fontSize: 16 }}>No saved movies yet.</Text>
      </View>
    );
  }

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: theme.border,
      }}
      //@ts-ignore
      onPress={() => navigation.push('movies/[id]', { id: item.id })}
    >
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w200${item.poster_path}` }}
        style={{ width: 80, height: 120, borderRadius: 5 }}
      />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={{ color: theme.textPrimary, fontSize: 16, fontWeight: 'bold' }}>{item.title}</Text>
        <Text style={{ color: theme.textSecondary, fontSize: 14 }}>Release: {item.release_date}</Text>
      </View>
      <TouchableOpacity onPress={() => removeFavorite(item.id)}>
        <Image source={icons.trash} style={{ width: 24, height: 24 }} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    
    <SafeAreaView style={{ backgroundColor: theme.background, flex: 1, }} >
      <Text style={{ color: theme.textPrimary, fontSize: 24, fontWeight: 'bold', margin: 10 }}>Saved Movies</Text>
    <FlatList
      data={favorites}
      keyExtractor={(item) => String(item.id)}
      renderItem={renderItem}
      contentContainerStyle={{ paddingBottom: 20, backgroundColor: theme.background }}
    />
    </SafeAreaView>
  );
};

export default SaveScreen;
