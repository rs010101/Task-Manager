import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, ToastAndroid, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TaskDetails() {
  const navigation = useNavigation();
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch('https://task-manager-backend-87s0.onrender.com/api/tasks', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Failed to fetch tasks');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      ToastAndroid.show('Failed to fetch tasks.', ToastAndroid.LONG);
    }
  };

  const handleEditTask = async (taskId) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`https://task-manager-backend-87s0.onrender.com/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ title: updatedTitle, description: updatedDescription }),
      });
      if (!response.ok) throw new Error('Failed to update task');
      ToastAndroid.show('Task updated successfully!', ToastAndroid.LONG);
      setEditingTask(null);
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
      ToastAndroid.show('Error updating task.', ToastAndroid.LONG);
    }
  };

  const handleDeleteTask = async (taskId) => {
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: async () => {
          try {
            const token = await AsyncStorage.getItem('token');
            const response = await fetch(`https://task-manager-backend-87s0.onrender.com/api/tasks/${taskId}`, {
              method: 'DELETE',
              headers: { 'Authorization': `Bearer ${token}` },
            });
            if (!response.ok) throw new Error('Failed to delete task');
            ToastAndroid.show('Task deleted successfully!', ToastAndroid.LONG);
            fetchTasks();
          } catch (error) {
            console.error('Error deleting task:', error);
            ToastAndroid.show('Error deleting task.', ToastAndroid.LONG);
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Task List</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.taskItem}
            onPress={() => setEditingTask(item._id)}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Text>{item.description}</Text>
            {editingTask === item._id && (
              <View>
                <TextInput
                  style={styles.input}
                  placeholder='Update title'
                  value={updatedTitle}
                  onChangeText={setUpdatedTitle}
                />
                <TextInput
                  style={styles.input}
                  placeholder='Update description'
                  value={updatedDescription}
                  onChangeText={setUpdatedDescription}
                  multiline
                />
                <TouchableOpacity style={styles.updateButton} onPress={() => handleEditTask(item._id)}>
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteTask(item._id)}>
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
        )}
      />

      {/* Go to Home Button */}
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.homeButton}>
        <Text style={styles.buttonText}>Go to Home</Text>
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
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  taskItem: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  updateButton: {
    backgroundColor: '#A9A9A9',
    padding: 10,
    marginTop: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#505050',
    padding: 10,
    marginTop: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  homeButton: {
    backgroundColor: '#000', // Black button for home navigation
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
