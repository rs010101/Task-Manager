import React, { useEffect } from "react";
import { Colors } from "@/app-example/constants/Colors";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation, useRouter } from "expo-router";

export default function Login() {
  const router = useRouter();
  return (
    <View
          style={styles.container}>
            <Image source={require("./../assets/images/image.png")}
            style={{
              width: 350,
              height: 500
            }}
            />
          <Text style={{
            fontSize: 28,
            fontFamily: "outfit-bold",
            marginTop: 5,
            textAlign: "center"
          }}>Welcome to Task Manager</Text>
    
          <Text style={{
            fontSize: 18,
            fontFamily: "outfit",
            marginTop: 5,
            textAlign: "center",
            padding: 10
          }}>Organize your tasks efficiently and boost productivity!</Text>

          <TouchableOpacity style={styles.button}
          onPress={()=> router.push('auth/sign-in')}
          >
            <Text style={{
              fontSize: 18,
              fontFamily: "outfit-medium",
              color: "#fff",
              textAlign: "center"
            }}> Get Started</Text>
          </TouchableOpacity>
    
        </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: -10,
    marginBottom: -10,
    height: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 12
  },
  button:{
    padding: 14,
    backgroundColor: "#000",
    borderRadius: 99,
    marginTop: "6%",
    color: "#000"
  }
});
