import { View, Text, TextInput, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native';
import React, { useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

export default function AddTask() {
  const navigation = useNavigation();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddTask = async () => {
    if (!title || !description) {
      ToastAndroid.show('Please enter both title and description', ToastAndroid.LONG);
      return;
    }

    const newTask = { title, description };

    try {
      // Retrieve the token from AsyncStorage
      const token = await AsyncStorage.getItem('token');
      console.log('Retrieved token:', token); // Log the retrieved token

      const response = await fetch('https://task-manager-backend-87s0.onrender.com/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error('Failed to add task');
      }

      const data = await response.json();
      console.log('Task added:', data);
      ToastAndroid.show('Task added successfully!', ToastAndroid.LONG);

      // Navigate to Task Details screen with the new task details
      router.push({
        pathname: '/TaskDetails',
        params: { task: data }, // Use the response data which includes the task details
      });

      // Clear the input fields after adding the task
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error adding task:', error);
      ToastAndroid.show('Error adding task. Please try again.', ToastAndroid.LONG);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Task</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder='Enter task title'
          value={title}
          onChangeText={setTitle}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          placeholder='Enter task description'
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
        />
      </View>

      <TouchableOpacity onPress={handleAddTask} style={styles.button}>
        <Text style={styles.buttonText}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingTop: 55,
    backgroundColor: '#fff',
    height: '100%',
  },
  header: {
    marginTop: 18,
    fontSize: 30,
    fontFamily: 'outfit-bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginTop: 18,
    marginBottom: 15,
    borderRadius: 5,
  },
  label: {
    marginTop: 5,
    fontSize: 16,
    fontFamily: 'outfit-bold',
    marginBottom: 5,
  },
  input: {
    marginTop: 1,
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#000',
    fontFamily: 'outfit',
  },
  button: {
    marginTop: 18,
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'outfit-bold',
  },
});