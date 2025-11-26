import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { Button, Switch } from 'react-native-paper';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';
import { useColorTheme } from '@/contexts/ColorThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';

const Profile = () => {
  const { logout } = useAuth();
  const router = useRouter();
  const { isDark, toggleTheme, theme } = useColorTheme(); // get current theme & toggle function
  const [imageUri, setImageUri] = useState(null);
  const handleLogout = async () => {
    await logout();
    router.replace('/'); // will show AuthScreen
  };
   const pickImage = async () => {
    // Ask permission
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access camera roll is required!");
      return;
    }

    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // square crop
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };
  // Take photo with camera
const takePhoto = async () => {
  const permission = await ImagePicker.requestCameraPermissionsAsync();
  if (!permission.granted) return alert("Camera permission denied");

  const result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    aspect: [1,1],
    quality: 0.8,
  });

  if (!result.canceled) setImageUri(result.assets[0].uri);
};

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>

         <View style={{ backgroundColor: theme.background, padding: 16, alignItems: 'center' }}>
        <Text style={{ color: theme.textPrimary, fontSize: 20, marginBottom: 20 }}>
          Profile
        </Text>
      

        <TouchableOpacity onPress={pickImage}>
          {imageUri ? (
            <Image
              source={{ uri: imageUri }}
              style={{ width: 120, height: 120, borderRadius: 60, marginBottom: 20 }}
            />
          ) : (
            <View
              style={{
                width: 120,
                height: 120,
                borderRadius: 60,
                backgroundColor: theme.border,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 20,
              }}
            >
              <Text style={{ color: theme.textSecondary }}>Upload</Text>
            </View>
          )}
        </TouchableOpacity>
          <TouchableOpacity className="justify-center items-center" onPress={takePhoto} style={{ marginBottom: 20 }}>
          <Text style={{ color: theme.primary }}>Take Photo</Text>
        </TouchableOpacity>
      </View>
      

    
        {/* Theme switch */}
      <View className="flex-row items-center justify-between px-4 py-2 border-b" style={{  borderBottomColor: theme.border }}>
        <Text style={{ color: theme.textPrimary, marginRight: 10 , paddingLeft:16}}>
          {isDark ? "Dark Mode" : "Light Mode"}
        </Text>
        <Switch className="" value={isDark} onValueChange={toggleTheme} />
      </View>
      <View style={{justifyContent: 'flex-end', padding: 16 }}>
    {/* Logout button */}
      <Button mode="contained" onPress={handleLogout} style={{ marginBottom: 20, backgroundColor: theme.secondary }}>
        Logout
      </Button>
    </View>
    </SafeAreaView>
  );
};

export default Profile;
