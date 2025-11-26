// contexts/FavoritesContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Movie = {
  id:string;
  title?: string;
  poster_path?: string | null;
  release_date?: string;
  // add other fields you need
};

type FavoritesContextType = {
  favorites: Movie[];
  addFavorite: (m: Movie) => Promise<void>;
  removeFavorite: (id: Movie['id']) => Promise<void>;
  toggleFavorite: (m: Movie) => Promise<void>;
  isFavorite: (id: Movie['id']) => boolean;
  loading: boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const FAVORITES_KEY = 'FAVORITES_LIST';

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const json = await AsyncStorage.getItem(FAVORITES_KEY);
        if (json) {
          setFavorites(JSON.parse(json));
        }
      } catch (err) {
        console.warn('Failed to load favorites', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const persist = async (list: Movie[]) => {
    try {
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(list));
    } catch (err) {
      console.warn('Failed to save favorites', err);
    }
  };

  const addFavorite = async (m: Movie) => {
    setFavorites(prev => {
      const exists = prev.find(item => String(item.id) === String(m.id));
      if (exists) return prev;
      const next = [m, ...prev];
      persist(next);
      return next;
    });
  };

  const removeFavorite = async (id: Movie['id']) => {
    setFavorites(prev => {
      const next = prev.filter(item => String(item.id) !== String(id));
      persist(next);
      return next;
    });
  };

  const toggleFavorite = async (m: Movie) => {
    const exists = favorites.find(item => String(item.id) === String(m.id));
    if (exists) await removeFavorite(m.id);
    else await addFavorite(m);
  };

  const isFavorite = (id: Movie['id']) => favorites.some(item => String(item.id) === String(id));

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, toggleFavorite, isFavorite, loading }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider');
  return ctx;
};
