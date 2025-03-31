import { View, Text, TextInput, TouchableOpacity, ToastAndroid, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSignIN = async () => {
    // Validate input
    if (!email || !password) {
        ToastAndroid.show('Please Enter Email & Password', ToastAndroid.LONG);
        return;
    }

    try {
        const response = await fetch('https://task-manager-backend-87s0.onrender.com/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        const data = await response.json();

        console.log('Response Data:', data); // Log the response data

        if (response.ok) {
            // Handle successful login
            ToastAndroid.show('Login successful!', ToastAndroid.LONG);
            // Store the JWT token (you can use AsyncStorage or any state management)
            // For example, using AsyncStorage:
            await AsyncStorage.setItem('token', data.token);
            console.log('Token stored:', data.token);
            router.replace('/Home'); // Navigate to the home screen
        } else {
            // Handle errors
            ToastAndroid.show(data.message || 'Login failed', ToastAndroid.LONG);
        }
    } catch (error) {
        console.error('Error:', error);
        ToastAndroid.show('An error occurred. Please try again.', ToastAndroid.LONG);
    }
};

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Let's Sign You In</Text>
      <Text style={styles.subHeader}>Welcome Back</Text>
      <Text style={styles.welcomeMessage}>You've been missed!</Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder='Enter Email'
          onChangeText={setEmail}
          value={email}
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          placeholder='Enter Password'
          onChangeText={setPassword}
          value={password}
        />
      </View>

      {/* Sign In Button */}
      <TouchableOpacity onPress={onSignIN} style={styles.signInButton}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      {/* Create Account Button */}
      <TouchableOpacity
        onPress={() => router.replace('/auth/sign-up')}
        style={styles.createAccountButton}>
        <Text style={styles.buttonTextCreate}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingTop: 80,
    height: '100%',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 30,
    fontFamily: 'outfit-bold',
  },
  subHeader: {
    fontSize: 30,
    fontFamily: 'outfit',
    color: '#000',
    marginTop: 20,
  },
  welcomeMessage: {
    fontSize: 20,
    fontFamily: 'outfit',
    color: '#000',
    marginTop: 10,
  },
  inputContainer: {
    marginTop: 20,
  },
  label: {
    fontFamily: 'outfit',
  },
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#000',
    fontFamily: 'outfit',
  },
  signInButton: {
    padding: 15,
    backgroundColor: '#000',
    borderRadius: 15,
    marginTop: 40,
  },
  createAccountButton: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginTop: 20,
    borderWidth: 1,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'outfit-bold',
    fontSize: 15,
  },
  buttonTextCreate: {
    color: '#000',
    textAlign: 'center',
    fontFamily: 'outfit-bold',
    fontSize: 15,
  },
});