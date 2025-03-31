import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

export default function Home() {

  const handleLogout = async () => {
    try {
      // Clear the token from AsyncStorage
      await AsyncStorage.removeItem('token'); // Replace 'token' with your actual key

      // You can also clear other data here if needed

      console.log('Token cleared and user logged out');

      // Navigate to the login screen after logout
      router.push('/auth/sign-in');  // Assuming '/auth/sign-in' is your login screen route
    } catch (error) {
      console.log('Error clearing token:', error);
    }
  };

  return (
    <View style={{
      padding: 25,
      paddingTop: 55,
      backgroundColor: '#fff',
      height: '100%',
    }}>

      {/* Logout Button - Icon and Text in one row */}
      <TouchableOpacity onPress={handleLogout} style={{
        padding: 10,
        borderRadius: 50,
        marginBottom: 20, // Add spacing between logout and content
        flexDirection: 'row',  // Align icon and text in a row
        alignItems: 'center',  // Align the icon and text vertically centered
      }}>
        <Ionicons name="log-out" size={35} color="black" />
        <Text style={{
          fontSize: 16,
          color: 'black',
          fontWeight: 'bold',  // Make the text bold
          marginLeft: 10,  // Add space between icon and text
        }}>Logout</Text>
      </TouchableOpacity>

      {/* Header with My Tasks title and Add Task icon */}
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 5
      }}>
        <Text style={{
          fontSize: 30,
          fontFamily: 'outfit-bold',
        }}>My Tasks</Text>
        <TouchableOpacity onPress={() => router.push('/AddTask')}>
          <Ionicons name="add-circle" size={40} color="black" />
        </TouchableOpacity>
      </View>

      {/* No tasks message and button to add a new task */}
      <View style={{
        padding: 20,
        marginTop: 50,
        display: 'flex',
        alignItems: 'center',
        gap: 10
      }}>
        <Text style={{
          fontSize: 25,
          fontFamily: 'outfit-medium',
          marginTop: 10
        }}>
          No Tasks Added Yet
        </Text>
        <Text style={{
          fontSize: 20,
          fontFamily: 'outfit',
          marginTop: 10,
          textAlign: 'center',
          color: '#A9A9A9',
          padding: 13
        }}>
          Looks like it's time to add a new task! Get Started below
        </Text>

        <TouchableOpacity
          onPress={() => router.push('/AddTask')}
          style={{
            padding: 15,
            backgroundColor: '#000',
            borderRadius: 15,
            paddingHorizontal: 30,
          }}
        >
          <Text
            style={{
              color: '#fff',
              fontFamily: 'outfit-medium',
              fontSize: 17,
            }}
          >
            Add a New Task
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
