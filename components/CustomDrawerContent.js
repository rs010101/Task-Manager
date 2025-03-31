import React from 'react';
import { View, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import { useRouter } from 'expo-router'; // To navigate to Login screen after logout

export default function CustomDrawerContent({ navigation }) {
  const router = useRouter();

  // Handle logout logic
  const handleLogout = async () => {
    try {
      // Clear JWT token or any other data stored in AsyncStorage
      await AsyncStorage.removeItem('jwt_token'); // Replace 'jwt_token' with your actual token key
      // Navigate to the SignIn screen
      router.push('/auth/signin'); // Redirect to the SignIn screen
    } catch (error) {
      console.error("Error clearing data or logging out", error);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Sidebar Menu</Text>

      {/* Add any other drawer items here */}

      {/* Logout Button */}
      <TouchableOpacity onPress={handleLogout} style={{
        marginTop: 30,
        padding: 15,
        backgroundColor: '#FF0000',
        borderRadius: 10,
        alignItems: 'center',
      }}>
        <Text style={{ color: '#fff', fontSize: 16 }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
