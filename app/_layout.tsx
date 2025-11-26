import { Stack } from "expo-router";
import './global.css';
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import AuthScreen from "./auth/auth";
import { ColorThemeProvider } from "@/contexts/ColorThemeContext";
import { FavoritesProvider } from "@/contexts/FavouriteContext";

function AppStack() {
  const { user, loading } = useAuth();

  if (loading) return null;

  // If user is not logged in, show AuthScreen
  if (!user) return <AuthScreen />;

  // If user is logged in, show main app stack
  return (
    <FavoritesProvider> 
    <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack> 
    </FavoritesProvider>
  );  
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <ColorThemeProvider>
        <AppStack />
      </ColorThemeProvider>
    </AuthProvider>
  );
}
