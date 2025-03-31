import { View, Text, TextInput, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const OnCreateAccount = async () => {
    if (!email || !password || !fullName) {
      ToastAndroid.show('Please enter all details', ToastAndroid.LONG);
      return;
    }

    try {
      const response = await fetch('https://task-manager-backend-87s0.onrender.com/api/users/register', { // Update with your backend URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful registration
        ToastAndroid.show('Account created successfully!', ToastAndroid.LONG);
        // Optionally navigate to another screen
        router.replace('/auth/sign-in');
      } else {
        // Handle errors
        ToastAndroid.show(data.error || 'Registration failed', ToastAndroid.LONG);
      }
    } catch (error) {
      console.error('Error:', error);
      ToastAndroid.show('An error occurred. Please try again.', ToastAndroid.LONG);
    }
  };

  return (
    <View style={{ padding: 25, paddingTop: 50 }}>
      <Text style={{ fontSize: 30, fontFamily: 'outfit-bold', color: '#000', textAlign: 'center' }}>
        Create New Account
      </Text>

      {/* Name */}
      <View style={{ marginTop: 50 }}>
        <Text style={{ fontFamily: 'outfit' }}>Full Name</Text>
        <TextInput
          style={localStyles.input}
          placeholder='Enter Full Name'
          onChangeText={(value) => setFullName(value)}
        />
      </View>

      {/* Email */}
      <View style={{ marginTop: 30 }}>
        <Text style={{ fontFamily: 'outfit' }}>Email</Text>
        <TextInput
          style={localStyles.input}
          placeholder='Enter Email'
          onChangeText={(value) => setEmail(value)}
        />
      </View>

      {/* Password */}
      <View style={{ marginTop: 30 }}>
        <Text style={{ fontFamily: 'outfit' }}>Password</Text>
        <TextInput
          secureTextEntry={true}
          style={localStyles.input}
          placeholder='Enter your password'
          onChangeText={(value) => setPassword(value)}
        />
      </View>

      {/* Create account */}
      <TouchableOpacity onPress={OnCreateAccount}
        style={{
          padding: 15,
          backgroundColor: '#000',
          borderRadius: 15,
          marginTop: 40
        }}>
        <Text style={{
          color: '#fff',
          textAlign: 'center',
          fontFamily: 'outfit-bold',
          fontSize: 15
        }}>Create Account</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.replace('/auth/sign-in')}
        style={{
          padding: 15,
          backgroundColor: '#fff',
          borderRadius: 15,
          marginTop: 20,
          borderWidth: 1
        }}>
        <Text style={{
          color: '#000',
          textAlign: 'center',
          fontFamily: 'outfit-bold',
          fontSize: 15,
        }}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}

const localStyles = StyleSheet.create({
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#000',
    fontFamily: 'outfit'
  }
});