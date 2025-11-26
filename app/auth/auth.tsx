
// import { useEffect, useState } from "react";
// import { View,  } from "react-native";
// import { Button, Text, TextInput, useTheme } from "react-native-paper";
// import { useAuth } from "@/lib/authContext";
// import { useRouter } from "expo-router";

// export default function Authscreen() {
//   const [isSignup, setIsSignup] = useState<boolean>(false);
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [error, setError] = useState<string | null>("");
//   const theme = useTheme();
//   const handleAuth = async () => {
//     if (!email || !password) {
//       // Handle signup logic
//       setError("Email and password are required.");
//       return;
//     } 
//   };

//   const handleSwitch = () => {
//     setIsSignup((prev) => !prev);
//   }
//     return (
        
//             <View className="flex-1 pd-16 justify-center ">
//               <Text className="mb-14" variant="headlineMedium">{isSignup ? "Create Account" : "Hello Welcome back"}</Text>
//                 <TextInput 
//                   className=" flex-1 mt-3 justify-center items-center"
//                   // label="Email"
//                   autoCapitalize="none" 
//                   keyboardType="email-address" 
//                   placeholder="example@gmail.com"
//                   mode= "outlined"
//                   onChangeText={setEmail}
//                   />

//                   <TextInput 
//                   className="mt-3 "
//                   label="Password"
//                   keyboardType="default"
//                   secureTextEntry
//                   mode= "outlined"
//                   onChangeText={setPassword}
//                   />
//                 {error && <Text style={{ color: theme.colors.error }}>{error}</Text>}
//                   <Button  className="mt-16" mode="contained" onPress={handleAuth}>
//                     {isSignup ? "Sign Up" : "Login"}
//                   </Button>
//                     <Button mode="text" onPress={() => handleSwitch()}>
//                     {isSignup ? "Already Have An Account?" : "Dont have An Account? sign up"}
//                   </Button>
//             </View>
        
//     )
// }
import { useState } from "react";
import { View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "expo-router";

export default function AuthScreen() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const theme = useTheme();
  const { login, register } = useAuth();
  const router = useRouter();

  const handleAuth = async () => {
    if (!email || !password || (isSignup && name === "")) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      if (isSignup) {
        await register(email, password, name);
      } else {
        await login(email, password);
      }
      setError(null);
      router.replace("/"); // navigate to home after success
    } catch (err: any) {
      setError(err.message || "Authentication failed");
    }
  };

  const handleSwitch = () => {
    setIsSignup((prev) => !prev);
    setError(null);
  };

  return (
    <View className="flex-1 px-4 justify-center  gap-y-4 ">
      <Text className="mb-14" variant="headlineMedium">
        {isSignup ? "Create Account" : "Hello, Welcome Back"}
      </Text>

      {isSignup && (
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={setName}
          mode="outlined"
          className="mb-3"
        
        />
      )}

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        mode="outlined"
        className="mb-3"
        
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        mode="outlined"
        className="mb-3"
      />

      {error && <Text style={{ color: theme.colors.error }}>{error}</Text>}

      <Button mode="contained" className="mt-6" onPress={handleAuth}>
        {isSignup ? "Sign Up" : "Login"}
      </Button>

      <Button mode="text" onPress={handleSwitch} className="mt-3">
        {isSignup
          ? "Already have an account?"
          : "Don't have an account? Sign Up"}
      </Button>
    </View>
  );
}
